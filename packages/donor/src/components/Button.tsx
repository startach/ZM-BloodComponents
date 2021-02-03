import React from "react";

export default function Button(
  props: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
) {
  return (
    <div>
      <button {...props} style={{ height: 100, width: 100 }}>
        {props.title}
      </button>
    </div>
  );
}
