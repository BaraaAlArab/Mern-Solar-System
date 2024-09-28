import {Button, FileInput, Select, TextInput} from "flowbite-react";
import "react-quill/dist/react-quill";
import ReactQuill from "react-quill";

export default function CreatePost() {
  return (
    <div className="p-3 max-w-3x1 mx-auto min-h-screen">
      <h1 className="text-center text-3x1 my-7 font-sans">Create a Post</h1>
      <div className="flex flex-col gap-4 sm:flex-row justify-between">
        <form className="flex flex-col space-y-4">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
          />
          <Select>
            <option value="uncategorized">Select a Category</option>
            <option value="Panel">Panel</option>
            <option value="Batteries">Batteries</option>
            <option value="Wires">Wires</option>
            <option value="Accessories">Accessories</option>
          </Select>
        </form>
      </div>
      <div className="flex gap-4 items-center justify-between border-4 border-blue-600 border-dashedp-3">
        <FileInput typeof="file " accept="image/*'" />

        <Button
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-5"
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
      <Button type="Submit" gradientDuoTone="greenToBlue">
        Publish
      </Button>
    </div>
  );
}
