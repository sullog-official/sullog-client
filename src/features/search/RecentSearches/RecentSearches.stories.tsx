import type { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';

import RecentSearches from './RecentSearches';

export default {
  component: RecentSearches,
  args: {
    items: [
      { id: 1, name: '항목1' },
      { id: 2, name: '항목2' },
    ],
  },
} as Meta<typeof RecentSearches>;

export const Default: StoryFn<typeof RecentSearches> = (args) => {
  const [items, setItems] = useState(args.items);

  const onDeleteAll = () => {
    setItems([]);
  };

  const onDeleteItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const onClickItem = (id: number) => {
    console.log(items[id]);
  };

  return (
    <>
      <RecentSearches
        items={items}
        onDeleteItem={onDeleteItem}
        onClickItem={onClickItem}
        onDeleteAll={onDeleteAll}
      />
    </>
  );
};
