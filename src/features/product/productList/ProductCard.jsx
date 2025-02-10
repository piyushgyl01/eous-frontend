// MUI Core Components
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  CircularProgress,
} from "@mui/material";

import { Link } from "react-router-dom";

// components
import WishlistIcon from "../../../components/WishlistIcon";

export default function ProductCard({
  product,
  handleUpdateCart,
  handleUpdateWishlist,
  updatingCartId,
  updatingId,
}) {
  return (
    <>
           <Card sx={{ maxWidth: 345, position: "relative", padding: 2 }}>
            {/* Wishlist Icon */}
            <WishlistIcon
              item={product}
              updatingId={updatingId}
              handleUpdateWishlist={handleUpdateWishlist}
            />
            {/* Product Image */}
            <Link to={`/products/${product?.productName}/${product?._id}`}>
              <CardMedia
                component="img"
                height="300"
                image={product?.productImg}
                alt={product?.productName}
              />
            </Link>
            {/* Product Details */}
            <CardContent>
              <Link
                className="text-decoration-none text-dark"
                to={`/products/${product?.productName}/${product?._id}`}
              >
                <Typography variant="h6" component="div" align="center">
                  {product?.productName}
                </Typography>
              </Link>

              <Typography
                variant="h5"
                component="div"
                align="center"
                sx={{ fontWeight: "bold", marginY: 1 }}
              >
                ${product?.productPrice}
              </Typography>
              {/* Add to Cart Button */}
              <Button
                variant="contained"
                fullWidth
                onClick={() => handleUpdateCart(product?._id)}
                disabled={
                  updatingCartId === product?._id || product?.isAddedToCart
                }
                sx={{
                  backgroundColor: product?.isAddedToCart
                    ? "#d3d3d3"
                    : "primary.main",
                  color: "white",
                  textTransform: "none",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: product?.isAddedToCart
                      ? "#d3d3d3"
                      : "primary.dark",
                  },
                }}
              >
                {updatingCartId === product?._id ? (
                  <CircularProgress size={24} color="inherit" />
                ) : product?.isAddedToCart ? (
                  "Added to Cart"
                ) : (
                  "Add to Cart"
                )}
              </Button>
            </CardContent>
          </Card>
      </>
  );
}
