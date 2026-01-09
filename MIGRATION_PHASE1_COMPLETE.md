# Migration Phase 1: Dual-Write Implementation - CreateExpert.vue

**Status:** ✅ IMPLEMENTED  
**Date:** 2026-01-08  
**File:** `src/views/CreateExpert.vue`

---

## What Was Changed

### Function: `setSubcollectionSchedule()`

This function now implements a **DUAL-WRITE STRATEGY** that writes schedule data to BOTH:

1. **Version A (Original)**: Array-based schedule in `experts/{id}.schedule`
2. **Version B (New)**: Subcollection-based schedule in `experts/{id}/schedule/{slotId}`

---

## Implementation Details

### Version A - Original Array Structure (Lines 270-277)
```typescript
// VERSION A (ORIGINAL): Array-based schedule - DO NOT REMOVE
// This maintains backward compatibility with existing code
// ROLLBACK: If Version B fails, this ensures the app continues working
await updateDoc(expertPath, {
  schedule: schedule.value
});

console.log("✅ Version A: Array-based schedule saved successfully");
```

**Purpose:** Keeps all existing code working without any changes needed elsewhere in the app.

---

### Version B - New Subcollection Structure (Lines 279-313)
```typescript
// VERSION B (NEW): Subcollection-based schedule
// This is the new secure architecture for future migration
// ROLLBACK: Comment out lines 278-303 to revert to Version A only
try {
  let slotsCreated = 0;
  
  for (const [dayName, slots] of Object.entries(schedule.value)) {
    for (const slot of slots) {
      const slotId = `${dayName.toLowerCase()}_${slot.time.replace(':', '_')}`;
      const slotDocRef = doc(db, `experts/${expertDocId}/schedule/${slotId}`);
      
      await setDoc(slotDocRef, {
        day: dayName,
        time: slot.time,
        isAvailable: slot.isAvailable,
        takenAt: slot.takenAt,
        takenBy: slot.takenBy,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      });
      
      slotsCreated++;
    }
  }
  
  console.log(`✅ Version B: Created ${slotsCreated} subcollection slot documents`);
  console.log(`📍 Path: experts/${expertDocId}/schedule/{slotId}`);
} catch (error) {
  // If Version B fails, Version A still works - app remains functional
  console.error('⚠️ Version B failed (subcollection), but Version A succeeded (array):', error);
  console.log('App will continue using Version A - no data loss');
}
```

**Purpose:** Creates the new secure structure for future use, with graceful fallback.

---

## Safety Features

### ✅ Backward Compatibility
- All existing code continues to work
- No changes needed in other components
- Version A is always written first

### ✅ Graceful Degradation
- If Version B fails, the app continues working with Version A
- Error is logged but doesn't break the flow
- No data loss occurs

### ✅ Easy Rollback
To revert to Version A only:
1. Comment out lines 279-313 (the entire Version B block)
2. The app will work exactly as before

---

## What Happens Now

### When Creating a New Expert:

1. **User fills form** → clicks "Crear Experto"
2. **Expert document created** in `experts/{uid}`
3. **Version A writes** → `experts/{uid}.schedule` (array)
4. **Version B writes** → `experts/{uid}/schedule/{slotId}` (subcollection)
5. **Both succeed** → Expert has schedule in both formats
6. **If Version B fails** → Expert still has Version A, app works normally

### Example Result in Firestore:

```
experts/
  └── {expertUid}/
      ├── fullName: "Juan Pérez"
      ├── specialty: "Médico"
      ├── schedule: {                    ← VERSION A (original)
      │     Lunes: [...],
      │     Martes: [...],
      │     ...
      │   }
      └── schedule/                      ← VERSION B (new)
            ├── lunes_09_00
            ├── lunes_10_00
            ├── martes_09_00
            └── ...
```

---

## Testing Checklist

- [ ] Create a new expert
- [ ] Verify Version A schedule exists in expert document
- [ ] Verify Version B subcollection exists
- [ ] Check console logs for success messages
- [ ] Verify existing app functionality still works
- [ ] Test booking appointments (should use Version A)
- [ ] Test admin schedule editing (should use Version A)

---

## Next Steps

### Phase 2: Update Read Operations (Future)
Once all experts have both versions, we can:
1. Update components to READ from subcollection
2. Keep WRITING to both (dual-write continues)
3. Test thoroughly
4. Eventually remove Version A writes

### Phase 3: Security Rules (Future)
Implement Firestore Security Rules for subcollection:
```javascript
match /experts/{expertId}/schedule/{slotId} {
  allow read: if true;
  allow update: if isValidSlotUpdate();
  // ... etc
}
```

---

## Rollback Instructions

### If Issues Occur:

**Option 1: Disable Version B Only**
```typescript
// Comment out lines 279-313 in setSubcollectionSchedule()
// VERSION B (NEW): Subcollection-based schedule
// ROLLBACK: Comment out lines 278-303 to revert to Version A only
/* 
try {
  ... entire Version B block ...
}
*/
```

**Option 2: Full Rollback**
Restore the original function:
```typescript
const setSubcollectionSchedule = async (expertDocId: string) => {
  const expertPath = doc(db, `experts/${expertDocId}`);
  await updateDoc(expertPath, {
    schedule: schedule.value
  });
  console.log("Horario guardado con éxito");
};
```

---

## Important Notes

⚠️ **DO NOT REMOVE VERSION A** - It's required for all existing code to work

✅ **Version B is additive** - It doesn't break anything if it fails

🔄 **Dual-write will continue** until all components are updated to use Version B

📊 **Monitor console logs** to ensure both versions are writing successfully

---

**Status:** Ready for production testing  
**Risk Level:** LOW (backward compatible, graceful fallback)  
**Rollback Time:** < 1 minute (comment out Version B block)
