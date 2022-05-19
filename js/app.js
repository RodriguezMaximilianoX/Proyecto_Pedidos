let productos = [];
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const peticion = async () => {
    const resp = await
    fetch("./js/menu.json")
    const data = await resp.json()
    productos.push(...data)
    console.log(data)
    desplegarProductos()
}

peticion()

function desplegarProductos(){
    for (let i = 0; i < productos.length; i++) {
        const element = productos[i];
        const {id, nombre, precio, img} = element;
        const card = `
            <div class="card">
                <p>${nombre}</p>
                <div>
                    <img class="imgProducto" src="${img}" alt="foto producto"
                </div>
                <p>$${precio.toLocaleString()}</p>
                <div class="btnContainer">
                    <button id=${id} class="btnAgregar">Agregar al carrito</button>
                </div>
            </div>`;
        const container = document.getElementById("container")
        container.innerHTML += card;
    }
    const boton = document.getElementsByClassName("btnAgregar");

    for (let i = 0; i < boton.length; i++) {
        const element = boton[i];
        element.addEventListener("click", agregarAlCarrito)
    }
}

function agregarAlCarrito(e){
    const btn = e.target;
    const id = btn.getAttribute("id")
    const prodEncontrado = productos.find((item) => item.id == id)
    carrito.push(prodEncontrado)
    localStorage.setItem("carrito", JSON.stringify(carrito))
    contador.innerHTML = carrito.length
}

const contador = document.getElementById("cartCounter");
contador.innerHTML = carrito.length

