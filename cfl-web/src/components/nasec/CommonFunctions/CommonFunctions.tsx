import NavSection from "@/components/NavSection";
import React from "react";
import infoContent from "./infoContent";
import CommonFunctionsPG from "./CommonFunctionsPG";

interface CommonFunctionsProps {}

const CommonFunctions: React.FC<CommonFunctionsProps> = ({ ...props }) => {
  const InfoContentComponent = infoContent as React.FC;

  return (
    <div {...props}>
      <NavSection
        heading={"Common Functions"}
        description={
          "The CommonFunctions section provides a collection of commonly used functions for performing mathematical operations and manipulating variables and strings. The following functions are available:"
        }
        infoContent={<InfoContentComponent />}
        playgroundContent={<CommonFunctionsPG/>}
        apiContent={undefined}
      />
    </div>
  );
};
export default CommonFunctions;
