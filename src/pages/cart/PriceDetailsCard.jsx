//mui imports
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";

export default function PriceDetailsCard({
  products,
  subtotal,
  delivery,
  total,
}) {
  return (
    <div className="col-md-4">
      <Paper
        className="p-4"
        sx={{ position: { md: "sticky" }, top: { md: "20px" } }}
      >
        <Typography variant="h6" gutterBottom>
          PRICE DETAILS
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Box sx={{ mb: 2 }}>
          <div className="d-flex justify-content-between mb-2">
            <Typography>Price ({products.length} items)</Typography>
            <Typography>${subtotal.toFixed(2)}</Typography>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <Typography>Delivery Charges</Typography>
            <Typography>${delivery.toFixed(2)}</Typography>
          </div>
        </Box>

        <Divider sx={{ my: 2 }} />

        <div className="d-flex justify-content-between mb-3">
          <Typography variant="h6">Total Amount</Typography>
          <Typography variant="h6">${total.toFixed(2)}</Typography>
        </div>

        <Button
          variant="contained"
          fullWidth
          size="large"
          disabled={products.length === 0}
        >
          PROCEED TO CHECKOUT
        </Button>
      </Paper>
    </div>
  );
}
