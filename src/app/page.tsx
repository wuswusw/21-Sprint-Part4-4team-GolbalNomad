import MainLayout from "@/components/layout/main-layout";
import Notifications from "@/features/notification/components/notifications";
export default function Page() {
  return (
    <MainLayout>
      <h1>Home</h1>
      <Notifications />
    </MainLayout>
  );
}