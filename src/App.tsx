import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getData } from "./features/people/peopleSlice";
import Layout from "./pages/layout";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";

function App() {
  const dispatch = useDispatch<any>();
  useEffect(() => {
    dispatch(getData(1));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout />
    </ThemeProvider>
  );
}

export default App;
