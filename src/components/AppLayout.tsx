import React, { PropsWithChildren } from "react";
import Navbar from "./Navbar";

const AppLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="py-4 wrapper">
      <Navbar />
      <main className="my-20">{children}</main>
    </div>
  );
};

export default AppLayout;
