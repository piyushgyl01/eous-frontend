import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateCartAsync, updateWishlistAsync } from "../features/product/productSlice";

export default function useUpdateWishlist(products, setSnackbar) {
  const dispatch = useDispatch();
  const [updatingId, setUpdatingId] = useState(null);

  const handleUpdateWishlist = async (id) => {
    try {
      const currentProduct = products.find((p) => p._id === id);
      setUpdatingId(id);

       if (currentProduct?.isAddedToCart) {
        await dispatch(updateCartAsync(id));
      }

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

  return { updatingId, handleUpdateWishlist };
}
