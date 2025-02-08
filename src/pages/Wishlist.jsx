// Imports

// MUI Core Components
import {
    Box,
    Typography,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    IconButton,
    Button,
    CircularProgress,
    Snackbar,
    Alert,
  } from "@mui/material";
  
  // MUI Icons
  import {
    FavoriteBorder as FavoriteBorderIcon,
    Favorite as FavoriteIcon,
    ArrowBack as ArrowBackIcon,
  } from "@mui/icons-material";
  
  // React and Router
  import { Link } from "react-router-dom";
  import { useEffect, useState } from "react";
  
  // Redux
  import { useSelector, useDispatch } from "react-redux";
  import {
    fetchWishlistedProductsAsync,
    selectStatus,
    selectWishlistItems,
    updateCartAsync,
    updateWishlistAsync,
  } from "../features/product/productSlice";
  
  // Main Component
  
  export default function Wishlist() {
    //  State Management 
    const [updatingId, setUpdatingId] = useState(null);
    const [updatingCartId, setUpdatingCartId] = useState(null);
    const [snackbar, setSnackbar] = useState({
      open: false,
      message: "",
      severity: "success",
    });
  
    //  Redux Hooks 
    const dispatch = useDispatch();
    const products = useSelector(selectWishlistItems);
    const { fetchWishlistedProductsStatus, updateCartStatus } = useSelector(selectStatus);
  
    //  Effects 
    // Fetch wishlist items on mount
    useEffect(() => {
      dispatch(fetchWishlistedProductsAsync());
    }, [dispatch]);
  
    // Handle cart update notifications
    useEffect(() => {
      if (updateCartStatus === "success") {
        setSnackbar({
          open: true,
          message: "Added to cart successfully",
          severity: "success",
        });
      } else if (updateCartStatus === "error") {
        setSnackbar({
          open: true,
          message: "Failed to add to cart",
          severity: "error",
        });
      }
    }, [updateCartStatus, updatingCartId]);
  
    //  Event Handlers 
    const handleSnackbarClose = () => {
      setSnackbar((prev) => ({ ...prev, open: false }));
    };
  
    const handleUpdateCart = async (id) => {
      try {
        setUpdatingCartId(id);
        await dispatch(updateCartAsync(id));
        dispatch(updateWishlistAsync(id));
        setUpdatingCartId(null);
      } catch (error) {
        console.log("UNABLE TO UPDATE THE CART", error);
        setUpdatingCartId(null);
      }
    };
  
    const handleUpdateWishlist = async (id) => {
      try {
        const currentProduct = products.find((p) => p._id === id);
        setUpdatingId(id);
        await dispatch(updateWishlistAsync(id));
        setSnackbar({
          open: true,
          message: currentProduct?.isWishlisted
            ? "Removed from wishlist"
            : "Added to wishlist",
          severity: "success",
        });
        setUpdatingId(null);
      } catch (error) {
        setSnackbar({
          open: true,
          message: "Failed to update wishlist",
          severity: "error",
        });
        setUpdatingId(null);
      }
    };
  
    //  Render Helpers 
    const renderWishlistIcon = (item) => (
      <Box
        sx={{
          position: "absolute",
          top: 10,
          right: 10,
          backgroundColor: "#fff",
          borderRadius: "50%",
          padding: 0.5,
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          zIndex: 1,
        }}
      >
        <IconButton
          onClick={() => handleUpdateWishlist(item._id)}
          disabled={updatingId === item._id}
          sx={{ "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.8)" } }}
        >
          {updatingId === item._id ? (
            <CircularProgress size={20} sx={{ color: "gray" }} />
          ) : item.isWishlisted ? (
            <FavoriteIcon sx={{ color: "red", "&:hover": { color: "gray" } }} />
          ) : (
            <FavoriteBorderIcon sx={{ color: "gray", "&:hover": { color: "pink" } }} />
          )}
        </IconButton>
      </Box>
    );
  
    const renderEmptyWishlist = () => (
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, py: 5 }}>
        <Typography variant="h6">Your wishlist is empty</Typography>
        <Link to="/products" style={{ textDecoration: "none" }}>
          <Button variant="contained" color="primary">Continue Shopping</Button>
        </Link>
      </Box>
    );
  
    //  Main Render 
    return (
      <main className="container my-4">
        {/* Error State */}
        {fetchWishlistedProductsStatus === "error" && (
          <Alert severity="error" sx={{ mb: 3 }}>Failed to load wishlist items</Alert>
        )}
  
        {/* Loading State */}
        {fetchWishlistedProductsStatus === "loading" ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {/* Navigation */}
            <Box mb={3}>
              <Link to="/products" style={{ textDecoration: "none", color: "inherit", display: "flex", alignItems: "center" }}>
                <ArrowBackIcon sx={{ mr: 1 }} />
                <Typography variant="body1">Back to Products</Typography>
              </Link>
            </Box>
  
            {/* Title */}
            <Typography variant="h4" component="h1" gutterBottom className="mb-4" align="center">
              My Wishlist
            </Typography>
  
            {/* Content */}
            {products.length === 0 ? renderEmptyWishlist() : (
              <div className="row">
                {products.map((item) => (
                  <div key={item._id} className="col-md-3 mb-4">
                    <Card sx={{ height: "100%", display: "flex", flexDirection: "column", position: "relative" }}>
                      {/* Wishlist Icon */}
                      {renderWishlistIcon(item)}
  
                      {/* Product Image */}
                      <Link to={`/products/${item.productName}/${item._id}`}>
                        <CardMedia
                          component="img"
                          height="300"
                          image={item.productImg}
                          alt={item.productName}
                          sx={{ objectFit: "cover" }}
                        />
                      </Link>
  
                      {/* Product Details */}
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Link
                          className="text-decoration-none text-dark"
                          to={`/products/${item.productName}/${item._id}`}
                        >
                          <Typography variant="h6" component="div" align="center">
                            {item.productName}
                          </Typography>
                        </Link>
                        <Typography
                          variant="h5"
                          component="div"
                          align="center"
                          sx={{ fontWeight: "bold", mt: 1 }}
                        >
                          ${item.productPrice}
                        </Typography>
                      </CardContent>
  
                      {/* Action Buttons */}
                      <CardActions sx={{ p: 2 }}>
                        <Button
                          variant="contained"
                          fullWidth
                          onClick={() => handleUpdateCart(item._id)}
                          disabled={updatingCartId === item._id}
                          sx={{
                            backgroundColor: updatingCartId === item._id ? "#d3d3d3" : "grey.500",
                            color: "white",
                            textTransform: "none",
                            fontWeight: "bold",
                            "&:hover": {
                              backgroundColor: updatingCartId === item._id ? "#d3d3d3" : "grey.600",
                            },
                          }}
                        >
                          {updatingCartId === item._id ? (
                            <CircularProgress size={24} color="inherit" />
                          ) : (
                            "Move to Cart"
                          )}
                        </Button>
                      </CardActions>
                    </Card>
                  </div>
                ))}
              </div>
            )}
  
            {/* Notifications */}
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
          </>
        )}
      </main>
    );
  }