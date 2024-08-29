import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateQuantity, removeItem, addItem } from './CartSlice';

const CartItem = ({ onContinueShopping }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  // Calculate total amount
  const calculateTotalAmount = () => {
    return cartItems.reduce((total, currentItem) => total + currentItem.quantity * currentItem.cost, 0);
  };

  // Calculate subtotal for each plant type
  const calculateSubtotal = (item) => {
    return item.quantity * item.cost;
  };

  // Handle continue shopping
  const handleContinueShopping = () => {
    onContinueShopping();
  };

  // Handle increment quantity
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  };

  // Handle decrement quantity
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
    } else {
      handleRemove(item.id);
    }
  };

  // Handle add item to cart
  const handleAddItem = (item) => {
    dispatch(addItem(item));
  };

  // Handle remove item
  const handleRemove = (id) => {
    dispatch(removeItem(id));
  };

  // Handle checkout (functionality to be added)
  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  // Total quantity counter for cart icon
  const totalQuantity = cartItems.reduce((sum, currentItem) => sum + currentItem.quantity, 0);

  return (
    <div className="cart-item">
      <h2>Shopping Cart</h2>
      {cartItems.map((item) => (
        <div key={item.id} className="item">
          <p>{item.name}</p>
          <p>Cost: ${item.cost}</p>
          <p>Quantity: {item.quantity}</p>
          <p>Subtotal: ${calculateSubtotal(item)}</p>
          <button onClick={() => handleIncrement(item)}>+</button>
          <button onClick={() => handleDecrement(item)}>-</button>
          <button onClick={() => handleRemove(item.id)}>Remove</button>
        </div>
      ))}
      <h3>Total Amount: ${calculateTotalAmount()}</h3>
      <button onClick={handleContinueShopping}>Continue Shopping</button>
      <button onClick={handleCheckoutShopping}>Checkout</button>
      <div className="cart-icon">
        Total Items: {totalQuantity}
      </div>
    </div>
  );
};

export default CartItem;
