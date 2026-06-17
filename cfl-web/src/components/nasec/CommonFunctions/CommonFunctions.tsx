import NavSection from "@/components/NavSection";
import React from "react";
import infoContent from "./infoContent";
import CommonFunctionsPG from "./CommonFunctionsPG";
import EndpointList from "./Endpoints";
import PackageExamples from "@/components/nasec/PackageExamples";

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
        packageContent={
          <PackageExamples
            title="Use common functions locally"
            description="Install the package when your app needs number checks, string helpers, or small calculations without making HTTP calls."
            helpers={["isEven", "isPrime", "reverseString", "slugify", "percentage"]}
            esmExample={`import { isEven, reverseString, percentage, common } from "commonfunlib";

isEven(42);
reverseString("hello");
percentage(25, 200);
common.slugify("My New Tool");`}
            cjsExample={`const { common, isPrime } = require("commonfunlib");

isPrime(17);
common.clamp(120, 0, 100);
common.isPalindrome("Never odd or even");`}
          />
        }
      />
    </div>
  );
};
export default CommonFunctions;
