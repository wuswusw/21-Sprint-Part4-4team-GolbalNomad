"use client";

import Header from "@/components/common/PageHeader"; 
import ActivityForm from "@/components/common/activities/activity-form";

export default function EditPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-grow py-10">
        <div className="container mx-auto bg-white shadow-sm rounded-xl">
          <ActivityForm mode="edit" />
        </div>
      </main>

    </div>
  );
}