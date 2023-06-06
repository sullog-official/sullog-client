import classNames from 'classnames/bind';
import { useRouter } from 'next/router';

import { mapoFlowerIsland } from '@/assets/styles/fonts';
import Icon from '@/shared/components/Icon';

import styles from './TopNavigator.module.scss';
const cx = classNames.bind(styles);

type TopNavigatorProps = {
  title: string;
  onBack?: VoidFunction;
  /** default: true */
  showBackButton?: boolean;
  extra?: React.ReactNode;
  highlighted?: boolean;
  children?: React.ReactNode;
  /** default: 'white' */
  backgroundColor?: 'white' | 'transparent';
};

const TopNavigator = ({
  title,
  onBack,
  showBackButton = true,
  extra,
  highlighted,
  children,
  backgroundColor = 'white',
}: TopNavigatorProps) => {
  const router = useRouter();

  return (
    <div className={cx('container')}>
      <nav className={cx('wrapper', backgroundColor)}>
        {showBackButton && (
          <button
            type="button"
            aria-label="뒤로가기"
            className={cx('back-btn')}
            onClick={onBack ?? router.back}
          >
            <Icon name="Back" size={12} />
          </button>
        )}
        <h1
          className={cx('title', { highlighted })}
          style={highlighted ? mapoFlowerIsland.style : {}}
        >
          {title}
        </h1>
        {extra && <div className={cx('extra')}>{extra}</div>}
      </nav>
      {children}
    </div>
  );
};

export default TopNavigator;
