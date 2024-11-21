import React from "react";

export const Container = ({ children }: React.PropsWithChildren) => {
  return <ul className="space-y-2">{children}</ul>;
};
