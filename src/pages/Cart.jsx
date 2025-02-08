//mui imports
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// MUI Components
import CardActions from "@mui/material/CardActions";

//react imports
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

//redux imports
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCartProductsAsync,
  selectCartItems,
  selectStatus,
  updateCartAsync,
  updateWishlistAsync,
} from "../features/product/productSlice";

// ============================================================================
// Imports as you already have plus:
import ButtonGroup from "@mui/material/ButtonGroup";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export default function Cart() {
  // ==================== State Management ====================
  const [updatingId, setUpdatingId] = useState(null);
  const [updatingCartId, setUpdatingCartId] = useState(null);
  const [quantities, setQuantities] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // ==================== Redux Hooks ====================
  const dispatch = useDispatch();
  const products = useSelector(selectCartItems);
  const { fetchCartProductsStatus, updateCartStatus } = useSelector(selectStatus);

  // ==================== Effects ====================
  useEffect(() => {
    dispatch(fetchCartProductsAsync());
  }, [dispatch]);

  useEffect(() => {
    if (updateCartStatus === "success") {
      setSnackbar({
        open: true,
        message: "Cart updated successfully",
        severity: "success",
      });
    } else if (updateCartStatus === "error") {
      setSnackbar({
        open: true,
        message: "Failed to update cart",
        severity: "error",
      });
    }
  }, [updateCartStatus]);

  // ==================== Helper Functions ====================
  const calculateTotal = () => {
    if (!products || !products.length) {
      return { subtotal: 0, delivery: 0, total: 0 };
    }

    const subtotal = products.reduce((sum, item) => {
      const itemQuantity = quantities[item._id] || 1;
      return sum + (item.productPrice * itemQuantity);
    }, 0);

    const delivery = subtotal > 0 ? 499 : 0;
    const total = subtotal + delivery;

    return { subtotal, delivery, total };
  };

  // ==================== Event Handlers ====================
  const handleSnackbarClose = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const handleUpdateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setQuantities(prev => ({ ...prev, [id]: newQuantity }));
  };

  const handleMoveToWishlist = async (id) => {
    try {
      setUpdatingId(id);
      await dispatch(updateWishlistAsync(id));
      await dispatch(updateCartAsync(id));
      setSnackbar({
        open: true,
        message: "Moved to wishlist",
        severity: "success",
      });
    } catch (error) {
        console.log(error)
      setSnackbar({
        open: true,
        message: "Failed to move to wishlist",
        severity: "error",
      });
    } finally {
      setUpdatingId(null);
    }
  };

  const handleRemoveFromCart = async (id) => {
    try {
      setUpdatingCartId(id);
      await dispatch(updateCartAsync(id));
      setSnackbar({
        open: true,
        message: "Removed from cart",
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Failed to remove from cart",
        severity: "error",
      });
    } finally {
      setUpdatingCartId(null);
    }
  };

  // ==================== Price Calculations ====================
  const { subtotal, delivery, total } = calculateTotal();

  // ==================== Render ====================
  return (
    <main className="container my-4">
      {/* Back Navigation */}
      <Box mb={3}>
        <Link to="/products" style={{ textDecoration: "none", color: "inherit", display: "flex", alignItems: "center" }}>
          <ArrowBackIcon sx={{ mr: 1 }} />
          <Typography variant="body1">Back to Products</Typography>
        </Link>
      </Box>

      {/* Title */}
      <Typography variant="h4" component="h1" gutterBottom align="center">
        My Cart ({products.length} items)
      </Typography>

      {/* Main Content */}
      <div className="row">
        {/* Cart Items */}
        <div className="col-md-8">
          {fetchCartProductsStatus === "loading" ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
              <CircularProgress />
            </Box>
          ) : products.length === 0 ? (
            <Paper className="p-5 text-center">
              <Typography variant="h6">Your cart is empty</Typography>
              <Button variant="contained" component={Link} to="/products" sx={{ mt: 2 }}>
                Continue Shopping
              </Button>
            </Paper>
          ) : (
            products.map((item) => (
              <Paper key={item._id} className="mb-4 p-4">
                <div className="row">
                  {/* Product Image */}
                  <div className="col-md-4">
                    <CardMedia
                      component="img"
                      height="200"
                      image={item.productImg}
                      alt={item.productName}
                      sx={{ objectFit: "cover", borderRadius: 1 }}
                    />
                  </div>

                  {/* Product Details */}
                  <div className="col-md-8">
                    <Typography variant="h6" gutterBottom>
                      {item.productName}
                    </Typography>

                    {/* Price */}
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      ${item.productPrice * (quantities[item._id] || 1)}
                    </Typography>

                    {/* Quantity Controls */}
                    <Box sx={{ mb: 3 }}>
                      <ButtonGroup size="small">
                        <Button
                          onClick={() => handleUpdateQuantity(item._id, (quantities[item._id] || 1) - 1)}
                          disabled={quantities[item._id] === 1}
                        >
                          <RemoveIcon />
                        </Button>
                        <Button disabled>
                          {quantities[item._id] || 1}
                        </Button>
                        <Button
                          onClick={() => handleUpdateQuantity(item._id, (quantities[item._id] || 1) + 1)}
                        >
                          <AddIcon />
                        </Button>
                      </ButtonGroup>
                    </Box>

                    {/* Action Buttons */}
                    <Box sx={{ display: "flex", gap: 2 }}>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleRemoveFromCart(item._id)}
                        disabled={updatingCartId === item._id}
                      >
                        {updatingCartId === item._id ? (
                          <CircularProgress size={24} />
                        ) : (
                          "Remove"
                        )}
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={() => handleMoveToWishlist(item._id)}
                        disabled={updatingId === item._id}
                      >
                        {updatingId === item._id ? (
                          <CircularProgress size={24} />
                        ) : (
                          "Move to Wishlist"
                        )}
                      </Button>
                    </Box>
                  </div>
                </div>
              </Paper>
            ))
          )}
        </div>

        {/* Price Details Card */}
        <div className="col-md-4">
          <Paper className="p-4" sx={{ position: { md: "sticky" }, top: { md: "20px" } }}>
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
      </div>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </main>
  );
}