# 💈 Don Ramón Barbershop — Landing page

Landing page de una sola página para una barbería ficticia de Montevideo, pensada como
**demo de portfolio** para ofrecer sitios web a negocios locales.

- **Demo publicada:** <https://seba-nunezzz.github.io/barberia-demo/>
- **Contacto de la demo (ficticio):** +598 94 123 456
- **Diseño:** oscuro y elegante con detalles dorados

---

## 📸 Capturas

| Hero | Servicios | Galería |
| --- | --- | --- |
| ![Hero](https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=400&q=60) | ![Servicios](https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=400&q=60) | ![Galería](https://images.unsplash.com/photo-1672257493395-c6cb634397e2?auto=format&fit=crop&w=400&q=60) |

## 🛠 Tecnologías

- **HTML5** semántico (`header`, `nav`, `main`, `section`, `address`, `blockquote`, `footer`)
- **CSS3** con custom properties, Grid, Flexbox y mobile-first
- **JavaScript vanilla** (ES6+, sin dependencias ni build)
- **Google Fonts:** Playfair Display + Inter (2 tipografías, máximo permitido)
- **GitHub Pages** para publicar

No hay build, ni bundler, ni `npm install`. El sitio son 3 archivos.

## ✨ Funcionalidades

- Header fijo con menú hamburguesa en celular (accesible: `aria-expanded`, cierre con `Esc`)
- Hero con botón grande de **reservar por WhatsApp**
- Servicios y precios en pesos uruguayos, cada uno con su propio link de WhatsApp precargado
- Galería de 8 fotos con **lazy loading** (`IntersectionObserver`) y fundido al cargar.
  Las imágenes están **descargadas en `/img`**, no enlutadas a un CDN externo: si
  Unsplash (o cualquier proveedor) cambia un link, la galería sigue funcionando.
- Mapa de Google Maps embebido (sin API key)
- Animaciones de **fade-in al hacer scroll**, desactivadas con `prefers-reduced-motion`
- SEO básico: `title`, `description`, canonical, **Open Graph**, Twitter Card y datos estructurados `HairSalon` (JSON-LD)
- Imágenes con `alt`, `width`/`height` y `loading="lazy"`

## 📁 Estructura

```
barberia-demo/
├── index.html   # toda la estructura y el contenido
├── style.css    # estilos, con el bloque de variables al principio
├── script.js    # menú, WhatsApp, lazy loading, animaciones
├── img/         # fotos de la galería y la imagen para redes (361 KB en total)
├── README.md
├── .gitignore
└── .gitattributes
```

## 🚀 Cómo correrlo localmente

No requiere instalar nada. Elegí una de estas opciones:

**Opción A — Abrir el archivo**

```
index.html
```

Doble click y listo. Funciona perfecto para probar el diseño.

**Opción B — Servidor local (recomendado)**

Con Python:

```bash
python -m http.server 8000
```

Con Node.js:

```bash
npx serve .
```

Después abrí <http://localhost:8000>.

> Importante: el número de WhatsApp, los precios, las reseñas y los datos del local
> son **ficticios** (esta es una demo de portfolio). Antes de entregarla a un cliente
> hay que reemplazarlos por datos reales. **Nunca publiques reseñas inventadas como
> si fueran de clientes reales.**

## 🚀 Publicar en GitHub Pages

```bash
gh repo create barberia-demo --public --source=. --remote=origin --push
gh api -X POST repos/{owner}/barberia-demo/pages -f "source[branch]=main" -f "source[path]=/"
```

O desde la web: **Settings → Pages → Source: `main` / `/ (root)` → Save**.

La web queda online en `https://<tu-usuario>.github.io/barberia-demo/` en 1-2 minutos.

## 🎨 Personalizar para otro cliente

| Qué cambiar | Dónde |
| --- | --- |
| Colores, tipografías, ancho | Bloque `:root` al principio de `style.css` |
| Número de WhatsApp | Constante `WHATSAPP_NUMBER` en `script.js` |
| Textos, precios, horarios | `index.html` |
| Fotos | `img/` + el `data-src` de cada `<li class="gallery__item">` (ver `img/README.txt`) |
| Mapa | `src` del `<iframe>` en la sección de Ubicación |
| Foto para compartir en redes | `img/og.jpg` (1200x630) |

Los colores, el tipo de letra y el ancho están todos en variables CSS por eso
cambiar la estética completa del sitio es editar diez líneas.

## 🤔 Por qué lo hice

Este proyecto es una **demo de portfolio** con la que quiero ofrecer páginas web a
negocios locales: barberías, peluquerías, gimnasios, talleres y cafeterías.

La mayoría de los negocios chicos que conozco tienen el mismo problema:

1. **No tienen web**, o tienen una de 2010 hecha en algún constructor y abandonada.
2. **No reservan**: contestan WhatsApp a mano, pierden turnos y a veces clientes.
3. **No saben cuánto cuesta** una web ni cuánto tarda, así que no la piden.

Esta landing muestra, en una sola pantalla, lo que un local necesita de verdad:
**qué hace, cuánto cuesta, dónde está y cómo reservar en un toque**. Todo eso
apuntando a un botón de WhatsApp, que es por donde ya entran sus clientes hoy.

Elegí una barbería porque es un negocio fácil de mostrar (fotogénico, clientele joven,
reserva por WhatsApp) y porque el estilo oscuro con dorado funciona muy bien como
plantilla: se cambia el color y sirve para un restaurante, un gimnasio o un taller.

También sirve como **base reutilizable**: con cambiar el bloque de variables CSS y
los textos, sale una web nueva para el siguiente cliente sin volver a programar nada.

## 📄 Licencia

MIT. Las fotos de la demo son de [Unsplash](https://unsplash.com) y se usan bajo su
licencia de uso libre: son **placeholders**, reemplazarlas por fotos reales del local
antes de entregar el sitio a un cliente.
