import {useEffect, useState} from "react";
import {useSelector} from "react-redux";

export default function UserDash() {
  const {currentUser} = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/Server/auth/getUsers`);
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          if (data.users.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    if (currentUser.isAdmin) {
      fetchUser();
    }
  }, [currentUser.isAdmin, currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = users.length;
    try {
      const res = await fetch(`/Server/auth/getUsers?startIndex=${startIndex}`);
      const data = await res.json();

      if (res.ok) {
        setUsers((prev) => [...prev, ...data.users]);
        if (data.users.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteUser = async () => {
    try {
      const res = await fetch(`/Server/auth/delete/${userIdToDelete}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));
        setShowModal(false);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3">
      {currentUser?.isAdmin ? (
        users.length > 0 ? (
          <>
            <table className="shadow-md bg-blue-900 text-white w-full">
              <thead>
                <tr>
                  <th>Date created</th>
                  <th>User image</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Admin</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody className="bg-blue-900">
                {users.map((user) => (
                  <tr
                    className="bg-white dark:bg-gray-800 text-black dark:text-white"
                    key={user._id}
                  >
                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td>
                      <img
                        src={user.profilePicture}
                        alt={user.username}
                        className="w-10 h-10 object-cover bg-gray-500 rounded-full"
                      />
                    </td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.isAdmin ? "✔" : "✘"}</td>
                    <td>
                      <span
                        onClick={() => {
                          setShowModal(true);
                          setUserIdToDelete(user._id);
                        }}
                        className="font-medium text-red-500 hover:underline cursor-pointer"
                      >
                        Delete
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {showMore && (
              <button
                onClick={handleShowMore}
                className="w-full text-teal-500 self-center text-sm py-7"
              >
                Show more
              </button>
            )}
          </>
        ) : (
          <p>You have no users yet!</p>
        )
      ) : (
        <p>Access denied.</p>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded-lg">
            <h3 className="mb-5 text-lg text-blue-900">
              Are you sure you want to delete this user?
            </h3>
            <div className="flex justify-center gap-4">
              <button onClick={handleDeleteUser} className="text-red-500">
                Yes, I'm sure
              </button>
              <button onClick={() => setShowModal(false)}>No, cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
