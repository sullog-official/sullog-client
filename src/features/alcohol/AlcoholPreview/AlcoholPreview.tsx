import classNames from 'classnames/bind';
import Image from 'next/image';

import styles from './AlcoholPreview.module.scss';

const cx = classNames.bind(styles);

type AlcoholPreviewProps = {
  name: string;
  brand: string;
  description: string;
  imgSrc: string;
};

const AlcoholPreview = ({
  name,
  brand,
  description,
  imgSrc,
}: AlcoholPreviewProps) => {
  return (
    <div className={cx('container')}>
      <div className={cx('info-container')}>
        <div className={cx('header')}>
          <span className={cx('name')}>{name}</span>
          <span className={cx('brand')}>{brand}</span>
        </div>
        <p className={cx('desc')}>{description}</p>
      </div>
      <Image
        src={imgSrc}
        alt={name}
        className={cx('image')}
        width={100}
        height={100}
      />
    </div>
  );
};

export default AlcoholPreview;
