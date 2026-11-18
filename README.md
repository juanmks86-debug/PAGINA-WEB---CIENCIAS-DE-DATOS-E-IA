# Carrera de Ciencia de Datos e IA

Sitio web oficial de la **Tecnicatura Superior en Ciencias de Datos e Inteligencia Artificial** del **IES N.º 6 – Sede Perico (Jujuy)**.

🌐 **Web publicada:** https://ciencias-e-ia.vercel.app
🤖 **Chatbot Andresito:** https://andresito-seven.vercel.app ([repositorio](https://github.com/juanmks86-debug/Andresito))

## ¿Qué incluye?

- Información de la carrera: perfil profesional, objetivos, campo laboral y aptitudes (cards con ventana emergente)
- Preguntas frecuentes e inscripción (https://nexo.jujuy.edu.ar/)
- Próximos eventos y carrusel de **Noticias IA**
- Plan de estudio en PDF y materiales por año
- Contacto (teléfono, correo, WhatsApp), redes sociales y mapa de ubicación
- Sección "Creadores" interactiva con el equipo por categorías
- Modo oscuro y animaciones suaves al hacer scroll
- Vista previa (Open Graph) para compartir en WhatsApp y Facebook

## Tecnologías

- [React 18](https://react.dev/)
- [Vite 5](https://vitejs.dev/)
- Despliegue en [Vercel](https://vercel.com/)

## Cómo ejecutarlo

Requiere [Node.js](https://nodejs.org/) 18 o superior.

```bash
npm install
npm run dev      # desarrollo (http://localhost:5173)
npm run build    # versión para publicar (carpeta dist/)
npm run preview  # probar localmente la versión compilada
```

## Estructura del proyecto

```
├── public/              # Archivos estáticos (imágenes, PDF, favicon, og-image)
│   ├── equipo/          # Fotos del equipo creador
│   ├── eventos/         # Flyers de eventos
│   └── materiales/      # Materiales por año
├── src/
│   ├── components/      # Componentes (ej: StudentsView.jsx)
│   ├── App.jsx          # Componente principal
│   ├── data.js          # Todo el contenido editable de la página
│   ├── main.jsx         # Punto de entrada
│   └── styles.css       # Estilos
├── index.html
├── vercel.json
└── vite.config.js
```

## Cómo editar el contenido

Casi todo se cambia en **`src/data.js`**, sin tocar el código de la página:

| Qué querés cambiar | Dónde |
| --- | --- |
| Textos, fechas y preguntas frecuentes | `src/data.js` |
| Noticias IA (cada tarjeta lleva fuente y `enlace`) | `noticias` en `src/data.js` |
| Equipo creador (hasta 4 integrantes por categoría, con nombre, rol, descripción y foto) | `equipos` en `src/data.js` |
| Fotos del equipo | `public/equipo/` (ej: `foto: '/equipo/ana.jpg'`; si queda vacío se muestran las iniciales) |
| Mapa | `MAPS_LINK` (abre Google Maps) y `MAP_EMBED` (mapa incrustado del pie) |
| Plan de estudio | Reemplazar `public/plan-de-estudio.pdf` (mismo nombre) |
| Imágenes de los proyectos | Colocarlas en `public/` con el nombre que figura en `data.js` |

## Despliegue

El sitio se publica automáticamente en Vercel con cada `push` a la rama `main`.

## Autoría

Proyecto desarrollado por estudiantes de la Tecnicatura Superior en Ciencias de Datos e IA del IES N.º 6 – Perico, Jujuy.
