import classNames from 'classnames/bind';
import Image from 'next/image';

import styles from './AlcoholPreview.module.scss';

const cx = classNames.bind(styles);

type AlcoholPreviewProps = {
  name: string;
  brand: string;
  description: string;
  imgSrc: string;
  highlightKeyword?: string;
};

const AlcoholPreview = ({
  name,
  brand,
  description,
  imgSrc,
  highlightKeyword,
}: AlcoholPreviewProps) => {
  const highlightText = (text: string) => {
    if (!highlightKeyword) {
      return text;
    }

    if (!text.includes(highlightKeyword)) {
      return text;
    }

    const parts = text.split(new RegExp(`(${highlightKeyword})`, 'gi'));
    return (
      <>
        {parts.map((part, index) =>
          part.toLowerCase() === highlightKeyword.toLowerCase() ? (
            <mark style={{ background: '#D0C8E8 ' }} key={index}>
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </>
    );
  };

  return (
    <div className={cx('container')}>
      <div className={cx('info-container')}>
        <div className={cx('header')}>
          <span className={cx('name')}>{highlightText(name)}</span>
          <span className={cx('brand')}>{highlightText(brand)}</span>
        </div>
        <p className={cx('desc')}>{highlightText(description)}</p>
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
