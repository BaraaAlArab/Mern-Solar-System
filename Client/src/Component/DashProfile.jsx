import {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import {Link, useLocation} from "react-router-dom";
import {Alert, Button, Modal, TextInput} from "flowbite-react";
import {Sidebar} from "flowbite-react";
import {
  HiUser,
  HiArrowSmRight,
  HiOutlineExclamationCircle,
} from "react-icons/hi";
import {CircularProgressbar} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import {app} from "../firebase";
import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  Logout,
} from "../../redux/user/userSlice";
import {useDispatch} from "react-redux";

export default function DashProfile() {
  const {currentUser, error} = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const location = useLocation();
  const [tab, setTab] = useState("");

  const [formData, setFormData] = useState({});
  const filePickerRef = useRef();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };
  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFormUrl = urlParams.get("tab");
    if (tabFormUrl) {
      setTab(tabFormUrl);
    }
  }, [location.search]);

  const uploadImage = async () => {
    if (!imageFile) return;

    // File size validation (optional)
    if (imageFile.size > 2 * 1024 * 1024) {
      // 2MB in bytes
      setImageFileUploadError("File must be less than 2MB");
      setImageFile(null);
      setImageFileUrl(null);
      return;
    }

    setImageFileUploading(true);
    setImageFileUploadError(null);

    try {
      const storage = getStorage(app); // Ensure `app` is your Firebase app instance
      const fileName = new Date().getTime() + "_" + imageFile.name; // Unique file name
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageFileUploadProgress(Math.round(progress)); // Rounded progress value
        },
        (error) => {
          console.error("Upload failed", error); // Log error for debugging
          setImageFileUploadError(
            "Could not upload image (File must be less than 2MB)",
          );
          setImageFileUploadProgress(null);
          setImageFile(null);
          setImageFileUrl(null);
          setImageFileUploading(false);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageFileUrl(downloadURL);
            setFormData((prevFormData) => ({
              ...prevFormData,
              profilePicture: downloadURL,
            }));
            setImageFileUploading(false);
          });
        },
      );
    } catch (error) {
      setImageFileUploadError("An unexpected error occurred during upload");
      console.error("Upload error:", error);
      setImageFileUploading(false);
    }
  };

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
      console.lof(error.message);
    }
  };
  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value});
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
    if (Object.keys(formData).length === 0) {
      setUpdateUserError("No change made");
      return;
    }
    if (imageFileUploading) {
      setUpdateUserError("please wait for image to upload");
      return;
    }
    try {
      dispatch(updateStart());
      const res = await fetch(`/Server/auth/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("User's profile updated successfully");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
    }
  };
  const handleDelete = async () => {
    setShowModal(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/Server/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSuccess(data));
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  return (
    <>
      <div className="max-w-lg mx-auto p-3 w-full">
        <h1 className="my-7 text-center font-sans text-3x1">Profile</h1>
        <form onClick={handleSubmit} className="flex flex-col gap-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={filePickerRef}
            hidden
          />
          <div
            className="w-32 h-32 self-center cursor-pointer shadow-mb overflow-hidden rounded-full"
            onClick={() => filePickerRef.current.click()}
          >
            {imageFileUploadProgress && (
              <CircularProgressbar
                value={imageFileUploadProgress}
                text={`${imageFileUploadProgress}%`}
                strokeWidth={5}
                styles={{
                  root: {
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    top: "0",
                    left: "0",
                  },
                  path: {
                    stroke: `rgba(62,152,199,&{
                  imageFileUploadProgress / 100
                  })`,
                  },
                }}
              />
            )}
            <img
              src={imageFileUrl || currentUser.profilePicture}
              alt="user"
              className={`rounded-full w-full h-full object-cover border-8 border-[lightblue]${
                imageFileUploadProgress &&
                imageFileUploadProgress < 100 &&
                "opacity-60"
              }`}
            />
          </div>
          {imageFileUploadError && (
            <Alert color="failure">{imageFileUploadError}</Alert>
          )}
          <TextInput
            type="text"
            id="username"
            placeholder="username"
            defaultValue={currentUser.username}
            onChange={handleChange}
          />
          <TextInput
            type="email"
            id="email"
            placeholder="email"
            defaultValue={currentUser.email}
            onChange={handleChange}
          />
          <TextInput
            type="password"
            id="password"
            placeholder="password"
            onChange={handleChange}
          />

          <Button type="submit" gradientDuoTone="purpleToBlue" outline>
            {" "}
            Update{" "}
          </Button>
        </form>
        <div className="text-red-500 flex justify-between mt-5">
          <span onClick={() => setShowModal(true)} className="cursor-pointer">
            Delete Account
          </span>
          <span onClick={handleLogout} className="cursor-pointer">
            Sign Out
          </span>
        </div>
        {updateUserSuccess && (
          <Alert color="success" className="mt-5">
            {updateUserSuccess}
          </Alert>
        )}
        {updateUserError && (
          <Alert color="failure" className="mt-5">
            {updateUserError}
          </Alert>
        )}
        {error && (
          <Alert color="failure" className="mt-5">
            {error}
          </Alert>
        )}
        <Modal
          show={showModal}
          onClose={() => setShowModal(false)}
          popup
          size={"md"}
        >
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
              <h3 className="mb-5 text-lg text-blue-900 dark:text-black">
                Are you sure you want to delete your account?
              </h3>
              <div className="flex justify-center gap-4">
                <Button color="failure" onClick={handleDelete}>
                  Yes I'm sure.
                </Button>
                <Button color="blue" onClick={() => setShowModal(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}
