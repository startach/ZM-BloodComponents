import { Button } from "semantic-ui-react"
import Styles from "./_Button.module.scss"
import { SemanticCOLORS } from "semantic-ui-react/dist/commonjs/generic"

type ButtonProps = {
  onClick: () => void,
  title: string,
  color?: SemanticCOLORS,
  isFluid?: boolean,
  isFull?: boolean,
}

export default function ZMButton(
  { onClick, title, color, isFluid, isFull = true }: ButtonProps
) {
  return (
    <Button
      onClick={onClick}
      fluid={isFluid}
      className={color ? "" : Styles["zm-btn"] }
      color={color}
      basic={!isFull}
      content={title} />
  );
}
