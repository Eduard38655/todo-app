import Detalles_Info from '../Componetes/Detalles_Info.jsx';
import Header from "../Componetes/Header.jsx";
import SCRUM_Input from "../Componetes/SCRUM_Input.jsx";
import Styles from "../Styles/MainPage.module.css";
function ManinPage(params) {
 
    return(
        
        <>
   <article className={Styles.MainContainer}>
     <Header />
     <SCRUM_Input />
    <Detalles_Info />
 
     <span className={Styles.DragSpan} >Drag and drop to reorder list </span>
    </article>  
 
 


    </>
    )
}

export default ManinPage