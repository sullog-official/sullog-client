import classNames from 'classnames/bind';
import { BeatLoader } from 'react-spinners';

import color from '@/assets/styles/themes/_color.module.scss';

import styles from './Loading.module.scss';

const cx = classNames.bind(styles);

const Loading = () => {
  return (
    <div className={cx('wrapper')}>
      <BeatLoader color={color.purple} />
    </div>
  );
};

export default Loading;
