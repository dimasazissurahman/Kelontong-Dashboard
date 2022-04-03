import React, { ButtonHTMLAttributes } from "react";

import styles from "./button.module.css";

type Mode = "primary" | "secondary" | "tertiary" | "success" | "danger" | undefined;

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  mode?: Mode;
  children: any;
}

export const Button = (props: IButtonProps) => {
  const { mode, children, ...rest } = props;

  const resolveType = (mode: Mode) => {
    let current = "";

    switch (mode) {
      case "primary":
        current = styles.buttonPrimary;
        break;
      case "secondary":
        current = styles.buttonSecondary;
        break;
      case "tertiary":
        current = styles.buttonTertiary;
        break;
      case "success":
        current = styles.buttonSuccess;
        break;
      case "danger":
        current = styles.buttonDanger;
        break;
      default:
        current = styles.buttonPrimary;
    }

    return current;
  };

  return (
    <button className={resolveType(mode)} {...rest}>
      {children}
    </button>
  );
};