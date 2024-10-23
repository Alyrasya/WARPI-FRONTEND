// pages/index.tsx

import React from "react";
import Dashboard from "#/app/(authenticated)/cashier/components/dashboardCard";

const Home: React.FC = () => {
  return (
    <div className="bg-[#F1F5F9]">
      <Dashboard /> {/* Memanggil komponen Dashboard */}
    </div>
  );
};

export default Home;
