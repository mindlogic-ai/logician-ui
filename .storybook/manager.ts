import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming';

// Create custom theme with your logo
const theme = create({
  base: 'dark',
  brandTitle: 'Logician UI @ Mindlogic',
  brandUrl: 'https://mindlogic.ai',
  brandImage: './logician-logo-white.svg',
  brandTarget: '_self',
});

addons.setConfig({
  theme,
});
