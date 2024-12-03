import { StarIcon } from "lucide-react";
import { Button } from "flowbite-react";

export default function StarRatingComponent({ rating, handleRatingChange }) {
  console.log(rating, "rating");
  return (
    <div className="flex space-x-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <Button
          key={star}
          className={`p-2 rounded-full transition-colors ${
            star <= rating
              ? "text-yellow-500 hover:bg-black"
              : "text-black hover:bg-primary hover:text-primary-foreground"
          }`}
          color="gray"
          onClick={handleRatingChange ? () => handleRatingChange(star) : null}
        >
          <StarIcon
            className={`w-6 h-6 ${
              star <= rating ? "fill-yellow-500" : "fill-black"
            }`}
          />
        </Button>
      ))}
    </div>
  );
}
