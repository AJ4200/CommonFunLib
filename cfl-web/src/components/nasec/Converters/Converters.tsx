import EndpointList from "@/components/EndpointList";
import NavSection from "@/components/NavSection";
import PackageExamples from "@/components/nasec/PackageExamples";
import ToolInfo from "@/components/nasec/ToolInfo";
import ToolPlayground from "@/components/nasec/ToolPlayground";
import { buildEndpointDocs, converterTools } from "@/lib/utilityTools";
import { FaExchangeAlt } from "react-icons/fa";

const Converters = () => (
  <NavSection
    heading="Converters"
    splashIcon={<FaExchangeAlt />}
    catalog={converterTools.map((tool) => tool.label)}
    splashVariant="converters"
    description="Convert common measurements and data sizes with simple inputs, live results, and request examples you can reuse."
    infoContent={<ToolInfo tools={converterTools} />}
    playgroundContent={<ToolPlayground tools={converterTools} />}
    apiContent={<EndpointList endpoints={buildEndpointDocs(converterTools)} />}
    packageContent={
      <PackageExamples
        title="Convert values without HTTP"
        description="Import converter helpers directly when a script, CLI, or server-side app needs unit conversions as plain function calls."
        helpers={[
          "convert.fetchExchangeRates",
          "convert.currency",
          "convertLength",
          "convertWeight",
          "convertArea",
          "convertDataSize",
          "convertVolume",
          "convertSpeed",
          "convertTemperature",
          "convertLengthSystem",
          "convertNumberBase",
          "convertDuration",
          "convertTimestamp",
          "convertColor",
          "convertPressure",
          "convertAngle",
        ]}
        esmExample={`import { convertLength, convertNumberBase, convert } from "commonfunlib";

convertLength(12, "m", "foot");
convertNumberBase("255", 10, 16);
convertVolume(1, "l", "cup");
convert.timestamp("2026-06-28T12:00:00.000Z", "iso", "seconds");`}
        cjsExample={`const { convert, convertWeight } = require("commonfunlib");

convertWeight(5, "kg", "lb");
convert.duration(3600, "s", "hr");
convert.color("#4682B4", "hex", "rgb");`}
      />
    }
  />
);

export default Converters;
