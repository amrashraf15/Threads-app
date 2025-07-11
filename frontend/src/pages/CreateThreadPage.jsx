import { useState } from "react";
import { useThreadStore } from "../store/useThreadStore.js";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore.js";

const CreateThreadPage = () => {
  const { createThread, isCreatingThread } = useThreadStore();
  const { authUser } = useAuthStore();
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createThread(image, content);
    setContent("");
    setImage(null);
    navigate("/");
  };

  return (
    <div className="w-full min-h-screen flex items-start justify-center px-4 py-20 bg-gray-100 dark:bg-black">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-md border border-gray-200 dark:border-gray-800 p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">
          Create a New Thread
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* User Avatar + Input */}
          <div className="flex gap-4 items-start">
            <img
              src={authUser.image || "/avatar.png"}
              alt="User avatar"
              className="w-12 h-12 rounded-full object-cover"
            />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind?"
              rows={4}
              required
              className="flex-1 w-full resize-none bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label
              htmlFor="image-upload"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Upload Image (optional)
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-500 
                         file:mr-4 file:py-2 file:px-4
                         file:rounded-md file:border-0
                         file:text-sm file:font-semibold
                         file:bg-blue-50 file:text-blue-700
                         hover:file:bg-blue-100
                         dark:file:bg-gray-700 dark:file:text-gray-200"
            />
          </div>

          {/* Image Preview */}
          {image && (
            <div className="rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600">
              <img
                src={image}
                alt="Preview"
                className="w-full max-h-72 object-cover"
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isCreatingThread}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm sm:text-base rounded-lg transition disabled:opacity-60"
          >
            {isCreatingThread ? "Posting..." : "Post Thread"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateThreadPage;
