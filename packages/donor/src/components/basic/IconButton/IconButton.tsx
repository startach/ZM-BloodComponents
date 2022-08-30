import { IconButton as MuiIconButton } from "@mui/material";
import {
  AnalyticsButtonType,
  AnalyticsData,
} from "@zm-blood-components/common";
import { reportClick } from "../../../Analytics";

export type IconButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  edge?: false | "start" | "end";
  size?: "small" | "medium" | "large";
  analytics: AnalyticsData;
};

export default function IconButton({
  onClick,
  children,
  className,
  edge,
  size,
  analytics,
}: IconButtonProps) {
  const handleClick = () => {
    onClick();

    if (!analytics) return;

    reportClick(AnalyticsButtonType.IconButton, analytics.analyticsName);
  };

  return (
    <MuiIconButton
      onClick={handleClick}
      children={children}
      className={className}
      edge={edge}
      size={size}
    />
  );
}
