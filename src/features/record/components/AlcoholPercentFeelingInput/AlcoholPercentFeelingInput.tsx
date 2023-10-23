import classNames from 'classnames/bind';
import { forwardRef, type ForwardedRef } from 'react';

import Chip from '@/shared/components/Chip';
import type { AlcoholPercentFeeling } from '@/shared/types/record/alcoholPercentFeeling';

import { getAlcoholPercentFeelingLabel } from '../../utils/getAlcoholPercentFeelingLabel';

import styles from './AlcoholPercentFeelingInput.module.scss';

const cx = classNames.bind(styles);

const ALCOHOL_PERCENT_FEELING_OPTIONS: {
  value: AlcoholPercentFeeling;
  label: string;
}[] = (['MILD', 'MODERATE', 'STRONG'] as const).map((value) => ({
  value,
  label: getAlcoholPercentFeelingLabel(value),
}));

type AlcoholPercentFeelingInputProps = {
  className?: string;
  label?: string;
  value?: AlcoholPercentFeeling;
  onChange: (value?: AlcoholPercentFeeling) => void;
  alcoholPercent: number;
};

const AlcoholPercentFeelingInput = forwardRef(
  (
    {
      className,
      label,
      value,
      onChange,
      alcoholPercent,
    }: AlcoholPercentFeelingInputProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <div ref={ref} className={cx('container', className)}>
        {label && <label className={cx('label')}>{label}</label>}
        <div className={cx('wrapper')}>
          <span className={cx('description')}>
            내가 마신 술은 실제 도수보다
          </span>
          <div className={cx('chips')}>
            {ALCOHOL_PERCENT_FEELING_OPTIONS.map((option) => (
              <button
                type="button"
                key={option.label}
                onClick={() => onChange(option.value)}
              >
                <Chip
                  key={label}
                  label={option.label}
                  type={option.value === value ? 'Primary' : 'Secondary'}
                  appearance="squircle"
                  size="medium"
                />
              </button>
            ))}
          </div>
          <span className={cx('abv-info')}>
            실제 도수는 {alcoholPercent}도입니다.
          </span>
        </div>
      </div>
    );
  }
);

AlcoholPercentFeelingInput.displayName = 'AlcoholPercentFeelingInput';

export default AlcoholPercentFeelingInput;
