import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// MUI Components
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import ButtonGroup from "@mui/material/ButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

// MUI Icons
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import AssignmentReturnOutlinedIcon from "@mui/icons-material/AssignmentReturnOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAllProductsAsync,
  fetchProductByIdAsync,
  selectAllProducts,
  selectSelectedProduct,
  selectStatus,
} from "../../features/product/productSlice";
import BackButton from "../../components/BackButton";
import WishlistIcon from "../../components/WishlistIcon";

import useNotification from "../../customHooks/useNotification";
import useUpdateCart from "../../customHooks/useUpdateCart";
import useUpdateWishlist from "../../customHooks/useUpdateWishlist";
import { Divider } from "@mui/material";
import ProductList from "../../features/product/ProductList/ProductList";
import ProductCard from "../../features/product/ProductCard";
import NotificationSnackbar from "../../components/NotificationSnackbar";
import LoadingCircle from "../../components/LoadingCircle";
import ProductDetailsCard from "./DetailCard";
import DetailCard from "./DetailCard";

export default function ProductDetails() {
  const [quantity, setQuantity] = useState(1);

  //   Redux Hooks
  const dispatch = useDispatch();
  const clickedProduct = useSelector(selectSelectedProduct);
  const { fetchProductByIdStatus, updateWishlistStatus, updateCartStatus } =
    useSelector(selectStatus);

  //   Using Custom Hooks
  const { snackbar, setSnackbar, handleSnackbarClose } = useNotification();
  const { handleUpdateCart, updatingCartId } = useUpdateCart(
    clickedProduct,
    setSnackbar
  );
  const { updatingId, handleUpdateWishlist } = useUpdateWishlist(
    clickedProduct,
    setSnackbar
  );

  //USE NAVIGATE
  const navigate = useNavigate();

  //USE PARAMS
  const { id } = useParams();

  //USE SELECTOR TO GET PRODUCT FROM STORE

  useEffect(() => {
    dispatch(fetchProductByIdAsync(id));
  }, [dispatch, id]); // Added dependency array

  useEffect(() => {
    dispatch(fetchAllProductsAsync());
  }, [dispatch]); // Added dependency array
  const handleQuantityChange = (operation) => {
    if (operation === "add" && quantity < 10) {
      setQuantity(quantity + 1);
    } else if (operation === "subtract" && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const products = useSelector(selectAllProducts);
  //   const randomProducts = [...products] // Create a new array copy
  //     .sort(() => Math.random() - 0.5)
  //     .slice(0, 4);

  const randomProducts = products.slice(0, 4);

  return (
    <>
      <main className="container py-5">
        {fetchProductByIdStatus === "loading" ? (
          <LoadingCircle />
        ) : (
          <>
            {/* Back Button */}
            <BackButton />

            <div className="row">
              {/* Product Image */}
              <div className="col-md-6 position-relative mb-4">
                <WishlistIcon
                  item={clickedProduct}
                  updatingId={updatingId}
                  handleUpdateWishlist={handleUpdateWishlist}
                />
                <img
                  src={clickedProduct?.productImg}
                  alt={clickedProduct?.productName}
                  className="img-fluid rounded"
                  style={{
                    width: "100%",
                    maxHeight: "600px",
                    objectFit: "cover",
                  }}
                />
              </div>

              {/* Product Info */}
              <div className="col-md-6">
                <Typography variant="h4" component="h1" gutterBottom>
                  {clickedProduct?.productName}
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Rating value={4.5} precision={0.5} readOnly />
                  <Typography variant="body2" sx={{ ml: 1 }}>
                    4.5
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "baseline", mb: 3 }}>
                  <Typography
                    variant="h4"
                    component="span"
                    sx={{ fontWeight: "bold" }}
                  >
                    ${clickedProduct?.productPrice * quantity}
                  </Typography>
                </Box>

                {/* Quantity Selector */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Quantity:
                  </Typography>
                  <ButtonGroup>
                    <Button
                      onClick={() => handleQuantityChange("subtract")}
                      disabled={quantity <= 1}
                    >
                      <RemoveIcon />
                    </Button>
                    <Button disabled>{quantity}</Button>
                    <Button
                      onClick={() => handleQuantityChange("add")}
                      disabled={quantity >= 10}
                    >
                      <AddIcon />
                    </Button>
                  </ButtonGroup>
                </Box>

                {/* Action Buttons */}
                <Box sx={{ mb: 4 }}>
                  <Link to="/products/checkout">
                    <Button
                      variant="contained"
                      fullWidth
                      sx={{ mb: 2 }}
                      color="primary"
                    >
                      Buy Now
                    </Button>
                  </Link>
                  <Button
                    variant="outlined"
                    fullWidth
                    color="primary"
                    onClick={() => handleUpdateCart(clickedProduct?._id)}
                    disabled={
                      updateCartStatus === "loading" ||
                      clickedProduct?.isAddedToCart
                    }
                  >
                    {updateCartStatus === "loading" ? (
                      <CircularProgress size={24} />
                    ) : clickedProduct?.isAddedToCart ? (
                      "Added to Cart"
                    ) : (
                      "Add to Cart"
                    )}
                  </Button>
                </Box>

                {/* Delivery Features */}
                <Box sx={{ mb: 4 }}>
                  <div className="row">
                    <div className="col-6 col-md-3 text-center mb-3">
                      <AssignmentReturnOutlinedIcon
                        color="primary"
                        sx={{ fontSize: 40 }}
                      />
                      <Typography variant="body2">
                        30 days Returnable
                      </Typography>
                    </div>
                    <div className="col-6 col-md-3 text-center mb-3">
                      <PaymentOutlinedIcon
                        color="primary"
                        sx={{ fontSize: 40 }}
                      />
                      <Typography variant="body2">Pay on Delivery</Typography>
                    </div>
                    <div className="col-6 col-md-3 text-center mb-3">
                      <LocalShippingOutlinedIcon
                        color="primary"
                        sx={{ fontSize: 40 }}
                      />
                      <Typography variant="body2">Free Delivery</Typography>
                    </div>
                    <div className="col-6 col-md-3 text-center mb-3">
                      <SecurityOutlinedIcon
                        color="primary"
                        sx={{ fontSize: 40 }}
                      />
                      <Typography variant="body2">Secure Payment</Typography>
                    </div>
                  </div>
                </Box>

                {/* Product Description */}
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Description:
                  </Typography>
                  <ul className="list-styled">
                    {clickedProduct?.productDescription.map((description) => (
                      <li className="mb-2" key={description._id}>
                        {description.title}: {description.details}
                      </li>
                    ))}
                  </ul>
                </Box>
              </div>
            </div>
            <div className="row">
              <DetailCard
                product={clickedProduct}
                handleUpdateCart={handleUpdateCart}
                handleUpdateWishlist={handleUpdateWishlist}
                updatingCartId={updatingCartId}
                updatingId={updatingId}
              />
            </div>
            {/* Related Products */}
            <div className="row">
              {randomProducts.map((product) => (
                <div className="col-md-3" key={product._id}>
                  <ProductCard
                    product={product}
                    handleUpdateCart={handleUpdateCart}
                    handleUpdateWishlist={handleUpdateWishlist}
                    updatingCartId={updatingCartId}
                    updatingId={updatingId}
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </main>
      {/* Feedback Snackbar */}
      <NotificationSnackbar
        open={snackbar.open}
        onClose={handleSnackbarClose}
        severity={snackbar.severity}
        message={snackbar.message}
      />{" "}
    </>
  );
}
