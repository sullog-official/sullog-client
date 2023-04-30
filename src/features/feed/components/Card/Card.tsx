import classNames from 'classnames/bind';
import Image from 'next/image';

import styles from './Card.module.scss';

const cx = classNames.bind(styles);

const Card = () => {
  return (
    <button
      type="button"
      className={cx('wrapper')}
      aria-label="피드로 이동하기"
    >
      <Image src={'https://placehold.co/100x100'} alt="sample" fill />
    </button>
  );
};

export default Card;
