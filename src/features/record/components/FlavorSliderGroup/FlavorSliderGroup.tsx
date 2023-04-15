import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import Slider from '@/shared/components/Slider';

import styles from './FlavorSliderGroup.module.scss';

const cx = classNames.bind(styles);

type Flavor = {
  aroma?: number;
  taste?: number;
  texture?: number;
};

type FlavorSliderGroupProps = {
  label?: string;
  value?: Flavor;
  readOnly?: boolean;
  className?: string;
  onValueChange?: (value: Flavor) => void;
};

const FlavorSliderGroup = ({
  label,
  value: defaultValue = {
    aroma: undefined,
    taste: undefined,
    texture: undefined,
  },
  readOnly = false,
  className,
  onValueChange,
}: FlavorSliderGroupProps) => {
  const [value, setValue] = useState<Flavor>(defaultValue);

  useEffect(() => {
    onValueChange?.(value);
  }, [onValueChange, value]);

  const handleSliderChange = (name: keyof Flavor) => (sliderValue: number) => {
    setValue((prev) => ({ ...prev, [name]: sliderValue }));
  };

  return (
    <div className={cx('container', className)}>
      {label && <span className={cx('label')}>{label}</span>}
      <div className={cx('flavor-slider-group')}>
        <label htmlFor="aroma">향</label>
        <Slider
          name="aroma"
          value={value.aroma}
          onChange={handleSliderChange('aroma')}
          min={1}
          max={5}
          minLabel="별로다"
          maxLabel="좋다"
          readOnly={readOnly}
        />
        <label htmlFor="taste">맛</label>
        <Slider
          name="taste"
          value={value.taste}
          onChange={handleSliderChange('taste')}
          min={1}
          max={5}
          minLabel="달다"
          maxLabel="쓰다"
          readOnly={readOnly}
        />
        <label htmlFor="texture">감촉</label>
        <Slider
          name="texture"
          value={value.texture}
          onChange={handleSliderChange('texture')}
          min={1}
          max={5}
          minLabel="부드러운"
          maxLabel="자극적인"
          readOnly={readOnly}
        />
      </div>
    </div>
  );
};

export default FlavorSliderGroup;
