// src/hooks/useAutoRefresh.js
import { useContext, useEffect } from "react";
import { List_Contexto } from "../src/Context/TodoList.jsx";

export default function useAutoRefresh(intervalMs = 10000) {
  //const { SetDatos, SetReset } = useContext(List_Contexto);
const {Datos, SetDatos} = useContext(List_Contexto);
const {Reset, SetReset} = useContext(List_Contexto);
 
  useEffect(() => {
    const fetchData = () => {
      fetch("http://localhost:3000/GetData")
        .then((res) => res.json())
        .then((data) => {
          if (data?.data) {
            SetDatos(data.data);
            SetReset(data.data);
          }
        })
        .catch((err) => console.error("Fetch error:", err));
    };

    // Carga inicial
    fetchData();
    // Refresco periódico
    const timer = setInterval(fetchData, intervalMs);
    return () => clearInterval(timer);
  }, [Datos, Reset, intervalMs]);
}
