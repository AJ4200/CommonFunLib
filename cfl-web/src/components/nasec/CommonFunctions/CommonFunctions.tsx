import NavSection from "@/components/NavSection";
import React from "react";
import infoContent from "./infoContent";
import CommonFunctionsPG from "./CommonFunctionsPG";
import EndpointList from "./Endpoints";

interface CommonFunctionsProps {}

const CommonFunctions: React.FC<CommonFunctionsProps> = ({ ...props }) => {
  const InfoContentComponent = infoContent as React.FC;

  return (
    <div className="h-full min-h-0" {...props}>
      <NavSection
        heading={"Common Functions"}
        description={
          "Run quick checks and transformations for everyday number and string tasks, then inspect the matching API route when you need to wire one into code."
        }
        infoContent={<InfoContentComponent />}
        playgroundContent={<CommonFunctionsPG/>}
        apiContent={<EndpointList/>}
      />
    </div>
  );
};
export default CommonFunctions;
