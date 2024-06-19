import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { BiDownArrow } from "react-icons/bi";

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
  const [toggled, setToggled] = useState(false);

  return (
    <div
      className="flex flex-col justify-center items-center w-full h-full cursor-pointer bg-[var(--secondary)] rounded-lg shadow-md p-3"
      onClick={() => {
        setToggled(!toggled);
      }}
    >
      <div className="flex flex-row justify-between items-center w-full">
        <Badge
          className="bg-[var(--primary)] font-bold text-[--foreground]"
          variant="secondary"
        >
          GET
        </Badge>
        <a
          className="text-[var(--primary)] hover:underline font-semibold"
          href="#"
          target="_blank"
          onClick={() => {
            setToggled(!toggled);
          }}
        >
          {endpoint}
        </a>
        <BiDownArrow className={`${!toggled ? "rotate-180" : ""}`} />
      </div>
      <p className="text-[var(--foreground)]">{description}</p>
      {toggled && (
        <>
          <div className="w-[90%] my-2 h-[1.5px] bg-[var(--primary)]" />
          <div className="flex flex-col justify-center items-center w-full">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Parameters</h3>
              {Object.keys(parameters).map((param, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Badge
                    className="bg-[var(--primary)] font-bold text-[--foreground]"
                    variant="secondary"
                  >
                    {paramDescriptions[param]}
                  </Badge>
                  <span className="font-medium">{param}</span>
                </div>
              ))}
            </div>
            <div className="space-y-2 w-full">
              <h3 className="text-lg font-semibold">Curl Example</h3>
              <pre className="p-4 bg-[var(--primary)] rounded-md w-full">
                <code>{curlExample}</code>
              </pre>
            </div>
            <div className="space-y-2 w-full">
              <h3 className="text-lg font-semibold">JavaScript Example</h3>
              <pre className="p-4 bg-[var(--primary)] rounded-md w-full">
                <code>{jsExample}</code>
              </pre>
            </div>
            <div className="space-y-2 w-full">
              <h3 className="text-lg font-semibold">Response Example</h3>
              <pre className="p-4 bg-[var(--primary)] rounded-md w-full">
                <code>{responseExample}</code>
              </pre>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Endpoint;
