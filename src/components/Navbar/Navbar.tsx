import type { NavbarProps } from "./Navbar.types";

export function Navbar(props: NavbarProps) {
  return <nav className="nav-bar">{props.children}</nav>;
}
