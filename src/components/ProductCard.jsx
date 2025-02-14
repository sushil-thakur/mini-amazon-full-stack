import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { useNavigate } from "react-router";
import axiosInstance from "../../lib/axios_instance";

const ProductCard = (props) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: 450,
        borderRadius: 2,
        overflow: "hidden",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.2s ease-in-out",
        "&:hover": {
          transform: "scale(1.02)",
        },
      }}
    >
      {/* Product Image */}
      <Box
        component="img"
        src={props.image}
        alt={props.name}
        sx={{ width: "100%", height: 300, objectFit: "cover" }}
      />

      {/* Product Details */}
      <Box
        sx={{ padding: 2, display: "flex", flexDirection: "column", gap: 2 }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h6" fontWeight={600}>
            {props.name}
          </Typography>
          <Chip
            color="warning"
            label={props.brand}
            variant="filled"
            sx={{ fontWeight: 500 }}
          />
        </Stack>

        <Typography variant="h5" fontWeight={700} color="primary">
          ${props.price}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ lineHeight: 1.6, textAlign: "justify" }}
        >
          {props.description}...
        </Typography>

        <Button
          fullWidth
          variant="contained"
          color="secondary"
          startIcon={<RemoveRedEyeOutlinedIcon />}
          sx={{ borderRadius: 1.5, fontWeight: 600, textTransform: "none" }}
          onClick={() => {
            navigate(`/product-detail/${props._id}`);
          }}
        >
          Explore
        </Button>
      </Box>
    </Box>
  );
};

export default ProductCard;