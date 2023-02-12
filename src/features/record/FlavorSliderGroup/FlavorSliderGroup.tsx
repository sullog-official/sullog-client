import classNames from 'classnames/bind';
import { useState } from 'react';

import Slider from '@/shared/components/Slider';

import styles from './FlavorSliderGroup.module.scss';

const cx = classNames.bind(styles);

type FlavorSliderGroupProps = {
  readOnly?: boolean;
};

type Flavor = {
  aroma?: number;
  taste?: number;
  texture?: number;
};

const FlavorSliderGroup = ({ readOnly = false }: FlavorSliderGroupProps) => {
  const [value, setValue] = useState<Flavor>({
    aroma: undefined,
    taste: undefined,
    texture: undefined,
  });

  const handleSliderChange = (name: keyof Flavor) => (sliderValue: number) => {
    setValue((prev) => ({ ...prev, [name]: sliderValue }));
  };

  return (
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
  );
};

export default FlavorSliderGroup;
