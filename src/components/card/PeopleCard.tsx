import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useState, Fragment } from "react"; // Import Fragment
import type { CardData } from "../../types/types";

// --- Improved Modal Style ---
// * Added responsive width, maxHeight, and overflow for scrolling
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: 400 }, // Responsive width
  maxHeight: "90vh", // Max 90% of viewport height
  overflowY: "auto", // Add scroll if content is too tall
  color: "text.primary", // Respects dark/light mode
  borderRadius: 2, // Softer corners
  boxShadow: 24,
  p: 4,
};

export default function PeopleCard({ people, homeworld }: CardData) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const photoUrl = `img/${people.gender}/face1.png`;

  return (
    // Use a Fragment to hold the Card and its Modal
    <Fragment>
      <Card
        sx={{
          width: 300,
          margin: 2,
          transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
          "&:hover": {
            transform: "scale(1.03)",
            boxShadow: 6,
          },
          background: `linear-gradient(135deg, ${people.bgColor} 0%, rgba(255, 255, 255, 0.25) 100%)`,
        }}
      >
        {/* The entire card area is now clickable */}
        <CardActionArea onClick={handleOpen}>
          <CardMedia
            component="img"
            height="250"
            width="300"
            src={photoUrl}
            alt={people.name}
            sx={{ objectFit: "cover" }}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {people.name}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>

      {/* Modal is moved outside the Card structure for cleaner code */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            ...modalStyle,
            background: `linear-gradient(135deg, ${people.bgColor} 0%, rgba(255, 255, 255, 0.9) 50%, ${people.bgColor} 100%)`,
          }}
        >
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            gutterBottom
          >
            {people.name}
          </Typography>

          {/* --- Improved Modal Content --- */}
          <Box id="modal-modal-description">
            <Typography sx={{ mt: 2 }}>
              <strong>Height:</strong> {people.height}
            </Typography>
            <Typography>
              <strong>Mass:</strong> {people.mass}
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
        </Box>
      </Modal>
    </Fragment>
  );
}
