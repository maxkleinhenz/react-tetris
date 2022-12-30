import React from "react";

type Props = {
  title: string;
  action: () => void;
  children: React.ReactNode;
};

const ControllerButton: React.FC<Props> = (props) => {
  return (
    <button
      className="rounded-full p-3 w-12 h-12"
      title={props.title}
      onClick={props.action}
    >
      {props.children}
    </button>
  );
};

export default ControllerButton;
