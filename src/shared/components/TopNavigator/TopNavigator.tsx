import classNames from 'classnames/bind';
import { useRouter } from 'next/router';

import { mapoFlowerIsland } from '@/assets/styles/fonts';
import Icon from '@/shared/components/Icon';

import styles from './TopNavigator.module.scss';
const cx = classNames.bind(styles);

type TopNavigatorProps = {
  title: string;
  onBack?: VoidFunction;
  extra?: React.ReactNode;
  highlighted?: boolean;
};

const TopNavigator = ({
  title,
  onBack,
  extra,
  highlighted,
}: TopNavigatorProps) => {
  const router = useRouter();

  return (
    <nav className={cx('wrapper')}>
      <button
        type="button"
        aria-label="뒤로가기"
        className={cx('back-btn')}
        onClick={onBack ?? router.back}
      >
        <Icon name="Back" size={12} />
      </button>
      <h1
        className={cx('title', { highlighted })}
        style={highlighted ? mapoFlowerIsland.style : {}}
      >
        {title}
      </h1>
      {extra && <div className={cx('extra')}>{extra}</div>}
    </nav>
  );
};

export default TopNavigator;
