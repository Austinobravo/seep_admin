"use client";

import React from "react";
import { DollarSign, ArrowUpRight, Search, Download, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import AddDonationModal from "./_components/AddDonationModal"


export default function DonationsPage() {
  const donations = [
    { donor: "Alesha Rogers", email: "alesha@gmail.com", amount: "$5,000.00", method: "Stripe", date: "May 30, 2026", status: "Success" },
    { donor: "John Smith", email: "jsmith@outlook.com", amount: "$2,500.00", method: "Credit Card", date: "May 29, 2026", status: "Failed" },
    { donor: "Anonymous Donor", email: "N/A", amount: "₦50,000.00", method: "Paystack", date: "May 29, 2026", status: "Success" },
    { donor: "Tokunbo Michael", email: "tokunbo@seesupport.org", amount: "£200.00", method: "Direct Bank", date: "May 25, 2026", status: "Success" },
    { donor: "Clara Benson", email: "clara.b@gmail.com", amount: "$150.00", method: "Paypal", date: "May 22, 2026", status: "Success" },
  ];

  return (
    <div className="p-6 lg:p-8 space-y-6 overflow-y-auto h-full bg-[#FAFBFC] dark:bg-zinc-950">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Donations Registry</h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            Track financial contributions, payment failures, and transaction methods.
          </p>
        </div>
        <div className="flex gap-2 items-center">
          <AddDonationModal />
          <Button variant="outline" className="border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold text-xs py-2 px-4 rounded-xl hover:bg-zinc-50 transition-all w-fit cursor-pointer">
            <Download className="w-4 h-4 mr-1.5" />
            Export Ledger
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 bg-white dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800 flex items-center justify-between shadow-xs">
          <div>
            <p className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wider">Total Received (USD)</p>
            <h4 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 mt-1">$328,000.00</h4>
          </div>
          <span className="p-2.5 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 rounded-full">
            <DollarSign className="w-5 h-5" />
          </span>
        </Card>
        <Card className="p-4 bg-white dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800 flex items-center justify-between shadow-xs">
          <div>
            <p className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wider">Transactions today</p>
            <h4 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 mt-1">3 Completed</h4>
          </div>
          <span className="p-2.5 bg-[#335CFF]/10 text-[#335CFF] rounded-full">
            <ArrowUpRight className="w-5 h-5" />
          </span>
        </Card>
        <Card className="p-4 bg-white dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800 flex items-center justify-between shadow-xs">
          <div>
            <p className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wider">Failed Attempts</p>
            <h4 className="text-lg font-bold text-red-600 dark:text-red-400 mt-1">1 Awaiting resolution</h4>
          </div>
          <span className="p-2.5 bg-red-50 dark:bg-red-950/20 text-red-600 rounded-full">
            <DollarSign className="w-5 h-5" />
          </span>
        </Card>
      </div>

      {/* Ledger Table */}
      <Card className="border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center">
          <h3 className="text-sm font-bold">Ledger Transactions</h3>
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Search donor or email..."
              className="w-full pl-8 pr-4 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-transparent text-xs focus:outline-none focus:ring-1 focus:ring-[#335CFF]"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-zinc-50 dark:bg-zinc-800/40 text-zinc-400 font-bold border-b border-zinc-100 dark:border-zinc-800">
                <th className="p-4">Donor</th>
                <th className="p-4">Email</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Method</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50 dark:divide-zinc-800/40">
              {donations.map((d, index) => (
                <tr key={index} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/20">
                  <td className="p-4 font-bold text-zinc-900 dark:text-zinc-100">{d.donor}</td>
                  <td className="p-4 font-medium text-zinc-500">{d.email}</td>
                  <td className="p-4 font-bold text-zinc-900 dark:text-zinc-100">{d.amount}</td>
                  <td className="p-4 font-medium text-zinc-500">{d.method}</td>
                  <td className="p-4 font-semibold text-zinc-400">{d.date}</td>
                  <td className="p-4">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      d.status === "Success"
                        ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400"
                        : "bg-red-50 text-red-600 dark:bg-red-950/20 dark:text-red-400"
                    }`}>
                      {d.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
