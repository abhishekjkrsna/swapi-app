import { Stack } from "@mui/material";
import Navbar from "../components/navbar/Navbar";
import Main from "./main";
import { useSelector } from "react-redux";
import Login from "./login";

export default function Layout() {
  const page = useSelector((state: any) => state.people.currentPage);
  const data = useSelector((state: any) => state.people.data);
  const pageStatus = useSelector((state: any) => state.people.state);
  const login = useSelector((state: any) => state.login.isLoggedIn);
  const cardData = data[page] || [];
  return (
    <Stack sx={{ width: "100%" }}>
      <Navbar />
      {login ? (
        pageStatus === "loading" ? (
          <p>Loading...</p>
        ) : (
          <Main data={cardData} />
        )
      ) : (
        <Login />
      )}
    </Stack>
  );
}
