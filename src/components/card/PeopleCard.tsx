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
import { Box } from "@mui/material";

export default function PeopleCard({ people, homeworld }: CardData) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const photoUrl = `img/${people.gender}/face1.png`;

  return (
    <>
      <Card
        sx={{
          width: 300,
          borderRadius: 2,
          transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
          "&:hover": {
            transform: "scale(1.05)",
            boxShadow: (theme) => `0 0 20px ${theme.palette.primary.main}`,
          },
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(10px)",
        }}
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
          {/* --- Improved Modal Content --- */}
          <Box id="modal-modal-description">
            <Typography sx={{ mt: 2 }}>
              <strong>Height:</strong> {`${people.height} m`}
            </Typography>
            <Typography>
              <strong>Mass:</strong> {`${people.mass} Kg`}
            </Typography>
            <Typography>
              <strong>Birth Year:</strong> {people.birthYear}
            </Typography>
            <Typography>
              <strong>Number of Films:</strong> {people.numberOfFilms}
            </Typography>
            <Typography>
              <strong>Date Added:</strong> {people.dateAdded}
            </Typography>

            {/* A dedicated, styled section for Homeworld details */}
            <Typography
              variant="h6"
              component="h3"
              sx={{ mt: 3, mb: 1, fontSize: "1.1rem" }}
            >
              Homeworld
            </Typography>
            <Box
              sx={{
                pl: 2,
                borderLeft: "3px solid",
                borderColor: "primary.main",
              }}
            >
              <Typography>
                <strong>Name:</strong> {homeworld.name || "Unknown"}
              </Typography>
              <Typography>
                <strong>Climate:</strong> {homeworld.climate || "Unknown"}
              </Typography>
              <Typography>
                <strong>Terrain:</strong> {homeworld.terrain || "Unknown"}
              </Typography>
              <Typography>
                <strong>Population:</strong> {homeworld.population || "Unknown"}
              </Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
