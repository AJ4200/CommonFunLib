import UniversalLoader from "./UniversalLoader";

interface OperationLoaderProps {
  label?: string;
}

const OperationLoader = ({ label = "Working" }: OperationLoaderProps) => (
  <UniversalLoader label={label} />
);

export default OperationLoader;
