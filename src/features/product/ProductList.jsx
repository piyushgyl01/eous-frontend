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

//react imports
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

//redux imports
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAllProductsAsync,
  selectFilteredProducts,
  selectStatus,
  updateCartAsync,
  updateWishlistAsync,
} from "./productSlice";

export default function ProductList() {
  //useState
  const [updatingId, setUpdatingId] = useState(null);
  const [updatingCartId, setUpdatingCartId] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  //useDispatch
  const dispatch = useDispatch();

  //getting products from state
  const products = useSelector(selectFilteredProducts);
  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  //useEffect
  useEffect(() => {
    dispatch(fetchAllProductsAsync());
  }, [dispatch]);

  //get status states from store
  const { fetchStatus } = useSelector(selectStatus);
  const { updateCartStatus } = useSelector(selectStatus);

  //handle update wishlist
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

  //handle update cart
  const handleUpdateCart = async (id) => {
    try {
      setUpdatingCartId(id);
      await dispatch(updateCartAsync(id));
      setUpdatingCartId(null);
    } catch (error) {
      console.log("UNABLE TO UPDATE THE CART", error);
      setUpdatingCartId(null);
    }
  };

  //useEffect for the update cart snackbar
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

  return (
    <div className="col-md-9 p-4">
      {fetchStatus === "loading" ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <h4>Showing All Products</h4>
          <div className="row">
            <p>( {products.length} products)</p>

            {products.map((product) => (
              <div className="col-md-4 my-3" key={product._id}>
                <Card sx={{ maxWidth: 345, position: "relative", padding: 2 }}>
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
                      sx={{
                        "&:hover": {
                          backgroundColor: "rgba(255, 255, 255, 0.8)",
                        },
                      }}
                    >
                      {updatingId === product._id ? (
                        <CircularProgress size={20} sx={{ color: "gray" }} />
                      ) : product.isWishlisted ? (
                        <FavoriteIcon
                          sx={{
                            color: "red",
                            "&:hover": {
                              color: "gray",
                            },
                          }}
                        />
                      ) : (
                        <FavoriteBorderIcon
                          sx={{
                            color: "gray",
                            "&:hover": {
                              color: "pink",
                            },
                          }}
                        />
                      )}
                    </IconButton>
                  </Box>

                  <Link to={` `}>
                    <CardMedia
                      component="img"
                      height="300"
                      image={product.productImg}
                      alt={product.productName}
                    />
                  </Link>

                  <CardContent>
                    <Link className="text-decoration-none text-dark" to={` `}>
                      <Typography variant="h6" component="div" align="center">
                        {product.productName}
                      </Typography>{" "}
                    </Link>

                    <Typography
                      variant="h5"
                      component="div"
                      align="center"
                      sx={{ fontWeight: "bold", marginY: 1 }}
                    >
                      ${product.productPrice}
                    </Typography>
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={() => handleUpdateCart(product._id)}
                      disabled={
                        updatingCartId === product._id || product.isAddedToCart
                      }
                      sx={{
                        backgroundColor: product.isAddedToCart
                          ? "#d3d3d3"
                          : "primary.main",
                        color: "white",
                        textTransform: "none",
                        fontWeight: "bold",
                        "&:hover": {
                          backgroundColor: product.isAddedToCart
                            ? "#d3d3d3"
                            : "primary.dark",
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
            ))}
          </div>
        </>
      )}
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
