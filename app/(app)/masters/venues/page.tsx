"use client";
import Header from '@/components/layout/Header';
import { mockVenues } from '@/data/mockData';

export default function VenuesPage() {
  return (
    <div>
      <Header title="Venues" subtitle="Manage meeting venues" />
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockVenues.map((v) => (
          <div key={v.id} className="bg-card rounded-xl border border-border p-4">
            <h3 className="font-semibold">{v.name}</h3>
            <p className="text-sm text-muted-foreground mt-2">{v.location}</p>
            <p className="text-xs text-muted-foreground mt-2">Capacity: {v.capacity}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
