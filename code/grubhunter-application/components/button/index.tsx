import React, { ReactNode } from "react";
import styles from "./index.module.css";

interface Props {
  disabled?: boolean;
  children: ReactNode;
  variant?: "default" | "blue" | "outline";
  clickHandler?: () => void;
}

const Button = ({
  disabled = false,
  children,
  variant = "default",
  clickHandler,
}: Props) => {
  const renderContent = (content: ReactNode) => {
    if (disabled) {
      return <span>{content}</span>;
    }

    return <span onClick={clickHandler}>{content}</span>;
  };

  const className = [
    styles.root,
    disabled ? styles.disabled : styles[variant],
  ].join(" ");

  return <div className={className}>{renderContent(children)}</div>;
};

export default Button;