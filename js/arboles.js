class Node {
  constructor(value) {
    this.value = value
    this.right = null
    this.left = null
    this.vista = null;
  }
}

class Tree {
  constructor() {
    this.root = null
  }

  isEmpty() {
    return this.root === null
  }

  add(value) {
    // arbol no tiene elementos
    if (this.isEmpty()) {
      this.root = new Node(value)
      return
    }

    var aux = this.root

    while (aux) {
      // vamos hacia la izquierda
      if (value < aux.value) {
        if (aux.left) {
          aux = aux.left
        } else {
          aux.left = new Node(value)
          return
        }
      } else { // vamos hacia la derecha
        if (aux.right) {
          aux = aux.right
        } else {
          aux.right = new Node(value)
          return
        }
      }
    }
  }

  addRecursive(value, node = this.root) {
    if (!node) {
      this.root = new Node(value)
      return
    }

    if (value < node.value) {
      if (node.left) {
        return this.addRecursive(value, node.left)
      }
      node.left = new Node(value)
      return
    } else { // vamos hacia la derecha
      if (node.right) {
        return this.addRecursive(value, node.right)
      }
      node.right = new Node(value)
      return
    }
  }

  find(value) {
    if (this.isEmpty()) {
      return null
    }

    var aux = this.root
    if (aux.value === value) {
      return aux
    }

    while (aux) {
      // si encontramos el nodo con el valor
      // paramos de iterar.
      if (aux.value === value) {
        break
      }
      // seguimos buscando a la derecha
      if (aux.value < value) {
        aux = aux.right
      } else if (aux.value > value) {
        // seguimos buscando a la izquierda
        aux = aux.left
      }
    }
    // retornamos el nodo encontrado.
    // si no encontramos el nodo con el valor
    // aux, toma el valor null.
    return aux
  }

  findRecursive(value, node = this.root) {
    if (node == null) return null;
    if (node.value == value) {
      resaltarNodo(node);
      return node
    }

    if (node.value < value) {
      return this.findRecursive(value, node.right)
    } else if (node.value > value) {
      return this.findRecursive(value, node.left)
    }
  }

  findMin(node = this.root) {
    if (!this.isEmpty()) {
      /**
        * siempre a la izquierda de cualquier nodo
        * estará el menor valor.
        * iteramos hasta el último menor.
        */
      while (node.left) {
        node = node.left
      }
      return node
    }
  }

  delete(value, node = this.root) {
    if (!node) {
      return null
    }

    if (node.value == value) {
      // no tiene hijos

      resaltarNodo(node);

      if (!node.left && !node.right) {
        return null
      }
      // no tiene hijo izquierdo
      if (!node.left) {
        return node.right
      }
      // no tiene hijo derecho
      if (!node.right) {
        return node.left
      }

      // tiene dos hijos
      // buscamos el menor de los hijos
      var temp = this.findMin(node.right)
      // con ese valor reemplazamos el valor del nodo que queremos eliminar.
      node.value = temp.value;
      // seguimos iterando para reemplazar la rama que cambio,
      // eliminando el nodo que está repetido
      node.right = this.delete(temp.value, node.right)
      return node;
    }
    // buscamos a la derecha
    if (node.value < value) {
      node.right = this.delete(value, node.right)
      return node
    }
    // buscamos a la izquierda
    if (node.value > value) {
      node.left = this.delete(value, node.left)
      return node
    }
  }
  print(node = this.root) {
    if (!node) {
      return
    }
    this.print(node.left)
    console.log(node.value)
    this.print(node.right)
  }
  /**
    * recorre primero toda la rama izquierda
    * de izquierda al centro.
    * Luego imprime la raíz, y finalmente
    * recorre la rama derecha, del centro hacia
    * la derecha.
    */
  inOrder(node = this.root, texto = "") {

    if (!node) {
      return texto
    }
    texto = this.inOrder(node.left, texto)
    resaltarNodo(node);
    texto += "[" + node.value + "] ";
    console.log(node.value)
    console.log(texto)
    texto = this.inOrder(node.right, texto)

    return texto;
  }

  /**
    * Imprime primero la raíz, luego
    * toda la rama izquierda de izquierda al centro.
    * y finalmente recorre la rama derecha,
    * del centro hacia la derecha.
    */
  preOrder(node = this.root, texto = "") {
    if (!node) {
      return texto
    }
    resaltarNodo(node);
    texto += "[" + node.value + "] ";
    console.log(node.value)
    texto = this.preOrder(node.left, texto)
    texto = this.preOrder(node.right, texto)
    return texto
  }

  async amplitud(node = this.root) {
    if (!node) {
      return mostrarRecorrido(auxAmplitud);
    }
    resaltarNodo(node);
    auxAmplitud += "[" + node.value + "] ";
    console.log(node.value)
    await sleep(1000)
    t.amplitud(node.left)

    t.amplitud(node.right)
    await sleep(1000)
    return
  }
  /**
    * Recorre el árbol de izquierda hacia el centro.
    * Luego del centro hacia la derecha, y finalmente
    * imprime la raíz.
    */
  postOrder(node = this.root, texto = "") {
    if (!node) {
      return texto
    }
    texto = this.postOrder(node.left, texto)
    texto = this.postOrder(node.right, texto)
    texto += "[" + node.value + "] ";
    resaltarNodo(node);
    console.log(node.value)
    return texto;
  }
}




function recorrerNodo(nodo, x, y, nivel = 1) {
  let circulo = crearNodo(nodo.value, ((width / 2) + x), y);
  nodo.vista = circulo;
  if (nodo.left != null) {
    crearLine((width / 2) + x, (width / 2) + x + ((width / 2) / -nivel), y + 15, y + 65, circulo);
    recorrerNodo(nodo.left, x + ((width / 2) / -nivel), y + 80, nivel + 3);

  }
  if (nodo.right != null) {
    crearLine((width / 2) + x, (width / 2) + x + ((width / 2) / nivel), y + 15, y + 65, circulo);
    recorrerNodo(nodo.right, x + ((width / 2) / nivel), y + 80, nivel + 3);
  }
}

function crearNodo(a, x, y) {
  let circulo = b.append("g").attr("id", a);
  circulo.append("circle").attr("r", "15")
    .style("stroke", "red")
    .style("fill", "rgb(179, 228, 240)").style("cx", x).style("cy", y).style("stroke-width", "3");
  circulo.append("text").text(a).attr("x", x - 5).attr("y", y + 5).attr("fill", "black");
  return circulo
}

function crearLine(x1, x2, y1, y2, circulo) {
  circulo.append("line").attr("x1", x1).attr("y1", y1).attr("x2", x2).attr("y2", y2).attr("style", "stroke:rgb(255,0,0);stroke-width:2")

}

const width = 850,
  height = 1000;

let b = d3.select(".usable").append("svg")
  .attr("width", width)
  .attr("height", width)



function agregar() {
  let valor = document.getElementById("addText").value;
  t.add(valor);
  recorrerNodo(t.root, 0, 50, 2);
}

function eliminar() {

  let valor = document.getElementById("addText").value;
  let encontrado = t.findRecursive(valor);
  if (encontrado != null) {
    t.delete(valor);
    setTimeout(function () {
      d3.selectAll("g").remove();
      recorrerNodo(t.root, 0, 50, 2);
    }, delayInMilliseconds);
  } else {
    alerta("No se encontro el nodo a eliminar")
  }


}

var delayInMilliseconds = 1000; //1 second


function buscar() {
  defaultCircles();
  let valor = document.getElementById("addText").value;
  resaltado = t.findRecursive(valor);
  if (resaltado == null) {
    alerta("No se encontro ese nodo")
  } else {
    alerta("Nodo encontrado")
  }
}


function defaultCircles() {
  d3.selectAll("g").remove();
  recorrerNodo(t.root, 0, 50, 2);
}

function resaltarNodo(node) {
  let circle = node.vista.select("circle")
  circle.transition().attr("r", "19").style("stroke-width", "5px").style("stroke", "blue");

  if (node.left || node.right) {
    let y1 = parseInt(node.vista.select("line").attr("y1"));
    node.vista.selectAll("line").transition().attr("y1", (y1 + 7))
    resaltadosTodos = false;
  }

}

async function recorrerArbol() {
  d3.selectAll("g").remove();
  recorrerNodo(t.root, 0, 50, 2);
  let listaDesplegable = document.getElementById("listaRecorridos");
  let texto = listaDesplegable.options[listaDesplegable.selectedIndex].text;
  let valueSeleccionado = listaDesplegable.options[listaDesplegable.selectedIndex].value;
  let listaRecorrido = null;
  if (valueSeleccionado == 1) {
    listaRecorrido = t.inOrder();
  } else if (valueSeleccionado == 2) {
    listaRecorrido = t.preOrder();
  } else if (valueSeleccionado == 3) {
    listaRecorrido = t.postOrder();
  } else if (valueSeleccionado == 4) {
    auxAmplitud = "";
    listaRecorrido = "";
    t.amplitud()
  }
  mostrarRecorrido(listaRecorrido)
}

function mostrarRecorrido(listaRecorrido) {
  document.getElementById("resultadoRecorrido").innerHTML = "Resultado del recorrido:<br>" + listaRecorrido;

}

let auxAmplitud;


function alerta(mensaje = "falta mensaje") {
  alert(mensaje);
}

function sleep2(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}



function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function demo() {
  console.log('Taking a break...');
  await sleep(2000);
  console.log('Two seconds later, showing sleep in a loop...');
}
let t = new Tree()



/*
const xhttp = new XMLHttpRequest()
xhttp.open('GET','treeData.txt',true)
xhttp.send();
xhttp.onreadystatechange = function() {
  if (this.readyState==4 && this.status == 200){
    console.log(this.responseText)
  }
}*/

function leerArchivo(e) {
  var archivo = e.target.files[0];
  if (!archivo) {
    return;
  }
  var lector = new FileReader();
  lector.onload = function (e) {
    var contenido = e.target.result;
    cargarContenido(contenido);
  };
  lector.readAsText(archivo);
}

function cargarContenido(contenido) {
  let jsonListo = JSON.parse(contenido);
  d3.selectAll("g").remove();
  t = new Tree();
  for (var i = 0; i < jsonListo.length; i++) {
    t.addRecursive(jsonListo[i])
  }

  recorrerNodo(t.root, 0, 50, 2);
}

document.getElementById('file-input')
  .addEventListener('change', leerArchivo, false);


