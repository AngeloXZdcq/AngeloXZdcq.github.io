# Portafolio de Medicina · Angel Daniel Cueva Quispe

Sitio web estático (HTML + CSS + JavaScript) para registrar informes, videos, simuladores, esquemas, casos clínicos y flashcards.
Se publica gratis con **GitHub Pages** en: `https://angeloxzdcq.github.io/`

## Estructura

```
index.html          Inicio (prácticas, cursos y material reciente)
curso.html          Página de cada curso         (curso.html?c=bioquimica)
practica.html       Página de cada práctica      (practica.html?id=bq-p08)
biblioteca.html     Todo el material con filtros y buscador
repaso.html         Flashcards y casos de todas las prácticas
registrar.html      Formulario que genera la entrada para el catálogo
data/catalogo.js    ← AQUÍ SE REGISTRA TODO (cursos, prácticas, materiales)
data/contenido.js   Casos clínicos y flashcards por tema
material/           Archivos: informes, fotos, esquemas, videos (por curso y práctica)
assets/             Estilos, código y logos
```

## Cómo agregar material

1. Sube el archivo a `material/<curso>/<práctica>/` (botón **Add file → Upload files** en GitHub).
   Límite por archivo al subir desde el navegador: **25 MB**. Los videos largos van mejor en YouTube (no listado).
2. Abre `registrar.html` en tu sitio, llena el formulario y copia la entrada.
3. En GitHub abre `data/catalogo.js`, pulsa el lápiz (**Edit**), pega la entrada dentro de `materiales: [ ... ]` y guarda con **Commit changes**.
4. En 1–2 minutos el sitio se actualiza solo.

Para usar un video de YouTube en una práctica, copia su código (lo que va después de `v=` o de `youtu.be/`)
en el campo `video.youtube` de esa práctica dentro de `catalogo.js`.

## Privacidad

Los resultados de laboratorio de compañeros se muestran anonimizados (V1, V2…). No subir nombres junto a datos de salud
ni fotos con rostros sin permiso.
