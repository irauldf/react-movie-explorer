import { useState } from "react";
import { ContainerBoxProps } from "./ContainerBox.types";

export function ContainerBox(props: ContainerBoxProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "-" : "+"}
      </button>
      {isOpen && props.children}
    </div>
  );
}
