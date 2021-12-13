import { Meta, Story } from "@storybook/react";
import SwippableComponent from "./SwippableComponent";
import { useState } from "react";

export default {
  title: "Components/Swippable Component",
  component: SwippableComponent,
} as Meta;

const Template: Story<{}> = (args) => {
  const [swipedDirection, setSwipedDirection] = useState("");
  return (
    <SwippableComponent
      onClick={() => setSwipedDirection("click")}
      onSwipeLeft={() => setSwipedDirection("left")}
      onSwipeRight={() => setSwipedDirection("right")}
    >
      <div
        style={{
          width: 300,
          height: 100,
          backgroundColor: "cyan",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {swipedDirection}
      </div>
    </SwippableComponent>
  );
};

export const Default = Template.bind({});
