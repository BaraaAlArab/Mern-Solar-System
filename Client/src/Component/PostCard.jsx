import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PostCard({post}) {
  const currentUser = useSelector((state) => state.user.currentUser); // Access user state

  const addToCart = async () => {
    if (!currentUser) {
      toast.error("You must be logged in to add items to the cart!");
      return;
    }

    try {
      const userId = currentUser._id; // Assuming currentUser has an _id field
      const quantity = 1;

      const response = await axios.post(
        "http://localhost:3001/Server/Cart/add",
        {
          userId, 
          productId: post._id, 
          quantity, 
        },
        {withCredentials: true},
      );

      if (response.status === 200) {
        toast.success("Added to the cart!");
      } else {
        toast.error("Did not add to cart. Please try again.");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="group relative w-full border border-teal-500 hover:border-2 h-[400px] overflow-hidden rounded-lg sm:w-[430px] transition-all">
      <Link to={`/post/${post.slug}`}>
        <img
          src={post.image}
          alt="post cover"
          className="h-[260px] w-full object-cover group-hover:h-[200px] transition-all duration-300 z-20"
        />
      </Link>
      <div className="p-3 flex flex-col gap-2">
        <p className="text-lg font-semibold line-clamp-2">{post.title}</p>
        <span className="italic text-sm">{post.category}</span>
        <Link
          to={`/Post/${post.slug}`}
          className="z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2"
        >
          Read article
        </Link>
        <button
          onClick={addToCart}
          className="mt-3 py-2 px-4 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition duration-300"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
