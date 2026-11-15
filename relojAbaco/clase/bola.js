//Creamos un constructor de bolas. Para dibujar la bola es necesario indicar
//la posición, las proporciones y el color
class Bola {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  mostrar(colorBola) {
    noStroke();
    fill(colorBola);
    ellipse(this.x, this.y, this.w, this.h);
  }
}
