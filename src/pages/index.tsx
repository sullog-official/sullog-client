import classNames from 'classnames/bind';

import styles from './index.module.scss';

const cx = classNames.bind(styles);

export default function Home() {
  return <main className={cx('main')}>Home</main>;
}
