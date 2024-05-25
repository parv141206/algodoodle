import Sidebar from "@/app/_components/Sidebar";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="container mx-auto flex flex-col gap-5 md:flex-row  md:p-5">
      <Sidebar />
      <div className="p-3">{children}</div>
    </div>
  );
}
