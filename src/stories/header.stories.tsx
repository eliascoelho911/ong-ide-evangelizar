// Header.stories.tsx
import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Header } from '@/components/templates/header';
import { User } from '@/lib/types';
import { SearchForm } from '@/components/ui/search-form';
import "@/app/ui/global.css";

export default {
  title: 'UI/Header', 
  component: Header,
} as Meta;

const user = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@email.com',
    id: '123',
    username: 'johndoe',
    avatar: 'https://i.pravatar.cc/150?img=68',
} satisfies User;

const Template: StoryFn = (args) => (
  <Header user={user} {...args}>
    <SearchForm />
  </Header>
);

export const Default = Template.bind({});
Default.args = {};
