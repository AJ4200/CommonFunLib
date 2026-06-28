import EndpointList from "@/components/EndpointList";
import NavSection from "@/components/NavSection";
import PackageExamples from "@/components/nasec/PackageExamples";
import ToolInfo from "@/components/nasec/ToolInfo";
import ToolPlayground from "@/components/nasec/ToolPlayground";
import { buildEndpointDocs, generatorTools } from "@/lib/utilityTools";

const Generators = () => (
  <NavSection
    heading="Generators"
    description="Create realistic sample values, identifiers, colors, passwords, PINs, and placeholder text for testing forms, APIs, and demos."
    infoContent={<ToolInfo tools={generatorTools} />}
    playgroundContent={<ToolPlayground tools={generatorTools} />}
    apiContent={<EndpointList endpoints={buildEndpointDocs(generatorTools)} />}
    packageContent={
      <PackageExamples
        title="Generate values in your project"
        description="Use package imports when tests, seed scripts, demos, or form prototypes need random values without calling the API."
        helpers={["generateRandomName", "generatePassword", "generateNanoId", "generateApiKey", "generate.timestamp"]}
        esmExample={`import { generateRandomName, generatePassword, generateNanoId, generate } from "commonfunlib";

generateRandomName();
generatePassword(16);
generateNanoId(21);
generate.apiKey("cfl", 24);`}
        cjsExample={`const { generate, generatePin } = require("commonfunlib");

generatePin(6);
generate.timestamp("iso");
generate.semver(0);`}
      />
    }
  />
);

export default Generators;
