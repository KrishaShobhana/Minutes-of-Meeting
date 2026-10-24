"use client";
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { mockMeetings, mockMeetingMembers } from '@/data/mockData';

export default function MeetingDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { id } = params;
  const index = mockMeetings.findIndex((m) => m.id === id);
  const meeting = mockMeetings[index];
  const prev = index > 0 ? mockMeetings[index - 1] : null;
  const next = index < mockMeetings.length - 1 ? mockMeetings[index + 1] : null;

  if (!meeting) return <div className="p-6">Meeting not found</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold mb-1">{meeting.description}</h1>
          <p className="text-sm text-muted-foreground">{format(meeting.date, 'MMM d, yyyy • h:mm a')}</p>
        </div>
        <div className="flex items-center gap-2">
          {prev ? (
            <Button variant="outline" onClick={() => router.push(`/meetings/${prev.id}`)}>
              <ArrowLeft className="w-4 h-4" /> Prev
            </Button>
          ) : (
            <Button variant="ghost" disabled>
              <ArrowLeft className="w-4 h-4" /> Prev
            </Button>
          )}

          {next ? (
            <Button onClick={() => router.push(`/meetings/${next.id}`)}>
              Next <ArrowRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button variant="ghost" disabled>
              Next <ArrowRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      <div className="bg-card p-6 rounded-xl border border-border">
        <p className="text-muted-foreground">Type: {meeting.typeName}</p>
        <p className="mt-2">Venue: {meeting.venueName}</p>
        <p className="mt-2">Convener: {meeting.convenerName}</p>
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Participants</h3>
          <div className="space-y-2">
            {mockMeetingMembers.filter((m) => m.meetingId === meeting.id).map((member) => (
              <div key={member.id} className="flex justify-between border-b pb-2">
                <div>
                  <p className="font-medium">{member.staffName}</p>
                  <p className="text-sm text-muted-foreground">{member.remarks}</p>
                </div>
                <div>{member.isPresent ? 'Present' : 'Absent'}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
