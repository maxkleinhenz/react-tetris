import React from "react";

type Props = {
  title: string;
  text?: string;
  buttons?: ModalButton[];
  children?: React.ReactNode;
};

export type ModalButton = {
  text: string;
  action: () => void;
};

const Modal = (props: Props) => {
  return (
    <>
      <div className="absolute inset-0 bg-slate-900 opacity-50"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-12 py-7 text-slate-600 dark:text-white text-center bg-slate-200 dark:bg-slate-800 rounded-md drop-shadow-lg">
        <h2 className="m-0 p-0 mb-4">{props.title}</h2>

        {props.children && <div className="mb-4">{props.children}</div>}

        {props.buttons && (
          <div className="flex gap-5 justify-center mt-10">
            {props.buttons.map((b) => (
              <button
                key={b.text}
                className="rounded-lg px-4 py-1 text-base"
                onClick={b.action}
              >
                {b.text}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Modal;
