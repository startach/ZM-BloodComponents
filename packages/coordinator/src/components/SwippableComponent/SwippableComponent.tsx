import React, { TouchEventHandler, useState } from "react";

export type AppointmentPreviewProps = {
  onClick: () => void;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  children: React.ReactNode;
  className?: string;
};

export default function SwippableComponent(props: AppointmentPreviewProps) {
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart: TouchEventHandler = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove: TouchEventHandler = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 150) {
      props.onSwipeLeft();
    } else if (touchStart - touchEnd < -150) {
      props.onSwipeRight();
    }
  };

  return (
    <div
      className={props.className}
      onClick={props.onClick}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {props.children}
    </div>
  );
}
