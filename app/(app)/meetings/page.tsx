"use client";
import Link from 'next/link';
import { format } from 'date-fns';
import { mockMeetings } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import Header from '@/components/layout/Header';

export default function MeetingsPage() {
  return (
    <div>
      <Header title="Meetings" subtitle="All meetings" />
      <div className="p-6 space-y-4">
        <div className="grid gap-3">
          {mockMeetings.map((meeting) => (
            <Link href={`/meetings/${meeting.id}`} key={meeting.id} className="p-3 rounded border hover:bg-muted">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{meeting.description}</p>
                  <p className="text-sm text-muted-foreground">{format(meeting.date, 'MMM d, yyyy • h:mm a')}</p>
                </div>
                <div>
                  <Button variant="ghost">View</Button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
