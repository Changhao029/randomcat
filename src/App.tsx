import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { RandomCat } from "./components/Randomcat";
import {

  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

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
      <QueryClientProvider client={queryClient}>
        <RandomCat />
      </QueryClientProvider>
    </ThemeProvider>  
  )
}

export default App
