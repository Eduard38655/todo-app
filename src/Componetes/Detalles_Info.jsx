import { useContext, useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Delete_Button from "../Componetes/Delete.jsx";
import Manage_Optiones from "../Componetes/Optiones.jsx";
import { List_Contexto } from "../Context/TodoList";
import Styles from "../Styles/Detalles.module.css";
import SubmenuOp from "./SubMenuOP.jsx";
function Detalles_Info() {
  const { Datos, SetDatos } = useContext(List_Contexto);
  const { Reset, SetReset } = useContext(List_Contexto);
  const [Run,SetRun]=useState(false)
  
 useEffect(() => {
    fetch("http://localhost:3000/GetData")
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          SetDatos(data.data);
          SetReset(data.data);
           SetRun(false)
        } else {
          console.warn("No se encontraron datos.");
        }
      })
}, [Run]);

  useEffect(() => {
    fetch("http://localhost:3000/GetData")
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          SetDatos(data.data);
          SetReset(data.data);
           
        } else {
          console.warn("No se encontraron datos.");
        }
      })
      .catch((error) => console.error("Error al obtener datos:", error));
    }, []);

  function Validate_Check(TodoID, currentStatus) {
    const newStatus = currentStatus === "Open" ? "Close" : "Open";
 

    fetch("http://localhost:3000/UpdateStatus", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ TodoID, Status: newStatus }),
    }).catch((error) => console.error("Error al actualizar estado:", error));
 
 SetRun(true)

  }
  
 


const onDragEnd = (result) => {
    const { source, destination, type } = result;

    if (!destination || 
        source.index === destination.index ||
        type !== "group") return;

    SetDatos(prev => {
      const items = [...prev];
      const [removed] = items.splice(source.index, 1);
      items.splice(destination.index, 0, removed);
      
      // Actualizar posiciones en la base de datos
      items.forEach((item, index) => {
        fetch("http://localhost:3000/UpdatePosition", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ TodoID: item.TodoID, Position: index }),
        });
      });
      
      return items;
    });
  };






  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={Styles.DivDtalles}>
        <Droppable
           direction="vertical"
           isCombineEnabled={true}  
           ignoreContainerClipping={true}   
           isDropDisabled={false}
           droppableId="ROOT"
          type="group"
           
        >
          {(provided) => (
            <div
              className={Styles.DivInfo}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {Datos &&
                Datos.map((item, index) => (
                  <Draggable
                    key={item.TodoID.toString()}
                    draggableId={item.TodoID.toString()}
                    index={index}
                  >
                    {(prov) => (
                      <div
                        className={Styles.Detalles_Container}
                        ref={prov.innerRef}
                        {...prov.draggableProps}
                        {...prov.dragHandleProps}
                        id={`Div-${item.TodoID}`}
                        style={{
                          ...prov.draggableProps.style,
                          transform:
                            prov.draggableProps.style?.transform?.replace(
                              /translate\(.*?,/,
                              "translate(0,"
                            ),
                        }}
                      >
                        <div className={Styles.Divinput}>
                          <input
                            type="checkbox"
                            id={`Input${item.TodoID}`}
                            onChange={() =>
                              Validate_Check(item.TodoID, item.Status)
                            }
                            checked={item.Status === "Close"}
                            className={
                              Styles[`custom-checkbox-${item.Status}`]
                            }
                          />
                          <label
                            className={
                              Styles[`custom-label-${item.Status}`]
                            }
                            htmlFor={`Input${item.TodoID}`}
                          ></label>
                        </div>
                        <p className={Styles[`custom-text-${item.Status}`]}>
                          {item.Details}
                        </p>
                        <Delete_Button ProductoID={item.TodoID} />
                      </div>
                    )}
                  </Draggable>
                ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Manage_Optiones />
        <SubmenuOp/>
      </div>
    </DragDropContext>
  );
}

export default Detalles_Info;