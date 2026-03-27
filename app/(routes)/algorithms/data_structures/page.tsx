import { DoodleCard } from "@/app/_components/DoodleCards/DoodleCard";

export default function Page() {
  return (
    <div className="space-y-6">
      <DoodleCard title="Welcome to Data Structures!" accentColor="bg-[#fdba74]" class="">
        <p className="text-xl">Select a specific algorithm from the sidebar to start visualizing.</p>
      </DoodleCard>
    </div>
  );
}
