interface OperationLoaderProps {
  label?: string;
}

const OperationLoader = ({ label = "Working" }: OperationLoaderProps) => (
  <div className="operation-loader" role="status" aria-live="polite">
    <span className="operation-loader__ring" aria-hidden="true" />
    <span className="operation-loader__text">{label}</span>
    <span className="operation-loader__bars" aria-hidden="true">
      <span />
      <span />
      <span />
    </span>
  </div>
);

export default OperationLoader;
