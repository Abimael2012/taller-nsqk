// Formulario del club de fans: arma la credencial en pantalla

const campoNombre = document.querySelector("#campo-nombre");
const campoCiudad = document.querySelector("#campo-ciudad");
const campoFavorita = document.querySelector("#campo-favorita");
const campoConcierto = document.querySelector("#campo-concierto");
const botonRegistrar = document.querySelector("#boton-registrar");
const credencial = document.querySelector("#credencial");


botonRegistrar.addEventListener("click", () => {
    const nombre = campoNombre.value;
    const ciudad = campoCiudad.value;
    const favorita = campoFavorita.value;
    const concierto = campoConcierto.value;

    if (nombre === "" || ciudad === "") {
        credencial.innerHTML = `<p class="text-red-400">Te falta el nombre o la ciudad.</p>`;
        return;
    }

    let textoConcierto = "Te esperamos en el próximo concierto.";
    if (concierto === "Sí") {
        textoConcierto = "Nos vemos en el Estadio GNP.";
    }

    credencial.innerHTML = `
    <article class="bg-[#1f1fff] text-white shadow-2xl border-2 border-[#d9f20b] rounded-xl p-6">
        <p class="text-[#d9f20b] text-xs uppercase tracking-widest">Club de fans NSQK</p>
        <h3 class="text-3xl text-white mt-2">${nombre}</h3>
        <p class="mb-4">${ciudad}</p>
        <p><strong class="text-white">Favorita:</strong> ${favorita}</p>
        <p class="mt-2">${textoConcierto}</p>
    </article>
    `;
});
