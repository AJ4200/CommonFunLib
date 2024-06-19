import Endpoint from "@/components/component/endpoint";
import endpoints from "@/lib/endpoints";

const EndpointList = () => {
  return (
    <div className="flex flex-col w-full h-full overflow-y-scroll space-y-2 custome-scroll">
      {endpoints.map((endpoint, index) => (
        <div key={index} className="w-full pr-1">
          <Endpoint {...endpoint} />
        </div>
      ))}
    </div>
  );
};

export default EndpointList;
