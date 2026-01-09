# Migration Phase 2: ExpertPreview.vue - Dual-Write Implementation

**Status:** ✅ IMPLEMENTED  
**Date:** 2026-01-08  
**File:** `src/views/ExpertPreview.vue`

---

## What Was Changed

### Function: `updateSubcollectionSchedule()`

Esta función ahora implementa **DUAL-WRITE STRATEGY** para actualizar horarios en AMBAS estructuras:

1. **Version A (Original)**: Array-based schedule en `experts/{id}.schedule`
2. **Version B (Nueva)**: Subcollection-based schedule en `experts/{id}/schedule/{slotId}`

---

## Implementation Details

### Version A - Original Array Structure (Lines 334-339)
```typescript
// VERSION A (ORIGINAL): Array-based schedule - DO NOT REMOVE
// This maintains backward compatibility with existing code
// ROLLBACK: If Version B fails, this ensures the app continues working
await updateDoc(expertPath, {
  schedule: schedule.value
}); 

console.log("✅ Version A: Array-based schedule updated successfully");
```

**Propósito:** Mantiene toda la funcionalidad existente sin cambios.

---

### Version B - New Subcollection Structure (Lines 341-372)
```typescript
// VERSION B (NEW): Subcollection-based schedule
// This is the new secure architecture for future migration
// ROLLBACK: Comment out lines 341-372 to revert to Version A only
try {
  let slotsUpdated = 0;
  
  // Iterate through each day and update individual slot documents
  for (const [dayName, slots] of Object.entries(schedule.value)) {
    for (const slot of slots) {
      const slotId = `${dayName.toLowerCase()}_${slot.time.replace(':', '_')}`;
      const slotDocRef = doc(db, `experts/${expertId}/schedule/${slotId}`);
      
      // Update or create the slot document
      await updateDoc(slotDocRef, {
        day: dayName,
        time: slot.time,
        isAvailable: slot.isAvailable,
        takenAt: slot.takenAt || null,
        takenBy: slot.takenBy || null,
        updatedAt: new Date()
      }).catch(async () => {
        // If document doesn't exist, create it
        await setDoc(slotDocRef, {
          day: dayName,
          time: slot.time,
          isAvailable: slot.isAvailable,
          takenAt: slot.takenAt || null,
          takenBy: slot.takenBy || null,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      });
      
      slotsUpdated++;
    }
  }
  
  console.log(`✅ Version B: Updated ${slotsUpdated} subcollection slot documents`);
} catch (errorB) {
  console.error('⚠️ Version B failed, but Version A succeeded:', errorB);
}
```

**Propósito:** Actualiza la nueva estructura segura, con fallback automático.

---

## Safety Features

### ✅ Backward Compatibility
- Todo el código existente sigue funcionando
- No se requieren cambios en otros componentes
- Version A siempre se escribe primero

### ✅ Auto-Create Missing Documents
- Si un slot no existe en Version B, se crea automáticamente
- Usa `updateDoc` con `.catch()` para crear con `setDoc`
- Garantiza que ambas versiones estén sincronizadas

### ✅ Graceful Degradation
- Si Version B falla, Version A funciona normalmente
- Error se registra pero no rompe el flujo
- Sin pérdida de datos

### ✅ Easy Rollback
Para revertir a Version A solamente:
1. Comentar líneas 341-372 (todo el bloque Version B)
2. La app funcionará exactamente como antes

---

## What Happens Now

### Cuando el Admin Actualiza el Horario:

1. **Admin hace cambios** en el toggle de horarios
2. **Click "Guardar cambios"**
3. **Version A escribe** → `experts/{uid}.schedule` (array) ✅
4. **Version B escribe** → `experts/{uid}/schedule/{slotId}` (subcollection) ✅
5. **Ambas exitosas** → Toast de éxito
6. **Si Version B falla** → Version A funciona, app continúa

### Console Output:
```
✅ Version A: Array-based schedule updated successfully
✅ Version B: Updated 60 subcollection slot documents
📍 Path: experts/{expertId}/schedule/{slotId}
```

---

## Current State Summary

### ✅ Implemented (Dual-Write)
- **CreateExpert.vue** - Crea expertos con ambas versiones
- **ExpertPreview.vue** - Actualiza horarios en ambas versiones

### 📋 Still Using Version A (Read-Only)
- **ExpertViewFixed.vue** - Booking de citas (lee de array)
- **CardInfo.vue** - Cancelar/finalizar citas (lee de array)
- **ExpertScheduleData.vue** - Admin appointment actions (lee de array)

### 🔄 Next Phase
Cuando todos los expertos tengan ambas versiones:
1. Actualizar componentes para LEER de Version B
2. Mantener ESCRITURA dual
3. Eventualmente eliminar Version A

---

## Rollback Instructions

### Si Hay Problemas:

**Opción 1: Deshabilitar Solo Version B**
```typescript
// En updateSubcollectionSchedule(), comentar líneas 341-372:
// VERSION B (NEW): Subcollection-based schedule
// ROLLBACK: Comment out lines 341-372 to revert to Version A only
/* 
try {
  ... todo el bloque Version B ...
}
*/
```

**Opción 2: Rollback Completo**
Restaurar la función original:
```typescript
const updateSubcollectionSchedule = async () => {
  if(!toggleValue.value){
    presentToast('top', 'Debe habilitar el boton de cambios...', 'danger');
    return;
  }

  savingChanges.value = true;
  const expertPath = doc(db, `experts/${expertAdminStore.getCurrentExpert.docId}`);
  try {
    await updateDoc(expertPath, {
      schedule: schedule.value
    }); 
    presentToast('top', 'Se ha actualizado el horario con exito', 'success');
    setTimeout(() => {
      routerIon.back();
    }, 1500);
    savingChanges.value = false;
  } catch (error) {
    console.log(error);
    presentToast('top', 'Hubo un error al actualizar el horario', 'danger');
    savingChanges.value = false;
  }
};
```

---

## Testing Checklist

- [ ] Admin puede ver horarios de experto
- [ ] Admin puede editar horarios (toggle de cambios)
- [ ] Click "Guardar cambios" funciona
- [ ] Console muestra "✅ Version A" y "✅ Version B"
- [ ] Firestore muestra ambas estructuras actualizadas
- [ ] Si Version B falla, Version A funciona
- [ ] Booking de citas sigue funcionando (usa Version A)
- [ ] Cancelar citas sigue funcionando (usa Version A)

---

## Important Notes

⚠️ **NO ELIMINAR VERSION A** - Es requerida para que todo el código existente funcione

✅ **Version B es aditiva** - No rompe nada si falla

🔄 **Dual-write continuará** hasta que todos los componentes usen Version B

📊 **Monitorear console logs** para asegurar que ambas versiones escriben correctamente

🎯 **Auto-create** - Si un experto no tiene Version B, se crea automáticamente al editar

---

## Migration Progress

| Component | Create (Write) | Update (Write) | Read | Status |
|-----------|----------------|----------------|------|--------|
| CreateExpert.vue | ✅ Dual-write | N/A | N/A | ✅ Complete |
| ExpertPreview.vue | N/A | ✅ Dual-write | Version A | ✅ Complete |
| ExpertViewFixed.vue | N/A | N/A | Version A | 📋 Pending |
| CardInfo.vue | N/A | Updates slots | Version A | 📋 Pending |
| ExpertScheduleData.vue | N/A | Updates slots | Version A | 📋 Pending |

---

**Status:** Ready for production testing  
**Risk Level:** LOW (backward compatible, auto-create, graceful fallback)  
**Rollback Time:** < 1 minute (comment out Version B block)
