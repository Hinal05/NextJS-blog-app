import Breadcrumbs from "@/components/Breadcrumbs"; // adjust the path if needed
import ProtectedRoute from '@/components/ProtectedRoute';

export default function ContactPage() {
  return (
    <ProtectedRoute>
      <Breadcrumbs />
      <h2>Contact Page</h2>
    </ProtectedRoute>
  )
}
