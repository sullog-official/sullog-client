import classNames from 'classnames/bind';
import { useEffect, useState, ChangeEvent } from 'react';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/scss';
import 'swiper/scss/pagination';

import Icon from '@/shared/components/Icon';

import styles from './ImageSwiper.module.scss';

const cx = classNames.bind(styles);

type Image = { url?: string; file?: File | null };

type ImageSwiperProps = {
  mode?: 'read' | 'edit';
  /* 이미지 url 배열 */
  images?: Image[];
  /* 스와이퍼의 이미지가 바뀔때마다 호출 */
  onImagesChange?: (images: Image[]) => void;
  /* 업로드 가능한 최대 이미지 개수 */
  max?: number;
};

const ImageSwiper = ({
  mode = 'read',
  images: defaultImages = [],
  onImagesChange,
  max = 3,
}: ImageSwiperProps) => {
  const [images, setImages] = useState<Image[]>(defaultImages.slice(0, max));
  const [activeIndex, setActiveIndex] = useState(0);

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

  const addImages = (e: ChangeEvent<HTMLInputElement>) => {
    const imageFiles = e.target.files;
    if (!imageFiles) {
      return;
    }

    const imageFilesArray = Array.from(imageFiles);

    if (!imageFilesArray.every((file) => file.type.startsWith('image/'))) {
      alert('이미지만 업로드 가능합니다.');
      return;
    }

    if (images.length + imageFilesArray.length > max) {
      alert(`이미지는 최대 ${max}장까지 업로드 가능합니다.`);
    }

    const splicedImages = imageFilesArray.slice(0, max - images.length);
    if (!splicedImages.length) {
      return;
    }

    const newImages = splicedImages.map((file) => ({
      url: URL.createObjectURL(file),
      file,
    }));

    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  return (
    <div className={cx('swiper-wrap')}>
      <Swiper
        className={cx('swiper')}
        modules={[Pagination]}
        pagination
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
      >
        {images.slice(0, max).map(({ url: imageUrl }, index) => (
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
          <label className={cx('add-button')}>
            <input
              type="file"
              accept="image/*"
              aria-label="이미지 추가"
              onChange={addImages}
              hidden
              multiple
            />
            <Icon name="Plus" color="white" size={24} />
          </label>
        )}
    </div>
  );
};

export default ImageSwiper;
