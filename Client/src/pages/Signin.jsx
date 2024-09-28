import {Link, useNavigate} from "react-router-dom";
import {Button, Label, Spinner, TextInput} from "flowbite-react";
import {useState} from "react";
import axios from "axios";
import Popup from "../Component/PopUp/PopUps";
import {useDispatch, useSelector} from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../../redux/user/userSlice.js";

function Signin() {
  const {loading, error} = useSelector((state) => state.user); // Get error message from Redux state
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value.trim()});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      dispatch(signInFailure("Please fill out all the fields."));
      return;
    }

    try {
      dispatch(signInStart()); // Set loading to true
      const response = await axios.post("/Server/auth/signin", formData);
      dispatch(signInSuccess(response.data));
      setPopupMessage("SignIn Successful");
      setPopupType("success");
      navigate("/");
    } catch (error) {
      const errorMessage = error.response?.data.message || error.message;
      dispatch(signInFailure(error.Message));
      setPopupMessage("SignIn Failed: " + errorMessage);
      setPopupType("failure");
    } finally {
      setShowPopup(true);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md">
        <form
          className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Sign In
          </h2>
          <div className="mb-4">
            <Label
              className="block text-gray-700 text-sm font-medium mb-2"
              htmlFor="email"
            >
              Email
            </Label>
            <TextInput
              required
              className="shadow-sm appearance-none border rounded-md w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
              id="email"
              type="email"
              placeholder="Enter your email"
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <Label
              className="block text-gray-700 text-sm font-medium mb-2"
              htmlFor="password"
            >
              Password
            </Label>
            <TextInput
              required
              className="shadow-sm appearance-none border rounded-md w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
              id="password"
              type="password"
              placeholder="Enter your password"
              onChange={handleChange}
            />
          </div>
          {error && (
            <p className="text-red-500 text-xs italic mb-4">{error}</p> // Display error message
          )}
          <div className="flex items-center justify-between">
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </div>
          <div className="flex justify-between mt-4">
            <a
              className="text-sm text-blue-500 hover:text-blue-800 transition duration-300"
              href="#"
            >
              Forgot Password?
            </a>
            <Link
              to="/Create"
              className="text-sm text-blue-500 hover:text-blue-800 transition duration-300"
            >
              Create an account
            </Link>
          </div>
          {showPopup && (
            <Popup
              message={popupMessage}
              type={popupType}
              onClose={() => setShowPopup(false)}
            />
          )}
        </form>
        <p className="text-center text-gray-500 text-xs">
          &copy;2024 Acme Corp. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default Signin;
