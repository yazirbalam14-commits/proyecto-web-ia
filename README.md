# 🌀 Rick & Morty Explorer - Proyecto Web con IA

> **Proyecto Web Interactivo:** Aplicación web desarrollada con HTML5, CSS3 puro y JavaScript Vanilla, consumiendo en tiempo real la API pública de Rick and Morty.

---

## 👥 Integrantes del Equipo y Roles

| Integrante | Rol Principal | Responsabilidades en el Proyecto |
| :--- | :--- | :--- |
| **Yazir Antonio Balam Flores** *(Líder)*<br>GitHub: `Yazir-BF` | **Conexión de API & Manejo de Errores** | • Arquitectura de conexión asíncrona con `fetch()`.<br>• Manejo de promesas (`async/await`) y endpoints de la API.<br>• Detección y manejo del error HTTP **404** (personaje no encontrado) y errores de red en el bloque `try/catch`.<br>• Coordinación general del repositorio y despliegue en GitHub Pages. |
| **Yadier de Jesús Pech Tun** | **Estructura & Semántica HTML5** | • Maquetación semántica del archivo `index.html` (`<header>`, `<main>`, `<section>`, `<aside>`, `<footer>`).<br>• Estructura accesible para campos de búsqueda, filtros y cuadrícula de tarjetas.<br>• Creación del contenedor de feedback visual y drawer móvil de favoritos. |
| **Iván Alí Rodríguez Arceo** | **Diseño Frontend, CSS & Modo Oscuro** | • Estilos visuales puros en `style.css` con estética temática de Rick & Morty.<br>• Implementación de CSS Grid y Flexbox responsive (adaptable a celulares y computadoras).<br>• **Reto de Modificación:** Diseño de variables de color (`:root` y `[data-theme="light"]`) para alternar fluidamente entre Modo Oscuro y Modo Claro. |
| **Joan Alexis Sansores Anguas** | **Búsqueda, Filtros & LocalStorage** | • Lógica del buscador en tiempo real con temporizador (*debounce*) para optimizar peticiones.<br>• Lógica de filtros combinados por estado (*Alive, Dead, Unknown*) y especie.<br>• Implementación del sistema de **Favoritos** persistente con `localStorage` (agregar, quitar y sincronizar tarjetas). |

---

## 🌐 Enlaces del Proyecto
- **Repositorio en GitHub:** [https://github.com/Yazir-BF/proyecto-web-ia](https://github.com/Yazir-BF/proyecto-web-ia)
- **Aplicación en Vivo (GitHub Pages):** [https://Yazir-BF.github.io/proyecto-web-ia/](https://Yazir-BF.github.io/proyecto-web-ia/)

---

## 🛠️ Herramientas Utilizadas y Entorno de Desarrollo
En estricto cumplimiento con las normas establecidas para el desarrollo:
- **Plataforma y Editor:** Exclusivamente la interfaz y editor web de **GitHub** ([https://github.com](https://github.com)).
- **Inteligencia Artificial:** Asistencia técnica y formulación de prompts mediante **Claude Pro** (Anthropic) y **ChatGPT Plus** (OpenAI).
- **Pruebas y Ejecución:** Navegador web estándar para depuración en vivo e inspección del DOM.
- **Sin herramientas externas:** No se utilizaron editores de escritorio instalados ni plataformas de creación automática de sitios web.

---

## 📋 Descripción de la Aplicación
**Rick & Morty Explorer** es un explorador interactivo desarrollado para la materia de desarrollo web. Permite a los usuarios consultar y explorar personajes de la serie utilizando la API pública [https://rickandmortyapi.com/api/character](https://rickandmortyapi.com/api/character).

### Características Obligatorias Cumplidas:
1. **Sin Frameworks:** Construido exclusivamente con HTML5, CSS puro y JavaScript nativo.
2. **Consumo de API:** Carga dinámica mediante `fetch()` mostrando más de 10 elementos (20 por página) con imagen, nombre, estado, especie, origen y ubicación.
3. **Buscador en tiempo real:** Búsqueda predictiva con *debounce* de 450 ms que evita sobrecargar la API.
4. **Filtros Combinados:** Filtrado por estado de vida (*Alive, Dead, Unknown*) y especie.
5. **Sección de Favoritos con Persistencia:** Permite marcar/desmarcar personajes con el botón de estrella (★/☆), almacenando el array en `localStorage` para que no se pierdan al recargar.
6. **Manejo de Errores Visuales:** Al no encontrar personajes (código 404) o perder conexión a internet, se muestra un panel gráfico explicativo en la interfaz (sin depender de la consola).
7. **Diseño Responsive:** Adaptabilidad completa para smartphones, tablets y pantallas de escritorio.
8. **Reto Extra (Modo Oscuro / Modo Claro):** Botón interactivo que conmuta el tema visual y almacena la preferencia en `localStorage`.

---

## 🚀 Instrucciones para Publicar en GitHub Pages

1. **Crear el repositorio público:**
   - Ve a [GitHub](https://github.com) y crea un nuevo repositorio público llamado exacto: `proyecto-web-ia`.
2. **Subir los 4 archivos base:**
   - Asegúrate de que en la rama principal (`main`) estén los archivos: `index.html`, `style.css`, `script.js` y `README.md`.
3. **Activar GitHub Pages:**
   - En tu repositorio de GitHub, entra a la pestaña **Settings** (Configuración).
   - En el menú lateral izquierdo, selecciona **Pages**.
   - En la sección **Build and deployment**:
     - **Source:** `Deploy from a branch`.
     - **Branch:** `main` (o `master`) y directorio `/ (root)`.
     - Haz clic en el botón **Save**.
   - Espera de 1 a 2 minutos. En la parte superior de la sección Pages aparecerá el enlace activo: `https://Yazir-BF.github.io/proyecto-web-ia/`.

---

## 🤖 Sección Obligatoria de Inteligencia Artificial (Claude / ChatGPT)

### 1. Tres Prompts Clave Utilizados en el Desarrollo

- **Prompt 1 (Interfaz y Estructura - Yadier Pech Tun):**
  > *"Actúa como un desarrollador web experto. Crea los archivos `index.html` y `style.css` para un explorador interactivo de personajes usando la API de Rick and Morty. El diseño debe ser responsive. Incluye un campo de búsqueda por nombre, un menú desplegable para filtrar por estado (Alive, Dead, Unknown), una cuadrícula principal para mostrar tarjetas (con imagen, nombre y especie) y una sección lateral o inferior para 'Favoritos'. No uses frameworks, solo HTML5 y CSS puro."*

- **Prompt 2 (Conexión a la API y Errores - Yazir Balam Flores):**
  > *"Crea el archivo `script.js`. Usa `fetch()` para conectarte a `https://rickandmortyapi.com/api/character` y obtener los datos. Renderiza los primeros personajes en la cuadrícula del HTML, mostrando su imagen y descripción. Incluye un bloque `try/catch` para mostrar un mensaje claro de error en la pantalla de la interfaz (no en consola) si la API falla o no hay internet."*

- **Prompt 3 (Favoritos y LocalStorage - Joan Sansores Anguas):**
  > *"Implementa la sección de favoritos. Cada tarjeta de personaje debe tener un botón interactivo. Al presionarlo, el objeto del personaje debe guardarse en un array utilizando `localStorage` y renderizarse en la sección de favoritos. Al recargar la pestaña del navegador, la lista de favoritos debe recuperarse del `localStorage` y mostrarse intacta."*

---

### 2. Respuesta de la IA que Requirió Correcciones
**Situación:**  
En la primera versión propuesta por la IA para la gestión de favoritos, al presionar la estrella de una tarjeta el personaje se insertaba en el array sin comprobar si ya existía previamente, lo cual permitía duplicar el mismo personaje indefinidamente en el panel lateral. Además, la clase activa de la tarjeta (`.is-favorite`) se perdía cuando el usuario navegaba a la página siguiente o realizaba una búsqueda.

**Corrección implementada:**  
Implementamos la función `toggleFavorite()` utilizando `findIndex()` para verificar si el personaje ya está guardado: si existe, se elimina; si no existe, se añade. Además, creamos la función `syncCardFavoriteButtons()` que recorre el DOM de las tarjetas activas y sincroniza sus estados visuales con los datos guardados en `localStorage`.

---

### 3. Error Encontrado y Cómo lo Resolvieron
**Error:**  
Al escribir en el buscador un término inexistente (por ejemplo, `"personaje999"`), la consola mostraba una excepción y la aplicación se detenía con un mensaje de fallo crítico del servidor. Esto sucedía porque la API de Rick and Morty no devuelve una lista vacía `[]` cuando no hay coincidencias, sino una respuesta HTTP con código **404 Not Found** conteniendo `{ "error": "There is nothing here" }`.

**Solución aplicada:**  
Interceptamos la respuesta HTTP antes de procesarla como JSON:
```javascript
if (response.status === 404) {
  handleNoResults(); // Muestra el mensaje gráfico amigable "No se encontraron resultados"
  return;
}
```
Esto permitió que la interfaz responda amigablemente sin romper la ejecución del código.

---

### 4. Modificación Realizada al Código (Reto de Modificación)
**Funcionalidad:** Modo Oscuro y Modo Claro con memoria en el navegador (Iván Rodríguez Arceo).

**Explicación técnica:**  
- **CSS:** Se declararon variables en `:root` (Modo Oscuro con tonos `#0b0f19`, bordes con brillo verde portal `#00ff9d`) y reglas específicas bajo el selector `[data-theme="light"]` (Modo Claro con fondos `#f1f5f9` y acentos suaves).
- **JavaScript:** Se programó la función `toggleTheme()` que alterna el atributo `data-theme` en la etiqueta `<html>`.
- **Persistencia:** Con cada cambio, el valor (`'dark'` o `'light'`) se almacena mediante `localStorage.setItem('rm_theme', theme)`. Cuando el usuario regresa al sitio o recarga la página, `initTheme()` lee ese valor para restaurar el tema seleccionado de forma automática.

---

### 5. Reflexión sobre qué Aprendimos Utilizando IA
A través de este proyecto aprendimos que la Inteligencia Artificial (Claude / ChatGPT) es un multiplicador de productividad muy valioso para estructurar proyectos web rápidamente y aprender conceptos técnicos. Sin embargo, requiere supervisión constante:
- La IA puede producir soluciones genéricas que no contemplan casos límite (como el error 404 de una API o la sincronización de estado de la interfaz).
- Es indispensable comprender la lógica subyacente de cada función (`fetch`, eventos del DOM, promesas asíncronas) para poder auditar el código, corregirlo y defenderlo con criterio profesional.

---

## 🎓 Guía para la Presentación y Evaluación Oral

El profesor elegirá al azar a cualquier integrante para responder las siguientes preguntas. Cada integrante debe conocer la respuesta técnica:

### 1. ¿Qué función cumple `fetch()` dentro de su aplicación? *(Especialidad: Yazir Balam)*
`fetch()` es la función nativa de JavaScript para realizar peticiones HTTP asíncronas hacia servidores web externos. En nuestro proyecto, solicita los datos a la API de Rick and Morty en formato JSON sin necesidad de recargar la página web, gestionando las promesas mediante `async/await`.

### 2. ¿Qué diferencia existe entre HTML, CSS y JavaScript? *(Especialidad: Yadier Pech)*
- **HTML:** Es el lenguaje de marcado que define la **estructura y semántica** del documento (títulos, campos de texto, botones y cuadrículas).
- **CSS:** Es el lenguaje de hojas de estilo encargado de la **presentación visual y diseño** (colores, fuentes, sombras, cuadrícula responsive y temas claro/oscuro).
- **JavaScript:** Es el lenguaje de programación que provee el **comportamiento dinámico** (consultar la API, reaccionar a clics, filtrar datos y guardar en `localStorage`).

### 3. ¿Cómo funciona el buscador que desarrollaron? *(Especialidad: Joan Sansores)*
El buscador escucha el evento `input` en el campo de texto. Incorpora un temporizador (*debounce*) de 450 ms para esperar a que el usuario termine de escribir antes de enviar la petición. Luego construye la URL agregando el parámetro `?name=termino` mediante `URLSearchParams` para que la API filtre los datos en su servidor y nos devuelva únicamente los resultados coincidentes.

### 4. ¿Qué sucede cuando la API no responde? *(Especialidad: Yazir Balam)*
Si la API no responde por caída del servidor o si el usuario pierde su conexión a internet, la promesa de `fetch()` es rechazada y el control pasa al bloque `catch (error)`. En lugar de que la aplicación quede bloqueada o silenciosa, la función `handleNetworkError()` despliega en pantalla un panel visual con un icono de advertencia, el motivo del fallo y un botón interactivo para *"Reintentar conexión"*.

### 5. ¿Qué parte del código fue generada por la IA y qué modificaciones realizaron ustedes? *(Especialidad: Iván Rodríguez)*
Utilizamos la asistencia de Claude Pro / ChatGPT Plus directamente desde el navegador para apoyarnos en la estructura inicial. Las modificaciones manuales que nosotros programamos y afinamos en el editor web de GitHub fueron:
- El manejo selectivo del código 404 para diferenciar *"sin resultados"* de un error de servidor.
- La técnica de *debounce* para optimizar la red en el buscador.
- La lógica de alternancia (*toggle*) y persistencia de favoritos sin duplicados.
- Todo el reto del Modo Oscuro/Claro con variables CSS dinámicas y almacenamiento en `localStorage`.

### 6. ¿Cómo publicaron su aplicación mediante GitHub Pages? *(Especialidad: Yadier Pech / Yazir Balam)*
Subimos los 4 archivos al repositorio público en GitHub. Luego fuimos a **Settings > Pages**, seleccionamos la rama `main` en la carpeta `/ (root)` y guardamos. GitHub ejecutó un flujo de despliegue automatizado que sirvió los archivos estáticos bajo un certificado HTTPS en `https://Yazir-BF.github.io/proyecto-web-ia/`.

---

## 🛠️ Estructura de Trabajo en Git (Requisitos de la Rúbrica)

Para cumplir con el requisito de al menos **6 commits**, **2 Issues** y **1 Pull Request**:

### Plan de Commits Registrado:
1. `feat(html): crear estructura semantica de index.html y layout base` (Yadier Pech)
2. `feat(css): agregar diseño visual responsive y estilos de tarjetas` (Iván Rodríguez)
3. `feat(api): implementar conexion fetch a API y manejo de errores con try/catch` (Yazir Balam)
4. `feat(search): implementar buscador con debounce y filtros por estado` (Joan Sansores)
5. `feat(favorites): agregar sistema de favoritos con persistencia en localStorage` (Joan Sansores)
6. `feat(theme): incorporar reto de alternador de modo oscuro y claro` (Iván Rodríguez)
7. `docs: completar documentacion README con seccion de IA y roles de equipo` (Yazir Balam)

### Issues a Registrar en GitHub:
- **Issue #1:** *"Capturar respuesta 404 de la API cuando la búsqueda no coincide con ningún personaje."* (Asignado a: Yazir Balam)
- **Issue #2:** *"Persistir la preferencia de Modo Oscuro del usuario entre recargas de página."* (Asignado a: Iván Rodríguez)

### Pull Request Recomendado:
- Rama secundaria: `feature/modo-oscuro`.
- Título del Pull Request hacia `main`: *"Agregar reto de Modo Oscuro / Claro con variables CSS y localStorage"*.
