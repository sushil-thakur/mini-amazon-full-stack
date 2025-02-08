import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";

const ProductDetail = () => {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: 4,
        padding: 3,
        margin: "3rem auto",
        maxWidth: "900px",
        borderRadius: "12px",
        boxShadow: "0px 8px 20px rgba(0,0,0,0.1)",
      }}
    >
      {/* Image Section */}
      <CardMedia
        component="img"
        image="https://cdn.thewirecutter.com/wp-content/media/2023/04/tv-buying-guide-2048px-0032.jpg?auto=webp&quality=75&width=1024"
        alt="TV"
        sx={{
          width: { xs: "100%", md: "40%" },
          height: "auto",
          borderRadius: "8px",
        }}
      />

      {/* Product Details */}
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          flex: 1,
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          TV
        </Typography>
        <Chip label="Samsung" variant="outlined" color="warning" />
        <Typography variant="h6" color="green">
          Price: $800
        </Typography>
        <Typography variant="h6">Available Quantity: 10</Typography>
        <Typography variant="h6">Category: Electronics</Typography>

        <Typography
          sx={{
            textAlign: "justify",
            fontSize: "1rem",
            lineHeight: "1.5rem",
            color: "gray",
          }}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores
          cumque quos sapiente ab possimus debitis id, perspiciatis molestiae
          similique explicabo ipsa eius dolorem nihil animi quam dolores
          inventore consequatur illo eum aliquam placeat aperiam adipisci sed.
        </Typography>

        {/* Buttons */}
        <Stack direction="row" spacing={2} sx={{ marginTop: 2 }}>
          <Button variant="contained" color="success" startIcon={<EditIcon />}>
            Edit
          </Button>
          <Button variant="contained" color="error" startIcon={<DeleteOutlineIcon />}>
            Delete
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ProductDetail;
