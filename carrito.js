document.addEventListener('DOMContentLoaded', () => {
    const productosURL = 'productos.json'; // Cambia a la ruta correcta

    // Cargar productos al iniciar
    async function cargarProductos() {
        try {
            const respuesta = await fetch(productosURL);
            const productos = await respuesta.json();
            mostrarProductos(productos);
        } catch (error) {
            console.error('Error al cargar los productos:', error);
        }
    }

    // Mostrar productos en el contenedor
    function mostrarProductos(productos) {
        const contenedorProductos = document.getElementById('contenedor-productos');
        contenedorProductos.innerHTML = ''; // Limpiar contenedor antes de agregar nuevos productos

        productos.forEach(producto => {
            const productoDiv = document.createElement('div');
            productoDiv.className = 'producto';
            
            productoDiv.innerHTML = `
              <img src="${producto.imagen}" alt="${producto.nombre}">
              <h3>${producto.nombre}</h3>
              <p>Precio: $${producto.precio.toFixed(2)}</p>
              <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
            `;
            
            contenedorProductos.appendChild(productoDiv);
        });
    }

    // Agregar producto al carrito
    window.agregarAlCarrito = function(idProducto) {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const productoEncontrado = carrito.find(producto => producto.id === idProducto);
        
        if (productoEncontrado) {
            productoEncontrado.cantidad += 1;
        } else {
            const producto = { id: idProducto, cantidad: 1 };
            carrito.push(producto);
        }
        
        localStorage.setItem('carrito', JSON.stringify(carrito));
        mostrarCarrito();
    };

    // Mostrar productos en el carrito
    function mostrarCarrito() {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const contenedorCarrito = document.getElementById('contenedor-carrito');
        contenedorCarrito.innerHTML = ''; // Limpiar el carrito antes de agregar los productos

        carrito.forEach(item => {
            const productoDiv = document.createElement('div');
            productoDiv.className = 'item-carrito';
            
            productoDiv.innerHTML = `
              <p>Producto ID: ${item.id}</p>
              <p>Cantidad: ${item.cantidad}</p>
              <button onclick="eliminarDelCarrito(${item.id})">Eliminar</button>
            `;
            
            contenedorCarrito.appendChild(productoDiv);
        });
    }

    // Eliminar producto del carrito
    window.eliminarDelCarrito = function(idProducto) {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carrito = carrito.filter(producto => producto.id !== idProducto);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        mostrarCarrito();
    };

    // Filtrar productos por nombre
    window.filtrarProductos = function(filtro) {
        fetch(productosURL)
          .then(response => response.json())
          .then(productos => {
            const productosFiltrados = productos.filter(producto => 
              producto.nombre.toLowerCase().includes(filtro.toLowerCase())
            );
            mostrarProductos(productosFiltrados);
          });
    }

    // Cargar productos al iniciar
    cargarProductos();
});
