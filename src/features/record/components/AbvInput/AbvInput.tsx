import classNames from 'classnames/bind';
import { useState } from 'react';

import Chip from '@/shared/components/Chip';

import styles from './AbvInput.module.scss';

const cx = classNames.bind(styles);

type AbvInputProps = {
  className?: string;
  label?: string;
  alcoholPercent: number;
};

// TODO: api에 따라 입력 형식 수정
const AbvInput = ({ className, label, alcoholPercent }: AbvInputProps) => {
  const [value, setValue] = useState<number>();

  return (
    <div className={cx('container', className)}>
      {label && <label className={cx('label')}>{label}</label>}
      <div className={cx('wrapper')}>
        <span className={cx('description')}>내가 마신 술은 실제 도수보다</span>
        <div className={cx('chips')}>
          {['연하다', '보통이다', '독하다'].map((label, index) => (
            <button type="button" key={label} onClick={() => setValue(index)}>
              <Chip
                key={label}
                label={label}
                type={value === index ? 'Primary' : 'Secondary'}
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
};

export default AbvInput;
