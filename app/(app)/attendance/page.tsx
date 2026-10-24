"use client";
import { useState } from 'react';
import Header from '@/components/layout/Header';
import { Search, CheckCircle, XCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { DataTable } from '@/components/ui/data-table';
import { mockMeetings, mockMeetingMembers, mockStaff } from '@/data/mockData';
import { format } from 'date-fns';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function AttendancePage() {
  const [selectedMeeting, setSelectedMeeting] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const completedMeetings = mockMeetings.filter((m) => m.status === 'completed');

  const attendanceData = mockMeetingMembers
    .map((member) => {
      const meeting = mockMeetings.find((m) => m.id === member.meetingId);
      const staff = mockStaff.find((s) => s.id === member.staffId);
      return {
        ...member,
        meetingDescription: meeting?.description || '',
        meetingDate: meeting?.date || new Date(),
        staffEmail: staff?.email || '',
        staffDepartment: staff?.departmentId || '',
      };
    })
    .filter((record) => {
      const matchesMeeting = selectedMeeting === 'all' || record.meetingId === selectedMeeting;
      const matchesSearch = record.staffName?.toLowerCase().includes(searchTerm.toLowerCase()) || record.meetingDescription.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesMeeting && matchesSearch;
    });

  const columns = [
    {
      key: 'meetingDate',
      header: 'Meeting',
      render: (record: any) => (
        <div>
          <p className="font-medium">{record.meetingDescription}</p>
          <p className="text-sm text-muted-foreground">{format(record.meetingDate, 'MMM d, yyyy • h:mm a')}</p>
        </div>
      ),
    },
    {
      key: 'staffName',
      header: 'Participant',
      render: (record: any) => (
        <div>
          <p className="font-medium">{record.staffName}</p>
          <p className="text-sm text-muted-foreground">{record.staffEmail}</p>
        </div>
      ),
    },
    {
      key: 'isPresent',
      header: 'Status',
      render: (record: any) => (
        <div className="flex items-center gap-2">
          {record.isPresent ? (
            <>
              <CheckCircle className="w-5 h-5 text-success" />
              <span className="text-success font-medium">Present</span>
            </>
          ) : (
            <>
              <XCircle className="w-5 h-5 text-destructive" />
              <span className="text-destructive font-medium">Absent</span>
            </>
          )}
        </div>
      ),
    },
    {
      key: 'remarks',
      header: 'Remarks',
      render: (record: any) => <span className="text-muted-foreground">{record.remarks || '-'}</span>,
    },
  ];

  const totalRecords = attendanceData.length;
  const presentCount = attendanceData.filter((r) => r.isPresent).length;
  const absentCount = totalRecords - presentCount;
  const attendanceRate = totalRecords > 0 ? Math.round((presentCount / totalRecords) * 100) : 0;

  return (
    <div>
      <Header title="Attendance" subtitle="Track meeting attendance" />

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-card rounded-lg border border-border p-4">
            <p className="text-sm text-muted-foreground">Total Records</p>
            <p className="text-2xl font-bold">{totalRecords}</p>
          </div>
          <div className="bg-card rounded-lg border border-border p-4">
            <p className="text-sm text-muted-foreground">Present</p>
            <p className="text-2xl font-bold text-success">{presentCount}</p>
          </div>
          <div className="bg-card rounded-lg border border-border p-4">
            <p className="text-sm text-muted-foreground">Absent</p>
            <p className="text-2xl font-bold text-destructive">{absentCount}</p>
          </div>
          <div className="bg-card rounded-lg border border-border p-4">
            <p className="text-sm text-muted-foreground">Attendance Rate</p>
            <p className="text-2xl font-bold text-primary">{attendanceRate}%</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search by name or meeting..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
          </div>
          <Select value={selectedMeeting} onValueChange={setSelectedMeeting}>
            <SelectTrigger className="w-full sm:w-64">
              <SelectValue placeholder="Filter by meeting" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Meetings</SelectItem>
              {completedMeetings.map((meeting) => (
                <SelectItem key={meeting.id} value={meeting.id}>{meeting.description}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <DataTable columns={columns} data={attendanceData} emptyMessage="No attendance records found" />
      </div>
    </div>
  );
}
