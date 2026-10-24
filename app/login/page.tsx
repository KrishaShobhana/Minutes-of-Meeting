"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { FileText, Loader2 } from 'lucide-react';
import { UserRole } from '@/types/mom';
import { toast } from 'sonner';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('staff');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const success = await login(email, password, role);
      if (success) {
        toast.success('Welcome back!');
        router.push('/dashboard');
      } else {
        toast.error('Invalid credentials');
      }
    } catch {
      toast.error('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 gradient-primary items-center justify-center p-12">
        <div className="max-w-md text-center animate-fade-in">
          <div className="w-20 h-20 bg-primary-foreground/20 rounded-2xl flex items-center justify-center mx-auto mb-8">
            <FileText className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold text-primary-foreground mb-4">MOM Management</h1>
          <p className="text-xl text-primary-foreground/80 mb-8">Streamline your meetings with efficient documentation and tracking</p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md animate-slide-up">
          <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
            <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
              <FileText className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold">MOM Management</h1>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground">Welcome back</h2>
            <p className="text-muted-foreground mt-2">Sign in to your account to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input id="email" type="email" placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="h-12" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required className="h-12" />
            </div>

            <div className="space-y-3">
              <Label>Select your role</Label>
              <RadioGroup value={role} onValueChange={(v) => setRole(v as UserRole)} className="grid grid-cols-3 gap-3">
                <Label htmlFor="admin" className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all ${role === 'admin' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}>
                  <RadioGroupItem value="admin" id="admin" className="sr-only" />
                  <span className="text-sm font-medium">Admin</span>
                </Label>
                <Label htmlFor="convener" className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all ${role === 'convener' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}>
                  <RadioGroupItem value="convener" id="convener" className="sr-only" />
                  <span className="text-sm font-medium">Convener</span>
                </Label>
                <Label htmlFor="staff" className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all ${role === 'staff' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}>
                  <RadioGroupItem value="staff" id="staff" className="sr-only" />
                  <span className="text-sm font-medium">Staff</span>
                </Label>
              </RadioGroup>
            </div>

            <Button type="submit" className="w-full h-12 text-base" disabled={isLoading}>
              {isLoading ? (<><Loader2 className="w-4 h-4 mr-2 animate-spin" />Signing in...</>) : ('Sign in')}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-8">Demo: Enter any email and password to login</p>
        </div>
      </div>
    </div>
  );
}
