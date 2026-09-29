Esta carpeta guarda las imágenes del sitio.

Contenido actual (demo):
  galeria-01.jpg ... galeria-08.jpg  → las 8 fotos de la galería
  og.jpg                              → imagen para compartir en redes (1200x630)

Las fotos vienen de Unsplash (licencia de uso libre) y están descargadas
localmente a propósito: si el sitio dependiera de las URLs de Unsplash, un
cambio del lado de ellos rompería la galería. Con las imágenes en el repo,
la web funciona siempre y carga más rápido.

Cuando el cliente tenga fotos reales:
  1. Nombrarlas en minúsculas y sin espacios: corte-01.jpg, corte-02.jpg, ...
  2. Copiarlas acá
  3. En index.html, cambiar el data-src de cada <li class="gallery__item">
  4. Actualizar el texto alt de cada imagen para describir la foto nueva

Optimización (importante para no perder puntos en Lighthouse):
  - Exportar a .webp: pesa ~30% menos que .jpg con la misma calidad
  - Ancho máximo 800px: en celular la foto se muestra a 150-250px
  - Mantener cada foto por debajo de 60 KB
  - Ideal: 4 fotos para móvil (~400px) y 4 para escritorio (~800px),
    usando srcset para que cada dispositivo descargue la suya

Herramientas gratuitas: squoosh.app, tinypng.com o cwebp por línea de comandos.
