import EndpointList from "@/components/EndpointList";
import NavSection from "@/components/NavSection";
import PackageExamples from "@/components/nasec/PackageExamples";
import ToolInfo from "@/components/nasec/ToolInfo";
import ToolPlayground from "@/components/nasec/ToolPlayground";
import { buildEndpointDocs, converterTools } from "@/lib/utilityTools";

const Converters = () => (
  <NavSection
    heading="Converters"
    description="Convert common measurements and data sizes with simple inputs, live results, and request examples you can reuse."
    infoContent={<ToolInfo tools={converterTools} />}
    playgroundContent={<ToolPlayground tools={converterTools} />}
    apiContent={<EndpointList endpoints={buildEndpointDocs(converterTools)} />}
    packageContent={
      <PackageExamples
        title="Convert values without HTTP"
        description="Import converter helpers directly when a script, CLI, or server-side app needs unit conversions as plain function calls."
        helpers={["convertLength", "convertWeight", "convertTemperature", "convert.dataSize", "convert.speed"]}
        esmExample={`import { convertLength, convertTemperature, convert } from "commonfunlib";

convertLength(12, "m", "foot");
convertTemperature(22, "C", "F");
convert.dataSize(2048, "MB", "GB");`}
        cjsExample={`const { convert, convertWeight } = require("commonfunlib");

convertWeight(5, "kg", "lb");
convert.area(2, "acre", "sqm");
convert.speed(88, "mph", "kph");`}
      />
    }
  />
);

export default Converters;
