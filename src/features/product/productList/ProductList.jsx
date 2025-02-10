import { useEffect } from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAllProductsAsync,
  selectFilteredProducts,
  selectStatus,
} from "../productSlice";

// Components
import LoadingCircle from "../../../components/LoadingCircle";
import ProductCard from "./ProductCard";
import NotificationSnackbar from "../../../components/NotificationSnackbar";

// customHooks
import useUpdateCart from "../../../customHooks/useUpdateCart";
import useNotification from "../../../customHooks/useNotification";
import useUpdateWishlist from "../../../customHooks/useUpdateWishlist";

// Main Component
export default function ProductList() {
  //   Redux Hooks
  const dispatch = useDispatch();
  const products = useSelector(selectFilteredProducts);
  const { fetchStatus } = useSelector(selectStatus);

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

  //   Effects
  useEffect(() => {
    dispatch(fetchAllProductsAsync());
  }, [dispatch]);

  //   Main Render
  return (
    <div className="col-md-9 p-4">
      {/* Loading State */}
      {fetchStatus === "loading" ? (
        <LoadingCircle />
      ) : (
        <>
          {/* Header */}
          <h4>Showing All Products</h4>
          <div className="row">
            <p>({products.length} products)</p>
            {/* Product Grid */}
            {products.map((product) => (
        <div className="col-md-4 my-3" key={product._id}> <ProductCard
              product={product}
              handleUpdateCart={handleUpdateCart}
              handleUpdateWishlist={handleUpdateWishlist}
              updatingCartId={updatingCartId}
              updatingId={updatingId}
            /> </div>
          ))}
          </div>
        </>
      )}
      {/* Notifications */}
      <NotificationSnackbar
        open={snackbar.open}
        onClose={handleSnackbarClose}
        severity={snackbar.severity}
        message={snackbar.message}
      />
    </div>
  );
}
