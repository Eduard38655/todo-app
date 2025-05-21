import { List_Contexto } from "../Context/TodoList";

function Items_Drag( ) {
    const {Datos,SetDatos}=useContext(List_Contexto);
    
    return(<>
    
{Datos && Datos.length ? (
    <>
{Datos.map((items,index)=>(

<div className={Styles.Detalles_Container} key={index} id={`Div-${items.TodoID}`}>
     
  
 <div className={Styles.Divinput}>

<input
  type="checkbox"
  id={`Input${items.TodoID}`}
onClick={()=>Validate_Check(items.TodoID,items.Status )}

className={`${Styles[`custom-checkbox-${items.Status}`] }`}
/>
<label className={Styles[`custom-label-${items.Status}`]}
 htmlFor={`Input${items.TodoID}`}

></label>
</div>
 
 
         
    <p className={Styles[`custom-text-${items.Status}`]}>
      {items.Details} 
      
 
 </p>
    <Delete_Button ProductoID={items.TodoID}/>
</div>
 
 
))} 
 
 
 
</>) : (
  
<>
 
</>

)}
    
    </>)
}

export default Items_Drag