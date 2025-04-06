import {Delete, Remove, Add} from "@mui/icons-material";
import {IconButton} from "@mui/material";

export default function UserCartItemsContent({cartItem}) {
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
          <IconButton color="primary" disabled={cartItem?.quantity === 1}>
            <Remove fontSize="small" />
          </IconButton>
          <span className="font-semibold">{cartItem?.quantity}</span>
          <IconButton color="primary">
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
        <IconButton color="secondary">
          <Delete fontSize="small" />
        </IconButton>
      </div>
    </div>
  );
}
