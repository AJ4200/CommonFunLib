import React from "react";

interface LoaderProps {}

const Loader: React.FC<LoaderProps> = ({ ...props }) => {
  return (
    <div {...props} className="fixed object-center">
      <div className="loader-container">
        <div className="loader">
          <span></span>
        </div>
        <div className="loader">
          <span></span>
        </div>
        <div className="loader">
          <i></i>
        </div>
        <div className="loader">
          <i></i>
        </div>
      </div>
    </div>
  );
};
export default Loader;
