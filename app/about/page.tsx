import Breadcrumbs from "@/components/Breadcrumbs"; // adjust the path if needed
import ProtectedRoute from '@/components/ProtectedRoute';

export default function AboutPage() {
  return (
    <ProtectedRoute>
      <Breadcrumbs />
      <h2>About Us</h2>
    </ProtectedRoute>
  );
}
