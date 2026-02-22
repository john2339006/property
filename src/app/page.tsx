'use client';

import React, { useState, useEffect } from 'react';
import { DashboardMetricsDTO } from '@/application/reporting/ReportingDTOs';
import { AuditLogDTO } from '@/application/audit/AuditLogDTOs';

export default function DashboardPage() {
  const [metrics, setMetrics] = useState<DashboardMetricsDTO | null>(null);
  const [logs, setLogs] = useState<AuditLogDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchData = async () => {
    setLoading(true);
    setError('');
    try {
      const [metricsRes, logsRes] = await Promise.all([
        fetch('/api/reports/dashboard'),
        fetch('/api/audit-logs?limit=10')
      ]);

      if (!metricsRes.ok) throw new Error('Failed to load metrics');
      if (!logsRes.ok) throw new Error('Failed to load audit logs');

      const metricsData = await metricsRes.json();
      const logsData = await logsRes.json();

      setMetrics(metricsData);
      setLogs(logsData);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <div className="p-6">Loading dashboard data...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;
  if (!metrics) return null;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Platform Overview</h1>
      <p className="text-gray-600">High-level insights into your property management portfolio.</p>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Total Expected Revenue" amount={`$${metrics.financials.totalExpectedRevenue.toFixed(2)}`} color="blue" />
        <MetricCard title="Total Collected" amount={`$${metrics.financials.totalCollectedRevenue.toFixed(2)}`} color="green" />
        <MetricCard title="Outstanding Balance" amount={`$${metrics.financials.outstandingBalance.toFixed(2)}`} color="yellow" />

        <div className="bg-white p-4 rounded-lg shadow border border-gray-100 flex flex-col justify-center">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Portfolio Status</h3>
          <div className="flex justify-between items-end">
            <div>
              <span className="text-2xl font-bold text-gray-800">{metrics.totalActiveHouses}</span>
              <span className="text-sm text-gray-500 ml-1">Active</span>
            </div>
            <div>
              <span className="text-xl font-semibold text-gray-600">{metrics.totalPropertiesNotSold}</span>
              <span className="text-sm text-gray-500 ml-1">Vacant</span>
            </div>
          </div>
        </div>
      </div>

      {/* Audit Logs Table */}
      <div className="bg-white rounded-lg shadow border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-800">Recent Activity</h2>
        </div>
        <div className="p-0">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b bg-gray-50 text-xs uppercase text-gray-500">
                <th className="p-3 font-medium">Time</th>
                <th className="p-3 font-medium">User ID</th>
                <th className="p-3 font-medium">Action</th>
                <th className="p-3 font-medium">Entity</th>
                <th className="p-3 font-medium">Details</th>
              </tr>
            </thead>
            <tbody>
              {logs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-4 text-center text-gray-500">No recent activity detected.</td>
                </tr>
              ) : (
                logs.map(log => (
                  <tr key={log.id} className="border-b last:border-0 hover:bg-gray-50">
                    <td className="p-3 text-sm text-gray-600">{new Date(log.createdAt).toLocaleString()}</td>
                    <td className="p-3 text-sm font-medium" title={log.userId}>{log.userId.substring(0, 8)}...</td>
                    <td className="p-3">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800">
                        {log.action}
                      </span>
                    </td>
                    <td className="p-3 text-sm text-gray-600">{log.entityType} ({log.entityId.substring(0, 6)})</td>
                    <td className="p-3 text-sm text-gray-500 truncate max-w-xs" title={log.details}>{log.details}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, amount, color }: { title: string, amount: string, color: 'blue' | 'green' | 'yellow' }) {
  const colorClasses = {
    blue: 'text-blue-600 bg-blue-50 border-blue-100',
    green: 'text-green-600 bg-green-50 border-green-100',
    yellow: 'text-yellow-600 bg-yellow-50 border-yellow-100',
  };

  return (
    <div className={`p-4 rounded-lg shadow border ${colorClasses[color]} flex flex-col justify-center`}>
      <h3 className="text-sm font-medium opacity-80 mb-1">{title}</h3>
      <p className="text-3xl font-bold">{amount}</p>
    </div>
  );
}
