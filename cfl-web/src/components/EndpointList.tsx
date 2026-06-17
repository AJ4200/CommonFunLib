import Endpoint from "@/components/component/endpoint";
import { EndpointData } from "@/models/endpoint";

interface EndpointListProps {
  endpoints: EndpointData[];
}

const EndpointList = ({ endpoints }: EndpointListProps) => {
  return (
    <div className="flex h-full max-h-[26rem] flex-col gap-3 overflow-y-auto pr-2 custome-scroll">
      {endpoints.map((endpoint) => (
        <Endpoint key={`${endpoint.method ?? "GET"}-${endpoint.endpoint}`} {...endpoint} />
      ))}
    </div>
  );
};

export default EndpointList;
