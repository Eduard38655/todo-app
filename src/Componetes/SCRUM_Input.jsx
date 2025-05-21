import { useContext, useEffect, useState } from "react";
import { List_Contexto } from "../Context/TodoList";
import Styles from "../Styles/SCRUM.module.css";

function SCRUM_Input() {
const {Datos,SetDatos}=useContext(List_Contexto);
const [Details, SetData_Details] = useState("");
const [dbStatus,setStatus]=useState(false)
const [Run,SetRun]=useState(false)
let Item_Status="";

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
async function handleKeyDown(e) {

    if (e.key === 'Enter') {
      if (dbStatus==true) {
        Item_Status="Open"
      }
      else{
        
      Item_Status="Close"
      }
      const response = await fetch("http://localhost:3000/InsertData", {
        method: "POST",
        headers: { "content-type": "Application/JSON" },
        body: JSON.stringify({ Details,Item_Status})
      });
      const data = await response.json();
      console.log(data);
  SetRun(true)
     
      SetData_Details("");
    }
     
  }
 
  return (
    <div className={Styles.SCRUM_container}>
      <input type="checkbox" id="customCheckbox" className="custom-checkbox" 
      onChange={()=>setStatus(!dbStatus ? true : false )}/>

      <label htmlFor="customCheckbox"></label>

      <div className={Styles.Div_Input}>
        <input
          type="text"
          value={Details}
          onChange={(e) => SetData_Details(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
}

export default SCRUM_Input