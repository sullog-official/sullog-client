import classNames from 'classnames/bind';
import Image from 'next/image';

import styles from './Card.module.scss';

const cx = classNames.bind(styles);

type CardProps = {
  alt: string;
  imageUrl: string;
};

const Card = ({ alt, imageUrl }: CardProps) => {
  return (
    <figure className={cx('wrapper')}>
      <Image src={imageUrl} alt={alt} fill style={{ objectFit: 'cover' }} />
    </figure>
  );
};

export default Card;
