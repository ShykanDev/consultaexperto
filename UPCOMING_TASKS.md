# Technical Roadmap: Appointment Cycle & User Satisfaction Enhancements

**Date:** December 31, 2025  
**Project:** Shykan - ConsultaExpertoApp  
**Status:** Pending Implementation  

---

## 1. Post-Consultation Rating System

**Objective**  
To implement a mandatory feedback loop ensuring high-quality service standards. Users must rate their experience immediately after an appointment concludes.

**Technical Specifications**  
*   **Trigger Mechanism:** 
    *   The system detects when an appointment status transitions to `finished`.
    *   Logic check: If `appointment.status === 'finished'` AND `appointment.rating` is `null`/`undefined`.
*   **User Interface (UI):**
    *   **Component:** `RatingModal` (New Component).
    *   **Design:** Modal overlay preventing other interactions until dismissed or completed.
    *   **Elements:** 5-Star selector, optional "Comments/Feedback" text area, and a "Submit" button.
*   **Data Persistence:**
    *   Update Firestore `appointments` collection.
    *   New Fields: `rating` (number), `feedback` (string).

---

## 2. Issue Resolution & Support Channel

**Objective**  
To provide a dedicated, contextual support channel for users who have completed an appointment but encountered issues.

**Technical Specifications**  
*   **Target Component:** `src/components/Client/CardInfo.vue`.
*   **Conditional Rendering:** 
    *   The support option is ONLY visible for appointments where `status === 'finished'`.
*   **Visual Logic:**
    *   **Display Text:** *"Have you encountered an issue with your appointment? Contact us!"* (or similar styling).
    *   **Action:** Click opens the native email client (`mailto`).
    *   **Pre-filled Content:** 
        *   **Recipient:** Admin Support Email.
        *   **Subject:** `Issue Report - Appointment ID: [FIREBASE_ID]`.

---

## 3. "Unhappy User" Protection & Expert Blocking

**Objective**  
To prevent recurring mismatches. If a user is dissatisfied and granted a re-schedule, the system must technically ensure they are never paired with the same expert again.

**Database Schema Update (User Document)**  
We need to extend the User interface in Firestore to track negative interactions.

*   **New Field:** `expertsBlocked`
*   **Type:** Array of Objects
*   **Structure:**
    ```typescript
    expertsBlocked: [
      {
        expertUid: string,
        expertName: string,
        expertEmail: string,
        expertSpecialty: string
      }
    ]
    ```

**Logic Flow**  
1.  **Trigger:** User reports a critical issue or low rating requiring a re-schedule.
2.  **System Action:** The current expert's details are pushed to the user's `expertsBlocked` array.
3.  **Impact:** The matching algorithm will reference this array to filter out these UIDs during future "Find Expert" requests.

---

## 4. Administrative Re-scheduling Workflow

**Operational Procedure (Manual)**  
This section defines the admin-side protocol for handling verified complaints. No code automation is required for the "reset" phase at this stage.

1.  **Verification:** Admin receives the report (via Step 2).
2.  **Resolution:** If the claim is valid (e.g., expert no-show or technical failure):
    *   Admin locates the user's document in Firebase.
    *   Admin manually toggles the `free_appointment` boolean to `true` (or resets the counter).
3.  **Outcome:** The user is technically cleared to book a new appointment, and the Blocking Logic (Step 3) ensures they get a fresh expert match.
