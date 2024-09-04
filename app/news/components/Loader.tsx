import { CircularProgress } from "@mui/material";
import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <CircularProgress />
    </div>
  );
};

export default Loader;
