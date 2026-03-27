import DoodleErrorCard from "@/app/_components/DoodleCards/DoodleErrorCard";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <DoodleErrorCard mdVisible={false}>
        <>
          The tree may not appear properly on a phone, kindly view on bigger
          screen.
        </>
      </DoodleErrorCard>
      {children}
    </div>
  );
};

export default Layout;
