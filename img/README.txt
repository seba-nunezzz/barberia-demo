Esta carpeta guarda las imágenes propias del local (logo, fotos reales del salón, favicon).

En la demo se usan fotos de placeholder de Unsplash cargadas por URL,
por eso la carpeta va vacía. Cuando el cliente tenga fotos reales:

1. Nombrarlas en minúsculas y sin espacios, ej: `corte-01.jpg`
2. Copiarlas acá
3. En index.html, cambiar `data-src` / `src` por la ruta local: `img/corte-01.jpg`
4. Optimizarlas antes de subirlas (idealmente < 150 KB cada una)
   para que la web siga cargando rápido desde el celular.

Recomendación: exportá en formato .webp y generá un tamaño chico
(ancho ~800px) para mobile y uno grande (~1600px) para escritorio.
