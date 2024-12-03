import {Delete, Remove, Add} from "@mui/icons-material";
import {IconButton} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {deleteCartItem, updateCartQuantity} from "@/store/shop/cart-slice";
import {useToast} from "@/hooks/use-toast";

export default function UserCartItemsContent({cartItem}) {
  const {user} = useSelector((state) => state.auth);
  const {cartItems} = useSelector((state) => state.shopCart);
  const {productList} = useSelector((state) => state.shopProducts);
  const dispatch = useDispatch();
  const {toast} = useToast();

  function handleUpdateQuantity(getCartItem, typeOfAction) {
    if (typeOfAction === "plus") {
      let getCartItems = cartItems.items || [];
      if (getCartItems.length) {
        const indexOfCurrentCartItem = getCartItems.findIndex(
          (item) => item.productId === getCartItem?.productId,
        );
        const getCurrentProductIndex = productList.findIndex(
          (product) => product._id === getCartItem?.productId,
        );
        const getTotalStock = productList[getCurrentProductIndex].totalStock;

        if (indexOfCurrentCartItem > -1) {
          const getQuantity = getCartItems[indexOfCurrentCartItem].quantity;
          if (getQuantity + 1 > getTotalStock) {
            toast({
              title: `Only ${getQuantity} quantity can be added for this item`,
              variant: "destructive",
            });
            return;
          }
        }
      }
    }

    dispatch(
      updateCartQuantity({
        userId: user?.id,
        productId: getCartItem?.productId,
        quantity:
          typeOfAction === "plus"
            ? getCartItem?.quantity + 1
            : getCartItem?.quantity - 1,
      }),
    ).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "Cart Item Is Updated Successfully",
          description: "Your item was updated successfully!",
          className: "bg-green-500 text-white",
        });
      }
    });
  }

  function handleCartItemDelete(getCartItem) {
    dispatch(
      deleteCartItem({userId: user?.id, productId: getCartItem?.productId}),
    ).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "Cart Item Is Deleted Successfully",
          description: "Your cart item was deleted successfully!",
          className: "bg-green-500 text-white",
        });
      }
    });
  }

  return (
    <div className="flex items-center space-x-4">
      <img
        src={cartItem?.image}
        alt={cartItem?.title}
        className="object-cover w-20 h-20 rounded"
      />
      <div className="flex-1">
        <h3 className="font-extrabold">{cartItem?.title}</h3>
        <div className="flex items-center gap-2 mt-1">
          <IconButton
            color="primary"
            disabled={cartItem?.quantity === 1}
            onClick={() => handleUpdateQuantity(cartItem, "minus")}
          >
            <Remove fontSize="small" />
          </IconButton>
          <span className="font-semibold">{cartItem?.quantity}</span>
          <IconButton
            color="primary"
            onClick={() => handleUpdateQuantity(cartItem, "plus")}
          >
            <Add fontSize="small" />
          </IconButton>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="font-semibold">
          $
          {(
            (cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) *
            cartItem?.quantity
          ).toFixed(2)}
        </p>
        <IconButton
          color="secondary"
          onClick={() => handleCartItemDelete(cartItem)}
        >
          <Delete fontSize="small" />
        </IconButton>
      </div>
    </div>
  );
}
