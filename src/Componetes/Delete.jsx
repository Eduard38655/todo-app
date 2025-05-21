import { useContext, useEffect, useState } from "react";
import { List_Contexto } from "../Context/TodoList";
import Styles from "../Styles/Detalles.module.css";

function Delete_Button({ProductoID}) {
 
const { Datos, SetDatos } = useContext(List_Contexto);
 
 
const [Run,SetRun]=useState(false)
   
 

 

/**Revisar  */
    useEffect(() => {
        fetch("http://localhost:3000/GetData")
          .then((response) => response.json())
          .then((data) => {
            if (data) {
              SetDatos(data.data);
              SetRun(false)
             
            } else {
              console.warn("No se encontraron datos.");
            }
          })
    }, [Run]);
    
    
    async function DeleteItem(ItemsID) {
  console.log(ItemsID,"m");

  
    const response = await fetch("http://localhost:3000/ClearDatos", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ItemsID }),
    });
      

    const data = await response.json();
 SetRun(true)

}
 
    return (
        <>
               <button className={Styles.Delete_Button} onClick={()=>DeleteItem(ProductoID)} > </button>
        
        </>
    )
}

export default Delete_Button