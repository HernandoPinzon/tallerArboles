class Node {
    constructor(value) {
        this.value = value;
        this.right = null;
        this.left = null;
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
                    aux.left = new NodoV(value,aux)
                    return
                }
            } else { // vamos hacia la derecha
                if (aux.right) {
                    aux = aux.right
                } else {
                    aux.right = new NodoV(value,aux)
                    return
                }
            }
        }
    }
}

class NodoV {
    constructor(value, b = creador) {
        this.x=50;
        this.y=50;
        this.visual= b.append("g");
        this.visualizar();
    }

    visualizar(){
        visual.append("circle").attr("r", "15")
            .style("stroke", "red")
            .style("fill", "rgb(179, 228, 240)")
            .style("cx", x)
            .style("cy", y)
            .style("stroke-width", "3");

        visual.append("text")
            .text(value)
            .attr("x", x - 5)
            .attr("y", y + 5)
            .attr("fill", "black");
    }
}

let creador = d3.select(".usable").append("svg")
    .attr("width", "1000")
    .attr("height", "1000");

let lacosa = new NodoV(27);
lacosa.visualizar();

