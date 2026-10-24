import { redirect } from 'next/navigation';

export default function Home() {
  // Redirect root to dashboard (main app entry)
  redirect('/dashboard');
}
