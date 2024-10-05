import "./index.css";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Account from "./pages/Signin";
import Create from "./pages/Signup";
import Order from "./pages/Order";
import UpdatePost from "./pages/UpdatePost";
import ScrollToTop from "./Component/ScrollToTop";

import OnlyAdminPrivateRoute from "./pages/OnlyAdminPrivateRoute";
import CreatePost from "./pages/CreatePost";
import PostPage from "./pages/PostPage";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./Component/PrivateRoute";
import Search from "./pages/SearchPage";
import StorePage from "./Component/StorePage";

function App() {
  return (
    <>
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

          <Route element={<PrivateRoute />}>
            <Route path="/Dashboard" element={<Dashboard />} />
          </Route>
          <Route element={<OnlyAdminPrivateRoute />}>
            <Route path="/CreatePost" element={<CreatePost />} />
            <Route path="/UpdatePost" element={<UpdatePost />} />
          </Route>
          <Route path="/store" element={<StorePage />} />
          <Route path="/post" element={<PostPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
