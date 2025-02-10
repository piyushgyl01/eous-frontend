import React, { useState } from "react";
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  CircularProgress,
  Box,
  Rating,
  ButtonGroup,
} from "@mui/material";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import WishlistIcon from "../../components/WishlistIcon";

export default function DetailCard({
  product,
  handleUpdateCart,
  handleUpdateWishlist,
  updatingCartId,
  updatingId,
}) {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (operation) => {
    if (operation === "add" && quantity < 10) {
      setQuantity(quantity + 1);
    } else if (operation === "subtract" && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <Card 
      sx={{ 
        maxWidth: '100%', 
        margin: "auto", 
        position: "relative", 
        p: 3,
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
        gap: 3
      }}
    >
      {/* Product Image */}
      <Box 
        sx={{ 
          position: "relative", 
          width: '100%', 
          height: '100%'
        }}
      >
        <WishlistIcon
          item={product}
          updatingId={updatingId}
          handleUpdateWishlist={handleUpdateWishlist}
        />
        <CardMedia
          component="img"
          sx={{ 
            height: '100%', 
            maxHeight: 500,
            objectFit: "cover", 
            borderRadius: 2 
          }}
          image={product?.productImg}
          alt={product?.productName}
        />
      </Box>

      {/* Product Details */}
      <CardContent 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center',
          width: '100%' 
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          {product?.productName}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Rating value={4.5} precision={0.5} readOnly />
          <Typography variant="body2" sx={{ ml: 1 }}>
            4.5
          </Typography>
        </Box>

        <Typography
          variant="h4"
          component="div"
          sx={{ fontWeight: "bold", mb: 3 }}
        >
          ${(product?.productPrice * quantity).toFixed(2)}
        </Typography>

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
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Button
            variant="contained"
            fullWidth
            color="primary"
          >
            Buy Now
          </Button>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => handleUpdateCart(product?._id)}
            disabled={
              updatingCartId === product?._id || product?.isAddedToCart
            }
          >
            {updatingCartId === product?._id ? (
              <CircularProgress size={24} />
            ) : product?.isAddedToCart ? (
              "Added to Cart"
            ) : (
              "Add to Cart"
            )}
          </Button>
        </Box>

        {/* Product Description */}
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Description:
          </Typography>
          <ul style={{ paddingLeft: 20 }}>
            {product?.productDescription?.map((description) => (
              <li key={description._id}>
                {description.title}: {description.details}
              </li>
            ))}
          </ul>
        </Box>
      </CardContent>
    </Card>
  );
}