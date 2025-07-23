import React from "react";
import classNames from "classnames";

export const Card = ({ children, className, ...props }) => {
  return (
    <div
      className={classNames(
        "rounded-2xl shadow-md bg-white p-4 border border-gray-200",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardContent = ({ children, className, ...props }) => {
  return (
    <div
      className={classNames("text-sm text-gray-700", className)}
      {...props}
    >
      {children}
    </div>
  );
};
