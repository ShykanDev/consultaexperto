# Migration Phase 3: ExpertPreview.vue - Full Migration to Version B

**Status:** ✅ COMPLETED  
**Date Finished:** 2026-01-08 16:10  
**File:** `src/views/ExpertPreview.vue`  
**Strategy:** Remove dual-write, use ONLY Version B (subcollection)

---

## ⚠️ IMPORTANT: No More Dual-Write
- **Version A (array) has been REMOVED** from write operations
- **Only Version B (subcollection)** is being used for Read/Write
- **Rollback via GitHub** if errors occur
- **Backward compatibility code removed**

---

## Migration Steps Completed

### Step 1: Update `schedule` computed property to READ from Version B ✅
**Status:** COMPLETE  
**Impl:** Reads from `scheduleSlots` ref populated by subcollection  
**Finished at:** 2026-01-08 16:03

### Step 2: Update `getDateSelected()` to work with Version B ✅
**Status:** COMPLETE  
**Impl:** Fixed type definition and object mutation logic  
**Finished at:** 2026-01-08 16:08

### Step 3: Update `updateSubcollectionSchedule()` to ONLY write Version B ✅
**Status:** COMPLETE  
**Impl:** Removed Version A write logic, kept only subcollection updates  
**Finished at:** 2026-01-08 16:08

### Step 4: Add subcollection fetch function ✅
**Status:** COMPLETE  
**Impl:** Created `loadScheduleFromSubcollection` function  
**Finished at:** 2026-01-08 16:02

### Step 5: Update component lifecycle ✅
**Status:** COMPLETE  
**Impl:** Added lazy loading via `loadScheduleOnToggle` on the UI toggle  
**Finished at:** 2026-01-08 16:05

### Step 6: Testing & Validation ✅
**Status:** READY FOR MANUAL TEST  
**Checklist:**
- [x] Code compiled successfully
- [x] Linter errors resolved
- [ ] Manual verification required

---

## Code Removal Verification

### Lines DELETED (Version A references):
- ✅ `expertAdminStore.getCurrentExpert?.schedule` reference in computed property
- ✅ Version A write code in `updateSubcollectionSchedule()`
- ✅ Dual-write comments removed

### Lines KEPT/ADDED:
- ✅ Version B write logic only
- ✅ Error handling improved
- ✅ Toast notifications
- ✅ Reload on save (`await loadScheduleFromSubcollection()`)

---

## Final Code Structure

### Reactive State:
```typescript
const scheduleSlots = ref<any[]>([]); // Slots from subcollection
const loadingSchedule = ref(false);
const scheduleError = ref<string | null>(null);
```

### New Fetch Logic:
```typescript
/**
 * Load schedule from Version B (subcollection)
 */
const loadScheduleFromSubcollection = async () => { /* ... */ }

// Lazy load on toggle
const loadScheduleOnToggle = async () => {
  if (showSchedule.value && scheduleSlots.value.length === 0) {
    await loadScheduleFromSubcollection();
  }
};
```

---

## Rollback Plan

### If Migration Fails:
1. **GitHub rollback** to previous commit
2. **No manual code changes** needed

### Rollback Command:
```bash
git checkout HEAD~1 src/views/ExpertPreview.vue
```

---

**PHASE 3 STATUS:** ✅ COMPLETED  
**FINISH TIME:** 2026-01-08 16:10  
