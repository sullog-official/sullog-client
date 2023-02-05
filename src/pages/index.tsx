import classNames from 'classnames/bind';

import styles from './index.module.scss';

const cx = classNames.bind(styles);

export default function Home() {
  return (
    <main className={cx('main')}>
      <h1 className={cx('title')}>나의 술로그</h1>
      <p>안녕하세요</p>
    </main>
  );
}
