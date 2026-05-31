"use client";

import React, { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  X,
  Plus,
  Image as ImageIcon,
  Check,
  ChevronDown,
  Pencil,
  AlertTriangle
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CreateProgramDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    projectTitle: string;
    programTitle: string;
    programDescription: string;
  }) => void;
}

interface UploadedImage {
  id: string;
  url: string;
  name: string;
}

export function CreateProgramDialog({
  isOpen,
  onClose,
  onSubmit,
}: CreateProgramDialogProps) {
  // Stepper State (1: Project Setup, 2: Program Details, 3: Review & Publish)
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form Fields State
  const [coverPhoto, setCoverPhoto] = useState<UploadedImage | null>(null);
  const [coverError, setCoverError] = useState<string>("");
  const [projectMode, setProjectMode] = useState<"select" | "create">("select");
  const [selectedProject, setSelectedProject] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectStatus, setProjectStatus] = useState("Active");

  // Program details state
  const [programName, setProgramName] = useState("");
  const [programDescription, setProgramDescription] = useState("");
  const [featuredImages, setFeaturedImages] = useState<UploadedImage[]>([]);
  const [featuredError, setFeaturedError] = useState("");

  // Step 3 Confirmation state
  const [isConfirmed, setIsConfirmed] = useState(false);

  // Hidden file inputs references
  const coverInputRef = useRef<HTMLInputElement>(null);
  const featuredInputRef = useRef<HTMLInputElement>(null);

  // Mock list of existing projects
  const existingProjects = [
    { id: "p1", name: "Entrepreneurship Scaling", desc: "Teaching skills for the people in Ohio community environs" },
    { id: "p2", name: "Infrastructure Health Initiative", desc: "Water filtration systems and health outposts constructions in vulnerable regions" },
    { id: "p3", name: "NextGen Tech Education Hubs", desc: "Setting up computer science labs and coding resource centers across public libraries" },
  ];

  // Selected project details
  const getActiveProjectTitle = () => {
    if (projectMode === "select") {
      const proj = existingProjects.find((p) => p.name === selectedProject);
      return proj ? proj.name : "";
    }
    return projectName;
  };

  const getActiveProjectDesc = () => {
    if (projectMode === "select") {
      const proj = existingProjects.find((p) => p.name === selectedProject);
      return proj ? proj.desc : "";
    }
    return projectDescription;
  };

  // Image upload simulation handlers
  const handleCoverClick = () => {
    coverInputRef.current?.click();
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setCoverError("File size exceeds 10MB limit.");
      return;
    }

    // Validate type (PNG/JPG)
    if (!file.type.match("image/png") && !file.type.match("image/jpeg")) {
      setCoverError("Only PNG or JPG files are allowed.");
      return;
    }

    setCoverError("");
    const url = URL.createObjectURL(file);
    setCoverPhoto({
      id: `cover-${Date.now()}`,
      url,
      name: file.name,
    });
  };

  const handleFeaturedClick = () => {
    featuredInputRef.current?.click();
  };

  const handleFeaturedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages: UploadedImage[] = [];
    let hasError = false;

    Array.from(files).forEach((file) => {
      if (featuredImages.length + newImages.length >= 3) {
        setFeaturedError("Maximum of 3 featured images allowed.");
        hasError = true;
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        setFeaturedError("File size exceeds 10MB limit.");
        hasError = true;
        return;
      }

      if (!file.type.match("image/png") && !file.type.match("image/jpeg")) {
        setFeaturedError("Only PNG or JPG files are allowed.");
        hasError = true;
        return;
      }

      newImages.push({
        id: `feat-${Date.now()}-${Math.random()}`,
        url: URL.createObjectURL(file),
        name: file.name,
      });
    });

    if (!hasError) {
      setFeaturedError("");
    }
    setFeaturedImages((prev) => [...prev, ...newImages]);
  };

  const handleRemoveFeatured = (id: string) => {
    setFeaturedImages((prev) => prev.filter((img) => img.id !== id));
  };

  // Validation helpers
  const isStep1Valid = () => {
    if (!coverPhoto) return false;
    if (projectMode === "select" && !selectedProject) return false;
    if (projectMode === "create" && !projectName) return false;
    return true;
  };

  const isStep2Valid = () => {
    return programName.trim() !== "" && programDescription.trim() !== "";
  };

  const handleContinue = () => {
    if (step === 1 && isStep1Valid()) {
      setStep(2);
    } else if (step === 2 && isStep2Valid()) {
      setStep(3);
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    } else if (step === 3) {
      setStep(2);
    }
  };

  const handlePublish = () => {
    if (!isConfirmed) return;
    onSubmit({
      projectTitle: getActiveProjectTitle(),
      programTitle: programName,
      programDescription: programDescription,
    });
    resetModal();
    onClose();
  };

  const handleSaveDraft = () => {
    onSubmit({
      projectTitle: getActiveProjectTitle(),
      programTitle: `${programName} (Draft)`,
      programDescription: programDescription,
    });
    resetModal();
    onClose();
  };

  const resetModal = () => {
    setStep(1);
    setCoverPhoto(null);
    setCoverError("");
    setProjectMode("select");
    setSelectedProject("");
    setProjectName("");
    setProjectDescription("");
    setProjectStatus("Active");
    setProgramName("");
    setProgramDescription("");
    setFeaturedImages([]);
    setFeaturedError("");
    setIsConfirmed(false);
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent showCloseButton={false} className="sm:max-w-[920px] w-[95vw] rounded-3xl border border-zinc-100 dark:border-zinc-800 p-0 overflow-hidden bg-[#FAFBFC] dark:bg-zinc-950 shadow-2xl">
        <DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogTitle>
        <div className="grid grid-cols-1 md:grid-cols-12 min-h-[520px]">
          
          {/* Column 1: Steps Stepper (ColSpan 3) */}
          <div className="md:col-span-3 bg-zinc-50 dark:bg-zinc-900/50 p-6 flex flex-col justify-between border-r border-zinc-100 dark:border-zinc-800/60">
            <div className="space-y-6">
              <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Steps</h2>
              <div className="relative flex flex-col gap-8 pl-4">
                {/* Stepper timeline vertical line */}
                <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-zinc-200 dark:bg-zinc-800">
                  <div
                    className="w-full bg-[#335CFF] transition-all duration-350"
                    style={{
                      height: step === 1 ? "0%" : step === 2 ? "50%" : "100%",
                    }}
                  />
                </div>

                {/* Step 1 indicator */}
                <div className="flex items-center gap-3 relative z-10">
                  <span
                    className={cn(
                      "w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold transition-all",
                      step >= 1
                        ? "bg-[#335CFF] text-white border border-[#335CFF]"
                        : "bg-white text-zinc-400 border border-zinc-200"
                    )}
                  >
                    {step > 1 ? <Check className="w-2.5 h-2.5" /> : null}
                  </span>
                  <span className={cn("text-xs font-bold transition-all", step === 1 ? "text-zinc-800 dark:text-zinc-100" : "text-zinc-400")}>
                    Project Setup
                  </span>
                </div>

                {/* Step 2 indicator */}
                <div className="flex items-center gap-3 relative z-10">
                  <span
                    className={cn(
                      "w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold transition-all",
                      step >= 2
                        ? "bg-[#335CFF] text-white border border-[#335CFF]"
                        : "bg-white text-zinc-400 border border-zinc-200"
                    )}
                  >
                    {step > 2 ? <Check className="w-2.5 h-2.5" /> : null}
                  </span>
                  <span className={cn("text-xs font-bold transition-all", step === 2 ? "text-zinc-800 dark:text-zinc-100" : "text-zinc-400")}>
                    Program Details
                  </span>
                </div>

                {/* Step 3 indicator */}
                <div className="flex items-center gap-3 relative z-10">
                  <span
                    className={cn(
                      "w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold transition-all",
                      step >= 3
                        ? "bg-[#335CFF] text-white border border-[#335CFF]"
                        : "bg-white text-zinc-400 border border-zinc-200"
                    )}
                  >
                    {step > 3 ? <Check className="w-2.5 h-2.5" /> : null}
                  </span>
                  <span className={cn("text-xs font-bold transition-all", step === 3 ? "text-zinc-800 dark:text-zinc-100" : "text-zinc-400")}>
                    Review & Publish
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Image Preview Card (ColSpan 4) */}
          <div className="md:col-span-4 bg-white dark:bg-zinc-900 p-6 flex flex-col justify-center items-center border-r border-zinc-100 dark:border-zinc-800/60">
            <div className="w-full max-w-[210px] space-y-4">
              <input
                type="file"
                ref={coverInputRef}
                onChange={handleCoverChange}
                accept="image/png, image/jpeg"
                className="hidden"
              />

              {coverPhoto ? (
                <div
                  onClick={step === 1 ? handleCoverClick : undefined}
                  className={cn(
                    "w-full aspect-square rounded-2xl overflow-hidden border border-zinc-150 relative group",
                    step === 1 && "cursor-pointer"
                  )}
                >
                  <img
                    src={coverPhoto.url}
                    alt="Cover preview"
                    className="w-full h-full object-cover transition-transform group-hover:scale-102 duration-300"
                  />
                  {step === 1 && (
                    <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <ImageIcon className="w-8 h-8 text-white mb-2" />
                      <span className="text-[10px] font-bold text-white">Change Cover Photo</span>
                    </div>
                  )}
                </div>
              ) : (
                <div
                  onClick={handleCoverClick}
                  className="w-full aspect-square rounded-2xl border-2 border-dashed border-zinc-200 hover:border-[#335CFF] dark:border-zinc-800 flex flex-col items-center justify-center text-center p-4 gap-2 cursor-pointer transition-all bg-zinc-50/50 dark:bg-zinc-900/30"
                >
                  <ImageIcon className="w-6 h-6 text-zinc-400" />
                  <span className="text-[10px] font-bold text-zinc-800 dark:text-zinc-200">Click to upload</span>
                  <span className="text-[9px] text-zinc-400">PNG, JPG up to 10MB</span>
                </div>
              )}

              <div className="text-center">
                <h4 className="text-xs font-bold text-zinc-800 dark:text-zinc-100">Project Cover Photo</h4>
                <p className="text-[10px] text-zinc-400 mt-1">Project Description</p>
              </div>

              {coverError && (
                <div className="flex items-center gap-1 text-[10px] text-red-600 bg-red-50 dark:bg-red-950/20 p-2 rounded-lg font-medium">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                  <span>{coverError}</span>
                </div>
              )}
            </div>
          </div>

          {/* Column 3: Active Form Step controls (ColSpan 5) */}
          <div className="md:col-span-5 bg-white dark:bg-zinc-900 p-6 flex flex-col justify-between">
            {/* Modal Close Button */}
            <div className="flex justify-end -mt-2 -mr-2">
              <button
                onClick={handleClose}
                className="p-1 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-600 cursor-pointer"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* STEP 1 FORM */}
            {step === 1 && (
              <div className="flex-1 space-y-5 mt-2 overflow-y-auto pr-1">
                <div>
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-150">Project</h3>
                  <p className="text-[10px] text-zinc-400 mt-1">Choose an existing project or choose a new one</p>
                </div>

                <div className="space-y-4">
                  {projectMode === "select" ? (
                    <>
                      <div className="flex flex-col gap-1.5">
                        <div className="relative">
                          <select
                            value={selectedProject}
                            onChange={(e) => setSelectedProject(e.target.value)}
                            className="w-full px-3 py-2.5 text-xs font-semibold border border-zinc-200 dark:border-zinc-700 rounded-xl bg-white dark:bg-zinc-900 focus:outline-none focus:ring-1 focus:ring-[#335CFF] text-zinc-800 dark:text-zinc-50 appearance-none cursor-pointer"
                          >
                            <option value="">Select a project</option>
                            {existingProjects.map((p) => (
                              <option key={p.id} value={p.name}>
                                {p.name}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
                        </div>
                      </div>

                      <div className="relative flex items-center justify-center my-6">
                        <span className="absolute inset-x-0 h-px bg-zinc-100 dark:bg-zinc-800/80" />
                        <span className="relative bg-white dark:bg-zinc-900 px-3 text-[10px] text-zinc-400 font-semibold uppercase tracking-wider">
                          Or create new project
                        </span>
                      </div>

                      <button
                        onClick={() => setProjectMode("create")}
                        className="w-full flex items-center justify-center gap-1.5 py-2.5 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs font-bold text-[#335CFF] bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-all cursor-pointer"
                      >
                        <Plus className="w-4 h-4" /> Create New Project
                      </button>
                    </>
                  ) : (
                    <div className="space-y-4 animate-in fade-in duration-200">
                      <div className="flex items-center justify-between pb-1 border-b border-zinc-100 dark:border-zinc-800">
                        <span className="text-[10px] text-[#335CFF] font-bold uppercase tracking-wider">New Project Setup</span>
                        <button
                          onClick={() => setProjectMode("select")}
                          className="text-[10px] font-bold text-zinc-400 hover:text-zinc-600 hover:underline cursor-pointer"
                        >
                          Select Existing
                        </button>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Project name *</label>
                        <input
                          type="text"
                          placeholder="e.g. Entrepreneurship Scaling"
                          value={projectName}
                          onChange={(e) => setProjectName(e.target.value)}
                          className="w-full px-3 py-2.5 text-xs border border-zinc-200 dark:border-zinc-700 rounded-xl bg-transparent focus:outline-none focus:ring-1 focus:ring-[#335CFF] text-zinc-800 dark:text-zinc-50"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Short description</label>
                        <textarea
                          rows={2}
                          placeholder="Teaching skills for the people in Ohio community environs"
                          value={projectDescription}
                          onChange={(e) => setProjectDescription(e.target.value)}
                          className="w-full px-3 py-2 text-xs border border-zinc-200 dark:border-zinc-700 rounded-xl bg-transparent focus:outline-none focus:ring-1 focus:ring-[#335CFF] text-zinc-800 dark:text-zinc-50"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Project Status</label>
                        <div className="relative">
                          <select
                            value={projectStatus}
                            onChange={(e) => setProjectStatus(e.target.value)}
                            className="w-full px-3 py-2.5 text-xs font-semibold border border-zinc-200 dark:border-zinc-700 rounded-xl bg-white dark:bg-zinc-900 focus:outline-none focus:ring-1 focus:ring-[#335CFF] text-zinc-800 dark:text-zinc-50 appearance-none cursor-pointer"
                          >
                            <option value="Active">Active</option>
                            <option value="Planning">Planning</option>
                            <option value="Completed">Completed</option>
                          </select>
                          <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* STEP 2 FORM */}
            {step === 2 && (
              <div className="flex-1 space-y-5 mt-2 overflow-y-auto pr-1">
                <div>
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-150">Project Overview</h3>
                </div>

                <div className="p-4 bg-zinc-50/50 dark:bg-zinc-900/30 rounded-2xl border border-zinc-100 dark:border-zinc-800 flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-zinc-800 dark:text-zinc-200">{getActiveProjectTitle() || "Untitled Project"}</h4>
                    <p className="text-[10px] text-zinc-400 leading-relaxed max-w-[220px]">
                      {getActiveProjectDesc() || "No description provided."}
                    </p>
                  </div>
                  <button
                    onClick={() => setStep(1)}
                    className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-500 cursor-pointer shrink-0"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Program Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. Empowerment Initiative"
                      value={programName}
                      onChange={(e) => setProgramName(e.target.value)}
                      className="w-full px-3 py-2.5 text-xs border border-zinc-200 dark:border-zinc-700 rounded-xl bg-transparent focus:outline-none focus:ring-1 focus:ring-[#335CFF] text-zinc-800 dark:text-zinc-50"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Description *</label>
                    <textarea
                      rows={3}
                      placeholder="A transformative program focused on nurturing creativity..."
                      value={programDescription}
                      onChange={(e) => setProgramDescription(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-zinc-200 dark:border-zinc-700 rounded-xl bg-transparent focus:outline-none focus:ring-1 focus:ring-[#335CFF] text-zinc-800 dark:text-zinc-50"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Featured Images (Max 3)</label>
                    <input
                      type="file"
                      ref={featuredInputRef}
                      onChange={handleFeaturedChange}
                      accept="image/png, image/jpeg"
                      multiple
                      className="hidden"
                    />

                    {/* Previews tags of uploaded featured images */}
                    {featuredImages.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-2">
                        {featuredImages.map((img) => (
                          <div
                            key={img.id}
                            className="flex items-center gap-1.5 px-3 py-1 bg-zinc-50 dark:bg-zinc-800 rounded-full border border-zinc-150 dark:border-zinc-700"
                          >
                            <span className="text-[9px] font-bold text-zinc-600 dark:text-zinc-300 truncate max-w-[120px]">
                              {img.name}
                            </span>
                            <button
                              onClick={() => handleRemoveFeatured(img.id)}
                              className="text-zinc-400 hover:text-zinc-600 cursor-pointer"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {featuredImages.length < 3 ? (
                      <div
                        onClick={handleFeaturedClick}
                        className="border border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl p-3 flex flex-col items-center justify-center text-center gap-1.5 cursor-pointer bg-zinc-50/50 hover:border-[#335CFF] transition-all"
                      >
                        <ImageIcon className="w-5 h-5 text-zinc-400" />
                        <span className="text-[9px] font-bold text-zinc-700 dark:text-zinc-300">Click to upload</span>
                        <span className="text-[8px] text-zinc-400">PNG, JPG up to 10MB</span>
                      </div>
                    ) : (
                      <div className="text-[9px] text-zinc-400 font-medium italic">
                        Max capacity (3 images) uploaded.
                      </div>
                    )}

                    {featuredError && (
                      <div className="text-[10px] text-red-500 font-semibold mt-1">
                        {featuredError}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3 FORM */}
            {step === 3 && (
              <div className="flex-1 space-y-6 mt-2 overflow-y-auto pr-1">
                <div>
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-150">Review & confirm</h3>
                  <p className="text-[10px] text-zinc-400 mt-1">Please review the information before publishing.</p>
                </div>

                <div className="space-y-4">
                  <div className="py-2 border-b border-zinc-50 dark:border-zinc-800/40">
                    <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider">Project</p>
                    <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200 mt-1">
                      {getActiveProjectTitle()}
                    </p>
                  </div>

                  <div className="py-2 border-b border-zinc-50 dark:border-zinc-800/40">
                    <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider">Program</p>
                    <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200 mt-1">
                      {programName}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider">Featured Images</p>
                    {featuredImages.length > 0 ? (
                      <div className="flex gap-2">
                        {featuredImages.map((img) => (
                          <div
                            key={img.id}
                            className="w-14 h-14 rounded-lg overflow-hidden border border-zinc-150 dark:border-zinc-800 shrink-0"
                          >
                            <img
                              src={img.url}
                              alt="Featured thumbnail"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-zinc-400 italic">No featured images uploaded.</p>
                    )}
                  </div>

                  <div className="p-3 bg-zinc-50/50 dark:bg-zinc-900/30 rounded-xl border border-zinc-100 dark:border-zinc-800 flex items-start gap-2.5">
                    <input
                      type="checkbox"
                      id="confirm-cb"
                      checked={isConfirmed}
                      onChange={(e) => setIsConfirmed(e.target.checked)}
                      className="w-4 h-4 rounded text-[#335CFF] border-zinc-300 focus:ring-[#335CFF] mt-0.5 cursor-pointer"
                    />
                    <label htmlFor="confirm-cb" className="text-[10px] text-zinc-500 font-medium leading-relaxed select-none cursor-pointer">
                      I confirm the information provided is accurate and ready for publication
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Footer Buttons container */}
            <div className="flex flex-col-reverse sm:flex-row justify-end items-center gap-2 mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900">
              {step === 1 && (
                <>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleClose}
                    className="w-full sm:w-auto border-zinc-200 dark:border-zinc-800 font-semibold text-xs py-2 px-4 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-850 cursor-pointer"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    onClick={handleContinue}
                    disabled={!isStep1Valid()}
                    className={cn(
                      "w-full sm:w-auto font-semibold text-xs py-2 px-4 rounded-xl transition-all cursor-pointer text-white",
                      isStep1Valid()
                        ? "bg-[#335CFF] hover:bg-[#224BE6]"
                        : "bg-zinc-100 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed"
                    )}
                  >
                    Continue
                  </Button>
                </>
              )}

              {step === 2 && (
                <>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleBack}
                    className="w-full sm:w-auto border-zinc-200 dark:border-zinc-800 font-semibold text-xs py-2 px-4 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-850 cursor-pointer"
                  >
                    Back
                  </Button>
                  <Button
                    type="button"
                    onClick={handleContinue}
                    disabled={!isStep2Valid()}
                    className={cn(
                      "w-full sm:w-auto font-semibold text-xs py-2 px-4 rounded-xl transition-all cursor-pointer text-white",
                      isStep2Valid()
                        ? "bg-[#335CFF] hover:bg-[#224BE6]"
                        : "bg-zinc-100 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed"
                    )}
                  >
                    Continue
                  </Button>
                </>
              )}

              {step === 3 && (
                <>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="w-full sm:w-auto px-4 py-2 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100/70 dark:bg-red-950/20 dark:text-red-400 rounded-xl cursor-pointer"
                  >
                    Cancel
                  </button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleSaveDraft}
                    className="w-full sm:w-auto border-zinc-200 dark:border-zinc-800 font-semibold text-xs py-2 px-4 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-850 cursor-pointer"
                  >
                    Save as Draft
                  </Button>
                  <Button
                    type="button"
                    onClick={handlePublish}
                    disabled={!isConfirmed}
                    className={cn(
                      "w-full sm:w-auto font-semibold text-xs py-2 px-4 rounded-xl transition-all cursor-pointer text-white",
                      isConfirmed
                        ? "bg-[#335CFF] hover:bg-[#224BE6] shadow-xs"
                        : "bg-zinc-100 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed"
                    )}
                  >
                    Publish Program
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
