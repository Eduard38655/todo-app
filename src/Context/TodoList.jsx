import { createContext, useState } from "react";

export const List_Contexto = createContext();

const AppProvider = ({ children }) => {
  const [Datos, SetDatos] = useState([])
  const [Reset, SetReset] = useState([])
  const[Items_Left,Set_Items]=useState("")
  
  return (
    <List_Contexto.Provider value={
      { Datos, SetDatos,
        Reset, SetReset,
        Items_Left,Set_Items
      }}>
      {children}
    </List_Contexto.Provider>
  );
};

export default AppProvider;
