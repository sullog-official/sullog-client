import classNames from 'classnames/bind';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import AlcoholPreview from '@/features/alcohol/components/AlcoholPreview';
import Icon from '@/shared/components/Icon';
import { Experience } from '@/shared/types/Experience';

import styles from './Slider.module.scss';

const cx = classNames.bind(styles);

type SliderProps = {
  items: Experience[];
};

const Slider = ({ items }: SliderProps) => {
  return (
    <Swiper className={cx('slider')} slidesPerView="auto" centeredSlides>
      {items.map((item) => {
        return (
          <SwiperSlide className={cx('slide')} key={item.seq}>
            <AlcoholPreview
              name={item.name}
              brand={item.manufacturer}
              description={item.etc}
              imgSrc=""
            />
          </SwiperSlide>
        );
      })}
      {items.length > 0 && (
        <SwiperSlide className={cx('slide')}>
          <button
            type="button"
            className={cx('add-btn')}
            onClick={() => {
              // navigate to 둘러보기
            }}
          >
            <Icon name="Plus" size={24} style={{ marginBottom: 4 }} />
            <span className={cx('add-btn-text')}>더보기</span>
          </button>
        </SwiperSlide>
      )}
    </Swiper>
  );
};

export default Slider;
