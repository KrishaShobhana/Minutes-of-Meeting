"use client";
import React from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import AppLayout from '@/components/layout/AppLayout';
import { mockMeetings } from '@/data/mockData';
import { Button } from '@/components/ui/button';

export default function MeetingsListAppPage() {
  return (
    <AppLayout>
      <div className="p-6 space-y-4">
        <h1 className="text-2xl font-bold">Meetings</h1>
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
    </AppLayout>
  );
}
