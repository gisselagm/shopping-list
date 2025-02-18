import { useState, useEffect } from "react";

function App() {
  // Estado para la lista de productos
  const [productos, setProductos] = useState([]);
  // Estado para el nuevo producto a agregar
  const [nuevoProducto, setNuevoProducto] = useState("");

  // Cargar datos desde localStorage al inicio
  useEffect(() => {
    const datosGuardados = localStorage.getItem("productos");
    if (datosGuardados) {
      setProductos(JSON.parse(datosGuardados));
    }
  }, []);

  // Guardar en localStorage cada vez que cambie la lista
  useEffect(() => {
    localStorage.setItem("productos", JSON.stringify(productos));
  }, [productos]);

  // Función para agregar un nuevo producto
  const agregarProducto = () => {
    if (nuevoProducto.trim() === "") return; // Evita productos vacíos
    setProductos([...productos, nuevoProducto]);
    setNuevoProducto(""); // Limpiar el input
  };

  // Función para eliminar un producto
  const eliminarProducto = (index) => {
    const nuevaLista = productos.filter((_, i) => i !== index);
    setProductos(nuevaLista);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>🛒 Lista de Compras</h2>

      <input
        type="text"
        placeholder="Añadir producto"
        value={nuevoProducto}
        onChange={(e) => setNuevoProducto(e.target.value)}
      />
      <button onClick={agregarProducto}>Añadir</button>

      <ul>
        {productos.map((producto, index) => (
          <li key={index}>
            {producto}{" "}
            <button onClick={() => eliminarProducto(index)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
