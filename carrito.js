// Obtener el carrito de compras y los botones de agregar al carrito
document.addEventListener('DOMContentLoaded', () => {
    const carrito = document.getElementById('lista-carrito');
    const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
    const agregarBtns = document.querySelectorAll('.agregar-carrito');

    // Inicializar carrito
    let carritoItems = JSON.parse(localStorage.getItem('carrito')) || [];

    // Función para renderizar los productos en el carrito
    const renderizarCarrito = () => {
        carrito.innerHTML = '';
        carritoItems.forEach(item => {
            const li = document.createElement('li');
            li.className = 'list-group-item';
            li.innerHTML = `
                <img src="${item.imagen}" class="card-img-top" alt="${item.nombre}">
                <div class="card-body">
                    <h5 class="card-title">${item.nombre}</h5>
                    <p class="card-text">${item.precio}</p>
                    <button class="btn btn-danger btn-sm eliminar-carrito" data-id="${item.id}">Eliminar</button>
                </div>
            `;
            carrito.appendChild(li);
        });
    };

    // Función para agregar producto al carrito
    const agregarAlCarrito = (id, nombre, precio, imagen) => {
        const item = carritoItems.find(item => item.id === id);
        if (item) {
            item.cantidad++;
        } else {
            carritoItems.push({ id, nombre, precio, imagen, cantidad: 1 });
        }
        localStorage.setItem('carrito', JSON.stringify(carritoItems));
        renderizarCarrito();
    };

    // Agregar eventos a los botones de agregar al carrito
    agregarBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.dataset.id);
            const nombre = e.target.closest('.list-group-item').querySelector('.card-title').textContent;
            const precio = e.target.closest('.list-group-item').querySelector('.card-text').textContent;
            const imagen = e.target.closest('.list-group-item').querySelector('.card-img-top').src;
            agregarAlCarrito(id, nombre, precio, imagen);
        });
    });

    // Función para vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        carritoItems = [];
        localStorage.removeItem('carrito');
        renderizarCarrito();
    });

    // Función para eliminar productos del carrito
    carrito.addEventListener('click', (e) => {
        if (e.target.classList.contains('eliminar-carrito')) {
            const id = parseInt(e.target.dataset.id);
            carritoItems = carritoItems.filter(item => item.id !== id);
            localStorage.setItem('carrito', JSON.stringify(carritoItems));
            renderizarCarrito();
        }
    });

    // Renderizar carrito al cargar la página
    renderizarCarrito();
});
