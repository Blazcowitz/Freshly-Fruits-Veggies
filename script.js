// FUNCIONES DE CARRITO ONLINE

// Cargar carrito desde localStorage
function obtenerCarrito() {
  return JSON.parse(localStorage.getItem("carrito")) || [];
}

// Guardar carrito en localStorage
function guardarCarrito(carrito) {
  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarContadorCarrito();
}

// Actualizar el contador en el menú
function actualizarContadorCarrito() {
  const carrito = obtenerCarrito();
  const contador = document.getElementById("contador-carrito");
  if (contador) {
    contador.textContent = carrito.length > 0 ? `(${carrito.length})` : "";
  }
}

// Agregar producto al carrito
function agregarAlCarrito(nombre, idUnidad, idCantidad, precioKg, precioLb) {
  const unidad = document.getElementById(idUnidad).value;
  const cantidad = parseInt(document.getElementById(idCantidad).value);

  // Seleccionar precio según unidad
  let precioUnitario = unidad === "kg" ? precioKg : precioLb;

  const carrito = obtenerCarrito();

  // Buscar si ya existe el producto
  const productoExistente = carrito.find(
    (item) => item.nombre === nombre && item.unidad === unidad
  );

  if (productoExistente) {
    // Si ya existe, solo sumamos la cantidad
    productoExistente.cantidad += cantidad;
  } else {
    // Si no existe, lo agregamos nuevo
    carrito.push({
      nombre,
      unidad,
      cantidad,
      precio: precioUnitario,
    });
  }

  guardarCarrito(carrito);
  alert(`${nombre} agregado al carrito ✅`);
}

// MOSTRAR CARRITO EN carrito.html
function mostrarCarrito() {
  const carrito = obtenerCarrito();
  const listaCarrito = document.getElementById("lista-carrito");
  const totalCarrito = document.getElementById("total-carrito");

  if (!listaCarrito || !totalCarrito) return; // Para que no falle en otras páginas

  listaCarrito.innerHTML = "";
  let total = 0;

  if (carrito.length === 0) {
    listaCarrito.innerHTML = "<p>Tu carrito está vacío</p>";
    totalCarrito.innerHTML = "";
    return;
  }

  carrito.forEach((item, index) => {
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
      <button onclick="eliminarDelCarrito(${index})">Eliminar</button>
    `;
    listaCarrito.appendChild(div);
  });

  totalCarrito.innerHTML = `<h2>Total a pagar: $${total}</h2>`;
}

// Eliminar producto del carrito
function eliminarDelCarrito(indice) {
  const carrito = obtenerCarrito();
  carrito.splice(indice, 1);
  guardarCarrito(carrito);
  mostrarCarrito();
}

// Eventos al cargar página
document.addEventListener("DOMContentLoaded", () => {
  actualizarContadorCarrito();
  mostrarCarrito(); // Solo se ejecuta en carrito.html
});

// Vaciar Carrito
function vaciarCarrito() {
  localStorage.removeItem("carrito");
  mostrarCarrito();
  actualizarContadorCarrito();
  alert("Carrito vaciado");
}

// Eventos al cargar página
document.addEventListener("DOMContentLoaded", () => {
  actualizarContadorCarrito();
  mostrarCarrito(); // Solo en carrito.html

  // Asignar evento al botón de vaciar carrito si existe
  const btnVaciar = document.getElementById("vaciar-carrito");
  if (btnVaciar) {
    btnVaciar.addEventListener("click", vaciarCarrito);
  }
});


