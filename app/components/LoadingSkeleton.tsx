import React from "react";

const LoadingSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse">
      <div className="h-40 bg-gray-200 rounded-md"></div>
      <div className="h-6 bg-gray-200 mt-2 rounded-md w-3/4"></div>
      <div className="h-6 bg-gray-200 mt-2 rounded-md w-1/2"></div>
    </div>
  );
};

export default LoadingSkeleton;
