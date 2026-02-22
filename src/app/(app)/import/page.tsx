'use client';

import React, { useState } from 'react';
import { ImportResult } from '@/domain/import-export';

export default function ImportPage() {
    const [file, setFile] = useState<File | null>(null);
    const [importing, setImporting] = useState(false);
    const [result, setResult] = useState<ImportResult | null>(null);
    const [error, setError] = useState('');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
            setResult(null);
            setError('');
        }
    };

    const handleImport = async () => {
        if (!file) return;

        setImporting(true);
        setError('');
        setResult(null);

        const formData = new FormData();
        formData.append('file', file);
        formData.append('companyId', 'comp1'); // MVP fallback

        try {
            const response = await fetch('/api/import/houses', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Import failed');
            }

            const data: ImportResult = await response.json();
            setResult(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setImporting(false);
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Data Import</h1>
                <p className="text-gray-600 mt-2">Bulk upload property data using CSV files.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
                <h2 className="text-xl font-semibold mb-4">Import Houses</h2>
                <div className="mb-4 text-sm text-gray-500 bg-gray-50 p-3 rounded">
                    <strong>Expected CSV Format:</strong> building, unit, area <br />
                    <em>(First row must contain these headers exactly)</em>
                </div>

                <div className="flex items-center gap-4">
                    <input
                        type="file"
                        accept=".csv"
                        onChange={handleFileChange}
                        className="block w-full text-sm text-slate-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-md file:border-0
                            file:text-sm file:font-semibold
                            file:bg-indigo-50 file:text-indigo-700
                            hover:file:bg-indigo-100"
                    />
                    <button
                        onClick={handleImport}
                        disabled={!file || importing}
                        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
                    >
                        {importing ? 'Importing...' : 'Upload CSV'}
                    </button>
                </div>

                {error && <div className="mt-4 p-3 bg-red-50 text-red-600 rounded">{error}</div>}

                {result && (
                    <div className="mt-6 border-t pt-4">
                        <h3 className="text-lg font-medium mb-2">Import Results</h3>
                        <div className="flex gap-4 mb-4">
                            <div className="p-3 bg-green-50 text-green-700 rounded w-48 text-center border border-green-100">
                                <p className="text-2xl font-bold">{result.successCount}</p>
                                <p className="text-sm">Successfully Imported</p>
                            </div>
                            <div className="p-3 bg-red-50 text-red-700 rounded w-48 text-center border border-red-100">
                                <p className="text-2xl font-bold">{result.failureCount}</p>
                                <p className="text-sm">Failed Rows</p>
                            </div>
                        </div>

                        {result.errors && result.errors.length > 0 && (
                            <div className="mt-4">
                                <h4 className="font-medium text-gray-700 mb-2">Error Details</h4>
                                <ul className="space-y-1 max-h-64 overflow-y-auto">
                                    {result.errors.map((err, idx) => (
                                        <li key={idx} className="text-sm text-red-600 bg-red-50 p-2 rounded">
                                            <strong>Row {err.row}:</strong> {err.error}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
