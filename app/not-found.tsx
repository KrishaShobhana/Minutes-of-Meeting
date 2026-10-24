import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404 — Page Not Found</h1>
        <p className="mb-6">Sorry, we couldn’t find the page you’re looking for.</p>
        <Link href="/dashboard" className="btn">Go back to Dashboard</Link>
      </div>
    </div>
  );
}
