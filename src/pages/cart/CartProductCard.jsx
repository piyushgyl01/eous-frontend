//mui imports
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import ButtonGroup from "@mui/material/ButtonGroup";
import Paper from "@mui/material/Paper";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import { Link } from "react-router";

export default function CartProductCard({
  item,
  quantities,
  updatingCartId,
  updatingId,
  handleRemoveFromCart,
  handleMoveToWishlist,
  handleUpdateQuantity,
}) {
  return (
    <Paper className="mb-4 p-4">
      <div className="row">
        {/* Product Image */}
        <div className="col-md-4">
          <Link to={`/products/${item.productName}/${item._id}`}>
            <CardMedia
              component="img"
              height="200"
              image={item.productImg}
              alt={item.productName}
              sx={{ objectFit: "cover", borderRadius: 1 }}
            />
          </Link>
        </div>
        {/* Product Details */}
        <div className="col-md-8">
          <Link to={`/products/${item.productName}/${item._id}`} className="text-decoration-none text-dark">
            <Typography variant="h6" gutterBottom>
              {item.productName}
            </Typography>
          </Link>
          {/* Price */}
          <Typography variant="h6" sx={{ mb: 2 }}>
            ${item.productPrice * (quantities[item._id] || 1)}
          </Typography>
          {/* Quantity Controls */}
          <Box sx={{ mb: 3 }}>
            <ButtonGroup size="small">
              <Button
                onClick={() =>
                  handleUpdateQuantity(
                    item._id,
                    (quantities[item._id] || 1) - 1
                  )
                }
                disabled={quantities[item._id] === 1}
              >
                <RemoveIcon />
              </Button>
              <Button disabled>{quantities[item._id] || 1}</Button>
              <Button
                onClick={() =>
                  handleUpdateQuantity(
                    item._id,
                    (quantities[item._id] || 1) + 1
                  )
                }
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
  );
}
