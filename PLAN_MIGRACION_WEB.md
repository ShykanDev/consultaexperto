# Plan de Migración: Ionic a Web (Vue Standard) - VERSION PRO

Este documento detalla la estrategia para convertir el proyecto actual de Ionic/Vue a una aplicación Web estándar (Vue 3 + Tailwind/CSS) optimizando el uso de créditos de IA mediante automatización.

## 1. Justificación de Ahorro de Créditos
Realizar esta migración mediante prompts manuales consumiría miles de créditos. Esta estrategia ahorra entre un 60% y 70% de créditos mediante:
*   **Scripts de Reemplazo Masivo**: Usar scripts locales para el 90% de la limpieza.
*   **IA para Casos Complejos**: Usar la IA solo para refactorizar lógica de navegación y modales.

## 2. Refuerzos de Seguridad (Mejoras Pro)

### A. Mapeo de Atributos Inteligente
El script de limpieza no solo cambiará etiquetas, sino que convertirá atributos de Ionic a clases de Tailwind equivalentes:
*   `color="primary"` -> `bg-blue-600 text-white` / `text-blue-600`
*   `fill="clear"` -> `bg-transparent border-none shadow-none`
*   `expand="block"` -> `w-full`
*   `slot="end/start"` -> `flex order-last/first`

### B. Gestión de Iconos (IonIcons)
Para no romper la visual, se mantendrá `ionicons` pero de forma desacoplada:
1.  Instalar `@ion-icons/vue` o simplemente usar los iconos de Ionic como componentes SVG puros.
2.  Mapeo masivo de `<ion-icon :icon="name" />` a un componente de icono estándar.

### C. Variables de CSS y Branding
Para evitar que la app se vea "rota" al quitar Ionic:
1.  Crear `src/assets/styles/ionic-compat.css` con las variables base (`--ion-color-primary`, `--ion-font-family`).
2.  Importarlo en `main.ts` para que los estilos antiguos que aún usen estas variables sigan funcionando.

## 3. Pasos de la Migración

### Fase 1: Limpieza Estructural Automática (Créditos: 0)
Ejecutar el script `migrate-tags.js`. Este script realizará:
1.  **Tag Wrapping**: Reemplazo de etiquetas estructurales (`ion-page`, `ion-content`, `ion-card`).
2.  **Attribute Stripping**: Purga de atributos propietarios de Ionic.
3.  **Import Cleanup**: Eliminación de las líneas `import { ... } from '@ionic/vue'`.

### Fase 2: Refactorización de Ciclos de Vida (Créditos: Bajos)
*   `onIonViewDidEnter` -> `onMounted`
*   `onIonViewDidLeave` -> `onUnmounted`

### Fase 3: Ecosistema (Navegación y Router)
1.  **Router**: Cambiar de `@ionic/vue-router` a `vue-router` estándar.
2.  **Breadcrumbs/Navigation**: Las barras de navegación superiores (`ion-toolbar`) se convierten en componentes funcionales de Vue.

### Fase 4: Componentes Interactivos (IA Requerida)
Aquí es donde entra la IA para asegurar que nada falle:
*   **Modales**: Migrar la lógica de `isOpenModal` a una implementación de modal nativa/Tailwind.
*   **Toasts**: Crear un plugin de Vue ligero para notificaciones.

## 4. Script de Automatización (Inyectable)
```javascript
// Este script se debe ejecutar en la raíz del proyecto clonado
const fs = require('fs');
const glob = require('glob');

const replacements = [
  { from: /<ion-page/g, to: '<div class="web-page"' },
  { from: /<\/ion-page>/g, to: '</div>' },
  { from: /<ion-content/g, to: '<main class="web-content overflow-y-auto"' },
  { from: /<\/ion-content>/g, to: '</main>' },
  { from: /<ion-button/g, to: '<button class="web-btn"' },
  { from: /<\/ion-button>/g, to: '</button>' },
  { from: /<ion-card/g, to: '<div class="web-card bg-white shadow rounded-xl"' },
  { from: /<\/ion-card>/g, to: '</div>' }
];

// Lógica de limpieza masiva aquí...
```

## 5. Limpieza de Dependencias
1.  `npm uninstall @ionic/vue @ionic/vue-router @ionic/core`
2.  `npm install vue-router@4 lucide-vue-next` (opcional para iconos)
