import NavSection from "@/components/NavSection";
import React from "react";
import infoContent from "./infoContent";
import CommonFunctionsPG from "./CommonFunctionsPG";
import EndpointList from "./Endpoints";
import PackageExamples from "@/components/nasec/PackageExamples";
import { commonTools } from "@/lib/commonTools";
import { FaCog } from "react-icons/fa";

interface CommonFunctionsProps {}

const CommonFunctions: React.FC<CommonFunctionsProps> = ({ ...props }) => {
  const InfoContentComponent = infoContent as React.FC;

  return (
    <div className="h-full min-h-0" {...props}>
      <NavSection
        heading={"Common Functions"}
        splashIcon={<FaCog />}
        catalog={commonTools.map((tool) => tool.label)}
        splashVariant="functions"
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
            helpers={commonTools.map((tool) => `common.${tool.value}`)}
            imports={[
              "isEven", "isOdd", "factorial", "gcd", "lcm", "isPrime", "isLeapYear",
              "swapVariableValue", "reverseString", "isPalindrome", "slugify", "slugifyLink",
              "clamp", "percentage", "fibonacci", "average", "median", "titleCase", "wordCount",
              "isValidEmail", "truncate", "isValidUrl", "characterCount",
            ]}
            esmExample={`isEven(42);
fibonacci(8);
average("4,8,15,16,23,42");
isLeapYear(2024);
common.titleCase("common fun lib");`}
            cjsExample={`isPrime(17);
common.median("4,8,15,16,23,42");
common.wordCount("CommonFunLib ships tiny utilities");`}
          />
        }
      />
    </div>
  );
};
export default CommonFunctions;
