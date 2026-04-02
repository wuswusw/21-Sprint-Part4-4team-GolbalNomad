"use client";

import { useParams } from "next/navigation";
import Header from "@/components/common/PageHeader"; 
import ActivityForm from "@/components/common/activities/activity-form";

export default function EditPage() {
  const params = useParams();
  const experienceId = params?.experienceId ? Number(params.experienceId) : undefined;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-grow py-10">
        <div className="w-full max-w-[700px] mx-auto px-4 md:px-0">
          <ActivityForm 
            mode="edit" 
            activityId={experienceId} 
          />
        </div>
      </main>
    </div>
  );
}