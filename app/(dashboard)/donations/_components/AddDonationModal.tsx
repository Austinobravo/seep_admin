"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";

// Define TypeScript structures for the validation schemas
export interface DonationFormValues {
  donorName: string;
  donorEmail: string;
  currency: string;
  amount: string;
  paymentMethod: string;
  donationDate: string;
  status: "Completed" | "Pending";
  referenceNote?: string;
  isAnonymous: boolean;
}

interface AddDonationModalProps {
  initialData?: Partial<DonationFormValues>;
  onSave?: (data: DonationFormValues) => void;
}

export default function AddDonationModal({ initialData, onSave }: AddDonationModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset
  } = useForm<DonationFormValues>({
    defaultValues: {
      donorName: initialData?.donorName || "",
      donorEmail: initialData?.donorEmail || "",
      currency: initialData?.currency || "NGN (₦)",
      amount: initialData?.amount || "",
      paymentMethod: initialData?.paymentMethod || "Bank Transfer",
      donationDate: initialData?.donationDate || "",
      status: initialData?.status || "Pending",
      referenceNote: initialData?.referenceNote || "",
      isAnonymous: initialData?.isAnonymous || false,
    },
  });

  const watchedValues = watch();

  const onSubmit = (data: DonationFormValues) => {
    if (onSave) {
      onSave(data);
    }
    setIsOpen(false);
    if (!initialData) reset(); // Reset form if adding a brand new donation
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#3B82F6] hover:bg-blue-600 text-white font-semibold text-xs h-10 rounded-xl px-4 flex items-center gap-2 shadow-sm">
          <Plus className="w-4 h-4" /> Add Donation
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-2xl p-0 bg-transparent border-none overflow-hidden sm:rounded-2xl">
        <div className="w-full bg-white rounded-2xl shadow-xl overflow-hidden relative border border-gray-100">
          
          {/* Header */}
          <div className="p-6 pb-2 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">
              {initialData ? "Edit Donation" : "Add Donation"}
            </h2>
            <button 
              type="button" 
              onClick={() => setIsOpen(false)} 
              className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-50"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
            
            {/* Grid for Donor Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-600 tracking-wide block">
                  Donor Name<span className="text-red-500">*</span>
                </label>
                <Input
                  {...register("donorName", { required: true })}
                  placeholder="Enter full name"
                  className="rounded-xl border-gray-200 h-11 text-xs focus-visible:ring-blue-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-600 tracking-wide block">
                  Donor Email<span className="text-red-500">*</span>
                </label>
                <Input
                  {...register("donorEmail", { required: true, pattern: /^\S+@\S+$/i })}
                  type="email"
                  placeholder="e.g., Lead Educational Advisor"
                  className="rounded-xl border-gray-200 h-11 text-xs focus-visible:ring-blue-500"
                />
              </div>
            </div>

            {/* Grid for Financial/Payment parameters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-600 tracking-wide block">
                  Amount<span className="text-red-500">*</span>
                </label>
                <div className="relative flex items-center">
                  <Select 
                    value={watchedValues.currency} 
                    onValueChange={(val) => setValue("currency", val)}
                  >
                    <SelectTrigger className="absolute left-0 w-[90px] h-11 rounded-l-xl rounded-r-none border-r border-gray-200 text-xs font-medium bg-gray-50/50 shadow-none focus:ring-0">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl text-xs">
                      <SelectItem value="NGN (₦)">NGN (₦)</SelectItem>
                      <SelectItem value="USD ($)">USD ($)</SelectItem>
                      <SelectItem value="GBP (£)">GBP (£)</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    {...register("amount", { required: true })}
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    className="pl-[104px] rounded-xl border-gray-200 h-11 text-xs focus-visible:ring-blue-500 w-full"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-600 tracking-wide block">Payment Method</label>
                <Select 
                  value={watchedValues.paymentMethod} 
                  onValueChange={(val) => setValue("paymentMethod", val)}
                >
                  <SelectTrigger className="rounded-xl border-gray-200 h-11 text-xs font-medium bg-white text-gray-700 focus:ring-blue-500">
                    <SelectValue placeholder="Bank Transfer" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="Bank Transfer" className="text-xs py-2">Bank Transfer</SelectItem>
                    <SelectItem value="Card Payment" className="text-xs py-2">Card Payment</SelectItem>
                    <SelectItem value="Cash" className="text-xs py-2">Cash</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Grid for Date & Lifecycle Status flags */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-600 tracking-wide block">
                  Donation Date<span className="text-red-500">*</span>
                </label>
                <Input
                  {...register("donationDate", { required: true })}
                  type="date"
                  className="rounded-xl border-gray-200 h-11 text-xs focus-visible:ring-blue-500 text-gray-700"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-600 tracking-wide block">
                  Status<span className="text-red-500">*</span>
                </label>
                <Select 
                  value={watchedValues.status} 
                  onValueChange={(val) => setValue("status", val as "Completed" | "Pending")}
                >
                  <SelectTrigger className="rounded-xl border-gray-200 h-11 text-xs font-medium bg-white text-gray-700 focus:ring-blue-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="Pending" className="text-xs py-2">Pending</SelectItem>
                    <SelectItem value="Completed" className="text-xs py-2">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Textarea Area */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-600 tracking-wide block">Reference / Note</label>
              <Textarea
                {...register("referenceNote")}
                placeholder="Enter transaction reference or notes (Optional)"
                className="rounded-xl border-gray-200 min-h-[90px] text-xs focus-visible:ring-blue-500 resize-none"
              />
            </div>

            {/* Checkbox Anonymous Flag Row */}
            <div className="flex items-center gap-2.5 pt-1">
              <Checkbox
                id="isAnonymous"
                checked={watchedValues.isAnonymous}
                onCheckedChange={(checked) => setValue("isAnonymous", checked === true)}
                className="rounded border-gray-300 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
              />
              <label 
                htmlFor="isAnonymous" 
                className="text-xs font-medium text-gray-500 cursor-pointer select-none"
              >
                Anonymous Publicly <span className="text-gray-400">(donor name hidden in public views)</span>
              </label>
            </div>

            {/* Buttons row controls */}
            <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-gray-100">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsOpen(false)} 
                className="w-full sm:w-auto rounded-xl border-gray-200 text-xs font-bold text-gray-600 px-6 h-11 hover:bg-gray-50"
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                disabled={Object.keys(errors).length > 0}
                className="w-full sm:w-auto bg-[#3B82F6] hover:bg-blue-600 text-white text-xs font-bold px-10 h-11 rounded-xl shadow-md transition-all active:scale-[0.98]"
              >
                Save
              </Button>
            </div>

          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}