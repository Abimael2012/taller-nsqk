// Catalogo de fechas del mosca tour con filtro por mes

const fechas = [
    { mes: "Enero", fecha: "23 de enero", ciudad: "Ciudad de México", recinto: "Estadio GNP Seguros", boletera: "Ticketmaster", enlace: "https://www.ticketmaster.com.mx/nsqk-boletos/artist/3000770" },
    { mes: "Enero", fecha: "28 de enero", ciudad: "Saltillo", recinto: "Auditorio Parque Las Maravillas", boletera: "", enlace: "" },
    { mes: "Enero", fecha: "30 de enero", ciudad: "Torreón", recinto: "Coliseo Centenario", boletera: "", enlace: "" },
    { mes: "Febrero", fecha: "4 de febrero", ciudad: "Chihuahua", recinto: "Recinto por confirmar", boletera: "", enlace: "" },
    { mes: "Febrero", fecha: "6 de febrero", ciudad: "Ciudad Juárez", recinto: "Recinto por confirmar", boletera: "", enlace: "" },
    { mes: "Febrero", fecha: "12 de febrero", ciudad: "Hermosillo", recinto: "Auditorio INAM", boletera: "", enlace: "" },
    { mes: "Febrero", fecha: "20 de febrero", ciudad: "San Luis Potosí", recinto: "Teatro del Parque Tangamanga I", boletera: "", enlace: "" },
    { mes: "Febrero", fecha: "25 de febrero", ciudad: "Orizaba", recinto: "Auditorio Metropolitano", boletera: "", enlace: "" },
    { mes: "Febrero", fecha: "26 de febrero", ciudad: "Pachuca", recinto: "Auditorio Arema Explanada Pachuca", boletera: "", enlace: "" },
    { mes: "Febrero", fecha: "27 de febrero", ciudad: "Querétaro", recinto: "Auditorio Josefa Ortiz de Domínguez", boletera: "eTicket", enlace: "https://www.eticket.mx/eventos.aspx?idartista=4172" },
    { mes: "Marzo", fecha: "4 de marzo", ciudad: "Tlaxcala", recinto: "Centro Cultural Universitario", boletera: "", enlace: "" },
    { mes: "Marzo", fecha: "6 de marzo", ciudad: "Veracruz", recinto: "Auditorio Benito Juárez", boletera: "", enlace: "" },
    { mes: "Marzo", fecha: "11 de marzo", ciudad: "Mérida", recinto: "Foro GNP Seguros", boletera: "eTicket", enlace: "https://www.eticket.mx/eventos.aspx?idartista=4172" },
    { mes: "Marzo", fecha: "13 de marzo", ciudad: "Cancún", recinto: "Recinto por confirmar", boletera: "", enlace: "" },
    { mes: "Marzo", fecha: "18 de marzo", ciudad: "León", recinto: "El Domo de la Feria", boletera: "", enlace: "" },
    { mes: "Marzo", fecha: "20 de marzo", ciudad: "Morelia", recinto: "Recinto por confirmar", boletera: "", enlace: "" },
    { mes: "Marzo", fecha: "25 de marzo", ciudad: "Oaxaca", recinto: "Recinto por confirmar", boletera: "", enlace: "" },
    { mes: "Marzo", fecha: "27 de marzo", ciudad: "Puebla", recinto: "Auditorio GNP Seguros", boletera: "eTicket", enlace: "https://www.eticket.mx/eventos.aspx?idartista=4172" },
    { mes: "Abril", fecha: "2 de abril", ciudad: "Tijuana", recinto: "Recinto por confirmar", boletera: "", enlace: "" },
    { mes: "Abril", fecha: "9 de abril", ciudad: "Monterrey", recinto: "Arena Monterrey", boletera: "Superboletos", enlace: "https://www.superboletos.com" },
    { mes: "Abril", fecha: "16 de abril", ciudad: "Tuxtla Gutiérrez", recinto: "Recinto por confirmar", boletera: "", enlace: "" },
    { mes: "Abril", fecha: "18 de abril", ciudad: "Toluca", recinto: "Teatro Morelos", boletera: "", enlace: "" },
    { mes: "Abril", fecha: "24 de abril", ciudad: "Guadalajara", recinto: "Arena Guadalajara", boletera: "Superboletos", enlace: "https://www.superboletos.com" }
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

            // Si ya hay boletera anunciada sale el boton, si no, un texto
            let boletos = "";
            if (concierto.boletera === "") {
                boletos = `<p class="text-neutral-500 text-sm">Boletos en la taquilla del recinto</p>`;
            } else {
                boletos = `<a href="${concierto.enlace}" target="_blank" class="inline-block bg-[#d9f20b] text-black font-bold text-sm uppercase px-4 py-2 rounded-full hover:bg-white transition">Boletos en ${concierto.boletera}</a>`;
            }

            listaFechas.innerHTML += `
            <article class="bg-neutral-900 rounded-xl p-5 border-l-4 border-[#1f1fff] hover:border-[#d9f20b] transition">
                <p class="text-[#d9f20b] font-bold uppercase text-sm">${concierto.fecha}</p>
                <h2 class="text-3xl text-white">${concierto.ciudad}</h2>
                <p class="mb-4">${concierto.recinto}</p>
                ${boletos}
            </article>
            `;
            total = total + 1;
        }
    });

    contadorFechas.textContent = total;
}


botonFiltrar.addEventListener("click", () => {
    mostrarFechas(campoMes.value);
});


// Al abrir la pagina se ven todas
mostrarFechas("Todos");
