import {useState} from "react";

export default function Order() {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardName, setCardName] = useState("");

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Payment Details
        </h1>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Card Number
            </label>
            <input
              type="text"
              placeholder="1234 5678 9123 4567"
              className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Name on Card
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
            />
          </div>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Expiry Date
              </label>
              <input
                type="text"
                placeholder="MM/YY"
                className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                CVV
              </label>
              <input
                type="text"
                placeholder="123"
                className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300"
          >
            Pay Now
          </button>
        </form>
        <div className="mt-6 border-t pt-4">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Order Summary
          </h2>
          <div className="flex justify-between text-gray-700 mb-2">
            <span>Item 1</span>
            <span>$10.00</span>
          </div>
          <div className="flex justify-between text-gray-700 mb-2">
            <span>Item 2</span>
            <span>$15.00</span>
          </div>
          <div className="flex justify-between text-gray-700 font-bold">
            <span>Total</span>
            <span>$25.00</span>
          </div>
        </div>
      </div>
    </div>
  );
}
