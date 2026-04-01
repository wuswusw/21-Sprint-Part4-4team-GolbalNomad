"use client";

import Header from "@/components/common/PageHeader"; 
import ActivityForm from "@/components/common/activities/activity-form";

export default function CreatePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-grow py-10">
        <div className="w-full max-w-[700px] mx-auto px-4 md:px-0">
          <ActivityForm mode="create" />
        </div>
      </main>
    </div>
  );
}