import {Button, FileInput, Select, TextInput} from "flowbite-react";
import "react-quill/dist/quill.snow.css"; // Correct import for ReactQuill theme
import ReactQuill from "react-quill";

export default function CreatePost() {
  return (
    <div className="p-6 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-sans">Create a Post</h1>

      <form className="flex flex-col space-y-6">
        <TextInput
          type="text"
          placeholder="Title"
          required
          id="title"
          className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <Select
          required
          className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="uncategorized">Select a Category</option>
          <option value="Panel">Panel</option>
          <option value="Batteries">Batteries</option>
          <option value="Wires">Wires</option>
          <option value="Accessories">Accessories</option>
        </Select>

        <div className="flex flex-col md:flex-row items-center gap-4 border-4 border-blue-600 border-dashed p-4 text-blue-900 rounded-lg">
          <FileInput type="file" accept="image/*" className="flex-1" />
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="button"
            gradientDuoTone="greenToBlue"
            size="sm"
          >
            Upload Image
          </Button>
        </div>

        <ReactQuill
          theme="snow"
          placeholder="Write Something..."
          className="h-72 mb-6 border border-gray-300 rounded-lg"
          required
        />

        <Button
          type="submit"
          gradientDuoTone="greenToBlue"
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Publish
        </Button>
      </form>
    </div>
  );
}
