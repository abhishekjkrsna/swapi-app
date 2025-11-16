import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useState } from "react";
import type { CardData } from "../../types/types";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import HeightIcon from "@mui/icons-material/Height";
import MonitorWeightIcon from "@mui/icons-material/MonitorWeight";
import CakeIcon from "@mui/icons-material/Cake";
import TheatersIcon from "@mui/icons-material/Theaters";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PublicIcon from "@mui/icons-material/Public";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import TerrainIcon from "@mui/icons-material/Terrain";
import GroupIcon from "@mui/icons-material/Group";

export default function PeopleCard({ people, homeworld }: CardData) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const photoUrl = `img/${people.gender}/face1.png`;

  return (
    <>
      <Card
        sx={(theme) => ({
          width: 300,
          borderRadius: "16px",
          transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
          boxShadow: theme.shadows[4],
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: theme.shadows[12],
          },
          background:
            theme.palette.mode === "dark"
              ? "rgba(30, 30, 30, 0.8)"
              : "rgba(255, 255, 255, 0.7)",
          backdropFilter: "blur(12px)",
          border: "1px solid",
          borderColor:
            theme.palette.mode === "dark"
              ? "rgba(255, 255, 255, 0.1)"
              : "rgba(0, 0, 0, 0.1)",
        })}
      >
        <CardActionArea onClick={handleOpen}>
          <CardMedia
            component="img"
            height="300"
            image={photoUrl}
            alt={people.name}
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              align="center"
            >
              {people.name}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ textAlign: "center", fontSize: "2rem" }}>
          {people.name}
        </DialogTitle>
        <DialogContent>
          <Box id="modal-modal-description">
            <List>
              <ListItem>
                <ListItemIcon>
                  <HeightIcon />
                </ListItemIcon>
                <ListItemText primary="Height" secondary={`${people.height} m`} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <MonitorWeightIcon />
                </ListItemIcon>
                <ListItemText primary="Mass" secondary={`${people.mass} Kg`} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CakeIcon />
                </ListItemIcon>
                <ListItemText primary="Birth Year" secondary={people.birthYear} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <TheatersIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Number of Films"
                  secondary={people.numberOfFilms}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CalendarTodayIcon />
                </ListItemIcon>
                <ListItemText primary="Date Added" secondary={people.dateAdded} />
              </ListItem>
            </List>

            <Typography
              variant="h6"
              component="h3"
              sx={{ mt: 2, mb: 1, fontSize: "1.1rem" }}
            >
              Homeworld
            </Typography>
            <List
              sx={{
                pl: 2,
                borderLeft: "3px solid",
                borderColor: "primary.main",
              }}
            >
              <ListItem>
                <ListItemIcon>
                  <PublicIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Name"
                  secondary={homeworld.name || "Unknown"}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <WbSunnyIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Climate"
                  secondary={homeworld.climate || "Unknown"}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <TerrainIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Terrain"
                  secondary={homeworld.terrain || "Unknown"}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <GroupIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Population"
                  secondary={homeworld.population || "Unknown"}
                />
              </ListItem>
            </List>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
