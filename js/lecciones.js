// Capitulos y lecciones del Taller NSQK.
// Cada leccion tiene: explicacion (teoria), donde lo vimos (referencias), la tarea,
// el codigo con el que empieza (inicial), una solucion (la meta) y una revision automatica.

// Muestra codigo como texto dentro de la explicacion
function bloque(texto) {
    return "<pre><code>" + texto.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") + "</code></pre>";
}

const ENCI = "Enciclopedia_Abimael → ";

window.CAPITULOS = [
    { numero: 0, titulo: "Antes de empezar", archivo: "todo el proyecto", meta: "index.html", descripcion: "Rutas, el atributo alt y cómo subir tu parte a GitHub." },
    { numero: 1, titulo: "Inicio", archivo: "index.html + js/canciones.js", meta: "index.html", descripcion: "Header que se pega, video, posicionar con píxeles, la paleta, grid responsivo y tu primer botón con JS." },
    { numero: 2, titulo: "Biografía", archivo: "html/biografia.html", meta: "html/biografia.html", descripcion: "Títulos en orden y la tabla de la línea de tiempo." },
    { numero: 3, titulo: "Discografía", archivo: "html/discografia.html", meta: "html/discografia.html", descripcion: "Tarjetas con efecto al pasar el mouse y la banda con video de fondo." },
    { numero: 4, titulo: "Tour", archivo: "html/tour.html + js/tour.js", meta: "html/tour.html", descripcion: "El catálogo interactivo que pide la actividad: arreglo de objetos, forEach y filtro." },
    { numero: 5, titulo: "Club de fans", archivo: "html/fans.html + js/fans.js", meta: "html/fans.html", descripcion: "El formulario que pide la actividad: muestra la credencial sin recargar la página." },
    { numero: 6, titulo: "Toques finales", archivo: "css/estilos.css", meta: "index.html", descripcion: "El efecto de tele vieja y la foto que se desvanece en el fondo." }
];

window.LECCIONES = [

    // =====================================================================
    // CAPITULO 0
    // =====================================================================
    {
        cap: 0, id: "0-1", titulo: "Rutas que sí encuentran el archivo", tipo: "html",
        teoria:
            "<p>Una <b>ruta relativa</b> le dice al navegador dónde está un archivo <em>a partir de la página en la que estás</em>. Si una letra está mal, la imagen simplemente no aparece.</p>" +
            "<p>En nuestro proyecto todas las imágenes están en la carpeta <code>imagenes</code> (con e, nunca <code>images</code> ni <code>imagines</code>):</p>" +
            bloque('Desde index.html (raíz):        src="imagenes/foto.jpg"\nDesde una página dentro de html/: src="../imagenes/foto.jpg"') +
            "<p>El <code>../</code> significa “sal una carpeta hacia arriba”. Esta vista funciona como si fuera el <code>index.html</code>, o sea, desde la raíz.</p>",
        referencias: [
            ENCI + "<b>2-enlaces.html</b> (rutas relativas)",
            "PRIMER_UNIDAD → <b>Sitio_Web_Multi_Pagina</b> (index.html en la raíz y las demás en html/)"
        ],
        tarea: "<p>Las dos imágenes no cargan porque la carpeta está mal escrita. Corrige las rutas para que se vean la foto de NSQK y la portada de <em>mosca</em>.</p>",
        pistas: [
            "La carpeta se llama exactamente <code>imagenes</code>.",
            "Los archivos se llaman <code>nsqk.jpg</code> y <code>mosca-portada.jpg</code>."
        ],
        inicial:
`<main class="p-6">
    <h1 class="text-4xl text-white mb-4">Rutas</h1>

    <!-- Estas dos imagenes no cargan: revisa como esta escrita la carpeta -->
    <img src="imagines/nsqk.jpg" alt="NSQK en el escenario entre humo y luces azules" class="w-full max-w-md rounded-xl">
    <img src="images/mosca-portada.jpg" alt="Portada del álbum mosca: un dálmata sobre fondo azul" class="w-64 rounded-xl mt-4">
</main>`,
        solucion:
`<main class="p-6">
    <h1 class="text-4xl text-white mb-4">Rutas</h1>

    <img src="imagenes/nsqk.jpg" alt="NSQK en el escenario entre humo y luces azules" class="w-full max-w-md rounded-xl">
    <img src="imagenes/mosca-portada.jpg" alt="Portada del álbum mosca: un dálmata sobre fondo azul" class="w-64 rounded-xl mt-4">
</main>`,
        revisar: async (doc, win, a) => {
            await a.esperarImagenes(doc);
            const imgs = [...doc.querySelectorAll("img")];
            return [
                { ok: imgs.length >= 2, texto: "Siguen estando las dos imágenes" },
                { ok: !!imgs[0] && a.cargo(imgs[0]), texto: "La foto de NSQK ya carga" },
                { ok: !!imgs[1] && a.cargo(imgs[1]), texto: "La portada de mosca ya carga" }
            ];
        }
    },

    {
        cap: 0, id: "0-2", titulo: "El atributo alt", tipo: "html",
        teoria:
            "<p><code>alt</code> <b>no es un comentario</b>: es un atributo de la etiqueta <code>&lt;img&gt;</code>, igual que <code>src</code>. Normalmente no se ve en la página, pero sirve para tres cosas:</p>" +
            "<ul><li>Si la imagen no carga, en su lugar aparece ese texto (mira la segunda imagen de la vista).</li>" +
            "<li>Las personas ciegas usan un lector de pantalla que les lee el <code>alt</code> en voz alta.</li>" +
            "<li>Google lo usa para entender de qué es la imagen.</li></ul>" +
            "<p>Un buen <code>alt</code> <b>describe lo que se ve</b>. “imagen” o “foto” no sirven: no dicen nada.</p>" +
            bloque('<img src="imagenes/roy.jpg" alt="Portada del álbum Roy: su cara tapada con el brazo tatuado">') +
            "<p>Para verlo en una página real: en Opera, clic derecho sobre la imagen → <b>Inspeccionar</b> (o <code>Ctrl + Shift + I</code>).</p>",
        referencias: [
            ENCI + "<b>3-multimedia.html</b> (etiqueta img y sus atributos)",
            "La actividad lo pide: “alt en las imágenes”"
        ],
        tarea: "<p>A la primera imagen (la portada de <em>Roy</em>) le falta su <code>alt</code>. Agrégale uno que describa lo que se ve.</p>",
        pistas: [
            "Va dentro de la etiqueta: <code>&lt;img src=\"...\" alt=\"aquí la descripción\" class=\"...\"&gt;</code>",
            "En la portada se ve a NSQK tapándose la cara con el brazo tatuado."
        ],
        inicial:
`<main class="p-6">
    <img src="imagenes/roy.jpg" class="w-64 rounded-xl">

    <!-- Esta ruta esta mal a proposito: mira lo que aparece en su lugar -->
    <img src="imagenes/no-existe.jpg" alt="Aquí iría una foto, pero no cargó y por eso ves este texto" class="w-64 mt-6 text-[#d9f20b]">
</main>`,
        solucion:
`<main class="p-6">
    <img src="imagenes/roy.jpg" alt="Portada del álbum Roy: NSQK tapándose la cara con el brazo tatuado" class="w-64 rounded-xl">

    <!-- Esta ruta esta mal a proposito: mira lo que aparece en su lugar -->
    <img src="imagenes/no-existe.jpg" alt="Aquí iría una foto, pero no cargó y por eso ves este texto" class="w-64 mt-6 text-[#d9f20b]">
</main>`,
        revisar: (doc) => {
            const img = doc.querySelector("img");
            const alt = img ? (img.getAttribute("alt") || "").trim() : "";
            return [
                { ok: alt !== "", texto: "La portada de Roy tiene alt" },
                { ok: alt.length >= 15, texto: "El alt describe la imagen (al menos 15 letras)" },
                { ok: alt !== "" && !/^(imagen|foto|img|portada)$/i.test(alt), texto: "No es solo “imagen” o “foto”" }
            ];
        }
    },

    {
        cap: 0, id: "0-3", titulo: "Cómo subir tu parte a GitHub", tipo: "lectura",
        teoria:
            "<p>Vamos a trabajar como en un equipo de verdad: <b>todos en el mismo repositorio, pero cada quien en su propia rama</b>. Así nadie borra el trabajo de otro.</p>" +
            "<h3>Palabras que vas a escuchar</h3>" +
            "<ul><li><b>Repositorio (repo):</b> la carpeta del proyecto guardada en GitHub.</li>" +
            "<li><b>Rama (branch):</b> tu copia para trabajar. La principal se llama <code>main</code> y esa es la que se publica.</li>" +
            "<li><b>Commit:</b> una “foto” de tus cambios con un mensaje de qué hiciste.</li>" +
            "<li><b>Push:</b> subir tus commits a GitHub.</li>" +
            "<li><b>Pull Request (PR):</b> pedir que revisen tu rama para unirla a <code>main</code>.</li></ul>" +
            "<h3>Los pasos</h3>" +
            "<p><b>1.</b> Acepta la invitación al repositorio que te llega al correo de GitHub.</p>" +
            "<p><b>2.</b> Descarga el proyecto a tu compu (el link del repo te lo pasa Abimael):</p>" +
            bloque("git clone https://github.com/USUARIO/Proyecto-Programacion.git\ncd Proyecto-Programacion") +
            "<p><b>3.</b> Crea tu rama con el nombre de tu parte:</p>" +
            bloque("git checkout -b parte-tour") +
            "<p><b>4.</b> Trabaja en <b>tus</b> archivos. Cuando tengas un avance, guárdalo y súbelo:</p>" +
            bloque('git add .\ngit commit -m "Tour: ya pinta las tarjetas con forEach"\ngit push -u origin parte-tour') +
            "<p><b>5.</b> En GitHub aparece un botón verde <b>Compare &amp; pull request</b>. Ponle un título y dale <b>Create pull request</b>.</p>" +
            "<p><b>6.</b> Abimael revisa tu PR y te deja comentarios con lo que hay que cambiar. Corriges y repites el paso 4 (el PR se actualiza solo).</p>" +
            "<p><b>7.</b> Cuando todo está bien, se hace <b>merge</b> a <code>main</code> y tu parte aparece en la página publicada (GitHub Pages).</p>" +
            "<h3>Reglas del equipo</h3>" +
            "<ul><li>Nunca trabajes directo en <code>main</code>.</li>" +
            "<li>Solo toca los archivos de tu parte.</li>" +
            "<li>Mensajes de commit claros: qué hiciste, no “cambios” o “asdf”.</li>" +
            "<li>Antes de subir, abre tu página en el navegador y revisa que se vea bien en compu y en celular.</li></ul>",
        referencias: [
            "SEGUNDA UNIDAD → <b>prueba-query-selector-Garcia-Abimael</b> (ya publicado en GitHub Pages)",
            "Si prefieres no usar comandos: <b>GitHub Desktop</b> hace lo mismo con botones"
        ]
    },

    // =====================================================================
    // CAPITULO 1: INICIO
    // =====================================================================
    {
        cap: 1, id: "1-1", titulo: "Un header que se pega arriba", tipo: "html",
        teoria:
            "<p>Con <code>position: sticky</code> el header se queda pegado arriba cuando bajas. En Tailwind son tres clases:</p>" +
            "<ul><li><code>sticky</code>: que se pegue.</li><li><code>top-0</code>: que se pegue hasta arriba (a 0 de distancia).</li>" +
            "<li><code>z-50</code>: que quede <b>encima</b> de lo demás. Sin <code>z-index</code>, el contenido pasa por encima del header.</li></ul>" +
            "<p>Regla del equipo: <b>todo lo que sea fixed o sticky lleva z-index</b>.</p>" +
            "<p><code>sticky</code> se queda dentro de su página; <code>fixed</code> se queda fijo en la pantalla aunque no haya nada alrededor (como un botón flotante).</p>",
        referencias: [
            ENCI + "<b>10-posicionamiento.html</b> (sticky, fixed y z-index)",
            "PRIMER_UNIDAD → <b>Actividad_Posicionamiento_CSS</b> (la barra que se pega arriba)"
        ],
        tarea: "<p>Haz que el header se quede pegado arriba al bajar y que quede encima del contenido. Prueba bajando con la rueda del mouse dentro de la vista.</p>",
        pistas: [
            "Ya tiene <code>top-0</code>, faltan <code>sticky</code> y el z-index.",
            "Agrega las clases dentro del <code>class</code> del <code>&lt;header&gt;</code>."
        ],
        inicial:
`<header class="top-0 bg-black border-b border-neutral-800 px-6 py-4">
    <a href="#" class="logo text-3xl text-white">NSQK</a>
</header>

<main class="p-6 space-y-4">
    <p>Baja con la rueda del mouse dentro de esta vista y mira qué le pasa al header.</p>
    <div class="relative h-40 bg-[#1f1fff] rounded-xl"></div>
    <div class="relative h-40 bg-neutral-800 rounded-xl"></div>
    <div class="relative h-40 bg-[#1f1fff] rounded-xl"></div>
    <div class="relative h-40 bg-neutral-800 rounded-xl"></div>
</main>`,
        solucion:
`<header class="sticky top-0 z-50 bg-black border-b border-neutral-800 px-6 py-4">
    <a href="#" class="logo text-3xl text-white">NSQK</a>
</header>

<main class="p-6 space-y-4">
    <p>Baja con la rueda del mouse dentro de esta vista y mira qué le pasa al header.</p>
    <div class="relative h-40 bg-[#1f1fff] rounded-xl"></div>
    <div class="relative h-40 bg-neutral-800 rounded-xl"></div>
    <div class="relative h-40 bg-[#1f1fff] rounded-xl"></div>
    <div class="relative h-40 bg-neutral-800 rounded-xl"></div>
</main>`,
        revisar: (doc, win) => {
            const h = doc.querySelector("header");
            const e = win.getComputedStyle(h);
            return [
                { ok: e.position === "sticky", texto: "El header es sticky" },
                { ok: e.top === "0px", texto: "Se pega hasta arriba (top-0)" },
                { ok: parseInt(e.zIndex, 10) >= 10, texto: "Tiene z-index para quedar encima (z-50)" }
            ];
        }
    },

    {
        cap: 1, id: "1-2", titulo: "Un video que se reproduce solo", tipo: "html",
        teoria:
            "<p>La etiqueta <code>&lt;video&gt;</code> tiene atributos que <b>no llevan valor</b>, solo se escriben:</p>" +
            "<ul><li><code>autoplay</code>: empieza solo.</li>" +
            "<li><code>muted</code>: sin sonido. <b>Es obligatorio</b> para autoplay: los navegadores no dejan que un video con sonido arranque solo.</li>" +
            "<li><code>loop</code>: cuando termina, vuelve a empezar.</li>" +
            "<li><code>playsinline</code>: en iPhone se reproduce dentro de la página y no en pantalla completa.</li></ul>" +
            bloque('<video src="multimedia/banner.mp4" autoplay muted loop playsinline></video>'),
        referencias: [
            ENCI + "<b>3-multimedia.html</b> (video, audio y sus atributos)"
        ],
        tarea: "<p>Este es el banner del index. Haz que el video se reproduzca solo, sin sonido, en ciclo y que en celular no se abra en pantalla completa.</p>",
        pistas: [
            "Son cuatro atributos y van dentro de <code>&lt;video ...&gt;</code>, separados por espacios.",
            "Sin <code>muted</code> el autoplay no funciona."
        ],
        inicial:
`<section class="relative">
    <video src="multimedia/banner.mp4" class="w-full h-72 object-cover"></video>
</section>`,
        solucion:
`<section class="relative">
    <video src="multimedia/banner.mp4" class="w-full h-72 object-cover" autoplay muted loop playsinline></video>
</section>`,
        revisar: (doc) => {
            const v = doc.querySelector("video");
            return ["autoplay", "muted", "loop", "playsinline"].map((at) => ({
                ok: !!v && v.hasAttribute(at),
                texto: "Tiene <code>" + at + "</code>"
            }));
        }
    },

    {
        cap: 1, id: "1-3", titulo: "Posicionar con píxeles", tipo: "css",
        teoria:
            "<p>Para poner el botón <b>encima</b> del video se usa la pareja <b>relative + absolute</b>:</p>" +
            "<ul><li>El papá (<code>.escenario</code>) lleva <code>position: relative</code>. Así se vuelve el “marco de referencia”.</li>" +
            "<li>El hijo (<code>.boton</code>) lleva <code>position: absolute</code> y se acomoda <b>midiendo desde las orillas del papá</b>.</li></ul>" +
            "<p>Las medidas son en píxeles (<code>px</code>):</p>" +
            "<ul><li><code>bottom: 20px</code> = 20 px separado de la orilla de <b>abajo</b>. Si subes el número, el botón sube.</li>" +
            "<li><code>left: 50px</code> = 50 px separado de la orilla <b>izquierda</b>. Si subes el número, se va a la derecha.</li>" +
            "<li>También existen <code>top</code> y <code>right</code>, que miden desde arriba y desde la derecha.</li></ul>" +
            "<p>Es justo lo que hace el botón “Escuchar ahora” del index. Allá se escribe con clases de Tailwind (<code>absolute bottom-8</code>), pero es lo mismo.</p>",
        referencias: [
            ENCI + "<b>10-posicionamiento.html</b> (relative, absolute, top, bottom, left, right)",
            "PRIMER_UNIDAD → <b>Actividad_Posicionamiento_CSS</b> (etiqueta sobre una caja: la caja relative y la etiqueta absolute)"
        ],
        tarea: "<p>Mueve el botón hasta que quede <b>justo dentro del rectángulo punteado</b>. Cambia los números y mira cómo se mueve en tiempo real. La revisión te dice si te falta o te pasaste.</p>",
        pistas: [
            "Primero cambia <code>position: static</code> por <code>position: absolute</code>; si no, bottom y left no hacen nada.",
            "El escenario mide 360 px de ancho y el botón 140 px. Para centrarlo: (360 − 140) ÷ 2.",
            "Prueba con <code>bottom</code> entre 20 y 30 px."
        ],
        estiloFijo:
            ".marco{position:relative;width:360px;height:220px;margin:28px auto 80px}" +
            ".escenario{width:360px;height:220px}" +
            ".escenario video{width:100%;height:100%;object-fit:cover;display:block;border-radius:12px;filter:brightness(.75)}" +
            ".meta-lugar{position:absolute;left:110px;bottom:24px;width:140px;height:40px;border:2px dashed #d9f20b;border-radius:999px;pointer-events:none;z-index:5}" +
            ".boton{display:block;width:140px;height:40px;line-height:40px;text-align:center;background:#d9f20b;color:#000;font-weight:bold;border-radius:999px;font-size:13px;text-transform:uppercase;z-index:10;text-decoration:none}",
        fijo:
            '<div class="marco">' +
            '<section class="escenario">' +
            '<video src="multimedia/banner.mp4" autoplay muted loop playsinline></video>' +
            '<a href="#" class="boton">Escuchar ahora</a>' +
            "</section>" +
            '<div class="meta-lugar"></div>' +
            "</div>",
        inicial:
`/* El papa: relative para que el boton se mida desde sus orillas */
.escenario {
    position: relative;
}

/* El boton: cambialo a absolute y muevelo con pixeles */
.boton {
    position: static;
    bottom: 0px;
    left: 0px;
}`,
        solucion:
`/* El papa: relative para que el boton se mida desde sus orillas */
.escenario {
    position: relative;
}

/* El boton: absolute y acomodado con pixeles */
.boton {
    position: absolute;
    bottom: 24px;
    left: 110px;
}`,
        revisar: (doc, win) => {
            const b = doc.querySelector(".boton");
            const m = doc.querySelector(".meta-lugar");
            const posicion = win.getComputedStyle(b).position;
            const rb = b.getBoundingClientRect();
            const rm = m.getBoundingClientRect();
            const dy = Math.round(rb.top - rm.top);
            const dx = Math.round(rb.left - rm.left);

            let textoAltura = "Altura perfecta";
            if (dy > 6) textoAltura = "Está " + dy + " px muy abajo: sube el valor de <code>bottom</code>";
            if (dy < -6) textoAltura = "Está " + (-dy) + " px muy arriba: baja el valor de <code>bottom</code>";

            let textoLado = "Posición de lado perfecta";
            if (dx > 6) textoLado = "Está " + dx + " px muy a la derecha: baja el valor de <code>left</code>";
            if (dx < -6) textoLado = "Está " + (-dx) + " px muy a la izquierda: sube el valor de <code>left</code>";

            return [
                { ok: posicion === "absolute", texto: "El botón tiene <code>position: absolute</code>" },
                { ok: posicion === "absolute" && Math.abs(dy) <= 6, texto: posicion === "absolute" ? textoAltura : "Primero ponle absolute para poder moverlo" },
                { ok: posicion === "absolute" && Math.abs(dx) <= 6, texto: posicion === "absolute" ? textoLado : "…y luego acomódalo con left" }
            ];
        }
    },

    {
        cap: 1, id: "1-4", titulo: "Los colores exactos de mosca", tipo: "html",
        teoria:
            "<p>Los colores del sitio salen del póster de <em>mosca</em>: <b>azul eléctrico</b> <code>#1f1fff</code> y <b>verde eléctrico</b> <code>#d9f20b</code>, sobre negro.</p>" +
            "<p>Tailwind trae colores ya hechos (<code>bg-blue-600</code>, <code>text-yellow-300</code>), pero no son los nuestros. Para usar un color exacto se escribe entre corchetes:</p>" +
            bloque('bg-[#1f1fff]     → fondo azul de mosca\ntext-[#d9f20b]   → letra verde de mosca\nbg-[#1f1fff]/70  → el mismo azul al 70% (medio transparente)') +
            "<p>El <code>#</code> con 6 letras y números es un color <b>hexadecimal</b>: los dos primeros son el rojo, los dos de en medio el verde y los dos últimos el azul.</p>",
        referencias: [
            ENCI + "<b>8-basicoCSS.html</b> (colores y fondo)",
            "SEGUNDA UNIDAD → <b>Actividad_Tailwind</b> (clases de Tailwind)"
        ],
        tarea: "<p>Cambia el fondo de la sección al azul de <em>mosca</em> y el título al verde de <em>mosca</em>. Compara con <b>La meta</b>.</p>",
        pistas: [
            "Cambia <code>bg-blue-600</code> por <code>bg-[#1f1fff]</code>.",
            "Cambia <code>text-yellow-300</code> por <code>text-[#d9f20b]</code>."
        ],
        inicial:
`<section class="bg-blue-600 p-10 text-center">
    <h2 class="text-yellow-300 text-6xl">mosca 2026</h2>
    <p class="text-white mt-3">17 canciones · Honey Records</p>
</section>`,
        solucion:
`<section class="bg-[#1f1fff] p-10 text-center">
    <h2 class="text-[#d9f20b] text-6xl">mosca 2026</h2>
    <p class="text-white mt-3">17 canciones · Honey Records</p>
</section>`,
        revisar: (doc, win) => {
            const s = doc.querySelector("section");
            const h = doc.querySelector("h2");
            return [
                { ok: !!s && win.getComputedStyle(s).backgroundColor === "rgb(31, 31, 255)", texto: "El fondo es el azul de mosca (#1f1fff)" },
                { ok: !!h && win.getComputedStyle(h).color === "rgb(217, 242, 11)", texto: "El título es el verde de mosca (#d9f20b)" }
            ];
        }
    },

    {
        cap: 1, id: "1-5", titulo: "Tarjetas que se acomodan solas (grid)", tipo: "html",
        teoria:
            "<p>Con <code>grid</code> acomodas cosas en columnas. Lo responsivo está en los <b>prefijos</b> de Tailwind:</p>" +
            bloque("grid-cols-1      → en celular: 1 columna\nmd:grid-cols-2   → desde 768 px (tablet): 2 columnas\nlg:grid-cols-4   → desde 1024 px (compu): 4 columnas") +
            "<p>Se escribe primero lo de celular y luego se agrega lo de pantallas más grandes. Usa los botones <b>💻 Compu</b> y <b>📱 Celular</b> de la vista para ver el cambio.</p>" +
            "<p>Así está hecha la sección “Explora” del index.</p>",
        referencias: [
            ENCI + "<b>Grid.html</b> (display grid y columnas)",
            "SEGUNDA UNIDAD → <b>Actividad_Tailwind</b> (grid-cols-1 md:grid-cols-2 lg:grid-cols-3)",
            "SEGUNDA UNIDAD → <b>Actividad_Responsive</b> (media queries de 768 px y 480 px)"
        ],
        tarea: "<p>Haz que las tarjetas sean <b>1 columna en celular, 2 en tablet y 4 en compu</b>.</p>",
        pistas: [
            "Agrégale al <code>div</code> con <code>id=\"tarjetas\"</code> las clases <code>md:grid-cols-2</code> y <code>lg:grid-cols-4</code>.",
            "Deja el <code>grid-cols-1</code>: es el de celular."
        ],
        inicial:
`<section class="p-6">
    <h2 class="text-4xl text-white mb-6 text-center">Explora</h2>
    <div id="tarjetas" class="grid grid-cols-1 gap-6">
        <article class="bg-neutral-900 p-6 rounded-xl">
            <h3 class="text-2xl text-white">Biografía</h3>
            <p class="text-sm">De Monterrey a Houston.</p>
        </article>
        <article class="bg-neutral-900 p-6 rounded-xl">
            <h3 class="text-2xl text-white">Discografía</h3>
            <p class="text-sm">Sus cuatro lanzamientos.</p>
        </article>
        <article class="bg-neutral-900 p-6 rounded-xl">
            <h3 class="text-2xl text-white">Tour</h3>
            <p class="text-sm">23 fechas en México.</p>
        </article>
        <article class="bg-neutral-900 p-6 rounded-xl">
            <h3 class="text-2xl text-white">Club de fans</h3>
            <p class="text-sm">Saca tu credencial.</p>
        </article>
    </div>
</section>`,
        solucion:
`<section class="p-6">
    <h2 class="text-4xl text-white mb-6 text-center">Explora</h2>
    <div id="tarjetas" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <article class="bg-neutral-900 p-6 rounded-xl">
            <h3 class="text-2xl text-white">Biografía</h3>
            <p class="text-sm">De Monterrey a Houston.</p>
        </article>
        <article class="bg-neutral-900 p-6 rounded-xl">
            <h3 class="text-2xl text-white">Discografía</h3>
            <p class="text-sm">Sus cuatro lanzamientos.</p>
        </article>
        <article class="bg-neutral-900 p-6 rounded-xl">
            <h3 class="text-2xl text-white">Tour</h3>
            <p class="text-sm">23 fechas en México.</p>
        </article>
        <article class="bg-neutral-900 p-6 rounded-xl">
            <h3 class="text-2xl text-white">Club de fans</h3>
            <p class="text-sm">Saca tu credencial.</p>
        </article>
    </div>
</section>`,
        revisar: (doc, win, a) => {
            const c = a.clases(doc.querySelector("#tarjetas"));
            return [
                { ok: c.includes("grid") && c.includes("grid-cols-1"), texto: "En celular: 1 columna (grid grid-cols-1)" },
                { ok: c.includes("md:grid-cols-2"), texto: "En tablet: 2 columnas (md:grid-cols-2)" },
                { ok: c.includes("lg:grid-cols-4"), texto: "En compu: 4 columnas (lg:grid-cols-4)" }
            ];
        }
    },

    {
        cap: 1, id: "1-6", titulo: "Tu primer botón con JavaScript", tipo: "js",
        teoria:
            "<p>Así funcionan los botones “Ver canciones” y “Ocultar” del index:</p>" +
            "<ol><li><code>document.querySelector(\"#id\")</code> agarra un elemento de la página por su id.</li>" +
            "<li><code>addEventListener(\"click\", () => { ... })</code> dice qué hacer cuando le dan clic.</li>" +
            "<li><code>forEach</code> recorre el arreglo, una canción a la vez.</li>" +
            "<li><code>innerHTML +=</code> le <b>agrega</b> HTML a la lista; <code>innerHTML = \"\"</code> la <b>deja vacía</b>.</li></ol>" +
            bloque('canciones.forEach((cancion) => {\n    listaCanciones.innerHTML += `<li>${cancion}</li>`;\n});') +
            "<p>Las comillas invertidas <code>`...`</code> dejan meter variables con <code>${...}</code> dentro del texto.</p>" +
            "<p>Ojo: si no limpias la lista antes, cada clic vuelve a agregar las canciones y se repiten.</p>",
        referencias: [
            "SEGUNDA UNIDAD → <b>Actividad_Objetos_Arreglos</b> (arreglos y forEach)",
            "SEGUNDA UNIDAD → <b>prueba-query-selector-Garcia-Abimael</b> (querySelector y eventos)"
        ],
        tarea: "<p>Completa el código: “Ver canciones” debe mostrar todas las canciones del arreglo (sin repetirse si le das dos veces) y “Ocultar” debe dejar la lista vacía.</p>",
        pistas: [
            "Dentro del primer clic, primero <code>listaCanciones.innerHTML = \"\";</code> y luego el <code>forEach</code>.",
            "Dentro del <code>forEach</code>: <code>listaCanciones.innerHTML += `&lt;li&gt;${cancion}&lt;/li&gt;`;</code>",
            "En Ocultar basta con <code>listaCanciones.innerHTML = \"\";</code>"
        ],
        fijo:
            '<section class="p-6">' +
            '<button id="boton-canciones" class="bg-[#d9f20b] text-black font-bold uppercase px-5 py-2 rounded-full">Ver canciones</button> ' +
            '<button id="boton-ocultar" class="border-2 border-white text-white font-bold uppercase px-5 py-2 rounded-full">Ocultar</button>' +
            '<ol id="lista-canciones" class="list-decimal list-inside mt-4 space-y-1"></ol>' +
            "</section>",
        inicial:
`// Tracklist de mosca (solo las primeras 5 para practicar)
const canciones = ["SAMSA", "tuffluv", "Dientes De Fierro", "Canonizado", "Santurce"];

const listaCanciones = document.querySelector("#lista-canciones");
const botonCanciones = document.querySelector("#boton-canciones");
const botonOcultar = document.querySelector("#boton-ocultar");


botonCanciones.addEventListener("click", () => {
    // 1. Limpia la lista
    // 2. Recorre el arreglo con forEach y agrega un <li> por cancion
});


botonOcultar.addEventListener("click", () => {
    // Deja la lista vacia
});`,
        solucion:
`// Tracklist de mosca (solo las primeras 5 para practicar)
const canciones = ["SAMSA", "tuffluv", "Dientes De Fierro", "Canonizado", "Santurce"];

const listaCanciones = document.querySelector("#lista-canciones");
const botonCanciones = document.querySelector("#boton-canciones");
const botonOcultar = document.querySelector("#boton-ocultar");


botonCanciones.addEventListener("click", () => {
    // Primero se limpia para que no se repitan si le dan dos veces
    listaCanciones.innerHTML = "";

    canciones.forEach((cancion) => {
        listaCanciones.innerHTML += \`<li>\${cancion}</li>\`;
    });
});


botonOcultar.addEventListener("click", () => {
    listaCanciones.innerHTML = "";
});`,
        revisar: async (doc, win, a) => {
            const bC = doc.querySelector("#boton-canciones");
            const bO = doc.querySelector("#boton-ocultar");
            const ol = doc.querySelector("#lista-canciones");
            const total = a.valor(win, "canciones.length", 5);
            bC.click();
            await a.esperar(50);
            const n1 = ol.querySelectorAll("li").length;
            bC.click();
            await a.esperar(50);
            const n2 = ol.querySelectorAll("li").length;
            bO.click();
            await a.esperar(50);
            const n3 = ol.querySelectorAll("li").length;
            bC.click(); // se dejan visibles para que las veas
            return [
                { ok: n1 > 0, texto: "Al dar clic en “Ver canciones” aparece algo" },
                { ok: n1 === total, texto: "Aparecen todas las canciones del arreglo (" + n1 + " de " + total + ")" },
                { ok: n1 > 0 && n2 === n1, texto: "Si das clic dos veces no se repiten" },
                { ok: n1 > 0 && n3 === 0, texto: "“Ocultar” deja la lista vacía" }
            ];
        }
    },

    // =====================================================================
    // CAPITULO 2: BIOGRAFIA
    // =====================================================================
    {
        cap: 2, id: "2-1", titulo: "Títulos en orden", tipo: "html",
        teoria:
            "<p>Los títulos <code>h1</code> a <code>h6</code> no son para hacer la letra más grande: dicen <b>qué tan importante</b> es cada parte, como el índice de un libro.</p>" +
            "<ul><li><b>Un solo <code>h1</code> por página</b>: el título principal.</li>" +
            "<li><code>h2</code> para las secciones (Inicios, Carrera).</li>" +
            "<li><code>h3</code> para los subtemas dentro de cada sección.</li>" +
            "<li>No te saltes niveles: después de un <code>h1</code> va un <code>h2</code>, no un <code>h3</code>.</li></ul>" +
            "<p>El tamaño se controla aparte, con clases como <code>text-3xl</code>. Por eso puedes cambiar la etiqueta sin que se vea diferente.</p>",
        referencias: [
            ENCI + "<b>1-basico.html</b> (h1 a h6)",
            ENCI + "<b>7-semanticas.html</b> (section y article)",
            "La actividad lo pide: “encabezados en orden”"
        ],
        tarea: "<p>Esta página tiene puros <code>h1</code>. Déjala con <b>un solo h1</b> (“Biografía”), los nombres de sección en <code>h2</code> y los subtemas en <code>h3</code>.</p>",
        pistas: [
            "“Inicios” y “Carrera” son secciones → <code>h2</code>.",
            "“De Monterrey a Houston” y “Botánica y Roy” son subtemas → <code>h3</code>.",
            "Cambia la etiqueta de apertura <b>y</b> la de cierre."
        ],
        inicial:
`<main class="p-6 max-w-2xl">
    <h1 class="text-5xl text-white">Biografía</h1>

    <h1 class="text-3xl text-white mt-8">Inicios</h1>
    <h1 class="text-xl text-[#d9f20b] mt-4">De Monterrey a Houston</h1>
    <p>Nació en Monterrey, Nuevo León, y de niño se mudó con su familia a Houston, Texas.</p>

    <h1 class="text-3xl text-white mt-8">Carrera</h1>
    <h1 class="text-xl text-[#d9f20b] mt-4">Botánica y Roy</h1>
    <p>Debutó en 2020 con el EP Botánica, bajo Honey Records.</p>
</main>`,
        solucion:
`<main class="p-6 max-w-2xl">
    <h1 class="text-5xl text-white">Biografía</h1>

    <h2 class="text-3xl text-white mt-8">Inicios</h2>
    <h3 class="text-xl text-[#d9f20b] mt-4">De Monterrey a Houston</h3>
    <p>Nació en Monterrey, Nuevo León, y de niño se mudó con su familia a Houston, Texas.</p>

    <h2 class="text-3xl text-white mt-8">Carrera</h2>
    <h3 class="text-xl text-[#d9f20b] mt-4">Botánica y Roy</h3>
    <p>Debutó en 2020 con el EP Botánica, bajo Honey Records.</p>
</main>`,
        revisar: (doc) => {
            const titulos = [...doc.querySelectorAll("h1, h2, h3, h4, h5, h6")];
            const niveles = titulos.map((t) => Number(t.tagName[1]));
            let sinSaltos = niveles[0] === 1;
            for (let i = 1; i < niveles.length; i++) {
                if (niveles[i] > niveles[i - 1] + 1) sinSaltos = false;
            }
            return [
                { ok: doc.querySelectorAll("h1").length === 1, texto: "Hay un solo h1 (ahorita hay " + doc.querySelectorAll("h1").length + ")" },
                { ok: doc.querySelectorAll("h2").length === 2, texto: "Las 2 secciones son h2" },
                { ok: doc.querySelectorAll("h3").length === 2, texto: "Los 2 subtemas son h3" },
                { ok: sinSaltos, texto: "No se salta niveles (h1 → h2 → h3)" }
            ];
        }
    },

    {
        cap: 2, id: "2-2", titulo: "Una tabla bien armada", tipo: "html",
        teoria:
            "<p>Una tabla bien hecha tiene dos partes:</p>" +
            "<ul><li><code>&lt;thead&gt;</code>: la fila de títulos, con celdas <code>&lt;th&gt;</code>.</li>" +
            "<li><code>&lt;tbody&gt;</code>: las filas de datos, con celdas <code>&lt;td&gt;</code>.</li></ul>" +
            bloque("<table>\n    <thead>\n        <tr><th>Año</th><th>Momento</th></tr>\n    </thead>\n    <tbody>\n        <tr><td>1998</td><td>Nace en Monterrey</td></tr>\n    </tbody>\n</table>") +
            "<p>En celular una tabla ancha puede salirse de la pantalla y provocar scroll de lado (la actividad pide que no haya). Se arregla metiéndola en un <code>div</code> con <code>overflow-x-auto</code>: así solo la tabla se desliza, no toda la página.</p>",
        referencias: [
            ENCI + "<b>5-tablas.html</b> (table, tr, th, td)",
            "PRIMER_UNIDAD → <b>Sitio_Web_Multi_Pagina_Listas</b> (tabla del horario con thead y tbody)"
        ],
        tarea: "<p>Arregla la tabla de la línea de tiempo: la primera fila va en <code>&lt;thead&gt;</code> con <code>&lt;th&gt;</code>, las demás en <code>&lt;tbody&gt;</code>, y toda la tabla dentro de un <code>div</code> con <code>overflow-x-auto</code>.</p>",
        pistas: [
            "Cambia los <code>td</code> de la fila “Año / Momento” por <code>th</code> y envuelve esa fila en <code>&lt;thead&gt;...&lt;/thead&gt;</code>.",
            "Las otras tres filas van dentro de <code>&lt;tbody&gt;...&lt;/tbody&gt;</code>.",
            "Envuelve el <code>&lt;table&gt;</code> completo en <code>&lt;div class=\"overflow-x-auto\"&gt;...&lt;/div&gt;</code>."
        ],
        inicial:
`<section class="p-6 max-w-xl">
    <h2 class="text-3xl text-white mb-4">Línea de tiempo</h2>

    <table class="w-full text-left">
        <tr class="bg-neutral-900 text-white">
            <td class="p-3">Año</td>
            <td class="p-3">Momento</td>
        </tr>
        <tr class="border-b border-neutral-800">
            <td class="p-3 text-[#d9f20b]">1998</td>
            <td class="p-3">Nace en Monterrey</td>
        </tr>
        <tr class="border-b border-neutral-800">
            <td class="p-3 text-[#d9f20b]">2020</td>
            <td class="p-3">EP Botánica</td>
        </tr>
        <tr>
            <td class="p-3 text-[#d9f20b]">2026</td>
            <td class="p-3">Álbum mosca</td>
        </tr>
    </table>
</section>`,
        solucion:
`<section class="p-6 max-w-xl">
    <h2 class="text-3xl text-white mb-4">Línea de tiempo</h2>

    <!-- overflow-x-auto: si la tabla no cabe, se mueve ella y no toda la pagina -->
    <div class="overflow-x-auto">
        <table class="w-full text-left">
            <thead class="bg-neutral-900 text-white">
                <tr>
                    <th class="p-3">Año</th>
                    <th class="p-3">Momento</th>
                </tr>
            </thead>
            <tbody>
                <tr class="border-b border-neutral-800">
                    <td class="p-3 text-[#d9f20b]">1998</td>
                    <td class="p-3">Nace en Monterrey</td>
                </tr>
                <tr class="border-b border-neutral-800">
                    <td class="p-3 text-[#d9f20b]">2020</td>
                    <td class="p-3">EP Botánica</td>
                </tr>
                <tr>
                    <td class="p-3 text-[#d9f20b]">2026</td>
                    <td class="p-3">Álbum mosca</td>
                </tr>
            </tbody>
        </table>
    </div>
</section>`,
        revisar: (doc, win, a, codigo) => {
            const thead = doc.querySelector("thead");
            const tabla = doc.querySelector("table");
            const papa = tabla ? tabla.parentElement : null;
            return [
                { ok: !!thead && thead.querySelectorAll("th").length >= 2, texto: "Los títulos van en <code>thead</code> con celdas <code>th</code>" },
                { ok: /<tbody/i.test(codigo) && doc.querySelectorAll("tbody tr").length >= 3, texto: "Los datos van en <code>tbody</code> (escrito por ti)" },
                { ok: !!papa && win.getComputedStyle(papa).overflowX === "auto", texto: "La tabla está dentro de un div con <code>overflow-x-auto</code>" }
            ];
        }
    },

    // =====================================================================
    // CAPITULO 3: DISCOGRAFIA
    // =====================================================================
    {
        cap: 3, id: "3-1", titulo: "Tarjetas que reaccionan al mouse", tipo: "html",
        teoria:
            "<p>El prefijo <code>hover:</code> aplica una clase <b>solo cuando el mouse está encima</b>:</p>" +
            bloque("hover:-translate-y-2          → sube un poquito\nhover:border-[#d9f20b]        → el borde se pinta verde\ntransition                    → el cambio es suave, no de golpe") +
            "<p>Para que el borde pueda cambiar de color, primero tiene que existir: <code>border-2 border-transparent</code> (un borde de 2 px invisible).</p>",
        referencias: [
            "SEGUNDA UNIDAD → <b>Actividad_Tailwind</b> (hover y transition)",
            ENCI + "<b>9-box-model.html</b> (border)"
        ],
        tarea: "<p>Haz que <b>cada una</b> de las 4 tarjetas suba un poquito y pinte su borde verde al pasar el mouse, con transición suave.</p>",
        pistas: [
            "A cada <code>article</code> agrégale: <code>border-2 border-transparent hover:border-[#d9f20b] hover:-translate-y-2 transition</code>",
            "Son las mismas clases en las 4 tarjetas: escríbelas en una y copia y pega."
        ],
        inicial:
`<section class="p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
    <article class="bg-neutral-900 rounded-xl overflow-hidden">
        <img src="imagenes/botanica.jpg" alt="Portada del EP Botánica" class="w-full">
        <h3 class="text-xl text-white p-3">Botánica</h3>
    </article>
    <article class="bg-neutral-900 rounded-xl overflow-hidden">
        <img src="imagenes/roy.jpg" alt="Portada del álbum Roy" class="w-full">
        <h3 class="text-xl text-white p-3">Roy</h3>
    </article>
    <article class="bg-neutral-900 rounded-xl overflow-hidden">
        <img src="imagenes/atp.jpg" alt="Portada del mixtape ATP" class="w-full">
        <h3 class="text-xl text-white p-3">ATP</h3>
    </article>
    <article class="bg-neutral-900 rounded-xl overflow-hidden">
        <img src="imagenes/mosca-portada.jpg" alt="Portada del álbum mosca" class="w-full">
        <h3 class="text-xl text-white p-3">mosca</h3>
    </article>
</section>`,
        solucion:
`<section class="p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
    <article class="bg-neutral-900 rounded-xl overflow-hidden border-2 border-transparent hover:border-[#d9f20b] hover:-translate-y-2 transition">
        <img src="imagenes/botanica.jpg" alt="Portada del EP Botánica" class="w-full">
        <h3 class="text-xl text-white p-3">Botánica</h3>
    </article>
    <article class="bg-neutral-900 rounded-xl overflow-hidden border-2 border-transparent hover:border-[#d9f20b] hover:-translate-y-2 transition">
        <img src="imagenes/roy.jpg" alt="Portada del álbum Roy" class="w-full">
        <h3 class="text-xl text-white p-3">Roy</h3>
    </article>
    <article class="bg-neutral-900 rounded-xl overflow-hidden border-2 border-transparent hover:border-[#d9f20b] hover:-translate-y-2 transition">
        <img src="imagenes/atp.jpg" alt="Portada del mixtape ATP" class="w-full">
        <h3 class="text-xl text-white p-3">ATP</h3>
    </article>
    <article class="bg-neutral-900 rounded-xl overflow-hidden border-2 border-transparent hover:border-[#d9f20b] hover:-translate-y-2 transition">
        <img src="imagenes/mosca-portada.jpg" alt="Portada del álbum mosca" class="w-full">
        <h3 class="text-xl text-white p-3">mosca</h3>
    </article>
</section>`,
        revisar: (doc, win, a) => {
            const tarjetas = [...doc.querySelectorAll("article")];
            const todas = (prueba) => tarjetas.length === 4 && tarjetas.every((t) => prueba(a.clases(t)));
            return [
                { ok: todas((c) => c.includes("border-2")), texto: "Las 4 tienen borde (border-2)" },
                { ok: todas((c) => c.some((x) => x.startsWith("hover:border"))), texto: "Las 4 cambian el color del borde con hover" },
                { ok: todas((c) => c.some((x) => x.startsWith("hover:-translate-y"))), texto: "Las 4 suben con hover" },
                { ok: todas((c) => c.includes("transition")), texto: "Las 4 tienen transition (cambio suave)" }
            ];
        }
    },

    {
        cap: 3, id: "3-2", titulo: "Una banda con video de fondo", tipo: "html",
        teoria:
            "<p>Es la misma pareja <b>relative + absolute</b> del capítulo 1, pero ahora el video va <b>detrás</b> del texto:</p>" +
            "<ul><li><code>section</code>: <code>relative</code> (el marco) y <code>overflow-hidden</code> (lo que se salga, se corta).</li>" +
            "<li><code>video</code>: <code>absolute inset-0</code> (pegado a las 4 orillas) + <code>w-full h-full object-cover</code> (llena todo sin deformarse).</li>" +
            "<li><code>div</code> del texto: <code>relative</code>. Así queda encima del video; si no, el video lo tapa.</li></ul>" +
            "<p><code>inset-0</code> es lo mismo que escribir <code>top-0 right-0 bottom-0 left-0</code>.</p>",
        referencias: [
            ENCI + "<b>10-posicionamiento.html</b> (relative, absolute, z-index)",
            ENCI + "<b>3-multimedia.html</b> (video)"
        ],
        tarea: "<p>Haz que el video quede de fondo llenando toda la banda y el título encima, como en la página de Discografía.</p>",
        pistas: [
            "<code>&lt;section class=\"relative overflow-hidden text-center px-6 py-24\"&gt;</code>",
            "<code>&lt;video ... class=\"absolute inset-0 w-full h-full object-cover\"&gt;</code>",
            "<code>&lt;div class=\"relative\"&gt;</code>"
        ],
        inicial:
`<section class="text-center px-6 py-24">
    <video src="multimedia/conciertos.mp4" autoplay muted loop playsinline></video>
    <div>
        <h1 class="text-6xl text-white">Discografía</h1>
        <p class="text-[#d9f20b] uppercase tracking-widest text-sm mt-3">Todos sus lanzamientos son con Honey Records</p>
    </div>
</section>`,
        solucion:
`<section class="relative overflow-hidden text-center px-6 py-24">
    <video src="multimedia/conciertos.mp4" class="absolute inset-0 w-full h-full object-cover" autoplay muted loop playsinline></video>
    <div class="relative">
        <h1 class="text-6xl text-white">Discografía</h1>
        <p class="text-[#d9f20b] uppercase tracking-widest text-sm mt-3">Todos sus lanzamientos son con Honey Records</p>
    </div>
</section>`,
        revisar: (doc, win) => {
            const s = doc.querySelector("section");
            const v = doc.querySelector("video");
            const d = doc.querySelector("section > div");
            const es = win.getComputedStyle(s);
            const rs = s.getBoundingClientRect();
            const rv = v.getBoundingClientRect();
            const llena = Math.abs(rs.width - rv.width) <= 2 && Math.abs(rs.height - rv.height) <= 2;
            return [
                { ok: es.position === "relative" && es.overflow === "hidden", texto: "La sección es relative y overflow-hidden" },
                { ok: win.getComputedStyle(v).position === "absolute", texto: "El video es absolute" },
                { ok: llena, texto: "El video llena toda la banda" },
                { ok: !!d && win.getComputedStyle(d).position === "relative", texto: "El texto es relative (queda encima del video)" }
            ];
        }
    },

    // =====================================================================
    // CAPITULO 4: TOUR (catalogo interactivo)
    // =====================================================================
    {
        cap: 4, id: "4-1", titulo: "Pintar el catálogo con forEach", tipo: "js",
        teoria:
            "<p>Las fechas del tour viven en un <b>arreglo de objetos</b>: una lista donde cada elemento tiene sus propios datos.</p>" +
            bloque('const fechas = [\n    { fecha: "23 de enero", ciudad: "Ciudad de México", recinto: "Estadio GNP Seguros" },\n    { fecha: "9 de abril", ciudad: "Monterrey", recinto: "Arena Monterrey" }\n];') +
            "<p>Con <code>forEach</code> recorres cada concierto y con <code>concierto.ciudad</code> sacas un dato. Luego armas la tarjeta con comillas invertidas y la agregas con <code>innerHTML +=</code>.</p>" +
            "<p>La ventaja: si mañana anuncian otra fecha, solo agregas un objeto al arreglo y la tarjeta aparece sola.</p>",
        referencias: [
            "SEGUNDA UNIDAD → <b>Actividad_Objetos_Arreglos</b> (objetos, arreglos y forEach)",
            "SEGUNDA UNIDAD → <b>Actividad_JavaScript</b> (variables)"
        ],
        tarea: "<p>Dentro del <code>forEach</code>, agrega una tarjeta por cada concierto con su <b>fecha, ciudad y recinto</b>.</p>",
        pistas: [
            "Empieza con <code>listaFechas.innerHTML += `</code> y cierra con <code>`;</code>",
            "Dentro van etiquetas normales con los datos: <code>&lt;h3&gt;${concierto.ciudad}&lt;/h3&gt;</code>",
            "Mira la solución de la lección 1-6: es la misma idea, pero con más datos."
        ],
        fijo:
            '<section class="p-6"><h2 class="text-3xl text-white mb-4">mosca tour</h2>' +
            '<div id="lista-fechas" class="grid grid-cols-1 md:grid-cols-2 gap-4"></div></section>',
        inicial:
`const fechas = [
    { fecha: "23 de enero", ciudad: "Ciudad de México", recinto: "Estadio GNP Seguros" },
    { fecha: "27 de marzo", ciudad: "Puebla", recinto: "Auditorio GNP Seguros" },
    { fecha: "9 de abril", ciudad: "Monterrey", recinto: "Arena Monterrey" },
    { fecha: "24 de abril", ciudad: "Guadalajara", recinto: "Arena Guadalajara" }
];

const listaFechas = document.querySelector("#lista-fechas");


// Recorre el arreglo y agrega una tarjeta por cada concierto
fechas.forEach((concierto) => {
    // tu codigo aqui
});`,
        solucion:
`const fechas = [
    { fecha: "23 de enero", ciudad: "Ciudad de México", recinto: "Estadio GNP Seguros" },
    { fecha: "27 de marzo", ciudad: "Puebla", recinto: "Auditorio GNP Seguros" },
    { fecha: "9 de abril", ciudad: "Monterrey", recinto: "Arena Monterrey" },
    { fecha: "24 de abril", ciudad: "Guadalajara", recinto: "Arena Guadalajara" }
];

const listaFechas = document.querySelector("#lista-fechas");


// Recorre el arreglo y agrega una tarjeta por cada concierto
fechas.forEach((concierto) => {
    listaFechas.innerHTML += \`
    <article class="bg-neutral-900 rounded-xl p-5 border-l-4 border-[#1f1fff]">
        <p class="text-[#d9f20b] font-bold uppercase text-sm">\${concierto.fecha}</p>
        <h3 class="text-3xl text-white">\${concierto.ciudad}</h3>
        <p>\${concierto.recinto}</p>
    </article>
    \`;
});`,
        revisar: (doc, win, a) => {
            const lista = doc.querySelector("#lista-fechas");
            const datos = a.valor(win, "fechas", []);
            const tarjetas = lista.children.length;
            const texto = lista.textContent;
            const ciudades = datos.length > 0 && datos.every((f) => texto.includes(f.ciudad));
            const recintos = datos.length > 0 && datos.every((f) => texto.includes(f.recinto));
            const fechasOk = datos.length > 0 && datos.every((f) => texto.includes(f.fecha));
            return [
                { ok: tarjetas > 0 && tarjetas === datos.length, texto: "Hay una tarjeta por cada concierto (" + tarjetas + " de " + datos.length + ")" },
                { ok: ciudades, texto: "Se ven todas las ciudades" },
                { ok: recintos, texto: "Se ven todos los recintos" },
                { ok: fechasOk, texto: "Se ven todas las fechas" }
            ];
        }
    },

    {
        cap: 4, id: "4-2", titulo: "Filtrar por mes con if", tipo: "js",
        teoria:
            "<p>Para filtrar, dentro del <code>forEach</code> se pregunta con un <code>if</code> si ese concierto se debe mostrar:</p>" +
            bloque('if (mesElegido === "Todos" || concierto.mes === mesElegido) {\n    // aqui se pinta la tarjeta\n}') +
            "<ul><li><code>===</code> compara si dos cosas son iguales.</li>" +
            "<li><code>||</code> significa <b>“o”</b>: basta con que una de las dos se cumpla.</li>" +
            "<li><code>campoMes.value</code> es lo que eligió la persona en el select.</li></ul>" +
            "<p>El <code>total</code> cuenta cuántas tarjetas se pintaron y se muestra en el contador.</p>",
        referencias: [
            "SEGUNDA UNIDAD → <b>Actividad_JavaScript</b> (if / else)",
            "SEGUNDA UNIDAD → <b>Actividad_Objetos_Arreglos</b> (forEach)"
        ],
        tarea: "<p>Ahorita el filtro no hace nada: siempre salen las 6 fechas. Agrega el <code>if</code> para que solo se pinten las del mes elegido (o todas si elige “Todos”). Prueba eligiendo un mes y dando clic en <b>Filtrar</b>.</p>",
        pistas: [
            "El <code>if</code> va dentro del <code>forEach</code> y encierra el <code>innerHTML +=</code> <b>y</b> el <code>total = total + 1</code>.",
            "Así: <code>if (mesElegido === \"Todos\" || concierto.mes === mesElegido) { ... }</code>"
        ],
        fijo:
            '<section class="p-6">' +
            '<div class="flex flex-wrap items-end gap-3 mb-4">' +
            '<label class="text-sm">Mes<select id="campo-mes" class="block bg-neutral-800 text-white rounded-lg px-3 py-2 mt-1">' +
            "<option>Todos</option><option>Enero</option><option>Marzo</option><option>Abril</option></select></label>" +
            '<button id="boton-filtrar" class="bg-[#d9f20b] text-black font-bold uppercase px-5 py-2 rounded-full">Filtrar</button>' +
            '<p>Mostrando <span id="contador-fechas" class="text-[#d9f20b] font-bold">0</span> fechas</p>' +
            "</div>" +
            '<div id="lista-fechas" class="grid grid-cols-1 md:grid-cols-2 gap-4"></div>' +
            "</section>",
        inicial:
`const fechas = [
    { mes: "Enero", fecha: "23 de enero", ciudad: "Ciudad de México" },
    { mes: "Enero", fecha: "28 de enero", ciudad: "Saltillo" },
    { mes: "Marzo", fecha: "11 de marzo", ciudad: "Mérida" },
    { mes: "Marzo", fecha: "27 de marzo", ciudad: "Puebla" },
    { mes: "Abril", fecha: "9 de abril", ciudad: "Monterrey" },
    { mes: "Abril", fecha: "24 de abril", ciudad: "Guadalajara" }
];

const campoMes = document.querySelector("#campo-mes");
const botonFiltrar = document.querySelector("#boton-filtrar");
const listaFechas = document.querySelector("#lista-fechas");
const contadorFechas = document.querySelector("#contador-fechas");


function mostrarFechas(mesElegido) {
    listaFechas.innerHTML = "";
    let total = 0;

    fechas.forEach((concierto) => {
        // Falta: solo pintar si eligio "Todos" o si el mes coincide
        listaFechas.innerHTML += \`
        <article class="bg-neutral-900 rounded-xl p-4">
            <p class="text-[#d9f20b] text-sm uppercase">\${concierto.fecha}</p>
            <h3 class="text-2xl text-white">\${concierto.ciudad}</h3>
        </article>
        \`;
        total = total + 1;
    });

    contadorFechas.textContent = total;
}


botonFiltrar.addEventListener("click", () => {
    mostrarFechas(campoMes.value);
});

// Al abrir la pagina se ven todas
mostrarFechas("Todos");`,
        solucion:
`const fechas = [
    { mes: "Enero", fecha: "23 de enero", ciudad: "Ciudad de México" },
    { mes: "Enero", fecha: "28 de enero", ciudad: "Saltillo" },
    { mes: "Marzo", fecha: "11 de marzo", ciudad: "Mérida" },
    { mes: "Marzo", fecha: "27 de marzo", ciudad: "Puebla" },
    { mes: "Abril", fecha: "9 de abril", ciudad: "Monterrey" },
    { mes: "Abril", fecha: "24 de abril", ciudad: "Guadalajara" }
];

const campoMes = document.querySelector("#campo-mes");
const botonFiltrar = document.querySelector("#boton-filtrar");
const listaFechas = document.querySelector("#lista-fechas");
const contadorFechas = document.querySelector("#contador-fechas");


function mostrarFechas(mesElegido) {
    listaFechas.innerHTML = "";
    let total = 0;

    fechas.forEach((concierto) => {
        if (mesElegido === "Todos" || concierto.mes === mesElegido) {
            listaFechas.innerHTML += \`
            <article class="bg-neutral-900 rounded-xl p-4">
                <p class="text-[#d9f20b] text-sm uppercase">\${concierto.fecha}</p>
                <h3 class="text-2xl text-white">\${concierto.ciudad}</h3>
            </article>
            \`;
            total = total + 1;
        }
    });

    contadorFechas.textContent = total;
}


botonFiltrar.addEventListener("click", () => {
    mostrarFechas(campoMes.value);
});

// Al abrir la pagina se ven todas
mostrarFechas("Todos");`,
        revisar: async (doc, win, a) => {
            const campo = doc.querySelector("#campo-mes");
            const boton = doc.querySelector("#boton-filtrar");
            const lista = doc.querySelector("#lista-fechas");
            const contador = doc.querySelector("#contador-fechas");

            async function probar(mes) {
                campo.value = mes;
                boton.click();
                await a.esperar(50);
                return { tarjetas: lista.children.length, contador: contador.textContent.trim() };
            }

            const marzo = await probar("Marzo");
            const enero = await probar("Enero");
            const todos = await probar("Todos");
            return [
                { ok: marzo.tarjetas === 2, texto: "Con “Marzo” salen solo 2 fechas (salen " + marzo.tarjetas + ")" },
                { ok: enero.tarjetas === 2, texto: "Con “Enero” salen solo 2 fechas (salen " + enero.tarjetas + ")" },
                { ok: todos.tarjetas === 6, texto: "Con “Todos” salen las 6" },
                { ok: marzo.contador === "2" && todos.contador === "6", texto: "El contador dice cuántas se están mostrando" }
            ];
        }
    },

    // =====================================================================
    // CAPITULO 5: CLUB DE FANS (formulario)
    // =====================================================================
    {
        cap: 5, id: "5-1", titulo: "Un formulario que no recarga la página", tipo: "js",
        teoria:
            "<p>Esto es lo que pide la actividad: <b>un formulario que muestre el resultado sin recargar</b>.</p>" +
            "<ul><li>El botón lleva <code>type=\"button\"</code>. Un botón normal dentro de un <code>form</code> lo “envía” y la página se recarga; con <code>type=\"button\"</code> no pasa eso.</li>" +
            "<li><code>campoNombre.value</code> es lo que escribió la persona.</li>" +
            "<li>Si falta algo, se muestra un aviso y <code>return</code> <b>corta ahí</b> la función para que no siga.</li>" +
            "<li>Si todo está bien, se arma la credencial con <code>innerHTML</code> y comillas invertidas.</li></ul>" +
            bloque('if (nombre === "" || ciudad === "") {\n    credencial.innerHTML = `<p class="text-red-400">Te falta el nombre o la ciudad.</p>`;\n    return;\n}') +
            "<p>¿Y Formspree? Lo usamos en el primer parcial, pero manda los datos a otra página (o sea, sí recarga). Aquí no lo ocupamos porque la actividad pide lo contrario.</p>",
        referencias: [
            ENCI + "<b>6-formularios.html</b> (form, label, input, select, botones)",
            "PRIMER_UNIDAD → <b>Formulario_Soporte</b> (formulario con validación)",
            "SEGUNDA UNIDAD → <b>Actividad_JavaScript</b> (if / else)"
        ],
        tarea: "<p>Completa el clic de “Sacar credencial”: si falta el nombre o la ciudad, muestra un aviso; si no, muestra la credencial con el <b>nombre, la ciudad y la canción favorita</b>. Pruébalo llenando el formulario de la vista.</p>",
        pistas: [
            "Primero guarda lo escrito: <code>const nombre = campoNombre.value;</code> (y lo mismo con ciudad y favorita).",
            "Luego el <code>if</code> de la explicación, con su <code>return</code>.",
            "Al final: <code>credencial.innerHTML = `&lt;article ...&gt;&lt;h3&gt;${nombre}&lt;/h3&gt; ...&lt;/article&gt;`;</code>"
        ],
        fijo:
            '<section class="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">' +
            '<form class="bg-neutral-900 p-6 rounded-xl">' +
            '<label for="campo-nombre" class="block mb-1">Nombre</label>' +
            '<input id="campo-nombre" type="text" class="w-full bg-neutral-800 text-white rounded-lg px-3 py-2 mb-4">' +
            '<label for="campo-ciudad" class="block mb-1">Ciudad</label>' +
            '<input id="campo-ciudad" type="text" class="w-full bg-neutral-800 text-white rounded-lg px-3 py-2 mb-4">' +
            '<label for="campo-favorita" class="block mb-1">Tu canción favorita de mosca</label>' +
            '<select id="campo-favorita" class="w-full bg-neutral-800 text-white rounded-lg px-3 py-2 mb-4">' +
            "<option>SAMSA</option><option>tuffluv</option><option>Canonizado</option><option>Estar Así Siempre</option><option>MARGOT</option></select>" +
            "<!-- type=\"button\" para que el formulario no recargue la pagina -->" +
            '<button type="button" id="boton-registrar" class="bg-[#d9f20b] text-black font-bold px-5 py-2 rounded-full">Sacar credencial</button>' +
            "</form>" +
            '<div><h2 class="text-2xl text-white mb-3">Tu credencial</h2>' +
            '<div id="credencial"><p class="text-neutral-500">Aquí aparecerá tu credencial.</p></div></div>' +
            "</section>",
        inicial:
`const campoNombre = document.querySelector("#campo-nombre");
const campoCiudad = document.querySelector("#campo-ciudad");
const campoFavorita = document.querySelector("#campo-favorita");
const botonRegistrar = document.querySelector("#boton-registrar");
const credencial = document.querySelector("#credencial");


botonRegistrar.addEventListener("click", () => {
    // 1. Guarda lo que escribio la persona con .value

    // 2. Si falta el nombre o la ciudad, muestra un aviso y corta con return

    // 3. Si todo esta bien, arma la credencial con innerHTML
});`,
        solucion:
`const campoNombre = document.querySelector("#campo-nombre");
const campoCiudad = document.querySelector("#campo-ciudad");
const campoFavorita = document.querySelector("#campo-favorita");
const botonRegistrar = document.querySelector("#boton-registrar");
const credencial = document.querySelector("#credencial");


botonRegistrar.addEventListener("click", () => {
    const nombre = campoNombre.value;
    const ciudad = campoCiudad.value;
    const favorita = campoFavorita.value;

    if (nombre === "" || ciudad === "") {
        credencial.innerHTML = \`<p class="text-red-400">Te falta el nombre o la ciudad.</p>\`;
        return;
    }

    credencial.innerHTML = \`
    <article class="bg-[#1f1fff] text-white border-2 border-[#d9f20b] rounded-xl p-6">
        <p class="text-[#d9f20b] text-xs uppercase tracking-widest">Club de fans NSQK</p>
        <h3 class="text-3xl text-white mt-2">\${nombre}</h3>
        <p class="mb-4">\${ciudad}</p>
        <p><strong>Favorita:</strong> \${favorita}</p>
    </article>
    \`;
});`,
        revisar: async (doc, win, a) => {
            const nombre = doc.querySelector("#campo-nombre");
            const ciudad = doc.querySelector("#campo-ciudad");
            const favorita = doc.querySelector("#campo-favorita");
            const boton = doc.querySelector("#boton-registrar");
            const credencial = doc.querySelector("#credencial");
            const textoInicial = credencial.textContent.trim();
            win.__sinRecargar = true;

            nombre.value = "";
            ciudad.value = "";
            boton.click();
            await a.esperar(50);
            const textoVacio = credencial.textContent.trim();

            nombre.value = "Ana Prueba";
            ciudad.value = "Colima";
            favorita.value = "MARGOT";
            boton.click();
            await a.esperar(50);
            const textoLleno = credencial.textContent;

            return [
                { ok: textoVacio !== textoInicial && textoVacio !== "", texto: "Con los campos vacíos muestra un aviso" },
                { ok: textoLleno.includes("Ana Prueba") && textoLleno.includes("Colima"), texto: "La credencial muestra el nombre y la ciudad" },
                { ok: textoLleno.includes("MARGOT"), texto: "La credencial muestra la canción favorita" },
                { ok: win.__sinRecargar === true, texto: "La página no se recargó" }
            ];
        }
    },

    // =====================================================================
    // CAPITULO 6: TOQUES FINALES
    // =====================================================================
    {
        cap: 6, id: "6-1", titulo: "El efecto de tele vieja", tipo: "css",
        teoria:
            "<p>Las rayitas de tele vieja son <b>una capa transparente encima de toda la página</b>. Esa capa no es un elemento del HTML: se crea con <code>body::after</code>, un “hijo invisible” que CSS le agrega al body.</p>" +
            "<ul><li><code>content: \"\"</code>: obligatorio para que exista.</li>" +
            "<li><code>position: fixed; inset: 0;</code>: que cubra toda la pantalla.</li>" +
            "<li><code>z-index: 100</code>: que quede encima de todo.</li>" +
            "<li><code>pointer-events: none</code>: <b>muy importante</b>. La capa deja pasar los clics; sin esto, ningún botón ni enlace funciona.</li>" +
            "<li>Las rayas: un <code>linear-gradient</code> mitad claro y mitad oscuro que se repite cada 4 px con <code>background-size</code>.</li></ul>" +
            bloque("background-image: linear-gradient(rgba(255, 255, 255, 0.05) 50%, rgba(0, 0, 0, 0.3) 50%);\nbackground-size: 100% 4px;"),
        referencias: [
            "PRIMER_UNIDAD → <b>Proyecto_Primera_Parcial/tech-corp/assets/css/styles.css</b> (body::before con linear-gradient: la misma idea, pero con cuadrícula)",
            ENCI + "<b>10-posicionamiento.html</b> (fixed y z-index)"
        ],
        tarea: "<p>Completa <code>body::after</code> para que toda la vista tenga rayitas de tele vieja <b>y el botón siga funcionando</b>.</p>",
        pistas: [
            "Escribe cada propiedad debajo de su comentario.",
            "Copia el <code>background-image</code> y el <code>background-size</code> de la explicación."
        ],
        fijo:
            '<main class="p-8">' +
            '<h1 class="text-6xl text-white">NSQK</h1>' +
            '<p class="mt-2">Texto de prueba para ver las rayas encima.</p>' +
            '<a href="#" id="boton-prueba" class="inline-block mt-6 bg-[#d9f20b] text-black font-bold uppercase px-6 py-3 rounded-full">Escuchar ahora</a>' +
            '<div class="mt-6 h-40 rounded-xl bg-[#1f1fff]"></div>' +
            "</main>",
        inicial:
`/* Capa encima de toda la pagina */
body::after {
    content: "";
    /* 1. Que cubra toda la pantalla */

    /* 2. Que quede encima de todo */

    /* 3. Que deje pasar los clics */

    /* 4. Las rayas */

}`,
        solucion:
`/* Capa encima de toda la pagina */
body::after {
    content: "";
    /* 1. Que cubra toda la pantalla */
    position: fixed;
    inset: 0;
    /* 2. Que quede encima de todo */
    z-index: 100;
    /* 3. Que deje pasar los clics */
    pointer-events: none;
    /* 4. Las rayas */
    background-image: linear-gradient(rgba(255, 255, 255, 0.05) 50%, rgba(0, 0, 0, 0.3) 50%);
    background-size: 100% 4px;
}`,
        revisar: (doc, win) => {
            const capa = win.getComputedStyle(doc.body, "::after");
            const boton = doc.querySelector("#boton-prueba");
            const r = boton.getBoundingClientRect();
            const encima = doc.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
            return [
                { ok: capa.position === "fixed", texto: "La capa es <code>position: fixed</code>" },
                { ok: parseInt(capa.zIndex, 10) >= 10, texto: "Tiene z-index para quedar encima" },
                { ok: capa.backgroundImage.includes("gradient"), texto: "Tiene las rayas (linear-gradient)" },
                { ok: capa.pointerEvents === "none" && encima === boton, texto: "Los clics pasan a través de la capa (pointer-events: none)" }
            ];
        }
    },

    {
        cap: 6, id: "6-2", titulo: "Una foto que se desvanece", tipo: "css",
        teoria:
            "<p>Una foto pegada como rectángulo se ve “cortada”. Con <code>mask-image</code> le pones una <b>plantilla</b>: donde la plantilla es negra la foto se ve, y donde es transparente la foto desaparece.</p>" +
            "<p>Con un <code>radial-gradient</code> (un óvalo) la foto se ve en el centro y se desvanece hacia las orillas:</p>" +
            bloque("-webkit-mask-image: radial-gradient(ellipse 50% 60% at 50% 45%, black 55%, transparent 100%);\nmask-image: radial-gradient(ellipse 50% 60% at 50% 45%, black 55%, transparent 100%);") +
            "<ul><li><code>ellipse 50% 60%</code>: qué tan ancho y qué tan alto es el óvalo.</li>" +
            "<li><code>at 50% 45%</code>: dónde está su centro.</li>" +
            "<li><code>black 55%</code>: hasta dónde la foto se ve completa; de ahí a <code>transparent 100%</code> se va desvaneciendo.</li>" +
            "<li>La línea con <code>-webkit-</code> es la misma, para navegadores un poco más viejos.</li></ul>" +
            "<p>Así están hechas las fotos del tour y del index.</p>",
        referencias: [
            ENCI + "<b>8-basicoCSS.html</b> (fondo e imágenes)",
            "Proyecto → <b>css/estilos.css</b>, clase <code>.foto-difuminada</code>"
        ],
        tarea: "<p>Haz que la foto se desvanezca en el negro de la página. Luego juega con los números del óvalo para ver cómo cambia.</p>",
        pistas: [
            "Copia las dos líneas de la explicación dentro de <code>.foto-difuminada { }</code>.",
            "Si cambias <code>black 55%</code> por <code>black 80%</code>, se ve más foto antes de desvanecerse."
        ],
        fijo:
            '<section class="p-6 text-center">' +
            '<img src="imagenes/nsqk-escenario.jpg" alt="NSQK en el escenario con lentes oscuros y micrófono, bajo luces azules" class="foto-difuminada w-full max-w-2xl mx-auto">' +
            '<h2 class="text-5xl text-white -mt-8 relative">Biografía</h2>' +
            "</section>",
        inicial:
`/* La foto se ve normal en el centro y se desvanece hacia las orillas */
.foto-difuminada {

}`,
        solucion:
`/* La foto se ve normal en el centro y se desvanece hacia las orillas */
.foto-difuminada {
    -webkit-mask-image: radial-gradient(ellipse 50% 60% at 50% 45%, black 55%, transparent 100%);
    mask-image: radial-gradient(ellipse 50% 60% at 50% 45%, black 55%, transparent 100%);
}`,
        revisar: (doc, win) => {
            const e = win.getComputedStyle(doc.querySelector(".foto-difuminada"));
            const mascara = (e.maskImage || "") + " " + (e.webkitMaskImage || "");
            return [
                { ok: mascara.includes("gradient"), texto: "La foto tiene mask-image con un degradado" },
                { ok: mascara.includes("radial"), texto: "Es un óvalo (radial-gradient), así se desvanece por todos lados" }
            ];
        }
    }
];
