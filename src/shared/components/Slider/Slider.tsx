import classNames from 'classnames/bind';
import { InputHTMLAttributes } from 'react';

import styles from './Slider.module.scss';

const cx = classNames.bind(styles);

type SliderProps = Pick<
  InputHTMLAttributes<HTMLInputElement>,
  'className' | 'style'
> & {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  minLabel?: string;
  maxLabel?: string;
  onChange: (value: number) => void;
};

const Slider = ({
  value,
  min = 0,
  max = 10,
  minLabel = min.toString(),
  maxLabel = max.toString(),
  step = 1,
  className,
  style,
  onChange,
}: SliderProps) => {
  const railPercent = ((value - min) / (max - min)) * 100;

  return (
    <div className={cx('slider-container', className)} style={style}>
      <div className={cx('slider-wrapper')}>
        <div className={cx('track')} />
        <span className={cx('rail')} style={{ width: `${railPercent}%` }} />
        <div className={cx('marks')}>
          {Array(max - min + 1)
            .fill(0)
            .map((_, index) => min + index)
            .map((markValue, index) => (
              <span
                key={markValue}
                className={cx('mark', {
                  'mark--visible': index % step === 0,
                  'mark--filled': markValue <= value,
                })}
              />
            ))}
        </div>
        <input
          className={cx('slider')}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
        />
      </div>
      <div className={cx('labels')}>
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  );
};

export default Slider;
