import {Button, FileInput, Select, TextInput} from "flowbite-react";
import "react-quill/dist/quill.snow.css"; // Correct import for ReactQuill theme
import ReactQuill from "react-quill";

export default function CreatePost() {
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-sans">Create a Post</h1>{" "}
      {/* Changed text-3x1 to text-3xl */}
      <div className="flex flex-col gap-4 sm:flex-row justify-between">
        <form className="flex flex-col space-y-4 flex-1">
          <TextInput type="text" placeholder="Title" required id="title" />
          <Select required>
            <option value="uncategorized">Select a Category</option>
            <option value="Panel">Panel</option>
            <option value="Batteries">Batteries</option>
            <option value="Wires">Wires</option>
            <option value="Accessories">Accessories</option>
          </Select>
        </form>
      </div>
      <div className="flex gap-4 items-center justify-between border-4 border-blue-600 border-dashed p-3">
        {" "}
        {/* Added space between border-dashed and p-3 */}
        <FileInput type="file" accept="image/*" />{" "}
        {/* Fixed typeof and extra quote in accept */}
        <Button
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4"
          type="button"
          gradientDuoTone="greenToBlue"
          size="sm"
          outline
        >
          Upload image
        </Button>
      </div>
      <ReactQuill
        theme="snow"
        placeholder="Write Something..."
        className="h-72 mb-12"
        required
      />
      <Button type="submit" gradientDuoTone="greenToBlue">
        {" "}
        {/* Changed Submit to lowercase 'submit' */}
        Publish
      </Button>
    </div>
  );
}
