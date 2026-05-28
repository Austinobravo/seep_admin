"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "default" | "destructive" | "seep";
}

export function ConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "default",
}: ConfirmDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[400px] border border-zinc-100 dark:border-zinc-800">
        <DialogHeader>
          <DialogTitle className="text-zinc-950 dark:text-zinc-50">{title}</DialogTitle>
          <DialogDescription className="text-zinc-500 dark:text-zinc-400 mt-2">
            {description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4 gap-2">
          <Button variant="outline" onClick={onClose} className="w-full sm:w-auto">
            {cancelText}
          </Button>
          <Button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`w-full sm:w-auto ${
              variant === "destructive"
                ? "bg-red-600 hover:bg-red-700 text-white"
                : variant === "seep"
                ? "bg-[#335CFF] hover:bg-[#224BE6] text-white"
                : "bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-zinc-950"
            }`}
          >
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

interface CreateProgramDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { title: string; category: string; target: string }) => void;
}

export function CreateProgramDialog({
  isOpen,
  onClose,
  onSubmit,
}: CreateProgramDialogProps) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Education");
  const [target, setTarget] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !target) return;
    onSubmit({ title, category, target });
    setTitle("");
    setTarget("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[420px] border border-zinc-100 dark:border-zinc-800">
        <DialogHeader>
          <DialogTitle className="text-zinc-950 dark:text-zinc-50">Create New Program</DialogTitle>
          <DialogDescription className="text-zinc-500 dark:text-zinc-400 mt-1">
            Setup a new development or support program.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-3">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Program Title</label>
            <input
              type="text"
              placeholder="e.g. Clean Water Initiative"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-zinc-200 dark:border-zinc-700 rounded-lg bg-transparent focus:outline-none focus:ring-1 focus:ring-[#335CFF] dark:text-zinc-50"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-zinc-200 dark:border-zinc-700 rounded-lg bg-transparent focus:outline-none focus:ring-1 focus:ring-[#335CFF] dark:text-zinc-50"
            >
              <option value="Education">Education</option>
              <option value="Health">Health</option>
              <option value="Empowerment">Empowerment</option>
              <option value="Tech">Technology & Code</option>
              <option value="Infrastructure">Infrastructure</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Target Beneficiaries</label>
            <input
              type="text"
              placeholder="e.g. 5,000 students"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-zinc-200 dark:border-zinc-700 rounded-lg bg-transparent focus:outline-none focus:ring-1 focus:ring-[#335CFF] dark:text-zinc-50"
              required
            />
          </div>

          <DialogFooter className="mt-6 gap-2">
            <Button type="button" variant="outline" onClick={onClose} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button type="submit" className="w-full sm:w-auto bg-[#335CFF] hover:bg-[#224BE6] text-white">
              Create Program
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

interface AddBlogPostDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { title: string; category: string }) => void;
}

export function AddBlogPostDialog({
  isOpen,
  onClose,
  onSubmit,
}: AddBlogPostDialogProps) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Impact Report");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    onSubmit({ title, category });
    setTitle("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[420px] border border-zinc-100 dark:border-zinc-800">
        <DialogHeader>
          <DialogTitle className="text-zinc-950 dark:text-zinc-50">Add New Blog Post</DialogTitle>
          <DialogDescription className="text-zinc-500 dark:text-zinc-400 mt-1">
            Publish or schedule a new story or update.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-3">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Blog Title</label>
            <input
              type="text"
              placeholder="e.g. Annual Community Report 2026"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-zinc-200 dark:border-zinc-700 rounded-lg bg-transparent focus:outline-none focus:ring-1 focus:ring-[#335CFF] dark:text-zinc-50"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-zinc-200 dark:border-zinc-700 rounded-lg bg-transparent focus:outline-none focus:ring-1 focus:ring-[#335CFF] dark:text-zinc-50"
            >
              <option value="Impact Report">Impact Report</option>
              <option value="Volunteer Story">Volunteer Story</option>
              <option value="Announcement">Announcement</option>
              <option value="Case Study">Case Study</option>
            </select>
          </div>

          <DialogFooter className="mt-6 gap-2">
            <Button type="button" variant="outline" onClick={onClose} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button type="submit" className="w-full sm:w-auto bg-[#335CFF] hover:bg-[#224BE6] text-white">
              Create Draft
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
