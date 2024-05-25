import Sidebar from "@/app/_components/Sidebar";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="container mx-auto flex flex-col gap-5 p-3 md:flex-row">
      <Sidebar />
      {children}
    </div>
  );
}
