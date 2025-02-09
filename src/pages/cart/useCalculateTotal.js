import { useState } from "react";

export default function useCalculateTotal  (products)  {
    const [quantities, setQuantities] = useState({});

    const handleUpdateQuantity = (id, newQuantity) => {
      if (newQuantity < 1) return;
      setQuantities((prev) => ({ ...prev, [id]: newQuantity }));
    };

    if (!products || !products.length) {
      return { subtotal: 0, delivery: 0, total: 0 };
    }

    const subtotal = products.reduce((sum, item) => {
      const itemQuantity = quantities[item._id] || 1;
      return sum + item.productPrice * itemQuantity;
    }, 0);

    const delivery = subtotal > 0 ? 499 : 0;
    const total = subtotal + delivery;

    return { subtotal, delivery, total, quantities, handleUpdateQuantity };
  };