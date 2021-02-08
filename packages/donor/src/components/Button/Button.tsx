import { Button } from "semantic-ui-react";
import Styles from "./_Button.module.scss";
import { SemanticCOLORS } from "semantic-ui-react/dist/commonjs/generic";
import classnames from "classnames";

type ButtonProps = {
  onClick: () => void;
  title: string;
  color?: SemanticCOLORS;
  isFluid?: boolean;
  isFull?: boolean;
  className?: string;
};

export default function ZMButton({
  onClick,
  title,
  color,
  isFluid,
  isFull = true,
  className,
}: ButtonProps) {
  return (
    <Button
      onClick={onClick}
      fluid={isFluid}
      className={classnames({ [Styles["zm-btn"]]: !color, className })}
      color={color}
      basic={!isFull}
      content={title}
    />
  );
}
