import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateCartAsync, updateWishlistAsync } from "../features/product/productSlice";

export default function useUpdateWishlist(products, setSnackbar) {
  const dispatch = useDispatch();
  const [updatingId, setUpdatingId] = useState(null);

  const handleUpdateWishlist = async (id) => {
    try {
        // let currentProduct;
        // if (products.length < 1) {
        //       currentProduct = products.find((p) => p._id === id);

        // } else {
        //     currentProduct = products
        // }
        const currentProduct = Array.isArray(products) 
        ? products.find((p) => p._id === id) 
        : (products?._id === id ? products : null);


       if (currentProduct?.isAddedToCart) {
        await dispatch(updateCartAsync(id));
        setSnackbar({
            open: true,
            message: "Moved to wishlist",
            severity: "success",
          });
      } else {
        setSnackbar({
            open: true,
            message: currentProduct?.isWishlisted
              ? "Removed from wishlist"
              : "Added to wishlist",
            severity: "success",
          });
      }

      await dispatch(updateWishlistAsync(id));
      
    } catch (error) {
        console.log(error)
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
