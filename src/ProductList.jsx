import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';

const ProductList = ({ products }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  // Handle adding item to cart
  const handleAddToCart = (product) => {
    const itemInCart = cartItems.find((item) => item.id === product.id);

    if (itemInCart) {
      // If item already in cart, increment quantity
      dispatch(addItem({ ...itemInCart, quantity: itemInCart.quantity + 1 }));
    } else {
      // If item not in cart, add with initial quantity 1
      dispatch(addItem({ ...product, quantity: 1 }));
    }
  };

  return (
    <div className="product-list">
      <h2>Product List</h2>
      {products.map((product) => (
        <div key={product.id} className="product">
          <p>{product.name}</p>
          <p>Cost: ${product.cost}</p>
          <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
