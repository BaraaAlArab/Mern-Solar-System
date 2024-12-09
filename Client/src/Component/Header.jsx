// Header.js

import {Link, useLocation, useNavigate} from "react-router-dom";
import {Avatar, Button, Dropdown, Navbar, TextInput} from "flowbite-react";
import {Logout} from "../../redux/user/userSlice";
import {useSelector, useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {AiOutlineSearch} from "react-icons/ai";
import {FiHome, FiUser, FiLogOut, FiSettings} from "react-icons/fi";

export default function Header() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const {currentUser} = useSelector((state) => state.user);

  const [searchTerm, setSearchTerm] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const res = await fetch("/Server/auth/signout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(Logout());
        navigate("/"); // Redirect to home after logout
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);
    navigate(`/search?${urlParams.toString()}`);
  };

  return (
    <Navbar
      fluid={true}
      rounded={true}
      className="bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg fixed w-full z-50"
    >
      <Navbar.Brand href="/">
        <span className="self-center whitespace-nowrap text-2xl font-semibold text-white">
          Solaries
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        {/* User Actions */}
        <div className="hidden lg:flex items-center space-x-4">
          {/* Search Form */}
          <form onSubmit={handleSubmit} className="relative">
            <AiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <TextInput
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 rounded-full w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search"
            />
          </form>
          <Link to="/About">
            <Button color="light" gradientMonochrome="info">
              About
            </Button>
          </Link>
          <Link to="/Cart_Index">
            <Button color="light" gradientMonochrome="info">
              cart
            </Button>
          </Link>
          {currentUser ? (
            <Dropdown
              arrowIcon={false}
              inline={true}
              label={
                <Avatar
                  alt="User profile"
                  img={
                    currentUser.profilePicture ||
                    "https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                  }
                  rounded={true}
                />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">@{currentUser.username}</span>
                <span className="block text-sm font-medium truncate">
                  {currentUser.email}
                </span>
              </Dropdown.Header>
              <Dropdown.Item as={Link} to="/Dashboard?tab=DashProfile">
                <FiUser className="mr-2 " /> Profile
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/Settings">
                <FiSettings className="mr-2 " /> Settings
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleLogout}>
                <FiLogOut className="mr-2" /> Sign Out
              </Dropdown.Item>
            </Dropdown>
          ) : (
            <Link to="/Account">
              <Button color="light" gradientMonochrome="info">
                Sign In
              </Button>
            </Link>
          )}
        </div>
        {/* Mobile Menu Button */}
        <Navbar.Toggle
          className="lg:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation"
        />
      </div>
      <Navbar.Collapse
        className={`${isMenuOpen ? "block" : "hidden"} lg:hidden`}
      >
        <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50">
          <li>
            <Link
              to="/"
              className={`flex items-center px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-700 ${
                location.pathname === "/" ? "bg-blue-700" : ""
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <FiHome className="mr-2 " /> Home
            </Link>
          </li>
          <li>
            <Link
              to="/About"
              className={`flex items-center px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-700 ${
                location.pathname === "/About" ? "bg-blue-700" : ""
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <FiUser className="mr-2" /> About
            </Link>
          </li>
          <li>
            <Link
              to="/Services"
              className={`flex items-center px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-700 ${
                location.pathname === "/Services" ? "bg-blue-700" : ""
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              to="/Contact"
              className={`flex items-center px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-700 ${
                location.pathname === "/Contact" ? "bg-blue-700" : ""
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </li>
          {!currentUser && (
            <li>
              <Link
                to="/Account"
                className="flex items-center px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
            </li>
          )}
          {currentUser && (
            <>
              <li>
                <Link
                  to="/Dashboard?tab=DashProfile"
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FiUser className="mr-2" /> Profile
                </Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-700 w-full text-left"
                >
                  <FiLogOut className="mr-2" /> Sign Out
                </button>
              </li>
            </>
          )}
        </ul>
      </Navbar.Collapse>
    </Navbar>
  );
}
