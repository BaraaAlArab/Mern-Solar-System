import {Modal, Table, Button} from "flowbite-react";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {HiOutlineExclamationCircle} from "react-icons/hi";

export default function DashFeedback() {
  const {currentUser} = useSelector((state) => state.user);
  const [feedback, setFeedback] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [feedbackIdToDelete, setFeedbackIdToDelete] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  useEffect(() => {
    const fetchFeedback = async () => {
      setLoading(true); // Set loading to true
      try {
        const res = await fetch(`/Server/feedback/getFeedbackByUserId`);
        const data = await res.json();
        if (res.ok) {
          setFeedback(data.feedback);
          if (data.feedback.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false); // Set loading to false
      }
    };
    if (currentUser.isAdmin) {
      fetchFeedback();
    }
  }, [currentUser._id, currentUser.isAdmin]); // Added isAdmin to dependencies

  const handleShowMore = async () => {
    const startIndex = feedback.length;
    setLoading(true); // Set loading to true
    try {
      const res = await fetch(
        `/Server/feedback/getFeedbackByUserId?startIndex=${startIndex}`,
      );
      const data = await res.json();
      if (res.ok) {
        setFeedback((prev) => [...prev, ...data.feedback]);
        if (data.feedback.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  const handleDeleteFeedback = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/Server/feedback/DeleteFeedback/${feedbackIdToDelete}`,
        {
          method: "DELETE",
        },
      );
      const data = await res.json();
      if (res.ok) {
        setFeedback((prev) =>
          prev.filter((feedback) => feedback._id !== feedbackIdToDelete),
        );
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {currentUser.isAdmin && feedback.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Date updated</Table.HeadCell>
              <Table.HeadCell>Feedback content</Table.HeadCell>
              <Table.HeadCell>Number of likes</Table.HeadCell>
              <Table.HeadCell>PostId</Table.HeadCell>
              <Table.HeadCell>UserId</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {feedback.map((feedbackItem) => (
                <Table.Row
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  key={feedbackItem._id}
                >
                  <Table.Cell>
                    {new Date(feedbackItem.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>{feedbackItem.content}</Table.Cell>
                  <Table.Cell>{feedbackItem.numberOfLikes}</Table.Cell>
                  <Table.Cell>{feedbackItem.postId}</Table.Cell>
                  <Table.Cell>{feedbackItem.userId}</Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setFeedbackIdToDelete(feedbackItem._id);
                      }}
                      className="font-medium text-red-500 hover:underline cursor-pointer"
                    >
                      Delete
                    </span>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
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
        <p>You have no feedback yet!</p>
      )}
      {loading && <p>Loading...</p>} {/* Loading indicator */}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this comment?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteFeedback}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
