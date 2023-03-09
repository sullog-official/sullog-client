import type { Meta, StoryFn } from '@storybook/react';
import classNames from 'classnames/bind';

import color from './_color.module.scss';
import zIndex from './_z-index.module.scss';
import styles from './theme-story.module.scss';

const cx = classNames.bind(styles);

export default {
  title: 'Themes',
} as Meta;

export const Color: StoryFn = () => {
  return (
    <section className={cx('section')}>
      <h1>Color Tokens</h1>
      {['white', 'black', 'purple', 'lightPurple', 'grey'].map((colorName) => (
        <ul key={colorName} className={cx('color-list')}>
          {Object.entries(color)
            .filter(([key]) => key.startsWith(colorName))
            .map(([key, value]) => (
              <li key={key} className={cx('color-list-item')}>
                <div
                  className={cx('color-block')}
                  style={{ backgroundColor: value as string }}
                />
                <b>{key}</b>
                <span>{value as string}</span>
              </li>
            ))}
        </ul>
      ))}
    </section>
  );
};

export const Typography: StoryFn = () => {
  return (
    <section className={cx('section')}>
      <h1>Typography</h1>
      <h2>title</h2>
      <ul className={cx('typography-list')}>
        {['title40', 'title26', 'title20', 'title18'].map((name) => (
          <li key={name} className={cx(name)}>
            {name}
          </li>
        ))}
      </ul>
      <h2>body</h2>
      <ul className={cx('typography-list')}>
        {['body16', 'body15', 'body14', 'body13'].map((name) => (
          <li key={name} className={cx(name)}>
            {name}
          </li>
        ))}
      </ul>
      <h2>caption</h2>
      <ul className={cx('typography-list')}>
        {['caption12', 'caption11', 'caption10'].map((name) => (
          <li key={name} className={cx(name)}>
            {name}
          </li>
        ))}
      </ul>
    </section>
  );
};

export const ZIndex: StoryFn = () => {
  return (
    <section className={cx('section')}>
      <h1>ZIndex</h1>
      <ul className={cx('z-index-list')}>
        {Object.entries(zIndex).map(([key, value]) => (
          <li key={key} className={cx('z-index-list-item')}>
            {`${key}: ${value}`}
          </li>
        ))}
      </ul>
    </section>
  );
};
