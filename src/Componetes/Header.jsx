//import Backgound_Img from "../Imagen/bg-mobile-dark.svg"
 import ThemeButton from "../Componetes/ChangeTheme.jsx"
import Styles from "../Styles/HeaderStyles.module.css"
function Header(params) {
    return(
      <>
      
    <header className={Styles.Header_Container} >
       
<div className={Styles.Div_Header_Container}>
    <h1>TODO</h1>
    <ThemeButton/>
 </div>
        
        
        </header>
      </>
    )
}


export default Header