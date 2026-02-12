import TopNav from "./TopNav";
import BottomNav from "./BottomNav";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <TopNav />

      <main className="flex-1">{children}</main>

      <BottomNav />
    </div>
  );
}
