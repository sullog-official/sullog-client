import classNames from 'classnames/bind';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import AlcoholPreview from '@/features/alcohol/components/AlcoholPreview';
import Chip from '@/shared/components/Chip';
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
        /* FIXME: after merge 132 */
        return (
          <SwiperSlide className={cx('slide')} key={item.recordId}>
            <div className={cx('slide-header')}>
              <Icon name="LocationPin" size={10} aria-hidden />
              <span className={cx('alcohol-location')}>
                {item.productionLocation}
              </span>
              <Chip
                className={cx('tag')}
                label={item.alcoholTag || '기타'}
                type="Primary"
                appearance="round"
                size="small"
              />
            </div>
            <AlcoholPreview
              name={item.alcoholName}
              brand={item.brandName}
              description={item.description}
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
