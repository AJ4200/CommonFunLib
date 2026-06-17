import EndpointList from "@/components/EndpointList";
import NavSection from "@/components/NavSection";
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
  />
);

export default Converters;
