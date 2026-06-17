import EndpointList from "@/components/EndpointList";
import NavSection from "@/components/NavSection";
import ToolInfo from "@/components/nasec/ToolInfo";
import ToolPlayground from "@/components/nasec/ToolPlayground";
import { buildEndpointDocs, generatorTools } from "@/lib/utilityTools";

const Generators = () => (
  <NavSection
    heading="Generators"
    description="Generate names, numbers, secrets, UUIDs, colors, PINs, and placeholder text from one fast playground."
    infoContent={<ToolInfo tools={generatorTools} />}
    playgroundContent={<ToolPlayground tools={generatorTools} />}
    apiContent={<EndpointList endpoints={buildEndpointDocs(generatorTools)} />}
  />
);

export default Generators;
