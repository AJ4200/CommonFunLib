import { Badge } from "@/components/ui/badge";

interface EndpointProps {
  endpoint: string;
  description: string;
  parameters: {
    [key: string]: string;
  };
  paramDescriptions: {
    [key: string]: string;
  };
  curlExample: string;
  jsExample: string;
  responseExample: string;
}

const Endpoint = ({
  endpoint,
  description,
  parameters,
  paramDescriptions,
  curlExample,
  jsExample,
  responseExample,
}: EndpointProps) => {
  return (
    <div className="p-4 space-y-4 bg-gray-900 text-white">
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Badge className="bg-blue-600 text-white" variant="secondary">
            {endpoint}
          </Badge>
          <a className="text-blue-400 hover:underline" href="#" target="_blank">
            {endpoint}
          </a>
        </div>
        <p>{description}</p>
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Parameters</h3>
        {Object.keys(parameters).map((param, index) => (
          <div key={index} className="flex items-center space-x-2">
            <Badge className="bg-gray-700 text-gray-300" variant="secondary">
              {paramDescriptions[param]}
            </Badge>
            <span className="font-medium">{param}</span>
          </div>
        ))}
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Curl Example</h3>
        <pre className="p-4 bg-gray-800 rounded-md">
          <code>{curlExample}</code>
        </pre>
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">JavaScript Example</h3>
        <pre className="p-4 bg-gray-800 rounded-md">
          <code>{jsExample}</code>
        </pre>
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Response Example</h3>
        <pre className="p-4 bg-gray-800 rounded-md">
          <code>{responseExample}</code>
        </pre>
      </div>
    </div>
  );
};

export default Endpoint;
