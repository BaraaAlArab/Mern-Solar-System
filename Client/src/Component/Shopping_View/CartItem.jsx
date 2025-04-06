import { useState, useEffect } from 'react';
import { Minus, Plus, Trash } from 'lucide-react';
import { Button } from '@mui/material';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UserCartItemsContent({
  cartItem,
  productList,
  onUpdateCart,
  onDeleteCartItem,
}) {
  const [quantity, setQuantity] = useState(cartItem?.quantity || 1);

  useEffect(() => {
    setQuantity(cartItem?.quantity || 1);
  }, [cartItem]);

  const handleUpdateQuantity = (typeOfAction) => {
    const currentProduct = productList.find(
      (product) => product._id === cartItem?.productId
    );
    const totalStock = currentProduct?.totalStock || 0;

    if (typeOfAction === 'plus' && quantity + 1 > totalStock) {
      toast.error(`Only ${totalStock} items in stock.`);
      return;
    }

    const newQuantity = typeOfAction === 'plus' ? quantity + 1 : quantity - 1;
    setQuantity(newQuantity);

    onUpdateCart({
      productId: cartItem?.productId,
      quantity: newQuantity,
    });

    toast.success('Cart Item Updated Successfully. Your cart has been updated.');
  };

  const handleCartItemDelete = () => {
    onDeleteCartItem(cartItem?.productId);
    toast.success('Cart Item Deleted Successfully. The item has been removed from your cart.');
  };

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
          <Button
            variant="outlined"
            className="w-8 h-8 rounded-full"
            size="small"
            disabled={quantity === 1}
            onClick={() => handleUpdateQuantity('minus')}
          >
            <Minus className="w-4 h-4" />
            <span className="sr-only">Decrease</span>
          </Button>
          <span className="font-semibold">{quantity}</span>
          <Button
            variant="outlined"
            className="w-8 h-8 rounded-full"
            size="small"
            onClick={() => handleUpdateQuantity('plus')}
          >
            <Plus className="w-4 h-4" />
            <span className="sr-only">Increase</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="font-semibold">
          $
          {(
            (cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) *
            quantity
          ).toFixed(2)}
        </p>
        <Trash
          onClick={handleCartItemDelete}
          className="mt-1 cursor-pointer"
          size={20}
        />
      </div>
    </div>
  );
}
