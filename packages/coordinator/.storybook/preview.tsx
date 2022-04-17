import React from "react";
import WithGlobalTheme from "../src/HOCs/withGlobalTheme";
import { Story, StoryContext } from "@storybook/react";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import "../src/styles/index.scss";
import { Parameters } from "@storybook/addons/dist/ts3.9/types";
import { MemoryRouter } from "react-router-dom";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { he } from "date-fns/locale";

export const parameters: Parameters = {
  viewport: {
    viewports: {
      zmTabletSmall: {
        name: "ZM tablet (Small)",
        styles: {
          width: "900px",
          height: "1600px",
        },
        type: "tablet",
      },
      zmTabletBig: {
        name: "ZM tablet (Big)",
        styles: {
          width: "1200px",
          height: "2000px",
        },
        type: "tablet",
      },
      ...INITIAL_VIEWPORTS,
    },
    defaultViewport: "iphonex",
  },
  options: {
    storySort: {
      method: "alphabetical",
    },
  },
};

const withMuiProvider = (Story: Story, context: StoryContext) => {
  return (
    <div dir="rtl" style={{ height: "100vh" }}>
      <MemoryRouter>
        <WithGlobalTheme>
          <LocalizationProvider dateAdapter={AdapterDateFns} locale={he}>
            <Story {...context} />
          </LocalizationProvider>
        </WithGlobalTheme>
      </MemoryRouter>
    </div>
  );
};
export const decorators = [withMuiProvider];
