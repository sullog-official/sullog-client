import classNames from 'classnames/bind';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import AlcoholPreview from '@/features/alcohol/AlcoholPreview';
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
    </Swiper>
  );
};

export default Slider;
