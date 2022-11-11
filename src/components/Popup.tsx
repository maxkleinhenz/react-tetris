import React from "react";

type Props = {
  title: string;
  text?: string;
  buttonText: string;
  buttonAction: () => void;
};

const Popup = (props: Props) => {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-12 py-7 text-slate-600 text-center bg-slate-100 rounded-md drop-shadow-lg">
      <h2 className="m-0 p-0 mb-4">{props.title}</h2>
      {props.text && <p className="mb-4">{props.text}</p>}
      <button
        className="border-2 border-slate-500 rounded-lg px-4 py-1 text-base"
        onClick={props.buttonAction}
      >
        {props.buttonText}
      </button>
    </div>
  );
};

export default Popup;
