## Deploy a Namecheap (cPanel) — Blue Code

Tu sitio listo para subir está en la carpeta `dist/`.

### Opción A: File Manager (más fácil)
1. Entra a Namecheap → **cPanel** → **File Manager**
2. Abre `public_html/` (o la carpeta del dominio/subdominio)
3. Sube **TODO el contenido dentro de `dist/`**:
   - `index.html`
   - `css/`
   - `js/`
   - `assets/`
   - `404.html`
   - `.htaccess` (opcional pero recomendado)
4. Verifica que `public_html/index.html` exista.

### Opción B: ZIP (recomendado)
1. Comprime el contenido de `dist/` en un `.zip`
2. Sube el zip a `public_html/`
3. En File Manager → clic derecho → **Extract**

### Notas
- `bluecode-web/contex/` no se incluye en `dist/` (queda fuera del deploy).
- Si ya tenías otro sitio en `public_html/`, haz backup antes (o renombra la carpeta actual).


