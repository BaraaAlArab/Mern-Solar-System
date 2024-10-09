import {Link, useLocation, useNavigate} from "react-router-dom";
import {Avatar, Button, Dropdown, TextInput} from "flowbite-react";
import {Logout} from "../../redux/user/userSlice";
import {useSelector, useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {AiOutlineSearch, AiOutlineMenu} from "react-icons/ai";

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
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(Logout());
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
    <nav className="bg-blue-900 shadow-lg py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-3xl font-bold text-white hover:text-gray-300 transition-all"
        >
          Solaries
        </Link>

        {/* Search form */}
        <form onSubmit={handleSubmit} className="relative hidden lg:block">
          <TextInput
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 bg-gray-100 shadow focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <AiOutlineSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
        </form>
        <div className="flex items-center space-x-6">
          <Link to="/About">
            <Button
              className="text-blue-900"
              gradientDuoTone="purpleToBlue"
              outline
            >
              about
            </Button>
          </Link>
          {currentUser ? (
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                  alt="User profile"
                  img={currentUser.profilePicture}
                  rounded
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
                Profile
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
            </Dropdown>
          ) : (
            <Link to="/Account">
              <Button
                className="text-blue-900"
                gradientDuoTone="purpleToBlue"
                outline
              >
                Sign In
              </Button>
            </Link>
          )}
        </div>
        <div className="lg:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white text-2xl focus:outline-none"
          >
            <AiOutlineMenu />
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <ul className="lg:hidden mt-4 space-y-4">
          <li>
            <Link
              to="/About"
              className="text-white hover:text-gray-300 transition-all duration-300 block"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/Account"
              className="text-white hover:text-gray-300 transition-all duration-300 block"
            >
              Account
            </Link>
          </li>
          <li>
            <Link
              to="/Profile"
              className="text-white hover:text-gray-300 transition-all duration-300 block"
            >
              Profile
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}
