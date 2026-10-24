"use client";
import Header from '@/components/layout/Header';
import { mockStaff } from '@/data/mockData';
import { format } from 'date-fns';

export default function StaffPage() {
  return (
    <div>
      <Header title="Staff" subtitle="Manage staff members" />
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockStaff.map((s) => (
          <div key={s.id} className="bg-card rounded-xl border border-border p-4">
            <h3 className="font-semibold">{s.name}</h3>
            <p className="text-sm text-muted-foreground">{s.email}</p>
            <p className="text-xs text-muted-foreground mt-2">Joined: {format(s.joinedAt || new Date(), 'MMM d, yyyy')}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
