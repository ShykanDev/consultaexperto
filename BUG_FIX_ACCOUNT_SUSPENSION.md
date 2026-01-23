# 🐛 Fix: Account Suspension Redirect Bug

## Problema
El usuario reportó que a veces era redirigido a `/account-suspended` incluso cuando no estaba baneado según la base de datos.

## Causa Raíz
El router guard estaba verificando el estado de suspensión usando **dos fuentes de datos**:
1. `authStore.getUserData?.isBanned` - ✅ Datos del usuario logueado
2. `expertStore.getExpertData?.isSuspended` - ❌ Datos del experto siendo visualizado

### El flujo problemático:
1. Un **cliente** (no baneado) inicia sesión
2. El cliente navega a `/expert-info-fixed` para ver el perfil de un experto
3. `ExpertViewFixed.vue` cargaba los datos del experto en `expertStore` global
4. Si ese experto estaba suspendido, `expertStore.getExpertData.isSuspended = true`
5. El router guard verificaba `expertStore.getExpertData?.isSuspended`
6. ❌ El cliente era redirigido a `/account-suspended` incorrectamente

## Solución Implementada

### 1. Router Guard (`src/router/index.ts`)
**Antes:**
```typescript
const isBannedUser = authStorePinia.getUserData?.isBanned ?? false;
const isBannedExpert = expertStorePinia.getExpertData?.isSuspended ?? false;

if (isAuth && (isBannedUser || isBannedExpert) && requiresAuth) {
  return next({ path: "/account-suspended" });
}
```

**Después:**
```typescript
const isBannedOrSuspended = (
  authStorePinia.getUserData?.isBanned || 
  authStorePinia.getUserData?.isSuspended
) ?? false;

if (isAuth && isBannedOrSuspended && requiresAuth) {
  console.log('[Router Guard] ⚠️ Redirecting to account-suspended');
  return next({ path: "/account-suspended" });
}
```

### 2. ExpertViewFixed.vue
**Antes:**
```typescript
expertData.value = snapshot.data() as IExpert;
expertStore().setExpertData(expertData.value); // ❌ Contamina el estado global
verifyUserHasSlotsTaken();
```

**Después:**
```typescript
expertData.value = snapshot.data() as IExpert;
// ✅ Solo usa variable local, no contamina expertStore
verifyUserHasSlotsTaken();
```

### 3. ExpertListModern.vue
- Eliminada verificación redundante de suspensión
- Ya manejada por router guard y App.vue

## Arquitectura de Stores

### `authStore` - Datos del usuario logueado
- ✅ Contiene `userData` con campos `isBanned` y `isSuspended`
- ✅ Se actualiza vía `onSnapshot` cuando el usuario inicia sesión
- ✅ Usado para verificar permisos del usuario actual

### `expertStore` - Datos del experto logueado (solo si es experto)
- ✅ Solo debe poblarse cuando el usuario logueado ES un experto
- ❌ NO debe usarse para almacenar datos de expertos que el cliente está viendo
- ✅ Usado en `ExpertView.vue` (vista de citas del experto)
- ❌ Ya no usado en `ExpertViewFixed.vue` (vista de perfil para clientes)

## Verificación
Para verificar que el fix funciona:
1. Inicia sesión como cliente (no baneado)
2. Navega a ver el perfil de un experto suspendido
3. ✅ No deberías ser redirigido a `/account-suspended`
4. Verifica los logs en consola: `[Router Guard]` debe mostrar `isSuspended: false`

## Logs de Debug
Agregados logs temporales en el router guard para debugging:
```typescript
console.log('[Router Guard]', {
  to: to.path,
  from: from.path,
  isAuth,
  isBanned: authStorePinia.getUserData?.isBanned,
  isSuspended: authStorePinia.getUserData?.isSuspended,
  isBannedOrSuspended,
  isClient: authStorePinia.getIsClient,
  isExpert: authStorePinia.getIsExpert
});
```

Estos logs pueden removerse una vez confirmado que el bug está resuelto.
