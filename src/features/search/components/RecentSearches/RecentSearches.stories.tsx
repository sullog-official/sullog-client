import type { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';

import RecentSearches from './RecentSearches';

export default {
  component: RecentSearches,
  args: {
    items: [
      '술',
      '맥주',
      '소주',
      '막걸리',
      '와인',
      '맥주',
      '소주',
      '막걸리',
      '와인',
    ],
  },
} as Meta<typeof RecentSearches>;

export const Default: StoryFn<typeof RecentSearches> = (args) => {
  const [items, setItems] = useState(args.items);

  const onDeleteAll = () => {
    setItems([]);
  };

  const onDeleteItem = (item: string) => {
    setItems((prev) => prev?.filter((item) => item !== item));
  };

  const onClickItem = (item: string) => {
    if (items) {
      console.log(item);
    }
  };

  const onReset = () => {
    console.log('reset');
  };

  return (
    <RecentSearches
      items={items}
      onDeleteItem={onDeleteItem}
      onClickItem={onClickItem}
      // @ts-ignore
      onDeleteAll={onDeleteAll}
      onReset={onReset}
    />
  );
};

export const Scroll: StoryFn<typeof RecentSearches> = (args) => {
  const [items, setItems] = useState(args.items);

  const onDeleteAll = () => {
    setItems([]);
  };

  const onDeleteItem = (item: string) => {
    setItems((prev) => prev?.filter((item) => item !== item));
  };

  const onClickItem = (item: string) => {
    if (items) {
      console.log(item);
    }
  };

  const onReset = () => {
    console.log('reset');
  };

  return (
    <div style={{ height: '100px' }}>
      <RecentSearches
        items={items}
        onDeleteItem={onDeleteItem}
        onClickItem={onClickItem}
        // @ts-ignore
        onDeleteAll={onDeleteAll}
        onReset={onReset}
      />
    </div>
  );
};
