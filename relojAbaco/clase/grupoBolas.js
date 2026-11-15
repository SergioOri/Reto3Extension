class GrupoBolas {
  constructor(y, separacion, tamano) {
    this.y = y;
    this.separacion = separacion;
    this.tamano = tamano;
    this.bolas = [];
    this.valorAnterior = 0;
  }
  crearBola() {
    let x = this.separacion + this.bolas.length * this.separacion;
    this.bolas.push(new Bola(x, this.y, this.tamano, this.tamano));
  }
  iniciar(valor) {
    for (let i = 0; i < valor; i++) {
      this.crearBola();
    }
    this.valorAnterior = valor;
  }
  actualizar(valor) {
    //Comprobamos que el valor actual no sea el mismo que el anterior.
    if (valor != this.valorAnterior) {
      if (valor == 0) {
        this.bolas = []; //Si el valor es 0, vaciamos la array
      } else {
        this.crearBola(); //En caso contrario, se crea una nueva bola
      }
      this.valorAnterior = valor; //Actualizamos el valor anterior
    }
  }
  //Dibujamos las bolas, teniendo en cuenta que tipo son, si parpadean y su color
  mostrar(colorBola, parpadea) {
    //Para cada elemento de la array comprobamos si parapadea
    for (let bola of this.bolas) { 
      if (!parpadea || parpadeo()) {
        bola.mostrar(colorBola);
      }
    }
  }
}
