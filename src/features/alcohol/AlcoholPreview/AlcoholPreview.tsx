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
    <div className={cx('alcohol-preview-container')}>
      <div className={cx('alcohol-info')}>
        <div className={cx('alcohol-header')}>
          <span className={cx('alcohol-name')}>{props.name}</span>
          <span className={cx('alcohol-brand')}>{props.brand}</span>
        </div>
        <p className={cx('alcohol-desc')}>{props.description}</p>
      </div>
      <Image
        src={props.imgSrc}
        alt="술 이름"
        className={cx('alcohol-image')}
        width={100}
        height={100}
      />
    </div>
  );
};

export default AlcoholPreview;
