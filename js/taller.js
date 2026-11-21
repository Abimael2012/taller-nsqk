// Taller NSQK: arma la vista previa en vivo, revisa el codigo y guarda el avance.
// Las lecciones estan en lecciones.js; este archivo solo es el "motor".

(function () {
    const CAPITULOS = window.CAPITULOS;
    const LECCIONES = window.LECCIONES;
    const CLAVE_HECHAS = "taller-nsqk-hechas";
    const BASE = new URL("./", location.href.split("#")[0]).href;

    // Estilo que comparten todas las vistas: la letra de los titulos del proyecto
    const ESTILO_BASE = 'h1,h2,h3,.logo{font-family:Impact,"Arial Narrow Bold","Arial Black",sans-serif;text-transform:uppercase;letter-spacing:1px;font-weight:normal}';

    const contenido = document.querySelector("#contenido");
    const menu = document.querySelector("#menu");
    const lateral = document.querySelector("#lateral");

    let hechas = leerHechas();
    let generacion = 0;
    let modoVista = "compu";

    // ---------- Guardado en el navegador (si falla, el taller sigue funcionando) ----------
    function leerHechas() {
        try { return JSON.parse(localStorage.getItem(CLAVE_HECHAS)) || []; } catch (e) { return []; }
    }
    function guardarHechas() {
        try { localStorage.setItem(CLAVE_HECHAS, JSON.stringify(hechas)); } catch (e) { /* sin guardado */ }
    }
    function leerCodigo(id) {
        try { return localStorage.getItem("taller-nsqk-codigo-" + id); } catch (e) { return null; }
    }
    function guardarCodigo(id, codigo) {
        try { localStorage.setItem("taller-nsqk-codigo-" + id, codigo); } catch (e) { /* sin guardado */ }
    }

    // ---------- Ayudas que usan las revisiones de cada leccion ----------
    const AYUDA = {
        esperar(ms) { return new Promise((r) => setTimeout(r, ms)); },
        cargo(img) { return img.complete && img.naturalWidth > 0; },
        esperarImagenes(doc) {
            const pendientes = [...doc.images].filter((img) => !img.complete);
            const promesas = pendientes.map((img) => new Promise((r) => {
                img.addEventListener("load", r, { once: true });
                img.addEventListener("error", r, { once: true });
            }));
            return Promise.race([Promise.all(promesas), AYUDA.esperar(3000)]);
        },
        // Lee una variable del codigo del alumno (const de nivel superior)
        valor(win, expresion, respaldo) {
            try { return win.eval(expresion); } catch (e) { return respaldo; }
        },
        clases(el) { return el ? [...el.classList] : []; }
    };

    // ---------- Arma el documento que se ve en la vista previa ----------
    function armarDocumento(lec, codigo) {
        let cabeza = '<meta charset="UTF-8"><base href="' + BASE + '">' +
            '<script src="https://cdn.tailwindcss.com"><\/script>' +
            "<style>" + ESTILO_BASE + "</style>";
        if (lec.estiloFijo) cabeza += "<style>" + lec.estiloFijo + "</style>";

        let cuerpo = "";
        if (lec.tipo === "html") {
            cuerpo = codigo;
        } else if (lec.tipo === "css") {
            cabeza += "<style>" + codigo + "</style>";
            cuerpo = lec.fijo;
        } else if (lec.tipo === "js") {
            const avisoError = "window.onerror=function(m){var p=document.createElement('p');" +
                "p.textContent='Error en tu código: '+m;" +
                "p.style.cssText='color:#f87171;background:#1f0d0d;padding:10px 14px;margin:12px;border-radius:8px;font-family:monospace;font-size:13px';" +
                "document.body.appendChild(p);};";
            cuerpo = lec.fijo + "<script>" + avisoError + "<\/script><script>\n" + codigo + "\n<\/script>";
        }

        return '<!DOCTYPE html><html lang="es"><head>' + cabeza + '</head><body class="bg-black text-neutral-300">' + cuerpo + "</body></html>";
    }

    // ---------- Menu lateral ----------
    function pintarMenu(idActual) {
        let html = "";
        CAPITULOS.forEach((cap) => {
            html += '<div class="capitulo-menu"><h3>' + cap.numero + ". " + cap.titulo + "</h3>";
            LECCIONES.filter((l) => l.cap === cap.numero).forEach((l) => {
                const hecha = hechas.includes(l.id) ? "✓" : "";
                const activa = l.id === idActual ? " activa" : "";
                html += '<a href="#l=' + l.id + '" class="' + activa + '"><span class="marca-hecha">' + hecha + "</span>" + l.id + " · " + l.titulo + "</a>";
            });
            html += "</div>";
        });
        menu.innerHTML = html;

        const total = LECCIONES.length;
        const listas = LECCIONES.filter((l) => hechas.includes(l.id)).length;
        document.querySelector("#progreso-relleno").style.width = (listas / total * 100) + "%";
        document.querySelector("#progreso-texto").textContent = listas + " de " + total + " lecciones";
    }

    // ---------- Pantalla de inicio ----------
    function mostrarInicio() {
        let tarjetas = "";
        CAPITULOS.forEach((cap) => {
            const delCap = LECCIONES.filter((l) => l.cap === cap.numero);
            const listas = delCap.filter((l) => hechas.includes(l.id)).length;
            tarjetas += '<a class="tarjeta-capitulo" href="#l=' + delCap[0].id + '">' +
                '<span class="numero">Capítulo ' + cap.numero + " · " + listas + "/" + delCap.length + "</span>" +
                "<h2>" + cap.titulo + "</h2><p>" + cap.descripcion + "</p>" +
                '<p class="archivo">' + cap.archivo + "</p></a>";
        });

        contenido.innerHTML =
            '<section class="portada">' +
            "<h1>Taller <span>NSQK</span></h1>" +
            "<p>Aquí aprendes a construir cada parte del sitio del equipo. Cada lección te explica un tema, " +
            "te dice en qué parte de la enciclopedia lo vimos y te deja escribir el código para que veas, en ese mismo momento, cómo se acomoda.</p>" +
            "</section>" +
            '<div class="pasos">' +
            '<div class="paso"><b>1. Lee</b><p>La explicación corta y la referencia a la enciclopedia o a la actividad donde ya lo vimos.</p></div>' +
            '<div class="paso"><b>2. Escribe</b><p>Cambia el código del editor. La vista de al lado se actualiza sola mientras escribes.</p></div>' +
            '<div class="paso"><b>3. Compara</b><p>En la pestaña <em>La meta</em> ves cómo debe quedar. La revisión te dice qué falta.</p></div>' +
            "</div>" +
            '<p style="color:var(--suave)">No tienes que hacerlo igualito: la meta es una idea de a dónde llegar. Si lo resuelves con otra lógica y la revisión pasa, está bien.</p>' +
            '<div class="tarjetas-capitulos">' + tarjetas + "</div>";
    }

    // ---------- Pantalla de una leccion ----------
    function mostrarLeccion(id) {
        const indice = LECCIONES.findIndex((l) => l.id === id);
        if (indice === -1) { mostrarInicio(); return; }
        const lec = LECCIONES[indice];
        const cap = CAPITULOS.find((c) => c.numero === lec.cap);
        const anterior = LECCIONES[indice - 1];
        const siguiente = LECCIONES[indice + 1];

        let referencias = "";
        lec.referencias.forEach((r) => { referencias += "<li>" + r + "</li>"; });

        let pistas = "";
        (lec.pistas || []).forEach((p) => { pistas += "<li>" + p + "</li>"; });

        const encabezado =
            '<div class="encabezado-leccion">' +
            '<span class="ruta-capitulo">Capítulo ' + cap.numero + " · " + cap.titulo + " · " + cap.archivo + "</span>" +
            "<h1>" + lec.id + " " + lec.titulo + "</h1></div>";

        const navegacion =
            '<div class="navegacion-leccion">' +
            (anterior ? '<a class="boton" href="#l=' + anterior.id + '">← ' + anterior.id + " " + anterior.titulo + "</a>" : "<span></span>") +
            (siguiente ? '<a class="boton" href="#l=' + siguiente.id + '">' + siguiente.id + " " + siguiente.titulo + " →</a>" : '<a class="boton" href="#">Volver al inicio</a>') +
            "</div>";

        const cajaTeoria = '<div class="caja"><h2>Qué vas a aprender</h2>' + lec.teoria + "</div>";
        const cajaReferencias = '<div class="caja caja-referencia"><h2>Dónde lo vimos</h2><ul>' + referencias + "</ul></div>";

        // Lecciones que solo se leen (por ejemplo, la de GitHub)
        if (lec.tipo === "lectura") {
            const hecha = hechas.includes(lec.id);
            contenido.innerHTML = encabezado +
                '<div class="leccion solo-lectura"><div>' + cajaTeoria + cajaReferencias +
                '<button class="boton boton-principal" id="marcar-leida" type="button">' + (hecha ? "✓ Ya la leíste" : "Marcar como leída") + "</button>" +
                navegacion + "</div></div>";
            document.querySelector("#marcar-leida").addEventListener("click", () => {
                if (!hechas.includes(lec.id)) { hechas.push(lec.id); guardarHechas(); }
                pintarMenu(lec.id);
                document.querySelector("#marcar-leida").textContent = "✓ Ya la leíste";
            });
            window.scrollTo(0, 0);
            return;
        }

        const etiquetaEditor = { html: "Editas: HTML (la estructura y las clases de Tailwind)", css: "Editas: CSS (como si fuera tu estilos.css)", js: "Editas: JavaScript (como si fuera tu archivo .js)" }[lec.tipo];

        contenido.innerHTML = encabezado +
            '<div class="leccion">' +
            "<div>" + cajaTeoria + cajaReferencias +
            '<div class="caja caja-tarea"><h2>Tu tarea</h2>' + lec.tarea +
            (pistas ? '<details class="pistas"><summary>¿Te atoraste? Ver pistas</summary><ul>' + pistas + "</ul></details>" : "") +
            "</div>" +
            '<p class="editor-etiqueta">' + etiquetaEditor + "</p>" +
            '<div class="editor"><div class="numeros" id="numeros">1</div>' +
            '<textarea id="editor" spellcheck="false" autocomplete="off" autocapitalize="off"></textarea></div>' +
            '<div class="botones">' +
            '<button class="boton boton-principal" id="boton-revisar" type="button">Revisar</button>' +
            '<button class="boton" id="boton-reiniciar" type="button">Empezar de nuevo</button>' +
            '<button class="boton" id="boton-solucion" type="button">Ver una solución</button>' +
            "</div>" +
            navegacion +
            "</div>" +
            '<div class="columna-vista">' +
            '<div id="felicidades"></div>' +
            '<div class="barra-vista">' +
            '<div class="pestanas"><button class="pestana activa" data-vista="tuya" type="button">Tu resultado</button>' +
            '<button class="pestana" data-vista="meta" type="button">La meta</button></div>' +
            '<div class="tamanos"><button class="pestana' + (modoVista === "compu" ? " activa" : "") + '" data-tamano="compu" type="button">💻 Compu</button>' +
            '<button class="pestana' + (modoVista === "celular" ? " activa" : "") + '" data-tamano="celular" type="button">📱 Celular</button></div>' +
            "</div>" +
            '<div class="marco-vista' + (modoVista === "celular" ? " celular" : "") + '" id="marco-vista">' +
            '<iframe id="vista-tuya" title="Vista previa de tu código"></iframe>' +
            '<iframe id="vista-meta" title="Vista de la meta" hidden></iframe>' +
            "</div>" +
            '<p class="nota-meta">La vista se actualiza sola mientras escribes.</p>' +
            '<div class="caja revision" style="margin-top:14px"><h2>Revisión</h2><ul id="lista-revision"><li>Revisando…</li></ul></div>' +
            "</div></div>";

        const editor = document.querySelector("#editor");
        const numeros = document.querySelector("#numeros");
        const vistaTuya = document.querySelector("#vista-tuya");
        const vistaMeta = document.querySelector("#vista-meta");
        let metaCargada = false;
        let temporizador = null;

        editor.value = leerCodigo(lec.id) ?? lec.inicial;
        actualizarNumeros();

        function actualizarNumeros() {
            const lineas = editor.value.split("\n").length;
            let texto = "";
            for (let i = 1; i <= lineas; i++) texto += i + "\n";
            numeros.textContent = texto;
            numeros.scrollTop = editor.scrollTop;
        }

        function actualizarVista() {
            const gen = ++generacion;
            const codigo = editor.value;
            guardarCodigo(lec.id, codigo);
            document.querySelector("#lista-revision").innerHTML = "<li>Revisando…</li>";
            vistaTuya.onload = () => setTimeout(() => revisar(gen, codigo), 700);
            vistaTuya.srcdoc = armarDocumento(lec, codigo);
        }

        async function revisar(gen, codigo) {
            if (gen !== generacion) return;
            let resultado;
            try {
                resultado = await lec.revisar(vistaTuya.contentDocument, vistaTuya.contentWindow, AYUDA, codigo);
            } catch (e) {
                resultado = [{ ok: false, texto: "Todavía no se puede revisar: falta algo en tu código (" + e.message + ")" }];
            }
            if (gen !== generacion) return;

            let html = "";
            resultado.forEach((r) => {
                html += '<li class="' + (r.ok ? "si" : "no") + '"><span class="icono">' + (r.ok ? "✓" : "✗") + "</span><span>" + r.texto + "</span></li>";
            });
            document.querySelector("#lista-revision").innerHTML = html;

            const todoBien = resultado.length > 0 && resultado.every((r) => r.ok);
            const cajaFelicidades = document.querySelector("#felicidades");
            if (todoBien) {
                if (!hechas.includes(lec.id)) { hechas.push(lec.id); guardarHechas(); pintarMenu(lec.id); }
                cajaFelicidades.innerHTML = '<div class="felicidades"><strong>¡Lección completa!</strong>' +
                    (siguiente ? '<a class="boton" href="#l=' + siguiente.id + '">Siguiente: ' + siguiente.titulo + " →</a>" : '<a class="boton" href="#">Terminaste el taller 🎉</a>') + "</div>";
            } else {
                cajaFelicidades.innerHTML = "";
            }
        }

        editor.addEventListener("input", () => {
            actualizarNumeros();
            clearTimeout(temporizador);
            temporizador = setTimeout(actualizarVista, 500);
        });

        editor.addEventListener("scroll", () => { numeros.scrollTop = editor.scrollTop; });

        // Tab escribe 4 espacios en vez de brincar al siguiente boton
        editor.addEventListener("keydown", (e) => {
            if (e.key === "Tab") {
                e.preventDefault();
                const inicio = editor.selectionStart;
                editor.setRangeText("    ", inicio, editor.selectionEnd, "end");
                editor.dispatchEvent(new Event("input"));
            }
        });

        document.querySelector("#boton-revisar").addEventListener("click", actualizarVista);

        document.querySelector("#boton-reiniciar").addEventListener("click", () => {
            if (confirm("¿Regresar el código a como estaba al principio? Se borra lo que escribiste en esta lección.")) {
                editor.value = lec.inicial;
                actualizarNumeros();
                actualizarVista();
            }
        });

        document.querySelector("#boton-solucion").addEventListener("click", () => {
            if (confirm("¿Seguro? Intenta primero con las pistas. Si ves la solución, tu código se reemplaza.")) {
                editor.value = lec.solucion;
                actualizarNumeros();
                actualizarVista();
            }
        });

        // Pestanas: tu resultado / la meta
        document.querySelectorAll("[data-vista]").forEach((b) => {
            b.addEventListener("click", () => {
                document.querySelectorAll("[data-vista]").forEach((x) => x.classList.remove("activa"));
                b.classList.add("activa");
                const verMeta = b.dataset.vista === "meta";
                vistaMeta.hidden = !verMeta;
                vistaTuya.hidden = verMeta;
                if (verMeta && !metaCargada) {
                    vistaMeta.srcdoc = armarDocumento(lec, lec.solucion);
                    metaCargada = true;
                }
            });
        });

        // Tamanos: compu / celular
        document.querySelectorAll("[data-tamano]").forEach((b) => {
            b.addEventListener("click", () => {
                document.querySelectorAll("[data-tamano]").forEach((x) => x.classList.remove("activa"));
                b.classList.add("activa");
                modoVista = b.dataset.tamano;
                document.querySelector("#marco-vista").classList.toggle("celular", modoVista === "celular");
                // La revision se repite porque algunas cosas cambian con el ancho
                setTimeout(() => revisar(generacion, editor.value), 400);
            });
        });

        actualizarVista();
        window.scrollTo(0, 0);
    }

    // ---------- Navegacion con el # de la direccion ----------
    function mostrar() {
        const encontrado = location.hash.match(/l=([\d-]+)/);
        const id = encontrado ? encontrado[1] : null;
        if (id) mostrarLeccion(id); else mostrarInicio();
        pintarMenu(id);
        lateral.classList.remove("abierta");
    }

    document.querySelector("#boton-menu").addEventListener("click", () => {
        lateral.classList.toggle("abierta");
    });

    window.addEventListener("hashchange", mostrar);
    mostrar();
})();
