import AuthGuard from "@/app/AuthGuard";
import DashboardLayoutComponent from "@/components/DashboardLayout";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <DashboardLayoutComponent>{children}</DashboardLayoutComponent>
    </AuthGuard>
  );
}
