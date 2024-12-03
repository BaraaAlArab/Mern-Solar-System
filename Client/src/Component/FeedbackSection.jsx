import {Alert, Button, Textarea} from "flowbite-react";
import {useState} from "react";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

function FeedbackSection() {
  const {currentUser} = useSelector((state) => state.user);
  const [feedback, setFeedback] = useState("");
  const [FeedbacktError, setFeedbackError] = useState(null);

  // In the handleSubmit function:
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (feedback.length > 500) {
      setFeedbackError("Feedback should not be more than 500 characters");
      return;
    }

    if (!currentUser?._id) {
      setFeedbackError("Please login to give feedback");
      return;
    }

    try {
      const res = await fetch("/Server/feedback/createFeedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          feedback,
          userId: currentUser._id,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setFeedback("");
        setFeedbackError(null);
      } else {
        setFeedbackError(data.message || "Failed to submit feedback");
      }
    } catch (error) {
      setFeedbackError(error.message || "An error occurred");
    }
  };

  return (
    <div className="max-w-2xl mx-auto w-full p-3">
      {currentUser ? (
        <div className="flex items-center gap-1 my-5 text-gray-500 text-sm">
          <p>Signed in as:</p>
          <img
            className="h-5 w-5 object-cover rounded-full"
            src={currentUser.profilePicture}
            alt="Profile"
          />
          <Link
            to={"/dashboard?tab=profile"}
            className="text-xs text-cyan-600 hover:underline"
          >
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div className="text-sm text-teal-500 my-5 flex gap-1">
          You must be signed in to give feedback.
          <Link className="text-blue-500 hover:underline" to={"/signin"}>
            Sign In
          </Link>
        </div>
      )}

      {currentUser && (
        <form
          onSubmit={handleSubmit}
          className="border border-teal-500 rounded-md p-3"
        >
          <Textarea
            placeholder="Add a feedback..."
            rows="3"
            maxLength="200"
            onChange={(e) => setFeedback(e.target.value)}
            value={feedback}
          />
          <div className="flex justify-between items-center mt-5">
            <p className="text-gray-500 text-xs">
              {200 - feedback.length} characters remaining
            </p>
            <Button outline gradientDuoTone="purpleToBlue" type="submit">
              Submit
            </Button>
          </div>

          {FeedbacktError && (
            <Alert color="failure" className="mt-5">
              {FeedbacktError}
            </Alert>
          )}
        </form>
      )}
    </div>
  );
}

export default FeedbackSection;
