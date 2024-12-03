import {useNavigate} from "react-router-dom";
import {Modal, Button} from "flowbite-react";
import UserCartItemsContent from "./Cart_Item_content";

export default function UserCartWrapper({cartItems, openCart, setOpenCart}) {
  const navigate = useNavigate();

  const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0,
        )
      : 0;

  return (
    <Modal
      show={openCart}
      onClose={() => setOpenCart(false)}
      size="md"
      position="center"
    >
      <Modal.Header>
        <h2 className="text-lg font-semibold text-gray-800">Your Cart</h2>
      </Modal.Header>

      <Modal.Body>
        <div className="space-y-4 max-h-[500px] overflow-y-auto">
          {cartItems && cartItems.length > 0 ? (
            cartItems.map((item) => (
              <UserCartItemsContent cartItem={item} key={item.productId} />
            ))
          ) : (
            <div className="text-center text-gray-500">Your cart is empty.</div>
          )}
        </div>
      </Modal.Body>

      <Modal.Footer>
        <div className="w-full bg-gray-100 p-4 rounded-lg shadow-md flex justify-between text-gray-700">
          <span className="font-semibold">Total</span>
          <span className="font-semibold text-lg">
            ${totalCartAmount.toFixed(2)}
          </span>
        </div>

        <Button
          onClick={() => {
            navigate("/shop/checkout");
            setOpenCart(false);
          }}
          className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md"
        >
          Proceed to Checkout
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
