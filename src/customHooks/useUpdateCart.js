// useUpdateCart.js
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateCartAsync, updateWishlistAsync } from "../features/product/productSlice";

export default function useUpdateCart(products, setSnackbar) {
  const dispatch = useDispatch();
  const [updatingCartId, setUpdatingCartId] = useState(null);

  const handleUpdateCart = async (id) => {
    try {
      setUpdatingCartId(id);

      const currentProduct = products.find((p) => p._id === id);
      if (currentProduct?.isWishlisted) {
        await dispatch(updateWishlistAsync(id));
      }

      await dispatch(updateCartAsync(id));
      setSnackbar({
        open: true,
        message: "Added to cart successfully",
        severity: "success",
      });
    } catch (error) {
        console.log(error)
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
