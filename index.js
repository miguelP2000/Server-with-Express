const express = require("express");
const app = express();
const puerto = 8080;

const fs = require('fs')
console.clear()


class Contenedor {

    constructor(path) {
        this.path = path
    }

    async getAll() {
        try {
            let products = await fs.promises.readFile(this.path, 'utf-8')
            products = JSON.parse(products)

            console.log(products)
            return products
        } catch (error) {
            console.log(`Error metodo "getAll": ${error}`);
        }
    }

}

const products = new Contenedor('products.json');

app.get("/productos", async(req, res) => {
    try {
        let todosLosProductos = await products.getAll().then((res) => {
            return res;
        });
        //   console.log(todosLosProductos);
        res.send(todosLosProductos);
    } catch (error) {
        console.log("error pa");
    }
});

app.get("/productoRandom", async(req, res) => {
    try {
        let todosLosProductos = await products.getAll().then((res) => {
            return res;
        });
        let id = todosLosProductos.map((e) => e.id);
        let numero = Math.floor(Math.random() * (id.length)) + 1;
        let objRandom = todosLosProductos.filter((e) => e.id === numero);

        res.send(objRandom);

        console.log(numero)
    } catch (error) {
        console.log("error pa");
    }
});

app.listen(puerto, (error) => {
    if (!error) {
        console.log(`Servidor escuchando puerto ${puerto}`);
    } else {
        console.log(`Error: ${error}`);
    }
});