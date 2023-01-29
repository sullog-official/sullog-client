import classNames from 'classnames/bind';

import Icon from '@/shared/components/Icon';
import styles from './BottomNavigator.module.scss';

const cx = classNames.bind(styles);

const BottomNavigator = () => {
  return (
    <nav className={cx('nav')}>
      <button className={cx('writeBtn')}>
        <Icon name="Write" size={16} />
        <p>글쓰기</p>
      </button>
      <div className={cx('container')}>
        <button className={cx('navBtn')}>
          <Icon name="Feed" size={28} />
          <p>둘러보기</p>
        </button>
        <button className={cx('navBtn')}>
          <Icon name="Menu" size={20} />
          <p>메뉴</p>
        </button>
      </div>
    </nav>
  );
};

export default BottomNavigator;
