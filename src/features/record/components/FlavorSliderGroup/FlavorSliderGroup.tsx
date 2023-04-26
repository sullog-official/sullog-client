import classNames from 'classnames/bind';
import { ForwardedRef, forwardRef, useEffect, useState } from 'react';

import Slider from '@/shared/components/Slider';
import { Record } from '@/shared/types/record';

import styles from './FlavorSliderGroup.module.scss';

const cx = classNames.bind(styles);

type Flavor = Partial<
  Pick<Record, 'scentScore' | 'tasteScore' | 'textureScore'>
>;

type FlavorSliderGroupProps = {
  label?: string;
  value?: Flavor;
  readOnly?: boolean;
  className?: string;
  onChange?: (value: Flavor) => void;
};

const FlavorSliderGroup = forwardRef(
  (
    {
      label,
      value = {
        scentScore: undefined,
        tasteScore: undefined,
        textureScore: undefined,
      },
      readOnly = false,
      className,
      onChange,
    }: FlavorSliderGroupProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const handleSliderChange =
      (name: keyof Flavor) => (sliderValue: number) => {
        onChange?.({ ...value, [name]: sliderValue });
      };

    return (
      <div ref={ref} className={cx('container', className)}>
        {label && <span className={cx('label')}>{label}</span>}
        <div className={cx('flavor-slider-group')}>
          <label htmlFor="scentScore">향</label>
          <Slider
            name="scentScore"
            value={value.scentScore}
            onChange={handleSliderChange('scentScore')}
            min={1}
            max={5}
            minLabel="별로다"
            maxLabel="좋다"
            readOnly={readOnly}
          />
          <label htmlFor="tasteScore">맛</label>
          <Slider
            name="tasteScore"
            value={value.tasteScore}
            onChange={handleSliderChange('tasteScore')}
            min={1}
            max={5}
            minLabel="달다"
            maxLabel="쓰다"
            readOnly={readOnly}
          />
          <label htmlFor="textureScore">감촉</label>
          <Slider
            name="textureScore"
            value={value.textureScore}
            onChange={handleSliderChange('textureScore')}
            min={1}
            max={5}
            minLabel="부드러운"
            maxLabel="자극적인"
            readOnly={readOnly}
          />
        </div>
      </div>
    );
  }
);

FlavorSliderGroup.displayName = 'FlavorSliderGroup';

export default FlavorSliderGroup;
