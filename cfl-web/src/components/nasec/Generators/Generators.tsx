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
        helpers={["generateRandomName", "generatePassword", "generateUuid", "generateToken", "generate.color"]}
        esmExample={`import { generateRandomName, generatePassword, generate } from "commonfunlib";

generateRandomName();
generatePassword(16);
generate.uuid();
generate.color();`}
        cjsExample={`const { generate, generatePin } = require("commonfunlib");

generatePin(6);
generate.token(24);
generate.lorem(12);`}
      />
    }
  />
);

export default Generators;
