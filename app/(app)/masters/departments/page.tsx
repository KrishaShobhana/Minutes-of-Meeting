"use client";
import { useState } from 'react';
import Header from '@/components/layout/Header';
import { Plus, Edit, Trash2, Search, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTable } from '@/components/ui/data-table';
import { mockDepartments, mockStaff } from '@/data/mockData';
import { Department } from '@/types/mom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function DepartmentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingDept, setEditingDept] = useState<Department | null>(null);
  const [formData, setFormData] = useState({ name: '', code: '' });

  const filteredDepts = mockDepartments.filter((dept) => dept.name.toLowerCase().includes(searchTerm.toLowerCase()) || dept.code.toLowerCase().includes(searchTerm.toLowerCase()));
  const getStaffCount = (deptId: string) => mockStaff.filter((s) => s.departmentId === deptId).length;

  const handleEdit = (dept: Department) => { setEditingDept(dept); setFormData({ name: dept.name, code: dept.code }); setDialogOpen(true); };
  const handleCreate = () => { setEditingDept(null); setFormData({ name: '', code: '' }); setDialogOpen(true); };
  const handleSave = () => { toast.success(editingDept ? 'Department updated' : 'Department created'); setDialogOpen(false); };
  const handleDelete = (dept: Department) => { toast.success(`"${dept.name}" deleted`); };

  const columns = [
    { key: 'name', header: 'Department', render: (dept: Department) => (
      <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center"><Building2 className="w-5 h-5 text-accent" /></div><div><p className="font-medium">{dept.name}</p><p className="text-sm text-muted-foreground">Code: {dept.code}</p></div></div>
    ) },
    { key: 'staffCount', header: 'Staff Count', render: (dept: Department) => <span className="text-muted-foreground">{getStaffCount(dept.id)} members</span> },
    { key: 'actions', header: 'Actions', className: 'w-24', render: (dept: Department) => (
      <div className="flex items-center gap-2"><Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); handleEdit(dept); }}><Edit className="w-4 h-4" /></Button><Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); handleDelete(dept); }} className="text-destructive hover:text-destructive"><Trash2 className="w-4 h-4" /></Button></div>
    ) }
  ];

  return (
    <div>
      <Header title="Departments" subtitle="Manage organization departments" />

      <div className="p-6 space-y-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search departments..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
          </div>
          <Button onClick={handleCreate} className="gap-2"><Plus className="w-4 h-4" />Add Department</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDepts.map((dept) => (
            <div key={dept.id} className="bg-card rounded-xl border border-border p-6 hover:border-primary/50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center"><Building2 className="w-6 h-6 text-accent" /></div>
                  <div><h3 className="font-semibold">{dept.name}</h3><p className="text-sm text-muted-foreground">Code: {dept.code}</p></div>
                </div>
                <div className="flex gap-1"><Button variant="ghost" size="icon" onClick={() => handleEdit(dept)}><Edit className="w-4 h-4" /></Button><Button variant="ghost" size="icon" onClick={() => handleDelete(dept)} className="text-destructive hover:text-destructive"><Trash2 className="w-4 h-4" /></Button></div>
              </div>
              <div className="mt-4 pt-4 border-t border-border"><p className="text-sm text-muted-foreground"><span className="font-semibold text-foreground">{getStaffCount(dept.id)}</span> staff members</p></div>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingDept ? 'Edit Department' : 'Add Department'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2"><Label htmlFor="name">Department Name *</Label><Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Enter department name" /></div>
            <div className="space-y-2"><Label htmlFor="code">Department Code *</Label><Input id="code" value={formData.code} onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })} placeholder="e.g., ENG, HR, FIN" /></div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button><Button onClick={handleSave}>{editingDept ? 'Update' : 'Create'}</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
