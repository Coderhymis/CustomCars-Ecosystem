// app/finance/page.tsx
"use client";

import { useState } from "react";
import { Wallet, Info, FileSpreadsheet, ShieldAlert } from "lucide-react";

export default function FinancePage() {
  const [loanAmount, setLoanAmount] = useState(150000);
  const [interestRate, setInterestRate] = useState(10.5);
  const [tenure, setTenure] = useState(24);

  const calculateEMI = () => {
    const p = loanAmount;
    const r = (interestRate / 12) / 100;
    const n = tenure;

    // EMI Formula: [P x R x (1+R)^n]/[((1+R)^n)-1]
    const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const roundedEmi = Math.round(emi);
    const totalPayable = Math.round(roundedEmi * n);
    const totalInterest = Math.round(totalPayable - p);

    return { emi: roundedEmi, interest: totalInterest, total: totalPayable };
  };

  const results = calculateEMI();

  return (
    <div className="flex flex-col gap-6 pb-16">
      <div className="flex flex-col">
        <h2 className="text-xl md:text-2xl font-extrabold text-white">Modification Financing & BNPL</h2>
        <p className="text-text-secondary text-xs mt-0.5">Simulate EMI co-payments with partner banks. Qualify for 3 to 24 month zero-cost EMI plans.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1.8fr] gap-8 items-start">
        {/* Sliders Card */}
        <div className="glass-panel p-5 rounded-md space-y-5">
          <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-1.5"><Wallet className="w-4 h-4 text-accent-blue" /> Configure Loan</h3>

          <div className="space-y-4 text-xs">
            <div className="space-y-2">
              <div className="flex justify-between font-semibold text-text-secondary">
                <span>LOAN AMOUNT</span>
                <strong className="text-white text-sm">₹{loanAmount.toLocaleString("en-IN")}</strong>
              </div>
              <input 
                type="range" 
                min="20000" 
                max="500000" 
                step="5000" 
                value={loanAmount} 
                onChange={(e) => setLoanAmount(parseInt(e.target.value))}
                className="w-full accent-accent-blue bg-white/10 h-1 rounded-full outline-none"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between font-semibold text-text-secondary">
                <span>INTEREST RATE (P.A)</span>
                <strong className="text-white text-sm">{interestRate}%</strong>
              </div>
              <input 
                type="range" 
                min="8" 
                max="18" 
                step="0.5" 
                value={interestRate} 
                onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                className="w-full accent-accent-blue bg-white/10 h-1 rounded-full outline-none"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between font-semibold text-text-secondary">
                <span>TENURE PERIOD</span>
                <strong className="text-white text-sm">{tenure} Months</strong>
              </div>
              <input 
                type="range" 
                min="3" 
                max="36" 
                step="3" 
                value={tenure} 
                onChange={(e) => setTenure(parseInt(e.target.value))}
                className="w-full accent-accent-blue bg-white/10 h-1 rounded-full outline-none"
              />
            </div>
          </div>
        </div>

        {/* Calc Outputs */}
        <div className="glass-panel p-6 rounded-md text-center flex flex-col items-center justify-center">
          <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-2">Monthly EMI Instalment</span>
          <span className="text-3xl md:text-5xl font-extrabold text-accent-blue leading-none mb-1">
            ₹{results.emi.toLocaleString("en-IN")}
          </span>
          <span className="text-[10px] text-text-secondary mt-1">Direct Bank Auto-Debit Setup</span>

          <div className="w-full mt-6 border-t border-white/5 pt-5 space-y-3 text-xs text-text-secondary text-left">
            <div className="flex justify-between">
              <span>Principal Borrowed:</span>
              <strong className="text-white">₹{loanAmount.toLocaleString("en-IN")}</strong>
            </div>
            <div className="flex justify-between">
              <span>Total Interest Accrued:</span>
              <strong className="text-white">₹{results.interest.toLocaleString("en-IN")}</strong>
            </div>
            <div className="flex justify-between border-t border-white/5 pt-3 text-sm">
              <span className="font-bold text-white">Total Payback Billing:</span>
              <strong className="text-accent-blue">₹{results.total.toLocaleString("en-IN")}</strong>
            </div>
          </div>

          <button 
            onClick={() => alert("Redirecting to KYC partner bank portal for instant checks...")}
            className="w-full bg-accent-blue hover:bg-accent-blue-hover text-white text-xs font-bold py-3.5 rounded-sm flex items-center justify-center gap-2 mt-6 shadow-lg shadow-accent-blue/15"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Apply For Instant Financing</span>
          </button>
        </div>
      </div>
    </div>
  );
}
