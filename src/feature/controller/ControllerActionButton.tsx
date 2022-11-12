import React from "react";

type Props = {
  title: string;
  action: () => void;
  children: React.ReactNode;
};

const ControllerActionButton: React.FC<Props> = (props) => {
  return (
    <button
      className="rounded-full p-3 w-14 h-14"
      title={props.title}
      onClick={props.action}
    >
      {props.children}
    </button>
  );
};

export default ControllerActionButton;
