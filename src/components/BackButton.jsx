import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { Link } from "react-router";

export default function BackButton() {
  return (
    <Box mb={3}>
      <Link
        to="/products"
        style={{
          textDecoration: "none",
          color: "inherit",
          display: "flex",
          alignItems: "center",
        }}
      >
        <ArrowBackIcon sx={{ mr: 1 }} />
        <Typography variant="body1">Back to Products</Typography>
      </Link>
    </Box>
  );
}
