import classNames from 'classnames/bind';
import { BeatLoader } from 'react-spinners';

import styles from './Loading.module.scss';

const cx = classNames.bind(styles);

const Loading = () => {
  return (
    <div className={cx('wrapper')}>
      <BeatLoader color="#3e14b4" />
    </div>
  );
};

export default Loading;
