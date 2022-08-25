var $palabras = [
    'ALURA',
    'ORACLE',
    'AHORCADO',
    'PROGRAMO',
    'JUEGO',
    'DESAFIO'
];

var $traer = {
    //inicio
    inicio: document.querySelector(".inicio"),
    botonInicio: document.querySelector(".iniciar"),
    botonAgregarPalabra: document.querySelector(".agregar-palabra"),

    //ingresar palabra
    seccionAgregarPalabra: document.querySelector(".ingresar-palabra"),
    input: document.getElementById("input"),
    botonGuardarPalabra: document.querySelector(".guardar-palabra"),
    botonCancelarPalabra: document.querySelector(".cancelar-palabra"),
    
    //ahorcado
    tablero: document.querySelector(".tablero"),
    ahorcado: document.getElementById("img-ahorcado"),
    letrasAcertadas: document.querySelector(".letras-acertadas"),
    letrasErradas: document.querySelector(".letras-erradas"),
    nuevoJuego: document.querySelector(".nuevo-juego"),
    desistir: document.querySelector(".desistir")
}

var $juego = {
    palabra: palabraAleatoria($palabras),
    estado: 1,
    adivinadas: [],
    erradas: []
}

//* FUNCIONES

function dibujar(juego, letra) {
    resetearJuego();
    var ahorcado = $traer.ahorcado;
    var estado = $juego.estado;
    ahorcado.src = "media/estados/" + estado + ".png";
    var palabra = $juego.palabra;
    var adivinadas = $juego.adivinadas;
    var letrasAcertadas = $traer.letrasAcertadas;
    var erradas = $juego.erradas;
    var letrasErradas = $traer.letrasErradas;

    //crear letras acertadas
    for (let letra of palabra) {
        let $span = document.createElement("span");
        let $txt = document.createTextNode('');
        if (adivinadas.indexOf(letra) >= 0) {
            $txt.nodeValue = letra;
        }
        $span.setAttribute('class', 'letra acertada')
        $span.appendChild($txt);
        letrasAcertadas.appendChild($span);
    }
    
    //crear letras erradas
    for (let letra of erradas) {
        let $span = document.createElement("span");
        let $txt = document.createTextNode(letra);
        $span.setAttribute('class', 'letra errada')
        $span.appendChild($txt);
        letrasErradas.appendChild($span);
    }

    /*for (let letra of palabra) {
        $span = document.createElement('span');
        $txt = document.createTextNode('');
        var textoGuiones = letra.replace(/[A-Z]/g, "")
        $txt.nodeValue = textoGuiones;
        $span.setAttribute('class', 'letra acertada');
        $span.appendChild($txt);
        $traer.letrasAcertadas.appendChild($span);
    }*/
}

//oculta el inicio y muestra el ahorcado
function iniciarJuego() {
    palabraAleatoria($palabras);
    setTimeout(mostrar, 200)
    function mostrar() {
        $traer.inicio.classList.add("oculto");
        $traer.tablero.classList.remove("oculto");
    }
}

function desistir() {
    nuevoJuego();
    $traer.tablero.classList.add("oculto");
    $traer.inicio.classList.remove("oculto");
}

//ocultar el inicio y mostrar la pantalla de agregar palabra
function mostrarAgregarPalabra() {
    setTimeout(mostrar, 200)
    function mostrar() {
        $traer.inicio.classList.add("oculto");
        $traer.seccionAgregarPalabra.classList.remove("oculto");
    }
}

//toma el input y agrega la palabra al array
function agregarPalabraYEmpezar() {
    var palabraNueva = $traer.input.value;

    //verifica que se agregue una palabra al input
    if (palabraNueva.length < 1) {
        alert("Ingrese una palabra");
    }
    else{
        $palabras.push(palabraNueva);
        console.log($palabras);
        $traer.input.value = "";
        setTimeout(mostrar, 200)
        function mostrar() {
            $traer.seccionAgregarPalabra.classList.add("oculto");
            $traer.tablero.classList.remove("oculto");
        }
        console.log($juego)
    }
}

function cancelarPalabra() {
    setTimeout(mostrar, 200)
    function mostrar() {
        $traer.seccionAgregarPalabra.classList.add("oculto");
        $traer.inicio.classList.remove("oculto");
    }
}

//borra todos los guiones creados por el juego anterior
function resetearJuego() {
    var acertadas = $juego.adivinadas;
    var erradas = $juego.erradas;
    var letrasAcertadas = $traer.letrasAcertadas;
    var letrasErradas = $traer.letrasErradas;
    acertadas.innerHTML = '';
    erradas.innerHTML = '';
    letrasAcertadas.innerHTML = '';
    letrasErradas.innerHTML = '';
}

//resetea la configuracion inicial y elige una nueva palabra
function nuevoJuego() {
    resetearJuego();
    $juego.palabra = palabraAleatoria($palabras);
    $juego.estado = 1;
    $juego.palabra = palabraAleatoria($palabras);
    $juego.estado = 1;
    $juego.adivinadas = [];
    $juego.erradas = [];
    dibujar($juego, $juego.palabra.length);
    console.log($juego);
}

function adivinar(letra) {
    var adivinadas = $juego.adivinadas;
    var erradas = $juego.erradas;
    var palabra = $juego.palabra;

    //recorre la palabra y se fija si tiene la letra presionada
    if (palabra.indexOf(letra) >= 0) {

        //si tiene la letra pero esta no esta en el arreglo de adivinadas la agrega
        if (adivinadas.indexOf(letra) < 0) {
            adivinadas.push(letra);
        }

        //si no tiene la letra y no esta en el arreglo de erradas la agrega
    } else if (palabra.indexOf(letra) < 0) {
        if (erradas.indexOf(letra) < 0) {
            if (adivinadas.indexOf(letra) < 0) {
                erradas.push(letra);
            }
            $juego.estado++;
        }
    }
    console.log($juego)
}


//el -1 hace que se le reste uno al lenght para que no pueda dar undefined, ya que el array tiene 3 elementos y el indice es de 0 a 2 (cuando aparezca el 3 salta undefined)
function palabraAleatoria(palabras) {
    var palabra = Math.round(Math.random() * (palabras.length - 1));
    return palabras[palabra];
}

window.onkeypress = function adivinarLetra(e) {
    var letra = e.key
    letra = letra.toUpperCase();
    if (/[^A-ZÑ]/.test(letra)) {
        return
    }
    adivinar(letra);
    if ($juego.estado == 7) {
        alert("perdiste")
    }
    dibujar($juego, letra);
}

//* FIN FUNCIONES

console.log($juego.palabra);

//!funciones asignadas a botones

//inicio
$traer.botonInicio.onclick = iniciarJuego, dibujar($juego, $juego.palabra.length);
$traer.botonAgregarPalabra.onclick = mostrarAgregarPalabra;

//agregar palabra
$traer.botonGuardarPalabra.onclick = agregarPalabraYEmpezar;
$traer.botonCancelarPalabra.onclick = cancelarPalabra;

//tablero
$traer.desistir.onclick = desistir;
$traer.nuevoJuego.onclick = nuevoJuego;

/*
var juego = null;

function jugar(juego){
    //actualizar imagen hombre
    var hombre = traer.ahorcado;
    var estado = juego.estado;
    if (estado == 8) {
        estado = juego.previo;
    }
    hombre.src = "media/estados/" + estado + ".png";

    //crear letras adivinadas
    var palabra = juego.palabra;
    var adivinada = juego.adivinada;
    var letrasAdivinadas = traer.letrasAcertadas;

    //borrar los elementos anteriores
    letrasAdivinadas.innerHTML = '';
    for (let letra of palabra){
        let $span = document.createElement('span');
        let $txt = document.createTextNode('');
        if (adivinada.indexOf(letra) >= 0){
            $txt.nodeValue = letra;
        }
        $span.setAttribute("class", "letra acertada");
        $span.appendChild($txt);
        letrasAdivinadas.appendChild($span);
    }

    //crear letras erradas
    var errada = juego.errado;
    var letrasErradas = traer.letrasErradas;

    //borrar los elementos anteriores
    letrasErradas.innerHTML = '';
    for (let letra of errada) {
        let $span = document.createElement('span');
        let $txt = document.createTextNode(letra);
        $span.setAttribute("class", "letra errada");
        $span.appendChild($txt)
        letrasErradas.appendChild($span);
    }
}

function adivinar(juego, letra){
    var estado = juego.estado;
    
    //verificar si ya se gano o perdio
    if (estado == 7 || estado == 8) {
        return;
    }

    var adivinado = juego.adivinada;
    var errado = juego.errado;

    //si ya se adivino o erro la letra no hay que hacer nada
    if (adivinado.indexOf(letra) >=0 || errado.indexOf(letra) >= 0) {
        return
    }

    var palabra = juego.palabra;

    //si la letra es de la palabra
    if (palabra.indexOf(letra) >= 0) {
        let ganado = true;

        //comprobamos si ganamos
        for (let l of palabra) {
            if (adivinado.indexOf(l) < 0 && l !== letra) {
                ganado = false;
                juego.previo = juego.estado;
                break
            }
        }

        //si ya se gano hay que indicarlo
        if (ganado) {
            juego.estado = 8;
        }
        //agreagar la letra a la lista de letras adivinadas
        adivinado.push(letra);
    } 

    //si la letra no pertenece a la palabra
    else {
        juego.estado++;
        errado.push(letra);
    }
}

window.onkeypress = function adivinarLetra(e) {
    var letra = e.key
    letra = letra.toUpperCase();
    if (/[^A-ZÑ]/.test(letra)) {
        return
    }
    adivinar(juego, letra);
    jugar(juego);
}

window.nuevoJuego = function nuevoJuego() {
    var palabra = palabraAleatoria();
    juego = {};
    juego.palabra = palabra;
    juego.estado = 1;
    juego.adiviado = [];
    juego.errado = []; 
    jugar(juego);
}

function palabraAleatoria() {
    var index = ~~(Math.random() * palabras.length)
    return palabras[index]
}
    
nuevoJuego();
console.log(juego);
*/