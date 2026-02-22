'use client';

import React, { useState, useEffect } from 'react';

// DTO from backend
interface BillDTO {
    id: string;
    houseId: string;
    billingPeriod: string;
    calculatedAmount: number;
    discountApplied: number;
    overriddenAmount: number | null;
    finalAmount: number;
    isOverridden: boolean;
}

export default function BillsPage() {
    const [bills, setBills] = useState<BillDTO[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [period, setPeriod] = useState(new Date().toISOString().slice(0, 7)); // YYYY-MM
    const companyId = 'comp1'; // Placeholder for currently logged in company

    const fetchBills = async () => {
        setLoading(true);
        setError('');
        try {
            const res = await fetch(`/api/bills?companyId=${companyId}&billingPeriod=${period}`);
            if (!res.ok) throw new Error('Failed to fetch bills');
            const data = await res.json();
            setBills(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBills();
    }, [period]);

    const generateBills = async () => {
        setLoading(true);
        setError('');
        try {
            const res = await fetch('/api/bills', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    companyId,
                    billingPeriod: period,
                    createdBy: 'admin_user', // Placeholder
                }),
            });
            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.error || 'Failed to generate bills');
            }
            alert('Bills generated successfully!');
            fetchBills(); // Refresh list
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const overrideBill = async (billId: string, newAmount: number, reason: string) => {
        try {
            const res = await fetch(`/api/bills/${billId}/override`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    newAmount,
                    reason,
                    createdBy: 'admin_user',
                }),
            });
            if (!res.ok) {
                const errData = await res.json();
                alert(errData.error || 'Failed to override bill');
                return;
            }
            fetchBills(); // Refresh
        } catch (err: any) {
            alert(err.message);
        }
    };

    const generateInvoice = async (billId: string) => {
        try {
            const res = await fetch(`/api/invoices`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ billId }),
            });
            if (!res.ok) {
                const errData = await res.json();
                alert(errData.error || 'Failed to generate invoice');
                return;
            }
            alert('Invoice generated successfully!');
            fetchBills();
        } catch (err: any) {
            alert(err.message);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Bill Management</h1>
            <div className="flex gap-4 mb-6 items-center">
                <input
                    type="month"
                    value={period}
                    onChange={(e) => setPeriod(e.target.value)}
                    className="border p-2 rounded"
                />
                <button
                    onClick={generateBills}
                    disabled={loading}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                >
                    Generate Bills for Period
                </button>
            </div>

            {error && <div className="text-red-500 mb-4">{error}</div>}

            {loading ? (
                <p>Loading...</p>
            ) : (
                <table className="w-full border-collapse border">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-2">House ID</th>
                            <th className="border p-2">Calculated</th>
                            <th className="border p-2">Discount</th>
                            <th className="border p-2">Final Amount</th>
                            <th className="border p-2">Status</th>
                            <th className="border p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bills.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="text-center p-4">No bills found for this period.</td>
                            </tr>
                        ) : (
                            bills.map((bill) => (
                                <tr key={bill.id}>
                                    <td className="border p-2">{bill.houseId}</td>
                                    <td className="border p-2">${bill.calculatedAmount.toFixed(2)}</td>
                                    <td className="border p-2">${bill.discountApplied.toFixed(2)}</td>
                                    <td className="border p-2 font-bold">${bill.finalAmount.toFixed(2)}</td>
                                    <td className="border p-2">
                                        {bill.isOverridden ? (
                                            <span className="text-orange-600 font-semibold text-sm bg-orange-100 px-2 py-1 rounded">OVERRIDDEN</span>
                                        ) : (
                                            <span className="text-green-600 font-semibold text-sm bg-green-100 px-2 py-1 rounded">PENDING</span>
                                        )}
                                    </td>
                                    <td className="border p-2 text-center">
                                        <button
                                            onClick={() => {
                                                const amt = prompt('Enter new amount:', bill.finalAmount.toString());
                                                if (amt === null) return;
                                                const amount = parseFloat(amt);
                                                if (isNaN(amount)) return alert('Invalid amount');
                                                const reason = prompt('Reason for override:');
                                                if (!reason) return alert('Reason is required');
                                                overrideBill(bill.id, amount, reason);
                                            }}
                                            className="text-blue-600 hover:underline mr-4"
                                        >
                                            Override
                                        </button>
                                        <button
                                            onClick={() => generateInvoice(bill.id)}
                                            className="text-green-600 hover:underline font-semibold"
                                        >
                                            Generate Invoice
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
}
