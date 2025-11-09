// ===============================
// FUNCIONES DE CARRITO ONLINE
// ===============================

function obtenerCarrito() {
  return JSON.parse(localStorage.getItem("carrito")) || [];
}

function guardarCarrito(carrito) {
  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarContadorCarrito();
}

function actualizarContadorCarrito() {
  const carrito = obtenerCarrito();
  const contador = document.getElementById("contador-carrito");
  if (contador) contador.textContent = carrito.length > 0 ? `(${carrito.length})` : "";
}

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

function eliminarDelCarrito(i) {
  const carrito = obtenerCarrito();
  carrito.splice(i, 1);
  guardarCarrito(carrito);
  mostrarCarrito();
}

function vaciarCarrito() {
  localStorage.removeItem("carrito");
  mostrarCarrito();
  actualizarContadorCarrito();
  alert("Carrito vaciado 🧹");
}

function finalizarCompra() {
  const carrito = obtenerCarrito();
  if (carrito.length === 0) {
    alert("Tu carrito está vacío 😅");
    return;
  }

  alert("✅ ¡Compra realizada con éxito! Gracias por tu pedido 🛍️");
  vaciarCarrito();
  window.location.href = "carrito.html";
}

document.addEventListener("DOMContentLoaded", () => {
  actualizarContadorCarrito();
  mostrarCarrito();

  const btnVaciar = document.getElementById("vaciar-carrito");
  const btnFinalizar = document.getElementById("finalizar-compra");

  if (btnVaciar) btnVaciar.addEventListener("click", vaciarCarrito);
  if (btnFinalizar) btnFinalizar.addEventListener("click", finalizarCompra);
});

// === NAVBAR STICKY AL HACER SCROLL ===
window.addEventListener("scroll", function () {
  const navbar = document.getElementById("navbar");
  const header = document.querySelector("header");

  // Cuando el scroll pasa la altura del header → activa sticky
  if (window.scrollY > header.offsetHeight) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
});
