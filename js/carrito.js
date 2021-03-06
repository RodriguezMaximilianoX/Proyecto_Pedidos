let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const totalCarrito = () => {
    return carrito.reduce((acc, prod) => acc + prod.precio, 0)
}

const body = document.getElementById("carrito")

if(carrito.length == 0){
    const texto = `
        <div class="cartContainer">
            <h1 class="txtCarrito">No hay productos en el carrito</h1>
            <a  href="../index.html">
                <button class="btnVolver">Volver al Menú</button>
            </a>
        </div>`;
    body.innerHTML += texto;
}
else{
    const titulo = `
    <div class="cartContainer">
        <h1 class="txtCarrito">Tu orden</h1>
    </div>`;
    body.innerHTML += titulo;
    const table = `
    <div class="tableContainer cartContainer">
        <table>
            <thead>
                <tr>
                    <th></th>
                    <th class="txtTable">Productos</th>
                    <th class="txtTable">Precio</th>
                </tr>
            </thead>
            <tbody id="tbody">
            </tbody>
            <tfooter>
                <tr>
                    <th></th>
                    <th class="txtTable">Total:</th>
                    <th id="total">$${totalCarrito().toLocaleString()}</th>
                <tr>
            </tfooter>
        </table>
    </div>
    <div class="btnContainer">
        <a  href="../index.html">
            <button class="btnVolver">Volver al Menú</button>
        </a>
        <button class="btnTerminar">Terminar Compra</button>
    </div>`;
    body.innerHTML += table;
    const tbody = document.getElementById("tbody")
    for (let i = 0; i < carrito.length; i++) {
        const element = carrito[i];
        const {id, nombre, precio} = element
        const cart = `
        <tr id=${id}>
            <th><button class="eliminar"><i class="fa-solid fa-trash"></i></button></th>
            <th><span class="txtTable">${nombre}</span></th>
            <th>$${precio.toLocaleString()}</th>
        </tr>`;
        tbody.innerHTML += cart
    }
}
const eliminar = document.getElementsByClassName("eliminar")
    
for (let i = 0; i < eliminar.length; i++) {
    const element = eliminar[i];
    element.addEventListener("click", eliminarMenu)
}

function eliminarMenu(e){
    const btn = e.target;
    const id = btn.getAttribute("id")
    const prodEncontrado = carrito.find((item) => item.id == id)
    carrito.pop(prodEncontrado)
    localStorage.setItem("carrito", JSON.stringify(carrito))
    location.reload();
}

const error = document.getElementsByClassName("btnTerminar")

for (let i = 0; i < error.length; i++) {
    const element = error[i];
    element.addEventListener("click", alerta)
    
}

function alerta(){
    Swal.fire({
        title: "¡Error!",
        text: "No podemos procesar tu pago en este momento. Por favor vuelve a intentarlo mas tarde",
        icon: "error"
    })
}