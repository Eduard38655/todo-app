import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "../src/Componetes/MainPage.jsx";
import ThemeProvider from "../src/Context/Theme.jsx";
import AppProvider from "../src/Context/TodoList.jsx";

function App() {
  
  return (
    

    <ThemeProvider > 
    <AppProvider>
      
       <BrowserRouter basename="/todo-app">
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
           
          
        
    </AppProvider>
    </ThemeProvider >
  );
}

export default App;