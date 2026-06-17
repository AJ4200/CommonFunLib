import EndpointList from "@/components/EndpointList";
import NavSection from "@/components/NavSection";
import PackageExamples from "@/components/nasec/PackageExamples";
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
    packageContent={
      <PackageExamples
        title="Hash and encode locally"
        description="Use package imports for server-side hashing, fixture generation, signing demos, or quick encoding tasks."
        helpers={["sha256", "sha512", "base64Encode", "base64Decode", "hmacSha256"]}
        esmExample={`import { sha256, base64Encode, hmacSha256 } from "commonfunlib";

sha256("CommonFunLib");
base64Encode("hello");
hmacSha256("payload", "secret");`}
        cjsExample={`const { hash, sha512 } = require("commonfunlib");

sha512("CommonFunLib");
hash.base64Decode("aGVsbG8=");
hash.hmacSha256("payload", "secret");`}
      />
    }
  />
);

export default Hashing;
