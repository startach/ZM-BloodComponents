import "../src/styles/index.scss";
import { Story, StoryContext } from "@storybook/react";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import { MemoryRouter } from "react-router-dom";
import WithGlobalTheme from "../src/HOCs/withGlobalTheme";

export const parameters = {
  viewport: {
    viewports: INITIAL_VIEWPORTS,
    defaultViewport: "iphonex",
  },
  options: {
    storySort: {
      method: "alphabetical",
    },
  },
};

const withMuiProvider = (StoryFn: Story, context: StoryContext) => {
  return (
    <div dir="rtl" style={{ height: "100vh" }}>
      <MemoryRouter>
        <WithGlobalTheme>
          <StoryFn {...context} />
        </WithGlobalTheme>
      </MemoryRouter>
    </div>
  );
};
export const decorators = [withMuiProvider];
