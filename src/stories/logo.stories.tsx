// Logo.stories.tsx
import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Logo from '../components/ui/logo';

export default {
  title: 'UI/Logo', 
  component: Logo,
} as Meta;

const Template: StoryFn = (args) => <Logo {...args} />;

export const Default = Template.bind({});
Default.args = {};
