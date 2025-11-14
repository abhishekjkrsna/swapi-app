import { Stack } from "@mui/material";
import Navbar from "../components/navbar/Navbar";
import Main from "./main";
import { useSelector } from "react-redux";

export default function Layout() {
  const page = useSelector((state: any) => state.people.currentPage);
  const data = useSelector((state: any) => state.people.data);
  const status = useSelector((state: any) => state.people.state);
  const cardData = data[page] || [];
  return (
    <Stack sx={{ width: "100%" }}>
      <Navbar />
      {status === "loading" ? <p>Loading...</p> : <Main data={cardData} />}
    </Stack>
  );
}
