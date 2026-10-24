"use client";
import { useState } from 'react';
import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { FileSpreadsheet, FileText, Calendar, Users, TrendingUp } from 'lucide-react';
import { mockMeetings, mockDashboardStats } from '@/data/mockData';
import { format, subMonths, startOfMonth, endOfMonth, eachMonthOfInterval } from 'date-fns';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState('6');
  const months = eachMonthOfInterval({ start: subMonths(new Date(), parseInt(dateRange) - 1), end: new Date() });

  const monthlyData = months.map((month) => {
    const start = startOfMonth(month);
    const end = endOfMonth(month);
    const monthMeetings = mockMeetings.filter((m) => m.date >= start && m.date <= end);
    return {
      month: format(month, 'MMM'),
      total: monthMeetings.length,
      completed: monthMeetings.filter((m) => m.status === 'completed').length,
      cancelled: monthMeetings.filter((m) => m.status === 'cancelled').length,
    };
  });

  const typeDistribution = [
    { name: 'Team Meeting', value: 35, color: 'hsl(234, 89%, 57%)' },
    { name: 'Client Meeting', value: 25, color: 'hsl(173, 58%, 39%)' },
    { name: 'Project Review', value: 20, color: 'hsl(38, 92%, 50%)' },
    { name: 'Management', value: 12, color: 'hsl(280, 65%, 60%)' },
    { name: 'Training', value: 8, color: 'hsl(340, 75%, 55%)' },
  ];

  const attendanceTrend = months.map((month) => ({ month: format(month, 'MMM'), rate: Math.floor(Math.random() * 20) + 80 }));

  const handleExport = (type: 'pdf' | 'excel') => {
    toast.success(`Report exported as ${type.toUpperCase()}`);
  };

  return (
    <div>
      <Header title="Reports & Analytics" subtitle="Meeting insights and statistics" />

      <div className="p-6 space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex gap-4">
            <Select value={dateRange} onValueChange={setDateRange}><SelectTrigger className="w-40"><SelectValue placeholder="Date range" /></SelectTrigger><SelectContent><SelectItem value="3">Last 3 months</SelectItem><SelectItem value="6">Last 6 months</SelectItem><SelectItem value="12">Last 12 months</SelectItem></SelectContent></Select>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => handleExport('excel')} className="gap-2"><FileSpreadsheet className="w-4 h-4" />Export Excel</Button>
            <Button variant="outline" onClick={() => handleExport('pdf')} className="gap-2"><FileText className="w-4 h-4" />Export PDF</Button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-card rounded-xl border border-border p-5"><div className="flex items-center gap-3 mb-2"><Calendar className="w-5 h-5 text-primary" /><span className="text-sm text-muted-foreground">Total Meetings</span></div><p className="text-3xl font-bold">{mockDashboardStats.totalMeetings}</p><p className="text-sm text-success mt-1">↑ 12% from last period</p></div>
          <div className="bg-card rounded-xl border border-border p-5"><div className="flex items-center gap-3 mb-2"><TrendingUp className="w-5 h-5 text-success" /><span className="text-sm text-muted-foreground">Completion Rate</span></div><p className="text-3xl font-bold">92%</p><p className="text-sm text-success mt-1">↑ 3% from last period</p></div>
          <div className="bg-card rounded-xl border border-border p-5"><div className="flex items-center gap-3 mb-2"><Users className="w-5 h-5 text-accent" /><span className="text-sm text-muted-foreground">Avg. Attendance</span></div><p className="text-3xl font-bold">87%</p><p className="text-sm text-muted-foreground mt-1">Across all meetings</p></div>
          <div className="bg-card rounded-xl border border-border p-5"><div className="flex items-center gap-3 mb-2"><Calendar className="w-5 h-5 text-warning" /><span className="text-sm text-muted-foreground">Cancellation Rate</span></div><p className="text-3xl font-bold">8%</p><p className="text-sm text-destructive mt-1">↑ 2% from last period</p></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-card rounded-xl border border-border p-6"><h3 className="text-lg font-semibold mb-4">Meeting Trends</h3><ResponsiveContainer width="100%" height={300}><BarChart data={monthlyData}><CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" /><XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" /><YAxis stroke="hsl(var(--muted-foreground))" /><Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} /><Bar dataKey="completed" name="Completed" fill="hsl(var(--success))" radius={[4,4,0,0]} /><Bar dataKey="cancelled" name="Cancelled" fill="hsl(var(--destructive))" radius={[4,4,0,0]} /></BarChart></ResponsiveContainer></div>

          <div className="bg-card rounded-xl border border-border p-6"><h3 className="text-lg font-semibold mb-4">Meeting Type Distribution</h3><ResponsiveContainer width="100%" height={300}><PieChart><Pie data={typeDistribution as any} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={2} dataKey="value">{typeDistribution.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}</Pie><Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} /></PieChart></ResponsiveContainer><div className="flex flex-wrap gap-4 justify-center mt-4">{typeDistribution.map((item) => (<div key={item.name} className="flex items-center gap-2"><div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} /><span className="text-sm text-muted-foreground">{item.name}</span></div>))}</div></div>

          <div className="bg-card rounded-xl border border-border p-6 lg:col-span-2"><h3 className="text-lg font-semibold mb-4">Attendance Rate Trend</h3><ResponsiveContainer width="100%" height={300}><LineChart data={attendanceTrend}><CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" /><XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" /><YAxis stroke="hsl(var(--muted-foreground))" domain={[0,100]} /><Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} formatter={(value) => [`${value}%`, 'Attendance Rate']} /><Line type="monotone" dataKey="rate" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: 'hsl(var(--primary))' }} /></LineChart></ResponsiveContainer></div>
        </div>
      </div>
    </div>
  );
}
