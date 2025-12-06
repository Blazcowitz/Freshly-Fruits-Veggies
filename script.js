// ===============================
// FUNCIONES DE CARRITO ONLINE
// ===============================

// Obtener carrito de localStorage
function obtenerCarrito() {
    return JSON.parse(localStorage.getItem("carrito")) || [];
}

// Guardar carrito
function guardarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarContadorCarrito();
}

// Contador del carrito (navbar)
function actualizarContadorCarrito() {
    const carrito = obtenerCarrito();
    const contador = document.getElementById("contador-carrito");
    if (contador) contador.textContent = carrito.length > 0 ? `(${carrito.length})` : "";
}

// Agregar productos al carrito
function agregarAlCarrito(nombre, idUnidad, idCantidad, precioKg, precioLb) {
    const unidad = document.getElementById(idUnidad).value;
    const cantidad = parseInt(document.getElementById(idCantidad).value);
    const precio = unidad === "kg" ? precioKg : precioLb;

    const carrito = obtenerCarrito();

    const existente = carrito.find(p => p.nombre === nombre && p.unidad === unidad);
    if (existente) {
        existente.cantidad += cantidad;
    } else {
        carrito.push({ nombre, unidad, cantidad, precio });
    }

    guardarCarrito(carrito);
    alert(`${nombre} agregado al carrito ✅`);
}

// Mostrar carrito en carrito.html
function mostrarCarrito() {
    const carrito = obtenerCarrito();
    const lista = document.getElementById("lista-carrito");
    const totalCarrito = document.getElementById("total-carrito");

    if (!lista || !totalCarrito) return;

    lista.innerHTML = "";
    let total = 0;

    if (carrito.length === 0) {
        lista.innerHTML = "<p>Tu carrito está vacío 🛒</p>";
        totalCarrito.innerHTML = "";
        return;
    }

    carrito.forEach((item, i) => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;

        const div = document.createElement("div");
        div.classList.add("item-carrito");

        div.innerHTML = `
            <h3>${item.nombre}</h3>
            <p>Unidad: ${item.unidad}</p>
            <p>Cantidad: ${item.cantidad}</p>
            <p>Precio unitario: $${item.precio}</p>
            <p><b>Subtotal: $${subtotal}</b></p>
            <button onclick="eliminarDelCarrito(${i})">Eliminar</button>
        `;

        lista.appendChild(div);
    });

    totalCarrito.innerHTML = `<h2>Total a pagar: $${total}</h2>`;
}

// Eliminar producto
function eliminarDelCarrito(i) {
    const carrito = obtenerCarrito();
    carrito.splice(i, 1);
    guardarCarrito(carrito);
    mostrarCarrito();
}

// Vaciar carrito
function vaciarCarrito() {
    localStorage.removeItem("carrito");
    mostrarCarrito();
    actualizarContadorCarrito();
    alert("Carrito vaciado 🧹");
}

// ===============================
// BOTÓN: FINALIZAR COMPRA → CHECKOUT
// ===============================
document.addEventListener("DOMContentLoaded", () => {
    actualizarContadorCarrito();
    mostrarCarrito();

    const btnVaciar = document.getElementById("vaciar-carrito");
    const btnFinalizar = document.getElementById("finalizar-compra");

    if (btnVaciar) {
        btnVaciar.addEventListener("click", vaciarCarrito);
    }

    if (btnFinalizar) {
        btnFinalizar.addEventListener("click", () => {
            const carrito = obtenerCarrito();

            if (carrito.length === 0) {
                alert("Tu carrito está vacío.");
                return;
            }

            window.location.href = "checkout.html";
        });
    }
});

// ===============================
// NAVBAR STICKY
// ===============================
window.addEventListener("scroll", function () {
    const navbar = document.getElementById("navbar");
    const header = document.querySelector("header");

    if (!navbar || !header) return;

    if (window.scrollY > header.offsetHeight) {
        navbar.classList.add("sticky");
    } else {
        navbar.classList.remove("sticky");
    }
});

// ===============================
// CHECKOUT — RESUMEN + FORMULARIO
// ===============================
document.addEventListener("DOMContentLoaded", function () {

    if (!document.getElementById("resumenCompra")) return;

    const resumenBox = document.getElementById("resumenCompra");
    const carrito = obtenerCarrito();

    if (carrito.length === 0) {
        resumenBox.innerHTML = "<p>No hay productos en el carrito.</p>";
        return;
    }

    let html = "";
    let total = 0;

    carrito.forEach(item => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;

        html += `
            <div class="producto">
                <strong>${item.nombre}</strong><br>
                ${item.cantidad} ${item.unidad}<br>
                Precio unitario: $${item.precio}<br>
                Subtotal: <b>$${subtotal}</b>
            </div>
        `;
    });

    html += `<p class="total">Total a pagar: <b>$${total}</b></p>`;
    resumenBox.innerHTML = html;
});

// ===============================
// CONFIRMAR COMPRA
// ===============================

function confirmarCompra() {
    const nombre = document.getElementById("nombre").value.trim();
    const direccion = document.getElementById("direccion").value.trim();
    const pago = document.getElementById("pago").value;

    if (!nombre || !direccion || !pago) {
        alert("Por favor completa todos los campos.");
        return;
    }

    alert(`✔ ¡Compra realizada con éxito!\nGracias por tu compra, ${nombre} 😊`);

    // Vaciar carrito
    localStorage.removeItem("carrito");

    // Redirigir al inicio
    window.location.href = "index.html";
}
