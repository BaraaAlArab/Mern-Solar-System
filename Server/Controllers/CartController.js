import Post from "../models/Post.js";
import Cart from "../models/Shop/Cart.js";

export const addToCart = async (req, res) => {
  try {
    const {userId, productId, Price, content, title, quantity} = req.body;

    // Validate the quantity
    if (!Number.isInteger(quantity) || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid Quantity.",
      });
    }

    // Check if the product exists
    const product = await Post.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "The specified product does not exist.",
      });
    }

    // Find or create a cart for the user
    let cart = await Cart.findOne({userId});
    if (!cart) {
      cart = new Cart({userId, items: []});
    }

    // Check if the product is already in the cart
    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId.toString(),
    );

    if (itemIndex === -1) {
      // Add a new product to the cart
      cart.items.push({productId, quantity, Price, title, content}); // Changed salePrice to Price
    } else {
      // Update the quantity of an existing product
      cart.items[itemIndex].quantity += quantity;
    }

    // Save the updated cart
    await cart.save();

    res.status(200).json({
      success: true,
      message: "Product added to cart successfully.",
      data: cart,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to add the product to the cart. Please try again later.",
    });
  }
};

export const fetchCartItems = async (req, res) => {
  try {
    const {userId} = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required..!",
      });
    }
    const cart = await Cart.findOne({userId}).populate({
      path: "items.productId",
      select: "image title Price", // Removed salePrice
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found for the specified user.",
      });
    }

    const populatedItems = cart.items
      .filter((item) => item.productId)
      .map((item) => ({
        productId: item.productId._id,
        image: item.productId.image,
        title: item.productId.title,
        Price: item.productId.Price, // Changed salePrice to Price
        quantity: item.quantity,
      }));

    res.status(200).json({
      success: true,
      data: {...cart._doc, items: populatedItems},
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch cart items. Please try again later.",
    });
  }
};

export const updateCartItemQty = async (req, res) => {
  try {
    const {userId, productId, quantity} = req.body;

    if (quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid Quantity.",
      });
    }

    const cart = await Cart.findOne({userId});
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found for the specified user.",
      });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId,
    );

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Item not found in the cart.",
      });
    }

    cart.items[itemIndex].quantity = quantity;
    await cart.save();

    res.status(200).json({
      success: true,
      message: "Cart item quantity updated successfully.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to update cart item quantity. Please try again later.",
    });
  }
};

export const deleteCartItem = async (req, res) => {
  try {
    const {userId, productId} = req.params;

    const cart = await Cart.findOne({userId});
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found for the specified user.",
      });
    }

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId,
    );
    await cart.save();

    res.status(200).json({
      success: true,
      message: "Cart item deleted successfully.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to delete the cart item. Please try again later.",
    });
  }
};
