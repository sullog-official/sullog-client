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

const AlcoholPreview = (props: AlcoholPreviewProps) => {
  return (
    <div className={cx('container')}>
      <div className={cx('info-container')}>
        <div className={cx('header')}>
          <span className={cx('name')}>{props.name}</span>
          <span className={cx('brand')}>{props.brand}</span>
        </div>
        <p className={cx('desc')}>{props.description}</p>
      </div>
      <Image
        src={props.imgSrc}
        alt={props.name}
        className={cx('image')}
        width={100}
        height={100}
      />
    </div>
  );
};

export default AlcoholPreview;
