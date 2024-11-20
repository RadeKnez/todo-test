import React from "react";

export const Layout = ({ children }: React.PropsWithChildren): JSX.Element => {
  return (
    <div className="p-6 max-w-lg mx-auto font-sans antialiased">{children}</div>
  );
};
