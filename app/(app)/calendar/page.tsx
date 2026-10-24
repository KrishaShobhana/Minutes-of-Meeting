"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { mockMeetings } from '@/data/mockData';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';
import { cn } from '@/lib/utils';

export default function CalendarPage() {
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

  const days: Date[] = [];
  let day = calendarStart;
  while (day <= calendarEnd) {
    days.push(day);
    day = addDays(day, 1);
  }

  const getMeetingsForDay = (date: Date) => mockMeetings.filter((meeting) => isSameDay(meeting.date, date));

  const statusColors: Record<string, string> = {
    upcoming: 'bg-primary text-primary-foreground',
    completed: 'bg-success text-success-foreground',
    cancelled: 'bg-destructive/50 text-destructive-foreground line-through',
  };

  return (
    <div>
      <Header title="Calendar" subtitle="View meetings in calendar format" />
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={() => setCurrentDate(subMonths(currentDate, 1))}><ChevronLeft className="w-4 h-4" /></Button>
            <h2 className="text-xl font-semibold min-w-[200px] text-center">{format(currentDate, 'MMMM yyyy')}</h2>
            <Button variant="outline" size="icon" onClick={() => setCurrentDate(addMonths(currentDate, 1))}><ChevronRight className="w-4 h-4" /></Button>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setCurrentDate(new Date())}>Today</Button>
            <Button onClick={() => router.push('/meetings/new')} className="gap-2"><Plus className="w-4 h-4" />New Meeting</Button>
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="grid grid-cols-7 border-b border-border">
            {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map((d) => <div key={d} className="py-3 text-center text-sm font-semibold text-muted-foreground bg-muted/50">{d}</div>)}
          </div>
          <div className="grid grid-cols-7">
            {days.map((date, i) => {
              const meetings = getMeetingsForDay(date);
              const isToday = isSameDay(date, new Date());
              const isCurrentMonth = isSameMonth(date, currentDate);
              return (
                <div key={i} className={cn('min-h-[120px] p-2 border-b border-r border-border last:border-r-0', !isCurrentMonth && 'bg-muted/30')}>
                  <div className="flex items-center justify-between mb-1">
                    <span className={cn('w-7 h-7 flex items-center justify-center text-sm rounded-full', isToday && 'bg-primary text-primary-foreground font-bold', !isCurrentMonth && 'text-muted-foreground')}>{format(date, 'd')}</span>
                    {meetings.length > 0 && <span className="text-xs text-muted-foreground">{meetings.length} meeting{meetings.length > 1 ? 's' : ''}</span>}
                  </div>
                  <div className="space-y-1">
                    {meetings.slice(0,3).map((meeting) => (
                      <button key={meeting.id} onClick={() => router.push(`/meetings/${meeting.id}`)} className={cn('w-full text-left text-xs px-2 py-1 rounded truncate', statusColors[meeting.status])}>{format(meeting.date, 'h:mm a')} - {meeting.description}</button>
                    ))}
                    {meetings.length > 3 && <button onClick={() => router.push('/meetings')} className="w-full text-xs text-primary hover:underline text-left px-2">+{meetings.length - 3} more</button>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
