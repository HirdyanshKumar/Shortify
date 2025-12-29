"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area, CartesianGrid, PieChart, Pie, Cell, Legend } from "recharts";
import { ArrowLeft } from "lucide-react";

const COLORS = ["#00f3ff", "#bc13fe", "#00ff9d", "#ff0055", "#ffff00"];

const dummyData = [
    { date: 'Mon', count: 0 },
    { date: 'Tue', count: 0 },
    { date: 'Wed', count: 0 },
    { date: 'Thu', count: 0 },
    { date: 'Fri', count: 0 },
    { date: 'Sat', count: 0 },
    { date: 'Sun', count: 0 },
];

export default function AnalyticsPage() {
    const { id } = useParams();
    const router = useRouter();
    const [data, setData] = useState<any>(null);
    const [chartData, setChartData] = useState<any[]>([]);
    const [breakdowns, setBreakdowns] = useState<any>({ byDevice: [], byBrowser: [], byCountry: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) fetchData();
    }, [id]);

    const fetchData = async () => {
        if (!id) return;
        try {
            const urlId = Array.isArray(id) ? id[0] : id;
            if (!urlId) return;

            const [summaryRes, chartRes, breakdownRes] = await Promise.all([
                api.analytics.getSummary(urlId),
                api.analytics.getChart(urlId),
                api.analytics.getBreakdown(urlId)
            ]);

            if (summaryRes.success) setData(summaryRes.data);
            if (chartRes.success) setChartData(chartRes.data);
            if (breakdownRes.success) setBreakdowns(breakdownRes.data);

        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="min-h-screen bg-bg-dark flex items-center justify-center text-neon-blue">ANALYZING DATA...</div>;

    // Use dummy data if chartData is empty for visualization proof
    const displayChartData = chartData.length > 0 ? chartData : dummyData;

    return (
        <div className="min-h-screen bg-bg-dark text-white p-6">
            <div className="max-w-6xl mx-auto space-y-8">
                <button onClick={() => router.back()} className="flex items-center text-gray-400 hover:text-white transition">
                    <ArrowLeft size={20} className="mr-2" /> Back to Dashboard
                </button>

                <header>
                    <h1 className="text-3xl font-bold text-neon-purple neon-text">ANALYTICS PROTOCOL</h1>
                    <p className="text-gray-400">Target ID: {data?.customAlias || id}</p>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="glass-panel p-6 rounded-xl border border-white/5">
                        <h3 className="text-sm text-gray-500 uppercase tracking-widest">Total Engagements</h3>
                        <p className="text-4xl font-bold text-neon-blue mt-2">{data?.totalClicks || 0}</p>
                    </div>
                    <div className="glass-panel p-6 rounded-xl border border-white/5">
                        <h3 className="text-sm text-gray-500 uppercase tracking-widest">Unique Devices</h3>
                        <p className="text-4xl font-bold text-neon-teal mt-2">{data?.uniqueUsers || 0}</p>
                    </div>
                    <div className="glass-panel p-6 rounded-xl border border-white/5">
                        <h3 className="text-sm text-gray-500 uppercase tracking-widest">Active Regions</h3>
                        <p className="text-4xl font-bold text-white mt-2">{breakdowns.byCountry.length}</p>
                    </div>
                </div>

                {/* Main Traffic Chart */}
                <div className="glass-panel p-6 rounded-xl border border-white/5 h-[400px]">
                    <h3 className="text-lg font-bold mb-6 text-gray-300">Traffic Activity</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={displayChartData}>
                            <defs>
                                <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#00f3ff" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#00f3ff" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                            <XAxis dataKey="date" stroke="#666" />
                            <YAxis stroke="#666" />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#0a0a0a', borderColor: '#333', color: '#fff' }}
                                itemStyle={{ color: '#00f3ff' }}
                                cursor={{ stroke: '#00f3ff', strokeWidth: 1 }}
                            />
                            <Area type="monotone" dataKey="count" stroke="#00f3ff" fillOpacity={1} fill="url(#colorClicks)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* Breakdowns Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Device Chart */}
                    <div className="glass-panel p-6 rounded-xl border border-white/5 h-[400px]">
                        <h3 className="text-lg font-bold mb-4 text-gray-300">Device Distribution</h3>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={breakdowns.byDevice.length ? breakdowns.byDevice : [{ name: 'No Data', value: 1 }]}
                                    cx="50%"
                                    cy="45%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {(breakdowns.byDevice.length ? breakdowns.byDevice : [{ name: 'No Data', value: 1 }]).map((entry: any, index: number) => (
                                        <Cell key={`cell-${index}`} fill={breakdowns.byDevice.length ? COLORS[index % COLORS.length] : '#333'} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ backgroundColor: '#000', borderColor: '#333', color: '#fff' }} itemStyle={{ color: '#fff' }} />
                                <Legend verticalAlign="bottom" height={36} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Browser Chart */}
                    <div className="glass-panel p-6 rounded-xl border border-white/5 h-[400px]">
                        <h3 className="text-lg font-bold mb-4 text-gray-300">Browser Distribution</h3>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={breakdowns.byBrowser.length ? breakdowns.byBrowser : [{ name: 'No Data', value: 1 }]}
                                    cx="50%"
                                    cy="45%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {(breakdowns.byBrowser.length ? breakdowns.byBrowser : [{ name: 'No Data', value: 1 }]).map((entry: any, index: number) => (
                                        <Cell key={`cell-${index}`} fill={breakdowns.byBrowser.length ? COLORS[index % COLORS.length] : '#333'} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ backgroundColor: '#000', borderColor: '#333', color: '#fff' }} itemStyle={{ color: '#fff' }} />
                                <Legend verticalAlign="bottom" height={36} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Region Distribution Chart */}
                <div className="glass-panel p-6 rounded-xl border border-white/5 h-[400px]">
                    <h3 className="text-lg font-bold mb-6 text-gray-300">Region Distribution</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={breakdowns.byCountry.length ? breakdowns.byCountry : [{ name: 'Unknown', value: 0 }]}
                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorRegion" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#bc13fe" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#bc13fe" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="name" stroke="#666" />
                            <YAxis stroke="#666" />
                            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                            <Tooltip contentStyle={{ backgroundColor: '#000', borderColor: '#333', color: '#fff' }} itemStyle={{ color: '#fff' }} />
                            <Area type="monotone" dataKey="value" stroke="#bc13fe" fillOpacity={1} fill="url(#colorRegion)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
