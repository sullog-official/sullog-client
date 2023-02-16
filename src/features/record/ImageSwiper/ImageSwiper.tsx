import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/scss';
import 'swiper/scss/pagination';

import Icon from '@/shared/components/Icon';

import styles from './ImageSwiper.module.scss';

const cx = classNames.bind(styles);

type ImageSwiperProps = {
  mode?: 'read' | 'edit';
  /* 이미지 url 배열 */
  images?: string[];
  /* 스와이퍼의 이미지가 바뀔때마다 호출 */
  onImagesChange?: (images: string[]) => void;
  /* 업로드 가능한 최대 이미지 개수 */
  max?: number;
};

const ImageSwiper = ({
  mode = 'read',
  images: defaultImages = [],
  onImagesChange,
  max = 3,
}: ImageSwiperProps) => {
  const [images, setImages] = useState(defaultImages);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setImages(defaultImages);
  }, [defaultImages]);

  useEffect(() => {
    if (mode === 'edit') {
      onImagesChange?.(images.slice(0, max));
    }
  }, [mode, images, max, onImagesChange]);

  const deleteImage = (selectedIndex: number) => {
    setImages((prevImages) =>
      prevImages.filter((_, index) => index !== selectedIndex)
    );
  };

  const addImages = () => {
    // TODO
  };

  return (
    <div className={cx('swiper-wrap')}>
      <Swiper
        className={cx('swiper')}
        modules={[Pagination]}
        pagination
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
      >
        {images.slice(0, max).map((imageUrl, index) => (
          <SwiperSlide key={index} className={cx('slide')}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className={cx('slide-image')}
              src={imageUrl}
              alt={`4개 이미지 중 ${index}번째 이미지`}
            />
            {mode === 'edit' && (
              <button
                type="button"
                className={cx('delete-button')}
                aria-label={`${index}번째 이미지 삭제`}
                onClick={() => deleteImage(index)}
              >
                <Icon name="Close" size={12} color="white" />
              </button>
            )}
          </SwiperSlide>
        ))}
        {mode === 'edit' &&
          Array(max - Math.min(images.length, max))
            .fill(0)
            .map((_, index) => (
              <SwiperSlide key={index} className={cx('slide', 'empty-slide')}>
                <Icon name="Photo" size={46} />
              </SwiperSlide>
            ))}
      </Swiper>
      {mode === 'edit' &&
        images.length < max &&
        activeIndex > images.length - 1 && (
          <button
            type="button"
            className={cx('add-button')}
            aria-label="이미지 추가"
            onClick={addImages}
          >
            <Icon name="Plus" color="white" size={24} />
          </button>
        )}
    </div>
  );
};

export default ImageSwiper;
