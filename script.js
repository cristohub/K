
var animacion = lottie.loadAnimation({
    container: document.getElementById('animacion'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'assets/pin.json'
});

let musicaFondoReproducida = false; 
let musicaCumpleReproducida = false; 

document.getElementById("startBtn").addEventListener("click", function() {
    iniciarCelebracion();
    cambiarFondo();
});

function iniciarCelebracion() {
    document.getElementById("startBtn").style.display = "none";
  //  document.getElementById("confetiBtn").style.display = "flex";
    document.getElementById("animacion").classList.add("mostrar");

    // Reproducir la música de fondo solo una vez
    if (!musicaFondoReproducida) {
        var musicaFondo = document.getElementById("musicaFondo");
        musicaFondo.play();
        musicaFondoReproducida = true;
    }

    setTimeout(() => {
        contarHistoria();
    }, 1500);
}

document.getElementById("confetiBtn").addEventListener("click", function() {
    activarEfecto();
});

function activarEfecto() {
    document.getElementById("confetiBtn").classList.add("activado");
    lanzarConfeti();
    cambiarFondo();
    detenerMusicaFondo();
    reproducirSonidoCumple();
    reproducirSonidowi() 
    mostrarMensajeAleatorio();
    
    setTimeout(function() {
        document.getElementById("confetiBtn").classList.remove("activado");
    }, 1000);
}

function lanzarConfeti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}

function cambiarFondo() {
    document.body.style.background = `linear-gradient(45deg, ${colorAleatorio()}, ${colorAleatorio()})`;
}

function colorAleatorio() {
    const colores = ["#ff9a9e", "#fad0c4", "#ffdde1", "#a1c4fd", "#c2e9fb", "#fbc2eb", "#a18cd1"];
    return colores[Math.floor(Math.random() * colores.length)];
}

function detenerMusicaFondo() {
    var musicaFondo = document.getElementById("musicaFondo");
    musicaFondo.pause(); // Detener la música de fondo
}

function reproducirSonidoCumple() {
    if (!musicaCumpleReproducida) { 
        var audio = new Audio('assets/happy-birthday.mp3');
        audio.play();
        musicaCumpleReproducida = true;
        
        audio.onended = function() {
            reanudarMusicaFondo(); 
            document.getElementById("confetiBtn").style.display = "none"; 
            document.getElementById("confetiBtn").disabled = true; 
        };
    }
}

function reanudarMusicaFondo() {
    var musicaFondo = document.getElementById("musicaFondo");
    musicaFondo.play(); // Reanudar la música de fondo
}



function reproducirSonidowi() {
   
        var audio = new Audio('assets/cute-character-wee.mp3');
        audio.play();
        
   
}


const historia = [
"Hola, Karlita.",  
"Soy Nieve, un pequeño pingüino mensajero.",  
"He viajado hasta aquí con un mensaje muy especial para ti…",  
"Hoy no es un día cualquiera.",  
"Un día como hoy, el mundo recibió un regalo increíble:",  
"una persona maravillosa, única y llena de luz…",  
"esa persona eres tú. ✨",  
"No existen palabras suficientes para describir lo valiosa que eres.",  
"A veces, la vida tiene días difíciles, pero quiero que recuerdes algo muy importante:",  
"Eres fuerte, eres especial y mereces todo lo bonito que la vida tenga para dar.",  
"No dejes que nada ni nadie te haga dudar de lo increíble que eres.",  
"Hoy, más que nunca, quiero que sientas todo el amor que te rodea.",  
"Porque hoy es tu día. 🎉",  
"Feliz cumpleaños, Karlita. <4🎂"
];
    let pasoHistoria = 0;
let escribiendo = false;

function escribirTexto(texto, velocidad, callback) {
    if (escribiendo) return;
    escribiendo = true;

    const mensajeDiv = document.getElementById("mensaje");
    mensajeDiv.style.display = "block";
    mensajeDiv.innerHTML = "";
    let i = 0;

    function escribir() {
        if (i < texto.length) {
            mensajeDiv.innerHTML += texto.charAt(i);
            i++;
            setTimeout(escribir, velocidad);
        } else {
            setTimeout(() => {
                mensajeDiv.style.display = "none";
                escribiendo = false;
                if (callback) callback();
            }, 2500);
        }
    }

    escribir();
}

function contarHistoria() {
if (pasoHistoria < historia.length) {
    escribirTexto(historia[pasoHistoria], 90, () => { 
        pasoHistoria++;
        setTimeout(contarHistoria, 50); 
    });
} else {
   
    pasoHistoria = 0;
    document.getElementById("confetiBtn").style.display = "flex";
    activarEfecto();
}
}




const mensajes = [
"¡Que viva la cumpleañera! 🎉🥳",
"¡Que tengas un día hermoso! ",
"¡Hoy brillas más que nunca! ✨",
"¡Te mando un abrazo gigante! 🤗",
"¡Mucha alegría para ti! 🎉",
"¡Eres increíble, nunca lo olvides! 💫",
"¡Sonríe, te lo mereces! 😊",
"¡Karlita, eres única! 💕",
"¡Llénate de buenas vibras! ✨",
"¡Tu felicidad es lo más importante!",
"¡Eres valiente y capaz de todo! 💪",
"¡Mucho amor para ti hoy y siempre! 💖",
"¡Disfruta tu día al máximo! 🥳",
"¡Te mereces todo lo bonito del mundo! 🎁"
];

let mensajesDisponibles = [...mensajes];

function obtenerMensajeAleatorio() {
if (mensajesDisponibles.length === 0) {
mensajesDisponibles = [...mensajes]; 
}

const indice = Math.floor(Math.random() * mensajesDisponibles.length);
return mensajesDisponibles.splice(indice, 1)[0]; // Extraer sin repetir
}

function mostrarMensajeAleatorio() {
const mensajeDiv = document.createElement("div");
mensajeDiv.classList.add("mensaje-aleatorio");
mensajeDiv.innerText = obtenerMensajeAleatorio();

const x = Math.random() * (window.innerWidth - 200);
const y = Math.random() * (window.innerHeight - 100);
mensajeDiv.style.left = `${x}px`;
mensajeDiv.style.top = `${y}px`;

document.body.appendChild(mensajeDiv);
setTimeout(() => mensajeDiv.remove(), 3000);
}




