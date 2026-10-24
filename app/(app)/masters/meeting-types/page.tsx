"use client";
import Header from '@/components/layout/Header';
import { mockMeetingTypes } from '@/data/mockData';

export default function MeetingTypesPage() {
  return (
    <div>
      <Header title="Meeting Types" subtitle="Manage meeting types" />
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockMeetingTypes.map((type) => (
            <div key={type.id} className="bg-card rounded-xl border border-border p-6">
              <h3 className="font-semibold">{type.name}</h3>
              <p className="text-sm text-muted-foreground mt-2">{type.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
