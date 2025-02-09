import { useEffect } from "react";

//redux imports
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCartProductsAsync,
  selectCartItems,
  selectStatus,
} from "../../features/product/productSlice";

//components
import BackButton from "../../components/BackButton.jsx";
import TitleText from "../../components/TitleText.jsx";
import LoadingCircle from "../../components/LoadingCircle.jsx";
import EmptyCartAndWishlist from "../../components/EmptyCartAndWishlist.jsx";
import NotificationSnackbar from "../../components/NotificationSnackbar.jsx";
import CartProductCard from "./CartProductCard.jsx";
import PriceDetailsCard from "./PriceDetailsCard.jsx";

//custom hooks
import useCalculateTotal from "./useCalculateTotal";
import useNotification from "../../customHooks/useNotification.js";
import useUpdateCart from "../../customHooks/useUpdateCart.js";
import useUpdateWishlist from "../../customHooks/useUpdateWishlist.js";

export default function Cart() {
  //  Redux Hooks
  const dispatch = useDispatch();
  const products = useSelector(selectCartItems);
  const { fetchCartProductsStatus, updateCartStatus } =
    useSelector(selectStatus);

  //  customHooks
  const { subtotal, delivery, total, quantities, handleUpdateQuantity } =
    useCalculateTotal(products);
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
    dispatch(fetchCartProductsAsync());
  }, [dispatch]);

  //  Render
  return (
    <main className="container my-4">
      {/* Back Navigation */}
      <BackButton />
      {/* Title */}
      <TitleText products={products} type="cart" />
      {/* Main Content */}
      <div className="row">
        {/* Cart Items */}
        <div className="col-md-8">
          {fetchCartProductsStatus === "loading" ? (
            <LoadingCircle />
          ) : products.length === 0 ? (
            <EmptyCartAndWishlist type="cart" />
          ) : (
            products.map((item) => (
              <div key={item._id}>
                <CartProductCard
                  item={item}
                  quantities={quantities}
                  handleMoveToWishlist={handleUpdateWishlist}
                  handleRemoveFromCart={handleUpdateCart}
                  updatingCartId={updatingCartId}
                  updatingId={updatingId}
                  handleUpdateQuantity={handleUpdateQuantity}
                />
              </div>
            ))
          )}
        </div>
        {/* Price Details Card */}
        <PriceDetailsCard
          products={products}
          delivery={delivery}
          total={total}
          subtotal={subtotal}
        />
      </div>
      {/* Notifications */}
      <NotificationSnackbar
        open={snackbar.open}
        onClose={handleSnackbarClose}
        severity={snackbar.severity}
        message={snackbar.message}
      />
    </main>
  );
}
