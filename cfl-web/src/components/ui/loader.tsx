import React from "react";
import UniversalLoader from "./UniversalLoader";

interface LoaderProps {
  label?: string;
}

const Loader: React.FC<LoaderProps> = ({ label = "Loading" }) => (
  <UniversalLoader label={label} size="lg" overlay />
);
export default Loader;
