"use client";

import Link from "next/link";

export default function AdminLayoutUI({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow p-4">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

        <nav className="flex flex-col gap-3">
          <Link href="/admin">Dashboard</Link>
          <Link href="/admin/matches">Manage Matches</Link>
          <Link href="/admin/bets">View Bets</Link>
          <Link href="/admin/users">Users</Link>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
