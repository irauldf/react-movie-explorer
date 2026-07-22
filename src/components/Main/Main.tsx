import type { MainProps } from "./Main.types";

export function Main(props: MainProps) {
  return <main className="main">{props.children}</main>;
}
