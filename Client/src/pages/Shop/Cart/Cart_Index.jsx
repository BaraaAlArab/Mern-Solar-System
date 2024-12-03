import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);

  // Fetch cart items when the page loads
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`/Server/Cart/get/${userId}`); // Pass the user ID here
        setCartItems(response.data.cartItems);
      } catch (error) {
        console.error("Error fetching cart items", error);
      }
    };

    fetchCartItems();
  }, []);

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const handleRemoveItem = async (productId) => {
    try {
      await axios.delete(`/Server/Cart/${userId}/${productId}`);
      setCartItems(cartItems.filter((item) => item.id !== productId)); // Update state after removal
    } catch (error) {
      console.error("Error removing item", error);
    }
  };

  const handleUpdateQuantity = async (productId, newQuantity) => {
    try {
      await axios.put(`/Server/Cart/update-cart`, {
        productId,
        quantity: newQuantity,
      });
      const updatedCart = cartItems.map((item) =>
        item.id === productId ? {...item, quantity: newQuantity} : item,
      );
      setCartItems(updatedCart);
    } catch (error) {
      console.error("Error updating quantity", error);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-semibold mb-6">Your Cart</h2>

      {cartItems.length === 0 ? (
        <div className="text-center text-xl text-gray-500">
          <p>Your cart is empty.</p>
          <Link to="/" className="text-blue-600 underline">
            Start Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-white p-4 rounded-lg shadow-lg"
              >
                <div className="flex items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-md mr-4"
                  />
                  <div>
                    <h3 className="text-xl font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.description}</p>
                    <div className="flex items-center mt-2">
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-lg font-semibold">
                    ${item.price.toFixed(2)}
                  </span>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() =>
                        handleUpdateQuantity(item.id, item.quantity - 1)
                      }
                      className="px-2 py-1 bg-gray-200 rounded-md"
                    >
                      -
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button
                      onClick={() =>
                        handleUpdateQuantity(item.id, item.quantity + 1)
                      }
                      className="px-2 py-1 bg-gray-200 rounded-md"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mt-8 bg-white p-4 rounded-lg shadow-lg">
            <div>
              <Link
                to="/"
                className="text-blue-600 font-semibold hover:underline"
              >
                Continue Shopping
              </Link>
            </div>
            <div>
              <span className="text-2xl font-semibold">
                Total: ${calculateTotal().toFixed(2)}
              </span>
            </div>
            <div>
              <Link
                to="/checkout"
                className="bg-blue-600 text-white py-2 px-6 rounded-lg text-lg hover:bg-blue-700 transition"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
