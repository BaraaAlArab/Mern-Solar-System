import Header from "../Component/Header";
import Footer from "../Component/Footer";
import StorePage from "../Component/StorePage";
import EmblaCarousel from "../Component/Carousel/EmblaCarousel";
import {Link} from "react-router-dom";
import {useState, useEffect} from "react";
function Services() {
  const [post, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/Server/post/getPost", {
        cache: "no-store", // Bypass cache
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <EmblaCarousel />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-10">
          <main className="md:col-span-3 m-5 ">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                "https://images.unsplash.com/photo-1545208942-e1c9c916524b?q=80&w=480&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1545209575-704d1434f9cd?q=80&w=480&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1545208942-e1c9c916524b?q=80&w=480&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1545208942-e1c9c916524b?q=80&w=480&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1545209575-704d1434f9cd?q=80&w=480&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1660330589257-813305a4a383?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              ].map((src, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg overflow-hidden shadow-lg transform hover:scale-105 hover:shadow-2xl transition-transform duration-300"
                >
                  <div className="relative">
                    <img
                      src={src}
                      srcSet={`${src} 480w, ${src.replace(
                        "w=480",
                        "w=800",
                      )} 800w, ${src.replace("w=480", "w=1200")} 1200w`}
                      sizes="(max-width: 600px) 480px, (max-width: 1200px) 800px, 1200px"
                      alt={`Example Image ${index + 1}`}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-black opacity-0 hover:opacity-90 transition-opacity duration-300 flex items-center justify-center">
                      <Link
                        to="/Order"
                        className="bg-blue-500 text-white px-4 py-2 rounded-full opacity-0 hover:opacity-100 transform hover:scale-110 transition-all duration-300"
                      >
                        Buy Now
                      </Link>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">panel</h3>
                    <p className="text-gray-600 mb-4">
                      Brief description of the product. It could be a short
                      sentence or two.
                    </p>
                    <Link
                      to="search"
                      className="text-xs sm:text-sm text-blue-500 font-bold hover:underline"
                    >
                      view all items
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <div className="max-w-6x1 mx-auto p-3 flex-col gap-8 py-7">
              {post && post.length > 0 && (
                <div className="flex flex-col gap-6">
                  <h2 className="text-2x1 font-sans text-center">
                    Recent Posts
                  </h2>
                  <div className="flex flex-wrap gap-4">
                    {post.map((post) => (
                      <StorePage key={post._id} post={post} />
                    ))}
                  </div>
                  <Link to={"search"} className="text-lg text-blue-800">
                    view all posts
                  </Link>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Services;
