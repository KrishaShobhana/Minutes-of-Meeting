"use client";
import MeetingFormComponent from '@/components/MeetingFormComponent';

export default function EditMeetingPage({ params }: { params: { id: string } }) {
  return <div className="p-6 max-w-4xl"><MeetingFormComponent id={params.id} /></div>;
}
