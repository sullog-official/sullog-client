import classNames from 'classnames/bind';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { debounce } from 'lodash-es';

import styles from './Slider.module.scss';

const cx = classNames.bind(styles);

type SliderProps = {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  minLabel?: string;
  maxLabel?: string;
  className?: string;
  style?: React.CSSProperties;
  onChange: (value: number) => void;
  useDebounce?: boolean;
};

const Slider = ({
  value: outerValue,
  min = 0,
  max = 10,
  minLabel = min.toString(),
  maxLabel = max.toString(),
  step = 1,
  className,
  style,
  onChange,
  useDebounce = false,
}: SliderProps) => {
  const [value, setValue] = useState(outerValue);

  const railPercent = ((value - min) / (max - min)) * 100;

  useEffect(() => {
    setValue(outerValue);
  }, [outerValue]);

  const debouncedChange = useMemo(() => debounce(onChange, 300), [onChange]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const currentValue = parseInt(e.target.value);
      setValue(currentValue);

      useDebounce ? debouncedChange(currentValue) : onChange(currentValue);
    },
    [debouncedChange, onChange, useDebounce]
  );

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
          onChange={handleChange}
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
