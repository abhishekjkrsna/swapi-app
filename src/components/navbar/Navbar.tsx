import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { logout as logoutAction } from "../../features/login/login";
import { reset as resetAction } from "../../features/people/peopleSlice";
import PublicIcon from '@mui/icons-material/Public';

export default function Navbar() {
  const login = useSelector((state: any) => state.login.isLoggedIn);
  const dispatch = useDispatch<any>();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar 
        position="sticky" 
        sx={{ 
          background: 'rgba(18, 18, 18, 0.7)',
          backdropFilter: 'blur(10px)',
          boxShadow: 'none',
          borderBottom: '1px solid rgba(255, 255, 255, 0.12)'
        }}
      >
        <Toolbar>
          <PublicIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            SWAPI People Explorer
          </Typography>
          {login && (
            <Button
              color="inherit"
              onClick={() => {
                dispatch(logoutAction());
                dispatch(resetAction());
              }}
            >
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
