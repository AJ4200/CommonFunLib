import EndpointList from "@/components/EndpointList";
import NavSection from "@/components/NavSection";
import ToolInfo from "@/components/nasec/ToolInfo";
import ToolPlayground from "@/components/nasec/ToolPlayground";
import { buildEndpointDocs, hashingTools } from "@/lib/utilityTools";

const Hashing = () => (
  <NavSection
    heading="Hashing"
    description="Hash, encode, decode, and sign text payloads while checking the exact endpoint and response shape behind each utility."
    infoContent={<ToolInfo tools={hashingTools} />}
    playgroundContent={<ToolPlayground tools={hashingTools} />}
    apiContent={<EndpointList endpoints={buildEndpointDocs(hashingTools)} />}
  />
);

export default Hashing;
