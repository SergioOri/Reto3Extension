//-------------
//RELOJ ÁBACO
//-------------

//Variables globales
let horas, minutos, segundos;
let espacioLinea;
let yHoras, yMinutos, ySegundos;
let largoLinea;

let grupoHoras, grupoMinutos, grupoSegundos;

let separacion, separacionHoras;
let tamanoBola, tamanoBolaHoras;

let colorSegundos, colorMinutos, colorHoras, colorFondo, colorFont, strokeColor;
let modoOscuro = true;

let font;
let mostrarTexto = true;
let textTam = 25;

async function setup() {
  let lienzo = createCanvas(300, 150);
  lienzo.parent("lienzo");
  font = await loadFont("font/PressStart2P-Regular.ttf");

  //Llamamos a una serie de funciones
  calcularMedidas();
  crearGrupos();
  cargarAjustes();
  crearBolasIniciales();
  conectarBotones();
}

function draw() {
  //En cada instante comprobamos la hora
  horas = hour();
  minutos = minute();
  segundos = second();

  //Llamamos a las diferentes funciones
  dibujarFondo();
  escribirNombre();
  ensenarTexto();
  actualizarGrupos();
  mostrarBolas();
}
/*---------------------------
-----------------------------*/
// FUNCIONES PARA EL SETUP//
/*---------------------------
-----------------------------*/

//Calculamos las medidas de los diferentes elementos que aparecen en pantalla, basandonos en las dimensiones de la pantalla
function calcularMedidas() {
  //Definimos la longitud y separación entre las bolas
  largoLinea = width * 0.8;
  separacion = largoLinea / 60;
  separacionHoras = largoLinea / 24;
  //Indicamos el tamaño de las bolas, teniendo en cuenta su separación
  tamanoBola = max(separacion * 0.8, 3);
  tamanoBolaHoras = max(separacionHoras * 0.8, 3);
  //Indicamos la altura de aparición de las bolas
  espacioLinea = height / 4;
  yHoras = espacioLinea;
  yMinutos = espacioLinea * 2;
  ySegundos = espacioLinea * 3;
}

//Creamos los grupos de las bolas
function crearGrupos() {
  grupoHoras = new GrupoBolas(yHoras, separacionHoras, tamanoBolaHoras);
  grupoMinutos = new GrupoBolas(yMinutos, separacion, tamanoBola);
  grupoSegundos = new GrupoBolas(ySegundos, separacion, tamanoBola);
}

//Cargamos los ajustes necesarios del programa
function cargarAjustes() {
  //Comprobamos si en el storage hay ajustes de sesiones anteriores
  modoOscuro = recuperar("modoOscuro", true);
  mostrarTexto = recuperar("mostrarTexto", true);
  //Cambiamos la clase si no esta en modo oscuro
  document.body.classList.toggle("modo-claro", !modoOscuro);
  actualizarBtnTexto();
  aplicarPaleta();
}

//Llenamos las arrays creadas con una cantidad de bolas según la hora actual
function crearBolasIniciales() {
  grupoHoras.iniciar(hour());
  grupoMinutos.iniciar(minute());
  grupoSegundos.iniciar(second());
}

//Permitimos que los botones creados puedan llamar a una función al ser pulsados
function conectarBotones() {
  document.getElementById("btnModo").addEventListener("click", cambiarModo);
  document.getElementById("btnTexto").addEventListener("click", alternarTexto);
}

/*---------------------------
-----------------------------*/
// FUNCIONES PARA EL DRAW//
/*---------------------------
-----------------------------*/

//Dibujamos el fondo y las líneas que representan el ábaco
function dibujarFondo() {
  background(colorFondo);
  strokeWeight(0.5);
  stroke(strokeColor);
  line(0, yHoras, largoLinea, yHoras);
  line(0, yMinutos, largoLinea, yMinutos);
  line(0, ySegundos, largoLinea, ySegundos);
}

//Escribimos la hora actual
function escribirTiempo() {
  textFont(font);
  strokeWeight(0);
  textSize(textTam);
  textAlign(CENTER);
  fill(colorFont);
  //Empleamos nf("número", número) para modificar el formato y asegurarnos que siempre haya dos digitos.
  //Por ejemplo, en vez de 1:3:2, sea 01:03:02.
  text(nf(horas, 2), width / 6, yHoras);
  text(":", width / 6 + textTam * 1.5, yHoras);
  text(nf(minutos, 2), width / 3, yMinutos);
  text(":", width / 3 + textTam * 1.5, yMinutos);
  text(nf(segundos, 2), width / 2, ySegundos);
}

//Mostramos el texto
function ensenarTexto() {
  if (mostrarTexto) {
    escribirTiempo();
  }
}

//Dibujamos las bolas en las diferentes líneas
function mostrarBolas() {
  let parpadeoHoras = horas == 23 && minutos >= 59 && segundos >= 57;
  let parpadeoMinutos = minutos >= 59 && segundos >= 57;
  let parpadeoSegundos = segundos >= 57;

  grupoHoras.mostrar(colorHoras, parpadeoHoras);
  grupoMinutos.mostrar(colorMinutos, parpadeoMinutos);
  grupoSegundos.mostrar(colorSegundos, parpadeoSegundos);
}

//Actualizamos los grupos de bolas
function actualizarGrupos() {
  grupoHoras.actualizar(horas);
  grupoMinutos.actualizar(minutos);
  grupoSegundos.actualizar(segundos);
}

//Funcion para parpadear.
//Se genera un parpadeo alterando 5 frames visibles y 5 ocultos
function parpadeo() {
  return frameCount % 10 < 5;
}

//Creamos una función para escribir el título de la obra y mi nombre.
function escribirNombre() {
  strokeWeight(0);
  fill(colorFont);
  textFont(font);
  textAlign(LEFT, CENTER);
  textSize(5);
  text("Reloj Ábaco_Sergio Orihuela Alba", 0, height - 2.5);
}

//Cambiamos los colores de los elementos según si es modo oscuro o claro
function aplicarPaleta() {
  if (modoOscuro) {
    colorSegundos = "#FF5CA8";
    colorMinutos = "#BC6CFF";
    colorHoras = "#00F0FF";
    colorFondo = "#0B0F2B";
    colorFont = "#4A4766";
    strokeColor = "#B8763A";
  } else {
    colorSegundos = "#ff4f8a";
    colorMinutos = "#A56BDF";
    colorHoras = "#00afc2";
    colorFondo = "#FFE9F3";
    colorFont = "#e3bfcf";
    strokeColor = "#B9A3D9";
  }
}
//Cambiamos el modo de colores de la pantalla
function cambiarModo() {
  modoOscuro = !modoOscuro;
  aplicarPaleta();
  document.body.classList.toggle("modo-claro", !modoOscuro);
  storeItem("modoOscuro", modoOscuro);
}

function actualizarBtnTexto() {
  //Cambiamos el texto del botón según si se muestra el texto
  document.getElementById("btnTexto").textContent = mostrarTexto
    ? "Ocultar Hora"
    : "Mostrar Hora";
}

//Alternamos el texto del botón de mostrar horas
function alternarTexto() {
  mostrarTexto = !mostrarTexto;
  actualizarBtnTexto();
  storeItem("mostrarTexto", mostrarTexto);
}
//Comprobamos si en el storage hay información y la recuperamos
function recuperar(clave, valorPrede) {
  let valor = getItem(clave);
  if (valor === null) {
    return valorPrede;
  }
  return valor;
}
