import ProtectedRoute from '@/components/ProtectedRoute';

export default function HomePage() {
  return (
    <ProtectedRoute>
      <h1 className="text-2xl font-bold">Welcome to the Home Page</h1>
      <p>You are logged in 🎉</p>
    </ProtectedRoute>
  );
}
