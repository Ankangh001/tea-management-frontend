// src/pages/admin/CreatePostPage.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/sonner";
import { ArrowLeft, Upload, Image, Pin, User, FileText, Maximize2, Minimize2, X } from "lucide-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import api from "@/lib/api";
import { getCurrentUser } from "@/utils/auth";

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
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Auto-fill author with logged-in user's name
  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser && currentUser.name) {
      setForm(prev => ({
        ...prev,
        author: currentUser.name
      }));
    }
  }, []);

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
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const getPostTypeColor = (type: string) => {
    switch (type) {
      case 'blog': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'news': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'event': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Handle escape key to exit fullscreen
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    if (isFullscreen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isFullscreen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

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

      toast.success("Post created successfully! 🎉");
      navigate("/dashboard");
    } catch (err) {
      toast.error("Failed to create post. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-4 text-slate-600 hover:text-slate-800"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
          
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-slate-800">Create New Post</h1>
          </div>
          <p className="text-slate-600">Share your thoughts with the community</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Info Card */}
              <Card className="shadow-lg border-0">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-lg">
                  <CardTitle className="flex items-center gap-2 text-slate-800">
                    <FileText className="w-5 h-5" />
                    Post Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div>
                    <Label htmlFor="title" className="text-slate-700 font-medium">
                      Post Title *
                    </Label>
                    <Input
                      id="title"
                      name="title"
                      value={form.title}
                      onChange={handleChange}
                      placeholder="Enter an engaging title..."
                      className="mt-2 border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="author" className="text-slate-700 font-medium flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Author *
                    </Label>
                    <Input
                      id="author"
                      name="author"
                      value={form.author}
                      onChange={handleChange}
                      placeholder="Author name"
                      className="mt-2 border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Content Card */}
              <Card className="shadow-lg border-0">
                <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg">
                  <CardTitle className="text-slate-800 flex items-center justify-between">
                    Post Content
                    {/* <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={toggleFullscreen}
                      className="text-slate-600 hover:text-slate-800"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </Button> */}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <Label className="text-slate-700 font-medium mb-3 block">
                    Write your content *
                  </Label>
                  <div className="border border-slate-200 rounded-lg overflow-hidden">
                    <ReactQuill
                      theme="snow"
                      value={form.content}
                      onChange={(val) => setForm((prev) => ({ ...prev, content: val }))}
                      className="bg-white"
                      style={{ height: '180px', marginBottom: '50px' }}
                      modules={{
                        toolbar: [
                          [{ 'header': [1, 2, 3, false] }],
                          ['bold', 'italic', 'underline', 'strike'],
                          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                          ['link', 'image'],
                          ['clean']
                        ],
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Post Settings */}
              <Card className="shadow-lg border-0">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-t-lg">
                  <CardTitle className="text-slate-800">Post Settings</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div>
                    <Label className="text-slate-700 font-medium mb-3 block">Post Type</Label>
                    <select
                      name="type"
                      value={form.type}
                      onChange={handleChange}
                      className="w-full border border-slate-200 rounded-lg px-3 py-2 focus:border-blue-500 focus:ring-blue-500 bg-white"
                    >
                      <option value="blog">Blog</option>
                      <option value="event">Event</option>
                      <option value="news">News</option>
                    </select>
                    <Badge className={`mt-2 ${getPostTypeColor(form.type)}`}>
                      {form.type.charAt(0).toUpperCase() + form.type.slice(1)}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                    <Pin className="w-4 h-4 text-slate-600" />
                    <Label htmlFor="isPinned" className="text-slate-700 font-medium flex-1">
                      Pin this post
                    </Label>
                    <input
                      id="isPinned"
                      type="checkbox"
                      name="isPinned"
                      checked={form.isPinned}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Image Upload */}
              <Card className="shadow-lg border-0">
                <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 rounded-t-lg">
                  <CardTitle className="text-slate-800 flex items-center gap-2">
                    <Image className="w-5 h-5" />
                    Featured Image
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <Label className="text-slate-700 font-medium">Upload Image</Label>
                    
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        id="image-upload"
                      />
                      <Label
                        htmlFor="image-upload"
                        className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors"
                      >
                        <Upload className="w-8 h-8 text-slate-400 mb-2" />
                        <span className="text-sm text-slate-600">Click to upload image</span>
                        <span className="text-xs text-slate-400 mt-1">PNG, JPG up to 2MB</span>
                      </Label>
                    </div>

                    {imagePreview && (
                      <div className="mt-4">
                        <Label className="text-slate-700 font-medium mb-2 block">Preview</Label>
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-32 object-cover rounded-lg border border-slate-200"
                        />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 rounded-lg shadow-lg transition-all duration-200"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Publishing...
                  </>
                ) : (
                  <>
                    <FileText className="w-4 h-4 mr-2" />
                    Publish Post
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>

        {/* Fullscreen Editor Modal */}
        {isFullscreen && (
          <div className="fixed inset-0 z-50 bg-white">
            <div className="h-full flex flex-col">
              {/* Fullscreen Header */}
              <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-white">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-800">Writing Mode</h2>
                    <p className="text-sm text-slate-600">Focus on your content</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={toggleFullscreen}
                    className="text-slate-600 hover:text-slate-800"
                  >
                    <Minimize2 className="w-4 h-4 mr-2" />
                    Exit Fullscreen
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={toggleFullscreen}
                    className="text-slate-600 hover:text-slate-800"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Fullscreen Editor */}
              <div className="flex-1 p-6 overflow-hidden">
                <div className="h-full border border-slate-200 rounded-lg overflow-hidden">
                  <ReactQuill
                    theme="snow"
                    value={form.content}
                    onChange={(val) => setForm((prev) => ({ ...prev, content: val }))}
                    className="h-full bg-white"
                    style={{ height: 'calc(100% - 42px)' }}
                    modules={{
                      toolbar: [
                        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                        [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'indent': '-1'}, { 'indent': '+1' }],
                        ['link', 'image', 'video'],
                        [{ 'align': [] }],
                        [{ 'color': [] }, { 'background': [] }],
                        ['clean']
                      ],
                    }}
                  />
                </div>
              </div>

              {/* Fullscreen Footer */}
              <div className="p-4 border-t border-slate-200 bg-slate-50">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-slate-600">
                    Press <kbd className="px-2 py-1 bg-slate-200 rounded text-xs">Esc</kbd> to exit fullscreen
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-sm text-slate-600">
                      {form.content.replace(/<[^>]*>/g, '').length} characters
                    </div>
                    <Button
                      type="button"
                      onClick={toggleFullscreen}
                      className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white"
                    >
                      Done Writing
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
