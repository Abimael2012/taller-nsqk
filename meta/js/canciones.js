// Tracklist de mosca

const canciones = [
    "SAMSA",
    "tuffluv (ft. Nina)",
    "Dientes De Fierro (ft. Jean Dawson)",
    "Canonizado",
    "Santurce",
    "Lo Tuvimos Pero Ya No Está (ft. Riosse)",
    "¿Qué Tan Cerca Es Cerca?",
    "Mil Problemas (ft. Eslabón Armado)",
    "Hombre De Bien",
    "SANGRE !",
    "Estar Así Siempre (ft. Julieta Venegas)",
    "Peces Muertos",
    "No Basta Con Querernos Más",
    "Ghost In The Shell",
    "Circo (ft. Kevin Kaarl)",
    "Atrapado y Libre",
    "MARGOT"
];

const listaCanciones = document.querySelector("#lista-canciones");
const botonCanciones = document.querySelector("#boton-canciones");
const botonOcultar = document.querySelector("#boton-ocultar");


botonCanciones.addEventListener("click", () => {
    // Primero se limpia para que no se repitan si le dan dos veces
    listaCanciones.innerHTML = "";

    canciones.forEach((cancion) => {
        listaCanciones.innerHTML += `<li>${cancion}</li>`;
    });
});


botonOcultar.addEventListener("click", () => {
    listaCanciones.innerHTML = "";
});


// El perro: empieza callado, con un clic ladra y con otro se calla
const videoPerro = document.querySelector("#video-perro");
videoPerro.volume = 0.4; // de 0 a 1, para que no ladre tan fuerte

videoPerro.addEventListener("click", () => {
    if (videoPerro.muted === true) {
        videoPerro.muted = false;
    } else {
        videoPerro.muted = true;
    }
});
