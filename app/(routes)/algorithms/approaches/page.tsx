import { DoodleCard } from "@/app/_components/DoodleCards/DoodleCard";

export default function Page() {
  return (
    <div className="space-y-6">
      <DoodleCard title="Welcome to Algorithmic Approaches!" accentColor="bg-[#93c5fd]" class="">
        <p className="text-xl">Select a specific algorithm or paradigm from the sidebar to start visualizing.</p>
      </DoodleCard>
    </div>
  );
}
