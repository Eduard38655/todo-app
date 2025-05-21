import { useContext } from "react";
import { ThemeContext } from "../Context/Theme.jsx";
import icon_moon from "../Imagen/icon-moon.svg";
import icon_sun from "../Imagen/icon-sun.svg";

function ThemeButton() {
      const { theme, toggleTheme } = useContext(ThemeContext);


  
 
  return (
      <button onClick={toggleTheme}>

              {theme === 'light' ?
              <img src={icon_moon} alt="Toggle Theme" />
           
        :     <img src={icon_sun} alt="Toggle Theme" />
          
          }

    </button>
  );
}

export default ThemeButton;
