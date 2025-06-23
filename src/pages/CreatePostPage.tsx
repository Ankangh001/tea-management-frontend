// src/pages/admin/CreatePostPage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import api from "@/lib/api";

export const CreatePostPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    author: "",
    type: "blog", // blog/news
    isPinned: false,
    content: "",
    image: null,
  });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const target = e.target;
        const name = target.name;
        const value = 
            target instanceof HTMLInputElement && target.type === "checkbox"
            ? target.checked
            : target.value;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm((prev) => ({ ...prev, image: file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("title", form.title);
      data.append("author", form.author);
      data.append("post_type", form.type);
      data.append("is_pinned", form.isPinned ? "1" : "0");
      data.append("content", form.content);
      if (form.image) data.append("image", form.image);

      await api.post("/api/posts", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Post created successfully");
      navigate("/dashboard");
    } catch (err) {
      toast.error("Failed to create post");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-20 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Create New Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input name="title" value={form.title} onChange={handleChange} placeholder="Title" required />
        <Input name="author" value={form.author} onChange={handleChange} placeholder="Author" required />
        
        <select name="type" value={form.type} onChange={handleChange} className="w-full border rounded px-2 py-1">
          <option value="blog">Blog</option>
          <option value="news">News</option>
        </select>

        <div>
          <label className="block font-medium mb-1">Post Content</label>
          <ReactQuill theme="snow" value={form.content} onChange={(val) => setForm((prev) => ({ ...prev, content: val }))} />
        </div>

        <div>
          <label className="block font-medium mb-1">Post Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>

        <label className="inline-flex items-center">
          <input
            type="checkbox"
            name="isPinned"
            checked={form.isPinned}
            onChange={handleChange}
            className="mr-2"
          />
          Pin this post
        </label>

        <Button type="submit" className="w-full">Submit Post</Button>
      </form>
    </div>
  );
};
