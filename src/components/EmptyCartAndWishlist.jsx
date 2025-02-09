//mui imports
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";

import { Link } from "react-router-dom";

export default function EmptyCartAndWishlist({type}) {
  return (
    <Paper className="p-5 text-center">
      <Typography variant="h6">{type ==="cart" ? "Your cart is empty" : "Your wishlist is empty"}</Typography>
      <Button
        variant="contained"
        component={Link}
        to="/products"
        sx={{ mt: 2 }}
      >
        Continue Shopping
      </Button>
    </Paper>
  );
}
