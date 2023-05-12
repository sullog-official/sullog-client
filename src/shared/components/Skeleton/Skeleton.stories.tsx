import type { Meta, StoryFn, StoryObj } from '@storybook/react';

import Skeleton from './Skeleton';

export default {
  component: Skeleton,
  args: {
    width: '100px',
    height: '30px',
    radius: '10px',
  },
} as Meta<typeof Skeleton>;

export const Default: StoryObj<typeof Skeleton> = {};

export const AlcoholPreviewSkeleton: StoryFn<typeof Skeleton> = () => {
  return (
    <div
      style={{ display: 'flex', alignItems: 'center', padding: '10px 36px' }}
    >
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            margin: '0 0 8px',
          }}
        >
          <Skeleton width="39px" height="20px" />
          <Skeleton width="28px" height="16px" margin="0 0 0 6px" />
        </div>
        <Skeleton width="164px" height="12px" margin="0 0 4px" />
        <Skeleton width="164px" height="12px" margin="0 0 4px" />
        <Skeleton width="134px" height="12px" margin="0 0 4px" />
      </div>
      <Skeleton
        width="100px"
        height="100px"
        radius="10px"
        margin="0 0 0 24px"
      />
    </div>
  );
};
