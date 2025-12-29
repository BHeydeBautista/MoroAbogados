# Studio Gallery Components

Componentes modularizados para la galería del estudio con efectos 3D y animaciones visuales.

## Estructura

```
src/components/About/
├── StudioGallery.tsx          # Componente principal
└── gallery/
    ├── Card3D.tsx             # Tarjeta individual para carrusel 3D
    ├── AutoThreeDCarousel.tsx # Carrusel 3D automático (NUEVO)
    ├── SimpleCarousel.tsx     # Carrusel automático con efecto slide (legacy)
    ├── ThreeDCarousel.tsx     # Carrusel 3D interactivo (legacy)
    ├── GalleryGrid.tsx        # Grilla paginada de imágenes mejorada
    ├── GalleryModal.tsx       # Modal elegante para ver imágenes ampliadas
    └── GalleryPaginator.tsx   # Paginador mejorado con estilos
```

## Componentes

### StudioGallery (Principal)
Orquestador de toda la galería:
- Maneja estado global (página, imagen seleccionada)
- Todas las imágenes en carrusel 3D automático
- Grilla paginada (8 por página)
- Modal con navegación

### AutoThreeDCarousel (NUEVO)
Carrusel 3D automático que muestra **TODAS las imágenes**:
- Rotación continua sin pausas (0.5°/frame)
- Distribución circular en 3D (360°)
- Visualmente impactante y elegante
- Sin interacción del usuario (puramente automático)
- Perspective 3D suave

**Props:**
- `images`: Array de todas las imágenes

### GalleryGrid (Mejorado)
Grilla visual mejorada:
- Animaciones de entrada (stagger effect)
- Efecto 3D preserve-3d
- Overlay con gradiente en hover
- Sombras dinámicas
- Bordes redondeados (rounded-2xl)
- Escala suave en hover

**Features:**
- Título "Galería Completa" con línea dorada
- Responsive: 1 col (mobile), 2 col (tablet), 3-4 col (desktop)
- Animaciones entrada con delay

### GalleryModal (Mejorado)
Modal elegante para ver imágenes:
- Fondo oscuro premium (90%) con backdrop blur
- Botones con estilos mejorados y bordes
- Bordes redondeados grandes (rounded-3xl)
- Contador elegante con color dorado
- Barra de progreso animada
- Transiciones suaves

**Features:**
- Botones con escala y hover efectos
- Barra de progreso del 0-100%
- Backdrop blur mejorado (md vs sm)
- Bordes semitransparentes en botones

### GalleryPaginator (Mejorado)
Paginador elegante y funcional:
- Muestra máximo 5 números (adaptable)
- Botones chevron (< >) reutilizables
- Números activos con color dorado
- Transiciones y animaciones
- Info "Página X de Y"
- Hover effects en botones

**Features:**
- Números inteligentes (muestra "..." si hay más)
- Estados deshabilitados suaves
- Animaciones con Framer Motion
- Responsive con gap dinámico

### Card3D
Tarjeta base 3D:
- Fallback para imágenes rotas
- Transform 3D preserve-3d
- Estilos de shadow y border

### SimpleCarousel (Legacy)
Carrusel slide automático con 3 imágenes (opción alternativa).

### ThreeDCarousel (Legacy)
Carrusel 3D interactivo con drag/touch (opción alternativa).

## Características Principales

✅ **Carrusel 3D automático con TODAS las imágenes**
✅ **Animaciones suaves y elegantes**
✅ **Efectos 3D en grilla y modales**
✅ **Modal mejorado con barra de progreso**
✅ **Paginador inteligente**
✅ **Responsive y mobile-friendly**
✅ **Sin límite de imágenes**
✅ **Componentes reutilizables y mantenibles**

## Uso

```tsx
<StudioGallery />
```

## Paleta de Colores

- **Primario**: `#0F1C2E` (azul oscuro)
- **Acento**: `#D4A75D` (dorado)
- **Secundario**: `#E5C081` (dorado claro)
- **Fondos**: `white/10` a `black/90` (gradientes)

## Notas Técnicas

- **Framework**: Framer Motion para animaciones
- **Images**: Next.js Image component optimizado
- **CSS**: Tailwind CSS 3D transforms y perspectiva
- **TypeScript**: Type-safe en todos los componentes
- **Performance**: Lazy loading, priority images en modal
