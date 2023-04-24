import classNames from 'classnames/bind';
import { debounce, isNil } from 'lodash-es';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import styles from './Slider.module.scss';

const cx = classNames.bind(styles);

type SliderProps = {
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  minLabel?: string;
  maxLabel?: string;
  className?: string;
  style?: React.CSSProperties;
  name?: string;
  onChange?: (value: number) => void;
  useDebounce?: boolean;
  readOnly?: boolean;
};

const Slider = ({
  min = 0,
  max = 10,
  value: outerValue = min,
  minLabel = min.toString(),
  maxLabel = max.toString(),
  step = 1,
  className,
  style,
  name,
  onChange,
  useDebounce = false,
  readOnly = false,
}: SliderProps) => {
  const [value, setValue] = useState(outerValue);

  const railPercent = isNil(value) ? 0 : ((value - min) / (max - min)) * 100;

  useEffect(() => {
    setValue(outerValue);
  }, [outerValue]);

  const debouncedChange = useMemo(
    () => onChange && debounce(onChange, 300),
    [onChange]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (readOnly) return;

      const currentValue = parseInt(e.target.value);
      setValue(currentValue);
      (useDebounce ? debouncedChange : onChange)?.(currentValue);
    },
    [debouncedChange, onChange, readOnly, useDebounce]
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
                  'mark--filled': !isNil(value) && markValue <= value,
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
          name={name}
          readOnly={readOnly}
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
