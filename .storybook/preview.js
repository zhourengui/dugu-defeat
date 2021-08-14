import "../src/styles/index.scss";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

import { addDecorator } from "@storybook/react";
import { withDesign } from "storybook-addon-designs";
import { themes } from "@storybook/theming";

addDecorator(withDesign);

library.add(fas);

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  darkMode: {
    dark: { ...themes.dark, appBg: "black" },
    light: { ...themes.normal, appBg: "white" },
  },
};

export const decorators = [
  (Story) => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Story />
    </div>
  ),
];
