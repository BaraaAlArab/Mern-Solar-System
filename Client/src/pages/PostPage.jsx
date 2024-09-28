import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import CallToAction from "../Component/CallToAction";
import FeedbackSection from "../Component/FeedbackSection";
import {Button, Spinner} from "flowbite-react";

export default function PostPage() {
  const {postSlug} = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/Server/post/getPost?slug=${postSlug}`);
        const data = await res.json();

        if (!res.ok || !data.post || data.post.length === 0) {
          setError(true);
          setLoading(false);
          return;
        }

        setPost(data.post[0]);
        setError(false);
      } catch (error) {
        setError(true);
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postSlug]);

  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const res = await fetch(`/Server/post/getPost?limit=3`);
        const data = await res.json();
        if (res.ok && data.posts) {
          setRecentPosts(data.posts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchRecentPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h2 className="text-2xl font-semibold text-red-500">
          Failed to load post.
        </h2>
      </div>
    );
  }

  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
      <h1 className="text-3xl mt-10 p-3 text-center font-sans mx-auto lg:text-4xl">
        {post?.title}
      </h1>
      <Link
        to={`/search?category=${post?.category}`}
        className="self-center mt-5 text-lg text-gray-600 hover:text-gray-900"
      >
        <Button color="blue-900" pill size="xs">
          {post?.category}
        </Button>
      </Link>
      <img
        src={post?.image || "/path-to-default-image.jpg"}
        alt={post?.title}
        className="mt-10 p-3 max-h-[600px] w-full object-cover"
      />
      <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
        <span>
          {post?.createdAt && new Date(post.createdAt).toLocaleDateString()}
        </span>
      </div>
      <span className="italic">
        {post?.content
          ? `${(post.content.length / 1000).toFixed(0)} mins read`
          : "Loading..."}
      </span>

      <div
        className="p-3 max-w-2xl mx-auto w-full post-content"
        dangerouslySetInnerHTML={{__html: post?.content || ""}}
      ></div>

      {/* Recent Posts Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold">Recent Posts</h2>
        <div className="flex flex-col gap-4 mt-5">
          {recentPosts && recentPosts.length > 0 ? (
            recentPosts.map((recentPost) => (
              <div
                key={recentPost._id}
                className="border p-3 rounded-lg shadow-md"
              >
                <Link
                  to={`/post/${recentPost.slug}`}
                  className="text-lg font-semibold hover:underline"
                >
                  {recentPost.title}
                </Link>
                <p className="text-gray-600">
                  {recentPost.excerpt || recentPost.content.slice(0, 100)}...
                </p>
                <span className="text-sm text-gray-500">
                  {new Date(recentPost.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))
          ) : (
            <p>No recent posts available.</p>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto w-full">
        <CallToAction />
      </div>
      <FeedbackSection postId={post?._id} />
    </main>
  );
}
