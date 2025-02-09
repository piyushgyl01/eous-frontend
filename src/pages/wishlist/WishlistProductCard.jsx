// MUI Core Components
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  CircularProgress,
} from "@mui/material";

// React and Router
import { Link } from "react-router-dom";

//components
import WishlistIcon from "../../components/WishlistIcon";

export default function WishlistProductCard(
  {products,
  updatingId,
  handleUpdateWishlist,
  updatingCartId,
  handleUpdateCart}
) {
  return (
    <div className="row">
      {products.map((item) => (
        <div key={item._id} className="col-md-3 mb-4">
          <Card
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              position: "relative",
            }}
          >
            {/* Wishlist Icon */}
            <WishlistIcon
              item={item}
              updatingId={updatingId}
              handleUpdateWishlist={handleUpdateWishlist}
            />
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
                  backgroundColor:
                    updatingCartId === item._id ? "#d3d3d3" : "grey.500",
                  color: "white",
                  textTransform: "none",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor:
                      updatingCartId === item._id ? "#d3d3d3" : "grey.600",
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
  );
}
