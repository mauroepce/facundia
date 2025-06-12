import React from "react";
import Footer from "./Footer";
import NavBar from "./NavBar";

interface LayoutWrapperProps {
  children: React.ReactNode;
}

const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ children }) => {
  return (
      <main>
      <NavBar />
        <div className="relative">
          <div className="max-w-7xl mx-auto px-4 flex min-h-screen flex-col items-center justify-between">
            {children}
          </div>
        </div>
      <Footer />
      </main>
  );
};

export default LayoutWrapper;
