import {Button, Label, Spinner, TextInput} from "flowbite-react";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import Popup from "../Component/PopUp/PopUps";

function Signup() {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    tele: "",
  });
  const [error, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value.trim()});
    error, setErrorMessage(null);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.tele
    ) {
      return setErrorMessage("Please fill out all the fields.");
    }

    setLoading(true);
    try {
      await axios.post("/Server/auth/register", formData);
      setPopupMessage("Signup Successful");
      setPopupType("success");
      navigate("/Account");
    } catch (error) {
      setPopupMessage(
        "Signup Failed: " + (error.response?.data.message || error.message),
      );
      setPopupType("failure");
    } finally {
      setLoading(false);
      setShowPopup(true);
    }
  };
  return (
    <div className="max-w-md mx-auto p-8 md:p-12 lg:p-16 bg-white rounded-lg shadow-2xl">
      <h2 className="text-3xl font-bold mb-8 text-center">Sign up</h2>
      <form
        className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <div className="mb-6">
          <Label
            className="block text-gray-700 text-lg font-bold mb-2"
            htmlFor="username"
          >
            Username
          </Label>
          <TextInput
            required
            className="appearance-none border-2 border-gray-200 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="username"
            type="text"
            placeholder="Username"
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <Label
            className="block text-gray-700 text-lg font-bold mb-2"
            htmlFor="email"
          >
            Email
          </Label>
          <TextInput
            required
            className="appearance-none border-2 border-gray-200 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="email"
            type="email"
            placeholder="email@example.com"
            onChange={handleChange}
          />
        </div>
        <div className="mb-8">
          <Label
            className="block text-gray-700 text-lg font-bold mb-2"
            htmlFor="password"
          >
            Password
          </Label>
          <TextInput
            required
            className="appearance-none border-2 border-gray-200 rounded-lg w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="password"
            type="password"
            placeholder="Enter your password"
            onChange={handleChange}
          />
          <p className="text-red-500 text-xs italic">
            Please choose a password.
          </p>
        </div>
        <div className="mb-8">
          <Label
            className="block text-gray-700 text-lg font-bold mb-2"
            htmlFor="tele"
          >
            Telephone
          </Label>
          <TextInput
            required
            className="appearance-none border-2 border-gray-200 rounded-lg w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="tele"
            type="text"
            placeholder="(+961)/01 455 462"
            onChange={handleChange}
          />
          <p className="text-red-500 text-xs italic">
            Add your telephone number.
          </p>
        </div>
        {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}{" "}
        {/* Display error message */}
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
              "Sign Up"
            )}
          </Button>
        </div>
        {showPopup && (
          <Popup
            message={popupMessage}
            type={popupType}
            onClose={() => setShowPopup(false)}
          />
        )}
      </form>
      <p className="text-center text-gray-500 text-xs mt-8">
        &copy;2023 Your Company. All rights reserved.
      </p>
    </div>
  );
}

export default Signup;
