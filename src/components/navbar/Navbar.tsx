import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { logout as logoutAction } from "../../features/login/login";
import { reset as resetAction } from "../../features/people/peopleSlice";
export default function Navbar() {
  const login = useSelector((state: any) => state.login.isLoggedIn);
  const dispatch = useDispatch<any>();
  return (
    <Box sx={{ flexGrow: 1, width: "100%" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            SWAPI People Explorer
          </Typography>
          <Button
            color="inherit"
            onClick={() => {
              dispatch(logoutAction());
              dispatch(resetAction());
            }}
          >
            {login ? "Logout" : ""}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
