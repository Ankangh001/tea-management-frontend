// src/pages/admin/EditPostPage.tsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import api from "@/lib/api";

export const EditPostPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState({
    title: "",
    author: "",
    type: "blog",
    isPinned: false,
    content: "",
    image: null as File | null,
    imagePreview: "",
  });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await api.get(`/api/posts/${id}`);
        const data = res.data;
        setForm({
          title: data.title,
          author: data.author,
          type: data.post_type,
          isPinned: data.is_pinned,
          content: data.content,
          image: null,
          imagePreview: data.image ? `/${data.image}` : "",
        });
      } catch (err) {
        toast.error("Failed to load post");
      }
    };

    if (id) fetchPost();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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
      setForm((prev) => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("author", form.author);
    formData.append("post_type", form.type);
    formData.append("is_pinned", form.isPinned ? "1" : "0");
    formData.append("content", form.content);
    if (form.image instanceof File) {
      formData.append("image", form.image);
    }

    try {
      await api.post(`/api/posts/${id}?_method=PUT`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Post updated successfully");
      navigate("/bulletin");
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message || "Failed to update the post"
      );
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-20 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Edit Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          required
        />
        <Input
          name="author"
          value={form.author}
          onChange={handleChange}
          placeholder="Author"
          required
        />

        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="w-full border rounded px-2 py-1"
        >
          <option value="blog">Blog</option>
          <option value="event">Event</option>
          <option value="news">News</option>
        </select>

        <div>
          <label className="block font-medium mb-1">Post Content</label>
          <ReactQuill
            theme="snow"
            value={form.content}
            onChange={(val) =>
              setForm((prev) => ({ ...prev, content: val }))
            }
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Post Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {form.imagePreview && (
            <img
              src={form.imagePreview}
              alt="Preview"
              className="mt-2 w-40 h-28 object-cover rounded border"
            />
          )}
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

        <Button type="submit" className="w-full">
          Update Post
        </Button>
      </form>
    </div>
  );
};