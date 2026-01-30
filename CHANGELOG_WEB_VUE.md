TECHNICAL MIGRATION SPECIFICATION (DEEP SYNC)
## Project: Consulta Experto (Ionic to Vue-Web)
## Context: This document is a precise map for an AI Agent to synchronize a legacy Ionic/Cordova project with the current Web logic.

### 1. THE GUARDIAN MECHANISM (SYNCING LOCKS)
**Goal:** Guarantee atomic slot exclusivity during selection and release slots upon termination.

#### A. Creation Logic (Client Side)
- **Vista:** `ExpertViewFixed.vue` (Legacy: `ExpertView.vue`)
- **Action:** Replace `updateDoc` with `runTransaction`.
- **Logic:** 
  1. Define `guardianId = {expertUid}_{dayName}_{slotTime}`.
  2. In Transaction: READ `/bookings/{guardianId}`.
  3. IF `snapshot.exists()` -> Abort (Horario ya tomado).
  4. WRITE `bookings` doc AND update expert's `schedule` array AND create `schedules` appointment doc.

#### B. Liberation Logic (Cleanup)
- **Vistas:** `src/components/Client/CardInfo.vue` AND `src/components/Expert/CardInfo.vue`.
- **Function:** `cancelAppointment` and `finaliceAppointment`.
- **Critical Change:** 
  ```typescript
  const guardianId = `${props.data.expertUid}_${matchDay}_${slotMatch.time}`;
  const guardianRef = doc(db, 'bookings', guardianId);
  batch.delete(guardianRef); // MUST BE ADDED
  ```
- **Note:** Failure to add this line in Ionic will result in permanent slot locking after a single use.

---

### 2. PINIA STORE REFACTOR (ARCHITECTURE SYNC)
The store logic was moved away from direct component state to structured Pinia stores to avoid "Stale Data" bugs.

#### A. `authStore` (`src/store/auth.ts`)
- **Responsibility:** Auth state + LOGGED-IN user data only.
- **Fields:** `isAuth`, `userData` (from `/users` or `/experts`), `isAdmin`, `isClient`, `isExpert`.
- **Action:** Setup an `onSnapshot` listener on the user's specific document upon login to keep `isBanned`/`isSuspended` reactive.

#### B. `expertStore` (`src/store/expert.ts`)
- **Responsibility:** Holds data of the *current logged-in expert* only.
- **CRITICAL FIX:** Do NOT use this store to hold data of experts being viewed by clients. Use local component state `ref` instead.

---

### 3. ACCOUNT SUSPENSION BUG (SECURITY FIX)
- **Location:** `src/router/index.ts`.
- **The Bug:** Ionic version checked `expertStore.isSuspended` to block users. If a client viewed a suspended expert, the store updated, and the client was incorrectly banned.
- **The Fix:** Router guard MUST ONLY check `authStore.userData.isBanned` or `authStore.userData.isSuspended`.
- **Code implementation:**
  ```typescript
  const isBannedOrSuspended = authStore().userData?.isBanned || authStore().userData?.isSuspended;
  if (isAuth && isBannedOrSuspended && to.path !== '/account-suspended') next('/account-suspended');
  ```

---

### 4. FIRESTORE SCHEMA ENFORCEMENT (REQUIRED FIELDS)
Ensure Ionic backend writes the following fields to match Web UI filters:
- **Collection `schedules`**:
    - `isCanceled: boolean` (Default: false)
    - `isFinished: boolean` (Default: false)
    - `acceptedByExpert: boolean` (Toggle for link generation)
    - `isOpenedLinkByExpert: boolean` (Toggle for "Join Video" UI visibility)
    - `appointmentDate: Timestamp` (Computed Date, not just a string time)
    - `cancelationReason: string`
    - `canceledByName: string`

---

### 5. VIEW MATCHING (ADD/REMOVE)
| Vue File | Action for Ionic AI |
| :--- | :--- |
| `CardInfo.vue` | ADD: `batch.delete(guardianRef)` in cancel/finish. |
| `ExpertViewFixed.vue` | CHANGE: `updateDoc` -> `runTransaction` for booking. |
| `App.vue` | ADD: Watcher for `authStore.userData` to global redirect to `/account-suspended`. |
| `LoginComponent.vue` | REMOVE: Internal state management for user roles; use `authStore`. |
| `RegisterComponent.vue` | ADD: Field mapping for `categoryConsultations` map in user doc. |
| `router/index.ts` | CLEANUP: Remove `expertStore` reference from global guards. |
