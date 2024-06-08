import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import RandomCat from "./components/Randomcat";


function App() {
  const themeDark = createTheme ({
    palette: {
      background: {
        default: "#a89332"
      },
    }
  }) 

  return (
    <ThemeProvider theme={themeDark}>
      <CssBaseline />
      <RandomCat />
    </ThemeProvider>  
  )
}

export default App
