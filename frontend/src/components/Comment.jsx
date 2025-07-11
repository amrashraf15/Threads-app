import { useState } from "react";
import { useThreadStore } from "../store/useThreadStore";
import { useAuthStore } from "../store/useAuthStore";
import { toast } from "react-hot-toast";
import { Camera } from "lucide-react";

const Comment = ({ threadId }) => {
  const { replyToThread } = useThreadStore();
  const { authUser } = useAuthStore();
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImageFile(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) {
      toast.error("Please enter a reply");
      return;
    }

    setLoading(true);
    await replyToThread(threadId, content, imageFile);
    setLoading(false);
    setContent("");
    setImageFile(null);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-start gap-3 mt-6 p-4 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 shadow-sm"
    >
      {/* User Avatar */}
      <img
        src={authUser?.image || "/avatar.png"}
        alt="Your Avatar"
        className="w-10 h-10 rounded-full object-cover mt-1"
      />

      {/* Comment Input and Actions */}
      <div className="flex-1 flex flex-col gap-3">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={3}
          placeholder="Write your reply..."
          className="w-full resize-none rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-2 text-sm text-gray-800 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {imageFile && (
          <img
            src={imageFile}
            alt="Preview"
            className="w-full max-h-60 rounded-lg border border-gray-300 dark:border-gray-600 object-cover"
          />
        )}

        <div className="flex justify-between items-center">
          <label className="text-sm flex gap-2 text-gray-600 dark:text-gray-300 cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <Camera className="w-5 h-5"/>
            Add Image
          </label>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50 transition"
          >
            {loading ? "Posting..." : "Reply"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default Comment;
