import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { logout as logoutAction } from "../../features/login/login";
import { reset as resetAction } from "../../features/people/peopleSlice";
import PublicIcon from '@mui/icons-material/Public';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useThemeContext } from "../../contexts/ThemeContext";

export default function Navbar() {
  const login = useSelector((state: any) => state.login.isLoggedIn);
  const dispatch = useDispatch<any>();
  const { mode, toggleTheme } = useThemeContext();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar 
        position="sticky" 
        sx={(theme) => ({
          background: theme.palette.mode === 'dark' 
            ? 'rgba(18, 18, 18, 0.7)' 
            : 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(10px)',
          boxShadow: 'none',
          borderBottom: `1px solid ${theme.palette.divider}`
        })}
      >
        <Toolbar>
          <PublicIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            SWAPI People Explorer
          </Typography>
          <IconButton sx={{ ml: 1 }} onClick={toggleTheme} color="inherit">
            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
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
