import {useState, useEffect} from "react";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Axios from "axios";

const OrderPage = () => {
  const [orderItems, setOrderItems] = useState([]);
  const [location, setLocation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const total = orderItems.reduce((acc, item) => acc + item.price, 0);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await Axios.get(
          "http://localhost:3001/Server/Cart/get/userId",
          {withCredentials: true},
        );
        setOrderItems(response.data.items); // Assuming 'items' is the key that holds the cart items
      } catch (error) {
        console.error("Error fetching cart items", error);
      }
    };
    fetchCartItems();
  }, []);

  const handlePlaceOrder = async () => {
    if (!location || !phoneNumber) {
      toast.error("Please provide both delivery location and phone number.");
      return;
    }

    try {
      const response = await Axios.post(
        "http://localhost:3001/Server/order/create",
        {
          items: orderItems,
          total: total,
          paymentMethod: "Pay on Delivery",
          location: location, // Include location in the request
          phoneNumber: phoneNumber, // Include phone number in the request
        },
        {withCredentials: true}, // Send cookies if needed
      );

      toast.success("Order is on its way!");
    } catch (error) {
      toast.error("There was an error placing your order.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-xl border border-gray-200">
      <h2 className="text-3xl font-bold text-blue-600 mb-8 text-center">
        Order Summary
      </h2>

      <div className="bg-blue-50 p-6 rounded-xl shadow-md mb-8">
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xl font-semibold text-blue-600">
                Your Items
              </th>
              <th className="px-6 py-3 text-right text-xl font-semibold text-blue-600">
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            {orderItems.map((item, index) => (
              <tr key={index} className="border-t border-blue-100">
                <td className="px-6 py-4 text-blue-600">{item.name}</td>
                <td className="px-6 py-4 text-blue-600 text-right">
                  ${item.price.toFixed(2)}
                </td>
              </tr>
            ))}
            <tr className="font-semibold text-blue-600">
              <td className="px-6 py-4 text-left">Total</td>
              <td className="px-6 py-4 text-right">${total.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Delivery Location and Phone Number */}
      <div className="bg-blue-50 p-6 rounded-xl shadow-md mb-8">
        <table className="w-full">
          <tbody>
            <tr>
              <td className="px-6 py-4 text-xl font-semibold text-blue-600">
                Delivery Location
              </td>
              <td className="px-6 py-4">
                <input required
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter your delivery address"
                  className="w-full p-3 border border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-xl font-semibold text-blue-600">
                Phone Number
              </td>
              <td className="px-6 py-4">
                <input required
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Enter your phone number"
                  className="w-full p-3 border border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-xl font-semibold text-blue-600">
                Payment Method
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="payOnDelivery"
                    name="paymentOption"
                    checked
                    disabled
                    className="mr-3 h-5 w-5 border-blue-600 text-blue-600 focus:ring-2 focus:ring-blue-400"
                  />
                  <label
                    htmlFor="payOnDelivery"
                    className="text-blue-600 text-lg"
                  >
                    Pay on Delivery
                  </label>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-8 border-t-2 border-blue-100 pt-4">
        <h4 className="text-2xl font-bold text-blue-600">Total</h4>
        <span className="text-3xl text-blue-600">${total.toFixed(2)}</span>
      </div>

      <div className="mt-8">
        <button
          onClick={handlePlaceOrder}
          className="w-full bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 transition duration-300 transform hover:scale-105"
        >
          Place Order
        </button>
      </div>

      <ToastContainer />
    </div>
  );
};

export default OrderPage;
