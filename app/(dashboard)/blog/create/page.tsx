"use client";

import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2, Image as ImageIcon, X, Bold, Italic, Underline, Strikethrough, Quote } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

import { blogPostSchema, BlogPostFormValues } from "@/lib/formSchema";

export default function CreateBlogPostDirectFields() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form engine directly without top-level context bindings
  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BlogPostFormValues>({
    resolver: zodResolver(blogPostSchema),
    defaultValues: {
      title: "",
      category: "",
      featuredImage: "",
      sections: [{ id: "sec_1", title: "", content: "", image: "" }],
    },
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    name: "sections",
    control,
  });

  // Watch values seamlessly to pipe straight into real-time live preview panel
  const watchedValues = watch();

  async function handleFormSubmit(data: BlogPostFormValues) {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Submission failed");

      toast({
        title: "Published!",
        description: "Blog post has been successfully pushed live.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to submit. Please verify fields and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const simulatePhotoUpload = (path: any) => {
    setValue(path, "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800", {
      shouldValidate: true,
    });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Top Controls Action Bar */}
      <div className="sticky top-0 z-30 w-full bg-white border-b border-gray-200/80 px-4 py-4 md:px-8 flex items-center justify-between shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">Blog Post</h1>
          <p className="text-xs text-gray-400 mt-0.5">Create a new blog post</p>
        </div>
        <div className="flex items-center gap-3">
          <Button type="button" variant="outline" className="rounded-xl px-4 text-xs font-semibold text-gray-600 border-gray-200 h-10 hover:bg-gray-50">
            Save as Draft
          </Button>
          <Button 
            type="button" 
            onClick={handleSubmit(handleFormSubmit)}
            disabled={isSubmitting} 
            className="bg-[#3B82F6] hover:bg-blue-600 rounded-xl px-5 text-xs font-semibold text-white h-10 transition-colors"
          >
            {isSubmitting ? "Publishing..." : "Publish"}
          </Button>
        </div>
      </div>

      {/* Main Container Workspace */}
      <div className="max-w-[1600px] mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Input Control Fields Layer */}
        <div className="lg:col-span-6 bg-white border border-gray-100 rounded-2xl p-5 md:p-6 space-y-6 shadow-sm">
          
          {/* Field: Post Title */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
              Post Title <span className="text-red-500">*</span>
            </label>
            <Input 
              {...register("title")} 
              placeholder="Empowering Student Entrepreneurs Across Campuses" 
              className={`rounded-xl border-gray-200 h-11 text-sm bg-white transition-all focus-visible:ring-blue-500 ${errors.title ? 'border-red-500 bg-red-50/10' : ''}`}
            />
            {errors.title && <p className="text-xs text-red-500 font-semibold mt-1">{errors.title.message}</p>}
          </div>

          {/* Field: Category Dropdown Primitive */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
              Category <span className="text-red-500">*</span>
            </label>
            <Select 
              value={watchedValues.category} 
              onValueChange={(val) => setValue("category", val, { shouldValidate: true })}
            >
              <SelectTrigger className={`rounded-xl border-gray-200 h-11 text-sm bg-white text-gray-700 focus:ring-blue-500 ${errors.category ? 'border-red-500' : ''}`}>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-gray-100 shadow-md">
                <SelectItem value="Seep" className="text-sm py-2.5 rounded-lg cursor-pointer">Seep</SelectItem>
                <SelectItem value="Innovation Hub" className="text-sm py-2.5 rounded-lg cursor-pointer">Innovation Hub</SelectItem>
                <SelectItem value="Tech-2-School" className="text-sm py-2.5 rounded-lg cursor-pointer">Tech-2-School</SelectItem>
              </SelectContent>
            </Select>
            {errors.category && <p className="text-xs text-red-500 font-semibold mt-1">{errors.category.message}</p>}
          </div>

          {/* Field: Featured Image Module */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
              Featured Images (1 Only) <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-wrap items-center gap-3">
              {watchedValues.featuredImage ? (
                <div className="relative w-20 h-20 rounded-xl overflow-hidden border border-gray-200 shadow-sm group">
                  <img src={watchedValues.featuredImage} className="w-full h-full object-cover" alt="Featured asset" />
                  <button 
                    type="button" 
                    onClick={() => setValue("featuredImage", "", { shouldValidate: true })} 
                    className="absolute top-1 right-1 bg-black/60 rounded-full w-5 h-5 flex items-center justify-center text-white hover:bg-black transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <button 
                  type="button" 
                  onClick={() => simulatePhotoUpload("featuredImage")} 
                  className={`w-20 h-20 border-2 border-dashed rounded-xl flex flex-col items-center justify-center text-center transition-all bg-gray-50/50 group ${errors.featuredImage ? 'border-red-300 hover:border-red-400' : 'border-gray-200 hover:border-blue-400'}`}
                >
                  <Plus className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                  <span className="text-[10px] font-bold text-gray-400 mt-1">Add photo</span>
                </button>
              )}
            </div>
            {errors.featuredImage && <p className="text-xs text-red-500 font-semibold mt-1">{errors.featuredImage.message}</p>}
          </div>

          {/* Dynamic Sections Loop Array Block */}
          <div className="space-y-6 pt-4 border-t border-gray-100">
            {fields.map((section, index) => (
              <div key={section.id} className="border border-gray-100 bg-gray-50/40 rounded-2xl p-4 md:p-5 relative space-y-4 shadow-inner">
                
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 bg-blue-50 text-[#3B82F6] font-bold text-xs rounded-full flex items-center justify-center">
                      {index + 1}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Article section</span>
                  </div>
                  {fields.length > 1 && (
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => remove(index)} 
                      className="w-8 h-8 text-gray-400 hover:text-red-500 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>

                {/* Sub Field: Title */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-600">Title <span className="text-red-500">*</span></label>
                  <Input 
                    {...register(`sections.${index}.title` as const)}
                    placeholder="What is SEEP Innovation?" 
                    className="bg-white border-gray-200 rounded-xl h-10 text-sm focus-visible:ring-blue-500" 
                  />
                  {errors.sections?.[index]?.title && (
                    <p className="text-xs text-red-500 mt-0.5">{errors.sections[index]?.title?.message}</p>
                  )}
                </div>

                {/* Sub Field: Content Area Box */}
                <div className="space-y-1.5">
                  <div className="border border-gray-200 rounded-xl bg-white overflow-hidden shadow-sm">
                    <div className="flex items-center gap-0.5 bg-gray-50 border-b border-gray-100 p-2 text-gray-400">
                      <select className="bg-transparent text-xs font-bold text-gray-600 outline-none mr-2 cursor-pointer">
                        <option>Paragraph</option>
                      </select>
                      <select className="bg-transparent text-xs font-bold text-gray-600 outline-none mr-3 cursor-pointer">
                        <option>Sans Serif</option>
                      </select>
                      <div className="w-px h-4 bg-gray-200 mx-1.5" />
                      {[<Bold className="w-3.5 h-3.5" />, <Italic className="w-3.5 h-3.5" />, <Underline className="w-3.5 h-3.5" />, <Strikethrough className="w-3.5 h-3.5" />, <Quote className="w-3.5 h-3.5" />].map((icon, idx) => (
                        <button key={idx} type="button" className="w-7 h-7 rounded hover:bg-gray-200 hover:text-gray-700 flex items-center justify-center transition-colors">
                          {icon}
                        </button>
                      ))}
                    </div>
                    <Textarea 
                      {...register(`sections.${index}.content` as const)}
                      placeholder="Write content..." 
                      className="border-0 focus-visible:ring-0 rounded-none p-4 min-h-[140px] text-sm leading-relaxed text-gray-700 resize-y" 
                    />
                  </div>
                  {errors.sections?.[index]?.content && (
                    <p className="text-xs text-red-500 mt-0.5">{errors.sections[index]?.content?.message}</p>
                  )}
                </div>

                {/* Sub Field: Dynamic Optional Local Photo */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 block">Select Image <span className="text-gray-400 font-normal">(Optional)</span></label>
                  <div className="flex items-center gap-3">
                    {watchedValues.sections?.[index]?.image ? (
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden group border border-gray-200 shadow-sm">
                        <img src={watchedValues.sections[index].image} className="w-full h-full object-cover" alt="Section graphic selection" />
                        <button 
                          type="button" 
                          onClick={() => setValue(`sections.${index}.image`, "")} 
                          className="absolute top-1 right-1 bg-black/60 rounded-full w-4 h-4 flex items-center justify-center text-white"
                        >
                          <X className="w-2.5 h-2.5" />
                        </button>
                      </div>
                    ) : (
                      <button 
                        type="button" 
                        onClick={() => simulatePhotoUpload(`sections.${index}.image`)} 
                        className="w-16 h-16 border-2 border-dashed border-gray-200 hover:border-blue-400 rounded-xl flex flex-col items-center justify-center bg-white group transition-colors"
                      >
                        <Plus className="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
                        <span className="text-[9px] font-bold text-gray-400 mt-0.5">Add photo</span>
                      </button>
                    )}
                  </div>
                </div>

              </div>
            ))}

            <Button 
              type="button" 
              variant="outline" 
              onClick={() => append({ id: `sec_${Date.now()}`, title: "", content: "", image: "" })} 
              className="w-full border-dashed border-2 border-gray-200 text-gray-500 hover:text-blue-600 hover:border-blue-300 h-12 rounded-xl text-xs font-bold bg-white flex items-center justify-center gap-2 transition-all shadow-sm"
            >
              <Plus className="w-4 h-4" /> Add Section
            </Button>
          </div>

        </div>

        {/* RIGHT COLUMN: Real-Time Live Preview Stream */}
        <div className="lg:col-span-6 bg-white border border-gray-100 rounded-2xl shadow-sm p-6 overflow-y-auto lg:sticky lg:top-24 max-h-[calc(100vh-120px)] space-y-6">
          
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Live Preview</span>
            </div>
            <span className="text-[11px] font-medium text-gray-400 italic">Updated as you type</span>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-gray-400">
            <span>28 February 2026</span>
            {watchedValues.category && (
              <Badge variant="secondary" className="bg-blue-50 text-blue-600 hover:bg-blue-50 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border-none">{watchedValues.category}</Badge>
            )}
          </div>

          <h1 className="text-2xl font-bold text-gray-900 tracking-tight leading-snug">
            {watchedValues.title || <span className="text-gray-300 italic font-normal">Your post title will appear here...</span>}
          </h1>

          {watchedValues.featuredImage ? (
            <div className="w-full h-64 rounded-2xl overflow-hidden bg-gray-50 shadow-sm">
              <img src={watchedValues.featuredImage} className="w-full h-full object-cover" alt="Featured visualization image" />
            </div>
          ) : (
            <div className="w-full h-48 rounded-2xl border-2 border-dashed border-gray-100 bg-gray-50/50 flex flex-col items-center justify-center text-center p-4">
              <ImageIcon className="w-8 h-8 text-gray-300 mb-2" />
              <span className="text-xs font-semibold text-gray-400">Click to upload image asset</span>
              <span className="text-[10px] text-gray-400 mt-0.5">PNG, JPG up to 10MB</span>
            </div>
          )}

          {/* Table of Contents and Dynamic Subsections Split Layout mapping */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-2 items-start">
            
            <div className="md:col-span-4 space-y-3 border-r border-gray-100 pr-3">
              <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 pb-2">Table of contents</h4>
              <ul className="space-y-2">
                {watchedValues.sections?.map((sec, idx) => (
                  <li key={sec.id} className="text-xs font-bold text-gray-600 line-clamp-2 leading-relaxed">
                    {sec.title ? `${idx + 1}. ${sec.title}` : <span className="text-gray-300 italic font-normal">Untitled Section...</span>}
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-8 space-y-6">
              {watchedValues.sections?.map((sec, idx) => (
                <div key={sec.id} className="space-y-3">
                  {sec.title && <h3 className="font-bold text-gray-900 text-base tracking-tight">{sec.title}</h3>}
                  {sec.content ? (
                    <p className="text-sm text-gray-500 whitespace-pre-wrap leading-relaxed">{sec.content}</p>
                  ) : (
                    <p className="text-xs text-gray-300 italic">Section content rendering area placeholder...</p>
                  )}
                  {sec.image && (
                    <div className="w-full h-44 rounded-xl overflow-hidden bg-gray-50 shadow-sm mt-2">
                      <img src={sec.image} className="w-full h-full object-cover" alt="Sub-article visualization preview" />
                    </div>
                  )}
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}