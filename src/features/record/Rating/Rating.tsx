import classNames from 'classnames/bind';
import { isNil } from 'lodash-es';
import { useCallback, useState } from 'react';

import Icon from '@/shared/components/Icon';

import styles from './Rating.module.scss';

const cx = classNames.bind(styles);

type RatingProps = {
  className?: string;
  label?: string;
  name?: string;
};

const MIN = 0;
const MAX = 5;
const STEP = 0.5;

const Rating = ({ className, label, name }: RatingProps) => {
  const [value, setValue] = useState<number>();

  const handleSliderChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(parseFloat(e.target.value));
    },
    []
  );

  return (
    <div className={cx('container', className)}>
      {label && (
        <label className={cx('label')} htmlFor={name}>
          {label}
        </label>
      )}
      <div className={cx('wrapper')}>
        <span className={cx('description')}>
          드래그해서 별점을 입력해보세요.
        </span>
        <div className={cx('slider-wrapper')}>
          <div className={cx('stars')}>
            {Array(MAX)
              .fill(0)
              .map((_, index) => index + 1)
              .map((starValue, index) => (
                <span key={index} className={cx('star')}>
                  <Icon
                    name="HalfStar"
                    size={12}
                    color={
                      !isNil(value) && starValue - STEP <= value
                        ? 'purple'
                        : 'grey200'
                    }
                  />
                  <Icon
                    className={cx('half-star--flipped')}
                    name="HalfStar"
                    size={12}
                    color={
                      !isNil(value) && starValue <= value ? 'purple' : 'grey200'
                    }
                  />
                </span>
              ))}
          </div>
          <input
            className={cx('slider')}
            type="range"
            name={name}
            min={MIN}
            max={MAX}
            step={STEP}
            value={value}
            onChange={handleSliderChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Rating;
