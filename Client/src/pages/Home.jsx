import {useState, useEffect} from "react";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import {Link} from "react-router-dom";
import {Carousel, Button, Modal} from "flowbite-react";
import {FiShoppingCart, FiSearch, FiUser} from "react-icons/fi";
import PostCard from "../Component/PostCard";

function Services() {
  const [posts, setPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/Server/post/getposts", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await res.json();
        setPosts(data.posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  const images = [
    "https://www.bctvnergy.com/uploads/202229346/blue-carbon-lifepo4-lithium-battery-24v-200ah54140543640.jpg",
    "https://happysolar.co.ke/wp-content/uploads/2023/04/6mm2-pv-cables-available-in-kenya.jpg",
    "https://www.agsa.com/cdn/shop/products/PanelSolar36.png?v=1665686758",
    // Add more image URLs as needed
  ];

  const openModal = (src) => {
    setSelectedImage(src);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage("");
    setIsModalOpen(false);
  };

  return (
    <>
      <Header className="shadow-md mb-8" />
      <section className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-20">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Our Premium Services
          </h1>
          <p className="text-lg md:text-2xl mb-8">
            Discover the best solutions tailored for your needs.
          </p>
          <Link to="/search">
            <Button
              gradientMonochrome="info"
              size="lg"
              className="inline-flex items-center"
            >
              <FiShoppingCart className="mr-2" />
              Get Started
            </Button>
          </Link>
        </div>
      </section>
      {/* Main Container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Advanced Carousel Section */}
        <div className="mb-16">
          <Carousel slideInterval={5000} indicators={true}>
            <img
              src="https://images.unsplash.com/photo-1545208942-e1c9c916524b?q=80&w=1200&auto=format&fit=crop"
              alt="Slide 1"
              className="object-cover h-64 sm:h-96 rounded-lg"
            />
            <img
              src="https://images.unsplash.com/photo-1545209575-704d1434f9cd?q=80&w=1200&auto=format&fit=crop"
              alt="Slide 2"
              className="object-cover h-64 sm:h-96 rounded-lg"
            />
            <img
              src="https://images.unsplash.com/photo-1660330589257-813305a4a383?q=80&w=1200&auto=format&fit=crop"
              alt="Slide 3"
              className="object-cover h-64 sm:h-96 rounded-lg"
            />
          </Carousel>
        </div>

        {/* Interactive Image Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold text-center mb-8">
            Our Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {images.map((src, index) => (
              <div
                key={index}
                className="relative bg-white rounded-lg overflow-hidden shadow-lg transform hover:scale-105 hover:shadow-2xl transition-transform duration-300"
              >
                <img
                  src={src}
                  alt={`Product ${index + 1}`}
                  className="w-full h-48 object-cover cursor-pointer"
                  onClick={() => openModal(src)}
                />
                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center space-y-4">
                  <Link
                    to="/search"
                    className="bg-white text-blue-600 px-4 py-2 rounded-full flex items-center space-x-2 transform hover:scale-110 transition-transform duration-300"
                  >
                    <FiSearch />
                    <span>View Details</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Posts Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold text-center mb-8">
            Recent Posts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post._id} post={post}>
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                  <p className="text-gray-600 mb-4">{post.description}</p>
                  <div className="flex items-center justify-between">
                    <Link
                      to={`/post/${post.slug}`}
                      className="text-blue-500 font-semibold hover:underline"
                    >
                      Read More
                    </Link>
                    <Link
                      to={`/edit/${post._id}`}
                      className="text-indigo-500 hover:text-indigo-700"
                    >
                      <FiUser size={20} />
                    </Link>
                  </div>
                </div>
              </PostCard>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/SearchPage">
              <Button gradientMonochrome="info" size="md">
                View All Posts
              </Button>
            </Link>
          </div>
        </div>

        {/* Image Modal */}
        <Modal show={isModalOpen} onClose={closeModal}>
          <Modal.Header>Product Image</Modal.Header>
          <Modal.Body>
            <img
              src={selectedImage}
              alt="Selected Product"
              className="w-full h-auto rounded-lg"
            />
          </Modal.Body>
          <Modal.Footer>
            <Button color="gray" onClick={closeModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      {/* Footer Enhancement */}
      <Footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold">Your Company</h3>
            <p className="text-sm">© 2024 Your Company. All rights reserved.</p>
          </div>
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500"
            >
              <FiUser size={24} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400"
            >
              <FiUser size={24} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500"
            >
              <FiUser size={24} />
            </a>
          </div>
        </div>
      </Footer>
    </>
  );
}

export default Services;
