import { useEffect, useState } from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";
import {
  fetchWishlistedProductsAsync,
  selectStatus,
  selectWishlistItems,
} from "../../features/product/productSlice";

// components
import BackButton from "../../components/BackButton";
import TitleText from "../../components/TitleText";
import LoadingCircle from "../../components/LoadingCircle";
import EmptyCartAndWishlist from "../../components/EmptyCartAndWishlist";
import NotificationSnackbar from "../../components/NotificationSnackbar";
import WishlistProductCard from "./WishlistProductCard";
import AlertMsg from "../../components/AlertMsg";

// customHooks
import useNotification from "../../customHooks/useNotification";
import useUpdateCart from "../../customHooks/useUpdateCart";
import useUpdateWishlist from "../../customHooks/useUpdateWishlist";

// Main Component
export default function Wishlist() {
  //  Redux Hooks
  const dispatch = useDispatch();
  const products = useSelector(selectWishlistItems);
  const { fetchWishlistedProductsStatus, updateCartStatus } =
    useSelector(selectStatus);

  //   Using Custom Hooks
  const { snackbar, setSnackbar, handleSnackbarClose } = useNotification();
  const { handleUpdateCart, updatingCartId } = useUpdateCart(
    products,
    setSnackbar
  );
  const { updatingId, handleUpdateWishlist } = useUpdateWishlist(
    products,
    setSnackbar
  );

  //  Effects
  useEffect(() => {
    dispatch(fetchWishlistedProductsAsync());
  }, [dispatch]);

  //  Main Render
  return (
    <main className="container my-4">
      {/* Error State */}
      {fetchWishlistedProductsStatus === "error" && (
        <AlertMsg severity={"error"} messsage="Failed to load wishlist items" />
      )}
      {/* Loading State */}
      {fetchWishlistedProductsStatus === "loading" ? (
        <LoadingCircle />
      ) : (
        <>
          {/* Navigation */}
          <BackButton />
          {/* Title */}
          <TitleText text="My Wishlist" />
          {/* Content */}
          {products.length === 0 ? (
            <EmptyCartAndWishlist type="" />
          ) : (
            <WishlistProductCard
              products={products}
              updatingCartId={updatingCartId}
              updatingId={updatingId}
              handleUpdateCart={handleUpdateCart}
              handleUpdateWishlist={handleUpdateWishlist}
            />
          )}
          {/* Notifications */}
          <NotificationSnackbar
            open={snackbar.open}
            onClose={handleSnackbarClose}
            severity={snackbar.severity}
            message={snackbar.message}
          />
        </>
      )}
    </main>
  );
}
