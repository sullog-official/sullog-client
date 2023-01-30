import classNames from 'classnames/bind';
import { useCallback, useState } from 'react';
import { isNil } from 'lodash-es';
import Icon from '@/shared/components/Icon';

import styles from './Rating.module.scss';

const cx = classNames.bind(styles);

type RatingProps = {};

const MIN = 0;
const MAX = 5;
const STEP = 0.5;

const Rating = (props: RatingProps) => {
  const [value, setValue] = useState<number>();

  const handleSliderChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(parseFloat(e.target.value));
    },
    []
  );

  return (
    <div className={cx('wrapper')}>
      <label className={cx('label')} htmlFor="points">
        드래그해서 별점을 입력해보세요.
      </label>
      <div className={cx('slider-wrapper')}>
        <div className={cx('stars')}>
          {Array(MAX)
            .fill(0)
            .map((_, index) => index + 1)
            .map((v, index) => (
              <span key={index} className={cx('star')}>
                <Icon
                  name="HalfStar"
                  size={12}
                  color={
                    !isNil(value) && v - STEP <= value ? 'purple' : 'grey200'
                  }
                />
                <Icon
                  className={cx('half-star--flipped')}
                  name="HalfStar"
                  size={12}
                  color={!isNil(value) && v <= value ? 'purple' : 'grey200'}
                />
              </span>
            ))}
        </div>
        <input
          className={cx('slider')}
          type="range"
          name="points"
          min={MIN}
          max={MAX}
          step={STEP}
          value={value}
          onChange={handleSliderChange}
        />
      </div>
    </div>
  );
};

export default Rating;
