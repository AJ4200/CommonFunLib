import EndpointList from "@/components/EndpointList";
import NavSection from "@/components/NavSection";
import PackageExamples from "@/components/nasec/PackageExamples";
import ToolInfo from "@/components/nasec/ToolInfo";
import ToolPlayground from "@/components/nasec/ToolPlayground";
import { buildEndpointDocs, hashingTools } from "@/lib/utilityTools";
import { FaLock } from "react-icons/fa";

const Hashing = () => (
  <NavSection
    heading="Hashing"
    splashIcon={<FaLock />}
    catalog={hashingTools.map((tool) => tool.label)}
    splashVariant="hashing"
    description="Hash, encode, decode, and sign text payloads while checking the exact endpoint and response shape behind each utility."
    infoContent={<ToolInfo tools={hashingTools} />}
    playgroundContent={<ToolPlayground tools={hashingTools} />}
    apiContent={<EndpointList endpoints={buildEndpointDocs(hashingTools)} />}
    packageContent={
      <PackageExamples
        title="Hash and encode locally"
        description="Use package imports for server-side hashing, fixture generation, signing demos, or quick encoding tasks."
        helpers={[
          "md5",
          "sha1",
          "sha256",
          "sha384",
          "sha512",
          "sha3_256",
          "sha3_384",
          "sha3_512",
          "base64Encode",
          "base64Decode",
          "hmacSha256",
          "hmacSha512",
          "base64UrlEncode",
          "base64UrlDecode",
          "checksum",
          "urlEncode",
          "urlDecode",
          "hexEncode",
          "hexDecode",
        ]}
        esmExample={`import { sha256, sha3_256, base64UrlEncode } from "commonfunlib";

sha256("CommonFunLib");
sha3_384("CommonFunLib");
sha3_256("CommonFunLib");
base64UrlEncode("hello world");`}
        cjsExample={`const { hash, sha512 } = require("commonfunlib");

sha512("CommonFunLib");
hash.checksum("payload");
hash.hmacSha512("payload", "secret");`}
      />
    }
  />
);

export default Hashing;
