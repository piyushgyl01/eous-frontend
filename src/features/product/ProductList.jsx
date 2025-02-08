 // Imports
 
// MUI Core Components
import {
    Box,
    Typography,
    Card,
    CardMedia,
    CardContent,
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
  } from "@mui/icons-material";
  
  // React and Router
  import { Link } from "react-router-dom";
  import { useEffect, useState } from "react";
  
  // Redux
  import { useSelector, useDispatch } from "react-redux";
  import {
    fetchAllProductsAsync,
    selectFilteredProducts,
    selectStatus,
    updateCartAsync,
    updateWishlistAsync,
  } from "./productSlice";
  
   // Main Component
   
  export default function ProductList() {
    //   State Management  
    const [updatingId, setUpdatingId] = useState(null);          // For wishlist loading state
    const [updatingCartId, setUpdatingCartId] = useState(null);  // For cart loading state
    const [snackbar, setSnackbar] = useState({
      open: false,
      message: "",
      severity: "success",
    });
  
    //   Redux Hooks  
    const dispatch = useDispatch();
    const products = useSelector(selectFilteredProducts);
    const { fetchStatus, updateCartStatus } = useSelector(selectStatus);
  
    //   Effects  
    // Fetch products on mount
    useEffect(() => {
      dispatch(fetchAllProductsAsync());
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
    }, [updateCartStatus]);
  
    //   Event Handlers  
    const handleSnackbarClose = () => {
      setSnackbar((prev) => ({ ...prev, open: false }));
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
      } catch (error) {
        setSnackbar({
          open: true,
          message: "Failed to update wishlist",
          severity: "error",
        });
      } finally {
        setUpdatingId(null);
      }
    };
  
    const handleUpdateCart = async (id) => {
      try {
        setUpdatingCartId(id);
        await dispatch(updateCartAsync(id));
      } catch (error) {
        console.log("UNABLE TO UPDATE THE CART", error);
      } finally {
        setUpdatingCartId(null);
      }
    };
  
    //   Render Helpers  
    const renderWishlistIcon = (product) => (
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
          onClick={() => handleUpdateWishlist(product._id)}
          disabled={updatingId === product._id}
          sx={{ "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.8)" } }}
        >
          {updatingId === product._id ? (
            <CircularProgress size={20} sx={{ color: "gray" }} />
          ) : product.isWishlisted ? (
            <FavoriteIcon sx={{ color: "red", "&:hover": { color: "gray" } }} />
          ) : (
            <FavoriteBorderIcon sx={{ color: "gray", "&:hover": { color: "pink" } }} />
          )}
        </IconButton>
      </Box>
    );
  
    const renderProductCard = (product) => (
      <div className="col-md-4 my-3" key={product._id}>
        <Card sx={{ maxWidth: 345, position: "relative", padding: 2 }}>
          {/* Wishlist Icon */}
          {renderWishlistIcon(product)}
  
          {/* Product Image */}
          <Link to={` `}>
            <CardMedia
              component="img"
              height="300"
              image={product.productImg}
              alt={product.productName}
            />
          </Link>
  
          {/* Product Details */}
          <CardContent>
            <Link className="text-decoration-none text-dark" to={` `}>
              <Typography variant="h6" component="div" align="center">
                {product.productName}
              </Typography>
            </Link>
  
            <Typography
              variant="h5"
              component="div"
              align="center"
              sx={{ fontWeight: "bold", marginY: 1 }}
            >
              ${product.productPrice}
            </Typography>
  
            {/* Add to Cart Button */}
            <Button
              variant="contained"
              fullWidth
              onClick={() => handleUpdateCart(product._id)}
              disabled={updatingCartId === product._id || product.isAddedToCart}
              sx={{
                backgroundColor: product.isAddedToCart ? "#d3d3d3" : "primary.main",
                color: "white",
                textTransform: "none",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: product.isAddedToCart ? "#d3d3d3" : "primary.dark",
                },
              }}
            >
              {updatingCartId === product._id ? (
                <CircularProgress size={24} color="inherit" />
              ) : product.isAddedToCart ? (
                "Added to Cart"
              ) : (
                "Add to Cart"
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  
    //   Main Render  
    return (
      <div className="col-md-9 p-4">
        {/* Loading State */}
        {fetchStatus === "loading" ? (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {/* Header */}
            <h4>Showing All Products</h4>
            <div className="row">
              <p>( {products.length} products)</p>
  
              {/* Product Grid */}
              {products.map(renderProductCard)}
            </div>
          </>
        )}
  
        {/* Notifications */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert 
            onClose={handleSnackbarClose}
            severity={snackbar.severity}
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </div>
    );
  }