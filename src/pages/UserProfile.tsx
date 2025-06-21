import { useState, useEffect } from "react";
import API from "@/lib/api";
import { toast } from "@/components/ui/sonner";

export default function UserProfile() {
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    image: null,
    preview: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/api/user");
        setFormData((prev) => ({
          ...prev,
          name: res.data.name || "",
          bio: res.data.bio || "",
          preview: res.data.image || "",
        }));
      } catch (err) {
        toast.error("Failed to fetch user data");
      }
    };

    fetchProfile();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
        preview: URL.createObjectURL(file),
      }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("bio", formData.bio);
    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      await API.post("/api/user/update-profile", data);
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 mt-12 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="mb-4 text-center border-b-2 pb-5">
          <label className="block mb-2 text-sm font-medium text-gray-700">Profile Photo</label>

          {formData.preview && (
              <div className="mb-4">
              <p className="text-sm text-gray-500 mb-1">Preview</p>
              <img
                  src={import.meta.env.VITE_API_BASE_URL+formData.preview}
                  alt="Preview"
                  className="w-24 h-24 mx-auto object-cover rounded-full border border-gray-300"
              />
              </div>
          )}

          <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-2"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Tell us something about you"
          />
        </div>
        <button
          type="submit"
          className="bg-gradient-to-r from-orange-500 to-purple-600 text-white px-6 py-2 rounded-md hover:scale-105 transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}