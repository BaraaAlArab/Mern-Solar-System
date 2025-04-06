import "./index.css";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Account from "./pages/Signin";
import Create from "./pages/Signup";
import Order from "./pages/Order";
import UpdatePost from "./pages/UpdatePost";
import ScrollToTop from "./Component/ScrollToTop";
import OnlyAdminPrivateRoute from "./pages/OnlyAdminPrivateRoute";
import PostPage from "./pages/PostPage";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./Component/PrivateRoute";
import Search from "./pages/SearchPage";
import StorePage from "./Component/StorePage";
import CreatePost from "./pages/CreatePost";
import FeedbackSection from "./Component/FeedbackSection";
import Cart_Index from "./pages/Shop/Cart/Cart_Index";
import UserCartItemsContent from "./Component/Shopping_View/Cart_Item_content";
import Cartitem from "./Component/Shopping_View/CartItem";

function App() {
  return (
    <>
      <div>
        <ToastContainer />
      </div>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/Account" element={<Account />} />
          <Route path="/Create" element={<Create />} />
          <Route path="/order" element={<Order />} />
          <Route path="/Search" element={<Search />} />
          <Route path="/Cart_Index" element={<Cart_Index />} />
          <Route path="/UserCartItemsContent"element={<UserCartItemsContent/>}/>
          <Route path="/Cartitem"element={<Cartitem/>}/>
          <Route element={<PrivateRoute />}>
            <Route path="/Dashboard" element={<Dashboard />} />
          </Route>
          <Route element={<OnlyAdminPrivateRoute />}>
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/update-post/:postId" element={<UpdatePost />} />
          </Route>
          <Route path="/store" element={<StorePage />} />
          <Route path="/post/:postSlug" element={<PostPage />} />
          <Route path="/FeedbackSection" element={<FeedbackSection />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
