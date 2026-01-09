# Future Secure Schedule Architecture - Migration Plan

**Status:** PLANNING ONLY - No migration has started. No production data is affected.

---

## 1. The Security Problem with Current Array-Based Schedule

### Current Architecture
The system currently stores expert schedules inside the `experts/{expertId}` document using nested arrays:

```typescript
experts/{expertId}
  └── schedule: {
        Lunes: [
          { isAvailable: boolean, takenAt: Timestamp|null, takenBy: string|null, time: string },
          { isAvailable: boolean, takenAt: Timestamp|null, takenBy: string|null, time: string },
          ...
        ],
        Martes: [...],
        ...
      }
```

### Critical Security Vulnerabilities

#### 1. **No Granular Field-Level Protection**
Firebase Security Rules **cannot** validate individual array elements or specific fields within array objects. This means:

- ❌ Cannot prevent a user from modifying `takenBy` to steal another user's appointment
- ❌ Cannot prevent a user from changing `takenAt` timestamps
- ❌ Cannot enforce that only the original user can release their slot
- ❌ Cannot validate that `isAvailable` is only modified by admins

#### 2. **Array Update Limitations**
When updating an array in Firestore:
- The **entire array** must be replaced
- Security Rules can only validate the entire new array, not individual changes
- Rules cannot access `request.resource.data.diff()` meaningfully for array elements
- Cannot use `hasOnly()` to restrict which fields are being modified within array objects

#### 3. **Race Conditions**
Multiple users updating the same schedule array simultaneously can cause:
- Lost updates (last write wins)
- Appointment conflicts
- Data corruption

#### 4. **Example Attack Scenario**
```javascript
// Malicious user can do this:
await updateDoc(expertDoc, {
  'schedule.Lunes': [
    { time: "10:00", isAvailable: false, takenBy: "ATTACKER_UID", takenAt: Timestamp.now() },
    // ... rest of array
  ]
});
```

**Current rules CANNOT prevent this** because they cannot validate:
- That the user is only modifying their own slot
- That they're not changing someone else's `takenBy` field
- That they're not fabricating `takenAt` timestamps

---

## 2. Why Firebase Security Rules Cannot Secure This Structure

### Firestore Security Rules Limitations with Arrays

```javascript
// ❌ THIS DOES NOT WORK - Rules cannot access array indexes
match /experts/{expertId} {
  allow update: if 
    // Cannot do: request.resource.data.schedule.Lunes[0].takenBy == request.auth.uid
    // Cannot validate individual array elements
    // Cannot use diff() on nested array objects
}
```

### What Rules CAN Do vs. CANNOT Do

| Capability | Arrays | Subcollections |
|------------|--------|----------------|
| Validate individual field changes | ❌ No | ✅ Yes |
| Use `diff()` to detect changes | ❌ No (not for array elements) | ✅ Yes |
| Use `hasOnly()` for field restrictions | ❌ No (not within arrays) | ✅ Yes |
| Prevent race conditions | ❌ No | ✅ Yes (with transactions) |
| Granular permissions per item | ❌ No | ✅ Yes |
| Validate timestamps | ❌ No (within arrays) | ✅ Yes |

---

## 3. Proposed Future Architecture: Subcollection-Based Slots

### New Structure
```
experts/{expertId}/schedule/{slotId}
```

Each slot becomes an **individual document** with its own security rules.

### Example Slot Document

```typescript
// Document ID: "lunes_10_00" or auto-generated
{
  day: "Lunes",              // string
  time: "10:00",             // string
  isAvailable: true,         // boolean - only admins can modify
  takenAt: Timestamp | null, // server timestamp only
  takenBy: string | null,    // must match request.auth.uid
  createdAt: Timestamp,      // server timestamp
  updatedAt: Timestamp       // server timestamp
}
```

### Security Rules Example (Future)

```javascript
match /experts/{expertId}/schedule/{slotId} {
  // Read: anyone can view available slots
  allow read: if true;
  
  // Create: only admins
  allow create: if isAdmin();
  
  // Update: strict field-level validation
  allow update: if 
    // Only allow specific fields to be modified
    request.resource.data.diff(resource.data).affectedKeys().hasOnly(['takenBy', 'takenAt', 'updatedAt'])
    
    // Booking a slot
    && (
      // User is booking their own slot
      (request.resource.data.takenBy == request.auth.uid
       && resource.data.takenBy == null
       && request.resource.data.takenAt == request.time
       && resource.data.isAvailable == true)
      
      // OR user is releasing their own slot
      || (request.resource.data.takenBy == null
          && resource.data.takenBy == request.auth.uid
          && request.resource.data.takenAt == null)
    )
    
    // isAvailable can only be changed by admins
    && (request.resource.data.isAvailable == resource.data.isAvailable
        || isAdmin());
  
  // Delete: only admins
  allow delete: if isAdmin();
}
```

### Benefits

✅ **Field-Level Security**: Each field can be individually protected  
✅ **User Validation**: Enforce that `takenBy` matches `request.auth.uid`  
✅ **Timestamp Integrity**: Enforce `takenAt == request.time` (server-side)  
✅ **Admin-Only Fields**: `isAvailable` can only be changed by admins  
✅ **Atomic Operations**: Each slot update is independent  
✅ **Audit Trail**: Each slot has its own `updatedAt` timestamp  
✅ **Query Flexibility**: Can query available slots efficiently  

---

## 4. Critical Areas Requiring Updates

### 4.1 Firestore Document Structure

**Current:**
```typescript
experts/{expertId}
  └── schedule: { Lunes: [...], Martes: [...], ... }
```

**Future:**
```typescript
experts/{expertId}
  └── schedule/{slotId}
        ├── day: "Lunes"
        ├── time: "10:00"
        ├── isAvailable: true
        ├── takenAt: null
        ├── takenBy: null
        ├── createdAt: Timestamp
        └── updatedAt: Timestamp
```

**Files to Update:**
- `src/views/CreateExpert.vue` (lines 322-395, 241-249)
- `src/views/ExpertPreview.vue` (lines 287-298, 318-346)
- Any initialization/seed scripts

---

### 4.2 Security Rules

**New File:** `firestore.rules`

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isAdmin() {
      return isAuthenticated() && 
             get(/databases/$(database)/documents/admins/$(request.auth.uid)).data.isAdmin == true;
    }
    
    // Schedule subcollection rules
    match /experts/{expertId}/schedule/{slotId} {
      allow read: if true;
      
      allow create: if isAdmin();
      
      allow update: if 
        isAuthenticated() &&
        request.resource.data.diff(resource.data).affectedKeys().hasOnly(['takenBy', 'takenAt', 'updatedAt']) &&
        (
          // Booking
          (request.resource.data.takenBy == request.auth.uid &&
           resource.data.takenBy == null &&
           request.resource.data.takenAt == request.time &&
           resource.data.isAvailable == true) ||
          
          // Releasing
          (request.resource.data.takenBy == null &&
           resource.data.takenBy == request.auth.uid &&
           request.resource.data.takenAt == null)
        ) &&
        (request.resource.data.isAvailable == resource.data.isAvailable || isAdmin());
      
      allow delete: if isAdmin();
    }
  }
}
```

---

### 4.3 Vue Components

#### **CreateExpert.vue**
- **Lines 322-395**: `schedule` ref structure
- **Lines 399-402**: `getDateSelected()` function
- **Lines 241-249**: `setSubcollectionSchedule()` function
- **Lines 48-64**: Template rendering of schedule

**Changes Needed:**
- Replace array-based schedule with subcollection writes
- Update slot selection logic to work with individual documents
- Modify creation flow to write to `experts/{uid}/schedule/{slotId}`

---

#### **ExpertPreview.vue** (Admin View)
- **Lines 287-298**: `schedule` computed property
- **Lines 301-314**: `getDateSelected()` function
- **Lines 318-346**: `updateSubcollectionSchedule()` function
- **Lines 118-138**: Template schedule rendering

**Changes Needed:**
- Fetch schedule from subcollection instead of nested object
- Update slot toggle logic to update individual documents
- Batch writes for multiple slot updates

---

#### **ExpertViewFixed.vue** (Client Booking)
- **Lines 364-376**: `schedule` computed property
- **Lines 455-555**: `getDateSelected()` slot selection logic
- **Lines 565-653**: `updateSubcollectionSchedule()` booking function
- **Lines 660-678**: `onIonViewDidEnter()` - check if user has slots

**Changes Needed:**
- Query subcollection for available slots
- Update booking logic to write to individual slot documents
- Modify slot release logic
- Update user slot check to query subcollection

---

#### **ExpertScheduleData.vue**
- **Lines 366-413**: `markFunction()` - updates appointments
- Used for admin appointment management

**Changes Needed:**
- Update to work with new slot document structure
- Ensure slot release updates correct subcollection document

---

#### **CardInfo.vue** (Client & Expert)
- **Lines 612-696**: `cancelAppointment()` function
- **Lines 701-771**: `finaliceAppointment()` function
- Both functions update expert schedule to release slots

**Changes Needed:**
- Update slot release logic to work with subcollection
- Query correct slot document by day/time
- Update slot fields individually

---

### 4.4 Pinia Stores

#### **stores/expertAdmin.ts**
- Likely stores current expert data including schedule
- **Changes Needed:**
  - Update state shape to handle subcollection data
  - Add actions to fetch schedule subcollection
  - Update mutations for schedule updates

#### **stores/expertUi.ts**
- Manages expert UI state
- **Changes Needed:**
  - Update to work with new schedule structure

---

### 4.5 TypeScript Interfaces

#### **interfaces/ISchedule.ts**
```typescript
// Current
export interface Slot {
  isAvailable: boolean;
  takenAt: Timestamp | null;
  takenBy: string | null;
  time: string;
}

export interface IExpertSchedule {
  schedule: {
    Lunes?: Slot[];
    Martes?: Slot[];
    // ...
  };
}
```

**Future:**
```typescript
export interface Slot {
  day: string;              // NEW
  time: string;
  isAvailable: boolean;
  takenAt: Timestamp | null;
  takenBy: string | null;
  createdAt: Timestamp;     // NEW
  updatedAt: Timestamp;     // NEW
}

// IExpertSchedule may no longer be needed, or becomes:
export interface IExpertSchedule {
  slots: Slot[];  // Fetched from subcollection
}
```

**Files to Update:**
- `src/interfaces/ISchedule.ts`
- `src/interfaces/IExpert.ts` (line 39)
- `src/interfaces/expert/IExpertProfile.ts` (line 13)

---

### 4.6 Data Migration Considerations

⚠️ **CRITICAL: Migration Strategy Required**

When migration begins, the following must be planned:

1. **Dual-Write Period**
   - Write to both old structure AND new subcollection
   - Maintain backward compatibility during transition

2. **Data Migration Script**
   - Read all existing `experts/{id}` documents
   - For each schedule array, create subcollection documents
   - Preserve all `takenBy`, `takenAt`, `isAvailable` data
   - Generate unique `slotId` (e.g., `lunes_10_00` or auto-ID)

3. **Rollback Plan**
   - Keep old structure intact during migration
   - Ability to revert if issues arise

4. **Testing Requirements**
   - Test with production data clone
   - Verify all appointments preserved
   - Ensure no data loss
   - Validate security rules work as expected

5. **Migration Steps** (Future)
   ```typescript
   // Pseudocode
   for each expert in experts collection:
     const schedule = expert.schedule
     for each day in schedule:
       for each slot in schedule[day]:
         await setDoc(doc(db, `experts/${expert.id}/schedule/${generateSlotId(day, slot.time)}`), {
           day: day,
           time: slot.time,
           isAvailable: slot.isAvailable,
           takenAt: slot.takenAt,
           takenBy: slot.takenBy,
           createdAt: serverTimestamp(),
           updatedAt: serverTimestamp()
         })
   ```

---

## 5. Implementation Phases (Future)

### Phase 1: Preparation (This Document)
- ✅ Document current architecture
- ✅ Identify all dependencies
- ✅ Create migration plan
- ✅ Create test implementation

### Phase 2: Security Rules Development
- Write and test new security rules
- Set up test environment
- Validate rules with emulator

### Phase 3: Interface Updates
- Update TypeScript interfaces
- Ensure type safety

### Phase 4: Component Refactoring
- Update Vue components one by one
- Maintain feature parity
- Add comprehensive tests

### Phase 5: Data Migration
- Create migration script
- Test on cloned data
- Execute migration with rollback plan

### Phase 6: Cleanup
- Remove old schedule field
- Update all documentation
- Monitor for issues

---

## 6. Key Files Summary

| File | Lines | Purpose | Migration Priority |
|------|-------|---------|-------------------|
| `CreateExpert.vue` | 322-395, 241-249 | Create expert schedule | HIGH |
| `ExpertPreview.vue` | 287-346 | Admin schedule management | HIGH |
| `ExpertViewFixed.vue` | 364-653 | Client booking flow | CRITICAL |
| `CardInfo.vue` | 612-771 | Cancel/finalize appointments | CRITICAL |
| `ExpertScheduleData.vue` | 366-413 | Admin appointment actions | HIGH |
| `ISchedule.ts` | All | Type definitions | HIGH |
| `IExpert.ts` | 39 | Expert interface | HIGH |
| `firestore.rules` | N/A | Security rules | CRITICAL |

---

## 7. Testing Strategy

### Unit Tests Needed
- Slot booking logic
- Slot release logic
- Admin slot management
- Security rule validation

### Integration Tests Needed
- End-to-end booking flow
- Concurrent booking attempts
- Admin operations
- Migration script

### Security Tests Needed
- Attempt to book someone else's slot
- Attempt to modify `isAvailable` as non-admin
- Attempt to forge `takenAt` timestamp
- Attempt to steal appointments

---

## 8. Important Notes

⚠️ **THIS IS A PLANNING DOCUMENT ONLY**

- **NO migration has started**
- **NO production data has been affected**
- **NO code has been changed** (except for test implementation in CreateExpert.vue)
- The current system remains **fully functional**
- This document serves as a **roadmap** for future secure implementation

---

## 9. Next Steps (When Ready to Migrate)

1. Review and approve this migration plan
2. Set up Firebase emulator for testing
3. Implement and test security rules
4. Create data migration script
5. Test migration on cloned production data
6. Update components incrementally
7. Execute migration with monitoring
8. Validate all functionality
9. Clean up old structure

---

**Document Version:** 1.0  
**Created:** 2026-01-08  
**Status:** Planning Phase  
**Approved By:** Pending Review
