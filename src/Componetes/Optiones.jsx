import { useContext, useEffect, useState } from "react";
import { List_Contexto } from "../Context/TodoList";
import Styles from "../Styles/Optiones.module.css";

function Manage_Optiones() {
  const {
    Datos,
    SetDatos,
    Reset,
    SetReset,
    Items_Left,
    Set_Items
  } = useContext(List_Contexto);

  const [ErrorM, SetErrorM] = useState("");

  // Función que obtiene los datos del backend
  const fetchData = async () => {
    try {
      const response = await fetch("https://todo-app-ejux.onrender.com/GetData");
      const data = await response.json();
      if (data && data.data) {
        SetDatos(data.data);
        SetReset(data.data);
      }
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };

  // Se obtiene al cargar el componente
  useEffect(() => {
    fetchData();
  }, []);

  // Actualiza la cantidad de ítems cerrados
  useEffect(() => {
    const cerrados = Datos.filter((i) => i.Status === "Close");
    Set_Items(cerrados.length);
  }, [Datos]);

  // Elimina ítems completados
  async function Clear_Completed() {
    try {
      await fetch("https://todo-app-ejux.onrender.com/Clear", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      });
      fetchData(); // actualiza los datos luego de eliminar
    } catch (error) {
      console.error("Error al limpiar:", error);
    }
  }

  // Maneja los botones All, Active, Completed
  async function ManageItems(option) {
    await fetchData(); // Siempre refresca los datos primero

    setTimeout(() => {
      let filtered = [];

      if (option === "All") {
        SetDatos(Reset);
        SetErrorM("");
        return;
      }

      filtered = Reset.filter((item) => item.Status === option);
      SetDatos(filtered);

      if (filtered.length === 0) {
        SetErrorM(
          option === "Close" ? "No completed items" : "No active items"
        );
      } else {
        SetErrorM("");
      }
    }, 100); // pequeño retraso para que `SetReset` se actualice
  }

  return (
    <>
      {ErrorM && <p className={Styles.Error_Text}>{ErrorM}</p>}

      <div className={Styles.DivManageOp}>
        <p><span>{Items_Left}</span> items left</p>

        <div>
          <button onClick={() => ManageItems("All")}>All</button>
          <button onClick={() => ManageItems("Close")}>Active</button>
          <button onClick={() => ManageItems("Open")}>Completed</button>
        </div>
       

        <button onClick={Clear_Completed}>Clear Completed</button>
      </div>
    </>
  );
}

export default Manage_Optiones;
