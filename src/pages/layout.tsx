import { Stack } from "@mui/material";
import Navbar from "../components/navbar/Navbar";
import Main from "./main";
import { useDispatch, useSelector } from "react-redux";
import Login from "./login";
import LoadingPage from "./loading";
import { useEffect } from "react";
import { getData } from "../features/people/peopleSlice";

export default function Layout() {
  const dispatch = useDispatch<any>();
  const page = useSelector((state: any) => state.people.currentPage);
  const data = useSelector((state: any) => state.people.data);
  const login = useSelector((state: any) => state.login.isLoggedIn);
  const status = useSelector((state: any) => state.people.state);
  const cardData = data[page] || [];

  useEffect(() => {
    if (login && !data[page] && status === "idle") {
      dispatch(getData(page));
    }
  }, [login, page, data, status, dispatch]);

  const shouldShowLoading =
    status === "loading" || (login && !data[page] && status !== "failed");

  return (
    <Stack sx={{ width: "100%", minHeight: "100vh" }}>
      <Navbar />
      {login ? (
        shouldShowLoading ? (
          <LoadingPage />
        ) : (
          <Main data={cardData} />
        )
      ) : (
        <Login />
      )}
    </Stack>
  );
}
