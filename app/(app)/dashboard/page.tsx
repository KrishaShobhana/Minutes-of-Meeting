"use client";
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import { StatCard } from '@/components/ui/stat-card';
import { StatusBadge } from '@/components/ui/status-badge';
import { Calendar, Users, CheckCircle, ClipboardList, Clock } from 'lucide-react';
import { mockMeetings, mockActionItems, mockDashboardStats } from '@/data/mockData';
import { format } from 'date-fns';

export default function DashboardPage() {
  const router = useRouter();
  const upcomingMeetings = mockMeetings
    .filter((m) => m.status === 'upcoming')
    .slice(0, 5);
  const recentMeetings = mockMeetings
    .filter((m) => m.status === 'completed')
    .slice(0, 3);
  const pendingActions = mockActionItems
    .filter((a) => a.status !== 'completed')
    .slice(0, 4);

  return (
    <div>
      <Header title="Dashboard" subtitle="Overview of your meetings and activities" showCreateButton />

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Total Meetings" value={mockDashboardStats.totalMeetings} icon={Calendar} variant="primary" trend={{ value: 12, isPositive: true }} />
          <StatCard title="Upcoming" value={mockDashboardStats.upcomingMeetings} icon={Clock} variant="accent" />
          <StatCard title="Completed" value={mockDashboardStats.completedMeetings} icon={CheckCircle} variant="success" />
          <StatCard title="Pending Actions" value={mockDashboardStats.pendingActionItems} icon={ClipboardList} variant="warning" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-card rounded-xl border border-border p-6 animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Upcoming Meetings</h2>
              <button onClick={() => router.push('/meetings')} className="text-sm text-primary hover:underline">View all</button>
            </div>
            <div className="space-y-3">
              {upcomingMeetings.map((meeting) => (
                <div key={meeting.id} onClick={() => router.push(`/meetings/${meeting.id}`)} className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted cursor-pointer transition-colors">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{meeting.description}</p>
                    <p className="text-sm text-muted-foreground">{format(meeting.date, 'MMM d, yyyy • h:mm a')} • {meeting.venueName}</p>
                  </div>
                  <StatusBadge status={meeting.status} />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-xl border border-border p-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Pending Actions</h2>
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-warning/10 text-warning">{pendingActions.length} pending</span>
            </div>
            <div className="space-y-3">
              {pendingActions.map((action) => (
                <div key={action.id} className="p-3 rounded-lg border border-border">
                  <p className="text-sm font-medium line-clamp-2">{action.description}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-muted-foreground">{action.assigneeName}</span>
                    <StatusBadge status={action.status} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border p-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Recent Meeting Minutes</h2>
            <button onClick={() => router.push('/meetings')} className="text-sm text-primary hover:underline">View all</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recentMeetings.map((meeting) => (
              <div key={meeting.id} onClick={() => router.push(`/meetings/${meeting.id}`)} className="p-4 rounded-lg border border-border hover:border-primary/50 cursor-pointer transition-all group">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-secondary">{meeting.typeName}</span>
                </div>
                <p className="font-medium group-hover:text-primary transition-colors">{meeting.description}</p>
                <p className="text-sm text-muted-foreground mt-1">{format(meeting.date, 'MMM d, yyyy')} • {meeting.convenerName}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
