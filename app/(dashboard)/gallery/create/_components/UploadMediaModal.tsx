"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { uploadMediaSchema, UploadMediaFormValues } from "@/lib/formSchema";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface UploadMediaModalProps {
  onClose?: () => void;
}

export default function UploadMediaModal({ onClose }: UploadMediaModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<UploadMediaFormValues>({
    resolver: zodResolver(uploadMediaSchema),
    defaultValues: {
      title: "Tech training for primary school",
      description: "Teaching young entrepreneurs the technical know how of tech",
      status: "Publish",
      mediaFiles: [
        "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=150",
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=150",
        "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=150"
      ],
      project: "SEEP Initiative",
      program: "Tech-2-School",
    },
    mode: "onChange",
  });

  const watchedValues = watch();

  const handleMockAddFile = () => {
    const currentFiles = watchedValues.mediaFiles || [];
    setValue("mediaFiles", [
      ...currentFiles,
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=150"
    ], { shouldValidate: true });
  };

  const handleRemoveFile = (indexToRemove: number) => {
    const currentFiles = watchedValues.mediaFiles || [];
    setValue("mediaFiles", currentFiles.filter((_, idx) => idx !== indexToRemove), { shouldValidate: true });
  };

  async function onFormSubmit(data: UploadMediaFormValues) {
    setIsSubmitting(true);
    try {
      // Direct integration pipeline endpoint route invocation
      const response = await fetch("/api/gallery/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Server rejected transfer configuration parameters");
      onClose?.();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  }

  const [isUploadOpen, setIsUploadOpen] = useState(false);


  return (
    <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#335CFF] hover:bg-[#224BE6] text-white font-semibold text-xs py-2 px-4 rounded-xl shadow-xs transition-all w-fit cursor-pointer">
                <Plus className="w-4 h-4 mr-1.5" />
                Add Media
            </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-4xl p-0 bg-transparent border-none overflow-hidden sm:rounded-2xl">
                <div className="w-full bg-white max-h-[90vh] md:max-h-none overflow-y-auto grid grid-cols-1 md:grid-cols-12 gap-0 shadow-2xl relative rounded-2xl">
                
                {/* LEFT ASPECT PANEL: Image Preview Panel Context Block */}
                <div className="md:col-span-4 bg-gray-50/60 p-6 border-b md:border-b-0 md:border-r border-gray-100 flex flex-col justify-between min-h-[320px] md:min-h-auto">
                    <div className="space-y-4">
                    <div className="aspect-square w-full rounded-2xl overflow-hidden border border-gray-200/60 shadow-inner bg-white bg-cover bg-center flex items-center justify-center">
                        {watchedValues.mediaFiles?.[0] ? (
                        <img src={watchedValues.mediaFiles[0]} className="w-full h-full object-cover" alt="Primary cover file element preview" />
                        ) : (
                        <div className="text-center p-4">
                            <span className="text-xs text-gray-400 font-medium">No cover thumbnail preview</span>
                        </div>
                        )}
                    </div>
                    <div>
                        <p className="text-[10px] uppercase font-bold tracking-wider text-gray-400">Filename</p>
                        <p className="text-xs font-bold text-gray-700 truncate mt-0.5">{watchedValues.title || "--------- "}</p>
                    </div>
                    </div>

                    <div className="pt-4 border-t border-gray-200/60 flex items-center justify-between text-[11px] font-bold text-gray-400">
                    <span>Upload Date</span>
                    <span className="text-gray-600">
                        {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    </div>
                </div>

                {/* RIGHT ASPECT PANEL: Data and Parameter Configuration Layer */}
                <div className="md:col-span-8 p-6 space-y-5 flex flex-col justify-between">
                    <button type="button" onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 transition-colors z-20">
                    <X className="w-5 h-5" />
                    </button>

                    <div className="space-y-4">
                    {/* Form input item: Title */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">Title <span className="text-red-500">*</span></label>
                        <Input 
                        {...register("title")} 
                        className={`rounded-xl border-gray-200 h-11 text-xs font-medium focus-visible:ring-blue-500 bg-white ${errors.title ? 'border-red-500 bg-red-50/10' : ''}`}
                        />
                        {errors.title && <p className="text-[11px] font-bold text-red-500">{errors.title.message}</p>}
                    </div>

                    {/* Form input item: Description Box area text */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">Description <span className="text-red-500">*</span></label>
                        <Textarea 
                        {...register("description")} 
                        className={`rounded-xl border-gray-200 min-h-[90px] text-xs font-medium leading-relaxed resize-none focus-visible:ring-blue-500 bg-white ${errors.description ? 'border-red-500' : ''}`}
                        />
                        {errors.description && <p className="text-[11px] font-bold text-red-500">{errors.description.message}</p>}
                    </div>

                    {/* Form item radio status context switcher option elements */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">Status</label>
                        <div className="flex items-center gap-6">
                        {["Publish", "Draft"].map((statusOption) => (
                            <label key={statusOption} className="flex items-center gap-2 cursor-pointer group">
                            <input 
                                type="radio" 
                                value={statusOption}
                                checked={watchedValues.status === statusOption}
                                onChange={() => setValue("status", statusOption as "Publish" | "Draft")}
                                className="w-4 h-4 text-blue-500 focus:ring-blue-500 border-gray-300"
                            />
                            <span className="text-xs font-bold text-gray-600 group-hover:text-gray-900 transition-colors">{statusOption}</span>
                            </label>
                        ))}
                        </div>
                    </div>

                    {/* Dynamic upload matrix array tracking strip strip layout map */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">Upload Attached Media Files</label>
                        <div className="flex flex-wrap items-center gap-3">
                        {watchedValues.mediaFiles?.map((file, idx) => (
                            <div key={idx} className="relative w-12 h-12 rounded-xl overflow-hidden border border-gray-100 shadow-sm group">
                            <img src={file} className="w-full h-full object-cover" alt="Attached preview element" />
                            <button 
                                type="button" 
                                onClick={() => handleRemoveFile(idx)} 
                                className="absolute inset-0 bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <X className="w-3 h-3" />
                            </button>
                            </div>
                        ))}
                        <button 
                            type="button" 
                            onClick={handleMockAddFile}
                            className="w-12 h-12 border-2 border-dashed border-gray-200 hover:border-blue-400 rounded-xl flex flex-col items-center justify-center bg-gray-50/50 group transition-colors"
                        >
                            <Plus className="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
                        </button>
                        </div>
                        {errors.mediaFiles && <p className="text-[11px] font-bold text-red-500">{errors.mediaFiles.message}</p>}
                    </div>

                    {/* Selection system properties element arrays mapping rows lock container row row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                        <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">Project <span className="text-gray-400 font-normal">(Locked)</span></label>
                        <Select disabled defaultValue={watchedValues.project}>
                            <SelectTrigger className="rounded-xl border-gray-200 text-xs font-medium bg-gray-50 text-gray-500">
                            <SelectValue />
                            </SelectTrigger>
                            <SelectContent />
                        </Select>
                        </div>

                        <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">Program <span className="text-red-500">*</span></label>
                        <Select 
                            value={watchedValues.program} 
                            onValueChange={(val) => setValue("program", val, { shouldValidate: true })}
                        >
                            <SelectTrigger className="rounded-xl border-gray-200 text-xs font-medium bg-white text-gray-700 focus:ring-blue-500">
                            <SelectValue placeholder="Select programmatic array target" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl">
                            <SelectItem value="Tech-2-School" className="text-xs py-2">Tech-2-School</SelectItem>
                            <SelectItem value="Innovation Hub" className="text-xs py-2">Innovation Hub</SelectItem>
                            </SelectContent>
                        </Select>
                        </div>
                    </div>
                    
                    <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-3 text-[11px] text-blue-600 font-semibold flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                        Project is automatically set based on the selected program
                    </div>
                    </div>

                    {/* Footer Interface Command actions bar section mapping links row */}
                    <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-gray-100">
                    <Button 
                        type="button" 
                        variant="outline" 
                        onClick={onClose} 
                        className="w-full sm:w-auto rounded-xl border-gray-200 text-xs font-bold text-gray-600 px-6 h-10 hover:bg-gray-50"
                    >
                        Cancel
                    </Button>
                    <Button 
                        type="button" 
                        onClick={handleSubmit(onFormSubmit)}
                        disabled={isSubmitting}
                        className="w-full sm:w-auto bg-[#3B82F6] hover:bg-blue-600 text-white text-xs font-bold px-8 h-10 rounded-xl shadow-md transition-colors"
                    >
                        {isSubmitting ? "Uploading..." : "Upload"}
                    </Button>
                    </div>

                </div>

                </div>
            </DialogContent>
          </Dialog>
  );
}