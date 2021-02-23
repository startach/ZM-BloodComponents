import React from "react";
import styles from "./Card.module.scss";
import classNames from "classnames";

export interface CardProps extends React.HTMLProps<HTMLDivElement> {}

function Card({ className, ...props }: CardProps) {
  return <div className={classNames(styles.component, className)} {...props} />;
}

export default Card;
