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
  showLabels?: boolean;
  minLabel?: string;
  maxLabel?: string;
  onChange: (value: number) => void;
};

const Slider = ({
  value,
  min = 0,
  max = 10,
  showLabels = false,
  minLabel = min.toString(),
  maxLabel = max.toString(),
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
            .map((_, index) => (
              <span
                key={index}
                className={cx('mark', { 'mark--filled': min + index <= value })}
              />
            ))}
        </div>
        <input
          className={cx('slider')}
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
        />
      </div>
      {showLabels && (
        <div className={cx('labels')}>
          <span>{minLabel}</span>
          <span>{maxLabel}</span>
        </div>
      )}
    </div>
  );
};

export default Slider;
