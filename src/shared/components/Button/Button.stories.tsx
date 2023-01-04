import type { Meta, StoryObj } from "@storybook/react";

import Button from "./Button";

export default {
  title: "Button",
  component: Button,
} as Meta<typeof Button>;

export const FirstStory: StoryObj<typeof Button> = {
  args: {
    children: "버튼",
  },
};
