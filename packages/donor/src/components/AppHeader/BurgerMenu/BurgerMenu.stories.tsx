import { BurgerMenu, IBurgerMenuProps } from "./index";

export default {
  component: BurgerMenu,
  title: "Components V1/BurgerMenu",
  decorators: [
    (Story: any) => (
      <div
        style={{
          margin: "10px",
          background: "black",
          height: "40px",
          width: "400px",
        }}
      >
        <Story />
      </div>
    ),
  ],
};

const baseArgs = {
  onClick: () => {},
};

export const Basic = (args: IBurgerMenuProps) => <BurgerMenu {...args} />;
Basic.args = baseArgs;
