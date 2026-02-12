"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authStore } from "@/store/auth.store";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Basic protection (backend must also verify role!)
    if (!token || authStore.user?.role !== "ADMIN") {
      router.push("/");
    }
  }, [router]);

  return <div className="min-h-screen bg-gray-100">{children}</div>;
}
