var $palabras = [
    'ORACLE',
    'JUEGO',
    'DESAFIO',
    'PROGRAMO'
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

function volverAlInicio() {
    nuevoJuego();
    $traer.tablero.classList.add("oculto");
    $traer.inicio.classList.remove("oculto");
}

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
    var letrasP = 0;

    //crear espacios para letras acertadas
    for (let letra of palabra) {
        let $span = document.createElement("span");
        let $txt = document.createTextNode('');
        if (adivinadas.indexOf(letra) >= 0) {
            $txt.nodeValue = letra;
        }
        $span.setAttribute('class', 'letra acertada')
        $span.appendChild($txt);
        letrasAcertadas.appendChild($span);
        letrasP++;
    }

    function ganaste() {
        var adivinadas = $juego.adivinadas;
        if (letrasP == adivinadas.length) {
            alert("Ganaste");
            volverAlInicio();
        }
    }
    
    //crear letras erradas
    for (let letra of erradas) {
        let $span = document.createElement("span");
        let $txt = document.createTextNode(letra);
        $span.setAttribute('class', 'letra errada')
        $span.appendChild($txt);
        letrasErradas.appendChild($span);
    }
    setTimeout(ganaste, 300);
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
    }
    nuevoJuego();
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
    $juego.adivinadas = [];
    $juego.erradas = [];
    dibujar($juego, $juego.palabra.length);
}

function adivinar(letra) {
    var adivinadas = $juego.adivinadas;
    var erradas = $juego.erradas;
    var palabra = $juego.palabra;

    //recorre la palabra y se fija si tiene la letra presionada
    if (palabra.indexOf(letra) >= 0) {

        if (palabra.indexOf(letra) !== palabra.lastIndexOf(letra)) {
            adivinadas.push(letra + "x2");
        }

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
    console.log($juego);
}


//el -1 hace que se le reste uno al lenght para que no pueda dar undefined, ya que el array tiene 3 elementos y el indice es de 0 a 2 (cuando aparezca el 3 salta undefined)
function palabraAleatoria(palabras) {
    var palabra = Math.round(Math.random() * (palabras.length - 1));
    return palabras[palabra];
}

function check(e) {
    tecla = (document.getElementById(input)) ? e.keyCode : e.which;

    //siempre permitir tecla de borrar
    if (tecla == 8) {
        return true;
    }

    // patron de entrada
    patron = /[A-Za-zñÑ]/;
    teclaFinal = String.fromCharCode(tecla);
    return patron.test(teclaFinal);
}

window.onkeypress = function adivinarLetra(e) {
    var letra = e.key
    letra = letra.toUpperCase();
    if (/[^A-ZÑ]/.test(letra)) {
        return
    }
    adivinar(letra);
    if ($juego.estado == 7) {
        setTimeout(perdiste, 100);
        function perdiste() {
            alert("Perdiste");
            volverAlInicio();
            nuevoJuego();
        }
    }
    dibujar($juego, letra);
}

//* FIN FUNCIONES

//!funciones asignadas a botones

//inicio
$traer.botonInicio.onclick = iniciarJuego, resetearJuego, nuevoJuego, dibujar($juego, $juego.palabra.length);
$traer.botonAgregarPalabra.onclick = mostrarAgregarPalabra;

//agregar palabra
$traer.botonGuardarPalabra.onclick = agregarPalabraYEmpezar;
$traer.botonCancelarPalabra.onclick = cancelarPalabra;

//tablero
$traer.desistir.onclick = desistir;
$traer.nuevoJuego.onclick = nuevoJuego;