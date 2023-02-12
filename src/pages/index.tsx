import classNames from 'classnames/bind';
import Map from '@/features/home/components/Map';

import styles from './index.module.scss';

const cx = classNames.bind(styles);

export default function Home() {
  return (
    <main className={cx('main')}>
      <Map records={[]} />
    </main>
  );
}
