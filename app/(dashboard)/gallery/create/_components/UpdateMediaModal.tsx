"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, Plus, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { uploadMediaSchema, UploadMediaFormValues } from "@/types/gallery";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface UploadMediaInitialModalProps {
  onClose?: () => void;
  onNextStep?: (data: Partial<UploadMediaFormValues>) => void;
}

export default function UpdateMediaModal({ onClose, onNextStep }: UploadMediaInitialModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Partial<UploadMediaFormValues>>({
    defaultValues: {
      project: "SEEP Initiative",
      program: "Tech-2-School",
      status: "Publish",
      mediaFiles: [],
    },
  });

  const watchedValues = watch();

  const handleMockAddFile = () => {
    const currentFiles = watchedValues.mediaFiles || [];
    setValue("mediaFiles", [
      ...currentFiles,
      "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=300"
    ]);
  };

  const handleRemoveFile = (indexToRemove: number) => {
    const currentFiles = watchedValues.mediaFiles || [];
    setValue("mediaFiles", currentFiles.filter((_, idx) => idx !== indexToRemove));
  };

  function onSubmitStep(data: Partial<UploadMediaFormValues>) {
    if (onNextStep) {
      onNextStep(data);
    }
    setIsUploadOpen(false); // Cleanly close the modal on submit
  }

  return (
    <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#3B82F6] hover:bg-blue-600 text-white font-semibold text-xs h-10 rounded-xl px-4 flex items-center gap-2 shadow-sm">
          <Plus className="w-4 h-4" /> Upload Media File
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl p-0 bg-white border border border-gray-100 shadow-xl overflow-hidden sm:rounded-2xl">
          {/* Form */}
          <form onSubmit={handleSubmit(onSubmitStep)} className="p-6 space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
                Project<span className="text-blue-500">*</span> <span className="text-gray-400 font-normal lowercase">(locked by programs)</span>
              </label>
              <Select disabled defaultValue={watchedValues.project}>
                <SelectTrigger className="rounded-xl border-gray-200 h-11 text-xs font-semibold bg-[#F8FAFC] text-gray-400 shadow-none">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent />
              </Select>
              <p className="text-[11px] text-gray-400 font-medium flex items-center gap-1 mt-1">
                <span className="w-1 h-1 rounded-full bg-gray-300" /> Linked to: {watchedValues.project}
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-600 uppercase tracking-wider block">
                Select Program <span className="text-red-500">*</span>
              </label>
              <Select 
                value={watchedValues.program} 
                onValueChange={(val) => setValue("program", val)}
              >
                <SelectTrigger className="rounded-xl border-gray-200 h-11 text-xs font-medium bg-white text-gray-700 focus:ring-blue-500">
                  <SelectValue placeholder="Select Program" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="Tech-2-School" className="text-xs py-2">Tech-2-School</SelectItem>
                  <SelectItem value="Innovation Hub" className="text-xs py-2">Innovation Hub</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-600 uppercase tracking-wider block">
                Upload Attached Media files
              </label>
              <div className="flex flex-wrap items-center gap-3">
                {watchedValues.mediaFiles?.map((file, idx) => (
                  <div key={idx} className="relative w-14 h-14 rounded-xl overflow-hidden border border-gray-100 shadow-sm group">
                    <img src={file} className="w-full h-full object-cover" alt="Uploaded asset" />
                    <button 
                      type="button" 
                      onClick={() => handleRemoveFile(idx)} 
                      className="absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                
                <button 
                  type="button" 
                  onClick={handleMockAddFile}
                  className="w-14 h-14 border-2 border-dashed border-gray-200 hover:border-blue-400 rounded-xl flex flex-col items-center justify-center bg-[#F8FAFC] group transition-colors"
                >
                  <Plus className="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
                  <span className="text-[8px] font-bold text-gray-400 mt-0.5 group-hover:text-blue-500">Add file</span>
                </button>
              </div>
            </div>

            <div className="space-y-2 pt-1">
              <label className="text-xs font-bold text-gray-600 uppercase tracking-wider block">Status</label>
              <div className="space-y-2.5">
                {["Publish", "Draft"].map((statusOption) => (
                  <label key={statusOption} className="flex items-center gap-3 cursor-pointer group w-fit">
                    <input 
                      type="radio" 
                      value={statusOption}
                      checked={watchedValues.status === statusOption}
                      onChange={() => setValue("status", statusOption as "Publish" | "Draft")}
                      className="w-4 h-4 text-blue-500 focus:ring-blue-500 border-gray-300 cursor-pointer"
                    />
                    <span className="text-xs font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">{statusOption}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-[#F0F6FF] border border-blue-100 rounded-xl p-3 text-[11px] text-[#2563EB] font-medium flex items-center gap-2.5 shadow-sm">
              <Info className="w-4 h-4 shrink-0 text-blue-500" />
              <span>Project is automatically set based on the selected program</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-gray-100">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsUploadOpen(false)} 
                className="w-full sm:w-auto rounded-xl border-gray-200 text-xs font-bold text-gray-600 px-6 h-11 hover:bg-gray-50"
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                className="w-full sm:w-auto bg-[#3B82F6] hover:bg-blue-600 text-white text-xs font-bold px-8 h-11 rounded-xl shadow-md transition-all"
              >
                Upload More Files
              </Button>
            </div>
          </form>
      </DialogContent>
    </Dialog>
  );
}