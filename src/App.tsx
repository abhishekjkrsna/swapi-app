import { useEffect } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import { getData } from "./features/people/peopleSlice";
import Layout from "./pages/layout";
function App() {
  const dispatch = useDispatch<any>();
  useEffect(() => {
    dispatch(getData(1));
  }, []);

  return (
    <>
      <Layout />
    </>
  );
}

export default App;
