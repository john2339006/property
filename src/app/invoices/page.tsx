'use client';

import React, { useState, useEffect } from 'react';
import { InvoiceDTO } from '@/application/invoicing/InvoiceDTOs';

export default function InvoicesPage() {
    const [invoices, setInvoices] = useState<InvoiceDTO[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [period, setPeriod] = useState(new Date().toISOString().slice(0, 7)); // YYYY-MM
    const companyId = 'comp1';

    const fetchInvoices = async () => {
        setLoading(true);
        setError('');
        try {
            const res = await fetch(`/api/invoices?companyId=${companyId}&billingPeriod=${period}`);
            if (!res.ok) throw new Error('Failed to fetch invoices');
            const data = await res.json();
            setInvoices(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInvoices();
    }, [period]);

    const changeStatus = async (invoiceId: string, newStatus: string) => {
        try {
            const res = await fetch(`/api/invoices/${invoiceId}/status`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });
            if (!res.ok) {
                const errData = await res.json();
                alert(errData.error || 'Failed to update invoice status');
                return;
            }
            fetchInvoices();
        } catch (err: any) {
            alert(err.message);
        }
    };

    const getStatusBadgeColor = (status: string) => {
        switch (status) {
            case 'DRAFT': return 'bg-gray-100 text-gray-800';
            case 'ISSUED': return 'bg-blue-100 text-blue-800';
            case 'PAID': return 'bg-green-100 text-green-800';
            case 'VOIDED': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Invoice Management</h1>
            <div className="flex gap-4 mb-6 items-center">
                <input
                    type="month"
                    value={period}
                    onChange={(e) => setPeriod(e.target.value)}
                    className="border p-2 rounded"
                />
                <button
                    onClick={fetchInvoices}
                    disabled={loading}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                >
                    Refresh List
                </button>
                <a
                    href={`/api/export/invoices?companyId=${companyId}`}
                    target="_blank"
                    className="ml-auto bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 font-semibold shadow-sm"
                >
                    Export to CSV
                </a>
            </div>

            {error && <div className="text-red-500 mb-4">{error}</div>}

            {loading ? (
                <p>Loading...</p>
            ) : (
                <table className="w-full border-collapse border">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-2">Invoice ID (Short)</th>
                            <th className="border p-2">House Identifier</th>
                            <th className="border p-2">Owner Name</th>
                            <th className="border p-2">Amount</th>
                            <th className="border p-2">Status</th>
                            <th className="border p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoices.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="text-center p-4">No invoices found for this period.</td>
                            </tr>
                        ) : (
                            invoices.map((inv) => (
                                <tr key={inv.id}>
                                    <td className="border p-2" title={inv.id}>{inv.id.substring(0, 8)}...</td>
                                    <td className="border p-2">{inv.lineItems[0]?.houseIdentifier || 'N/A'}</td>
                                    <td className="border p-2">{inv.lineItems[0]?.ownerName || 'Unknown'}</td>
                                    <td className="border p-2 font-bold">${inv.totalAmount.toFixed(2)}</td>
                                    <td className="border p-2 text-center">
                                        <span className={`px-2 py-1 rounded text-sm font-semibold ${getStatusBadgeColor(inv.status)}`}>
                                            {inv.status}
                                        </span>
                                    </td>
                                    <td className="border p-2 text-center">
                                        {inv.status === 'DRAFT' && (
                                            <button onClick={() => changeStatus(inv.id, 'ISSUED')} className="text-blue-600 hover:underline mr-3">Issue</button>
                                        )}
                                        {inv.status === 'ISSUED' && (
                                            <>
                                                <button onClick={() => changeStatus(inv.id, 'PAID')} className="text-green-600 hover:underline mr-3">Mark Paid</button>
                                                <button onClick={() => {
                                                    if (confirm('Are you sure you want to void this invoice?')) {
                                                        changeStatus(inv.id, 'VOIDED');
                                                    }
                                                }} className="text-red-600 hover:underline mr-3">Void</button>
                                            </>
                                        )}
                                        {inv.status !== 'VOIDED' && (
                                            <button onClick={() => alert('PDF generation stub - would open PDF representing Invoice ' + inv.id)} className="text-gray-600 hover:underline">View PDF</button>
                                        )}
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
