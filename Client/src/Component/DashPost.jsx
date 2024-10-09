import {useState, useEffect} from "react";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {HiOutlineExclamationCircle} from "react-icons/hi";

export default function DashPost() {
  const {currentUser} = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostToDelete] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(
          `/Server/post/getPost?userId=${currentUser._id}`,
          {
            method: "GET",
            headers: {
              "Cache-Control": "no-cache", // Prevents caching behavior
            },
          },
        );
        const data = await res.json();

        if (res.ok) {
          setUserPosts(data.posts);
          setShowMore(data.posts.length > 9);
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    if (currentUser.isAdmin) {
      fetchPost();
    }
  }, [currentUser._id, currentUser.isAdmin]);

  const handleShowMore = async () => {
    const startIndex = userPosts.length;
    try {
      const res = await fetch(
        `/Server/post/getpost?userId=${currentUser._id}&startIndex=${startIndex}`,
        {
          method: "GET",
          headers: {
            "Cache-Control": "no-cache", // Prevents caching behavior
          },
        },
      );
      const data = await res.json();
      if (res.ok) {
        setUserPosts((prev) => [...prev, ...data.posts]);
        if (data.posts.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.error("Failed to fetch users:", error.message);
    }
  };

  const handleDeletePost = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/Server/post/deletePost?postId=${postIdToDelete}`,
        {
          method: "DELETE",
          "Cache-Control": "no-cache", // Prevents caching behavior
        },
      );
      const data = await res.json();
      if (!res.ok) {
        console.error(data.message);
      } else {
        setUserPosts((prev) =>
          prev.filter((post) => post._id !== postIdToDelete),
        );
      }
    } catch (error) {
      console.error("Failed to fetch users:", error.message);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 overflow-x-auto">
      {currentUser.isAdmin && userPosts.length > 0 ? (
        <>
          <div className="overflow-hidden shadow-lg rounded-lg bg-white dark:bg-gray-800">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100 dark:bg-gray-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date Updated
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Image
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-700 divide-y divide-gray-200">
                {userPosts.map((post) => (
                  <tr key={post._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                      {new Date(post.updateAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link to={`/post/${post.slug}`}>
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-24 h-12 object-cover rounded-md"
                        />
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 dark:text-blue-400">
                      <Link to={`/post/${post.slug}`}>{post.title}</Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                      {post.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                      <div className="flex space-x-4">
                        <button
                          className="text-red-500 hover:text-red-600"
                          onClick={() => {
                            setShowModal(true);
                            setPostToDelete(post._id);
                          }}
                        >
                          Delete
                        </button>
                        <Link
                          to={`/update-post/${post._id}`}
                          className="text-blue-500 hover:text-blue-600"
                        >
                          Edit
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {showMore && (
            <button
              onClick={handleShowMore}
              className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md"
            >
              Show More
            </button>
          )}
        </>
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400">
          You have no posts yet!
        </p>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-11/12 max-w-md p-6 relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => setShowModal(false)}
            >
              &times;
            </button>
            <div className="text-center">
              <HiOutlineExclamationCircle className="mx-auto h-14 w-14 text-red-400 dark:text-red-200 mb-4" />
              <h3 className="mb-5 text-lg text-gray-600 dark:text-gray-300">
                Are you sure you want to delete this post?
              </h3>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={handleDeletePost}
                  className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg"
                >
                  Yes, Delete
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-5 py-2 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
