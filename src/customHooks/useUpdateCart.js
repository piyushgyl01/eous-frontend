// useUpdateCart.js
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  updateCartAsync,
  updateWishlistAsync,
} from "../features/product/productSlice";

export default function useUpdateCart(products, setSnackbar) {
  const dispatch = useDispatch();
  const [updatingCartId, setUpdatingCartId] = useState(null);

  const handleUpdateCart = async (id) => {
    console.log('=== Cart Update Triggered ===');
    console.log('Product ID:', id);
    console.log('Current Products:', products);
    console.log('Is Products Array:', Array.isArray(products));  try {
      setUpdatingCartId(id);

      const currentProduct = Array.isArray(products)
        ? products.find((p) => p._id === id)
        : products?._id === id
        ? products
        : null;

      if (currentProduct?.isWishlisted) {
        await dispatch(updateWishlistAsync(id));
        setSnackbar({
          open: true,
          message: "Moved to cart successfully",
          severity: "success",
        });
      }

      await dispatch(updateCartAsync(id));

      if (currentProduct?.isAddedToCart) {
        setSnackbar({
          open: true,
          message: "Removed from cart successfully",
          severity: "success",
        });
      } else {
        setSnackbar({
          open: true,
          message: "Added to cart successfully",
          severity: "success",
        });
      }
    } catch (error) {
      console.log(error);
      setSnackbar({
        open: true,
        message: "Failed to add to cart",
        severity: "error",
      });
    } finally {
      setUpdatingCartId(null);
    }
  };

  return { handleUpdateCart, updatingCartId };
}
