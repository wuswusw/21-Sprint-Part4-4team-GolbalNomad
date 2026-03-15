import Sidemenu from "@/components/common/Sidemenu";
import MainLayout from "@/components/layout/MainLayout";
import MyDayPicker from "@/app/main/experiences/[experienceId]/components/ReactDayPicker";

export default function Page() {
  return (
    <MainLayout>
      <h1>Home</h1>
      <Sidemenu />
      <MyDayPicker />
    </MainLayout>
  );
}