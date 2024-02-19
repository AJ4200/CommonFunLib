import React from "react";

interface ComponentProps {
}

const Component: React.FC<ComponentProps> = ({ ...props }) => {
  return <section {...props}></section>;
};
export default Component;
