import classNames from 'classnames/bind';

import Icon from '@/shared/components/Icon';

import styles from './TopNavigator.module.scss';
const cx = classNames.bind(styles);

type TopNavigatorProps = {
  type: 'default' | 'personal' | 'writing';
  title: string;
  isCompleted?: boolean;
};

const TopNavigator = ({ type, title, isCompleted }: TopNavigatorProps) => {
  return (
    <nav className={cx('wrapper')}>
      <button type="button" aria-label="Back" className={cx('back-btn')}>
        <Icon name={'Back'} size={12} />
      </button>
      <h1 className={cx('title', type)}>{title}</h1>
      {type === 'writing' && (
        <button type="button" className={cx('write-btn')}>
          <span className={cx('write-label', isCompleted)}>완료</span>
        </button>
      )}
    </nav>
  );
};

export default TopNavigator;
