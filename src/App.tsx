import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getData } from "./features/people/peopleSlice";
import Layout from "./pages/layout";
import { ThemeProvider } from "./contexts/ThemeContext";
import CssBaseline from "@mui/material/CssBaseline";

function App() {
  const dispatch = useDispatch<any>();
  useEffect(() => {
    dispatch(getData(1));
  }, []);

  return (
    <ThemeProvider>
      <CssBaseline />
      <Layout />
    </ThemeProvider>
  );
}

export default App;
