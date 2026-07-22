import { ErrorMessageProps } from "./ErrorMessage.types";

export function ErrorMessage(props: ErrorMessageProps) {
  return <p className="error">
    <span>⛔</span>{props.message}</p>;
}
