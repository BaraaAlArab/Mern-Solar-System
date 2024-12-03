import {Button, Spinner} from "flowbite-react";
import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";

export default function PostPage() {
  const {postSlug} = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState(null);
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || [],
  );

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/Server/post/getposts?slug=${postSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        setPost(data.posts[0]);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchPost();
  }, [postSlug]);

  useEffect(() => {
    try {
      const fetchRecentPosts = async () => {
        const res = await fetch(`/Server/post/getposts?limit=3`);
        const data = await res.json();
        if (res.ok) {
          setRecentPosts(data.posts);
        }
      };
      fetchRecentPosts();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  const handleAddToCart = () => {
    if (post) {
      const newCart = [...cart, post];
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );

  return (
    <main className="p-6 max-w-6xl mx-auto min-h-screen grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left Side: Post Description and Button */}
      <section className="space-y-6">
        <h1 className="text-4xl font-bold text-gray-800 leading-snug">
          {post && post.title}
        </h1>

        <Link to={`/SearchPage?category=${post && post.category}`}>
          <Button color="gray" pill size="sm">
            {post && post.category}
          </Button>
        </Link>

        <div className="flex justify-between text-sm text-gray-500 border-t pt-4">
          <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
          <span>
            Estimated Read:{" "}
            <strong>
              {post && (post.content.length / 1000).toFixed(0)} mins
            </strong>
          </span>
        </div>

        <div
          className="prose prose-lg text-gray-700"
          dangerouslySetInnerHTML={{__html: post && post.content}}
        ></div>

        <div className="mt-4">
          <Button onClick={handleAddToCart} color="purple" pill size="lg">
            Add to Cart
          </Button>
        </div>
      </section>

      {/* Right Side: Image */}
      <aside className="flex justify-center items-center">
        <div className="w-80 h-80 overflow-hidden rounded-lg shadow-md">
          <img
            src={post && post.image}
            alt={post && post.title}
            className="w-full h-full object-cover"
          />
        </div>
      </aside>
    </main>
  );
}
