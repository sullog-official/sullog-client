import classNames from 'classnames/bind';
import { useState } from 'react';

import Accordion from '@/shared/components/Accordion';
import Chip from '@/shared/components/Chip';

import styles from './DetailFlavorInput.module.scss';

const cx = classNames.bind(styles);

type DetailFlavorInputProps = {
  className?: string;
  label?: string;
};

const MOCK_OPTIONS = [
  '국화',
  '매화',
  '아카시아',
  '연꽃',
  '해바라기',
  '코스모스',
  '장미',
  '민들레',
];

const DETAIL_FLAVOR_LIST = [
  {
    category: '꽃',
    options: MOCK_OPTIONS.map((option) => `${option}1`),
  },
  {
    category: '과일',
    options: MOCK_OPTIONS.map((option) => `${option}2`),
  },
  {
    category: '곡물',
    options: MOCK_OPTIONS.map((option) => `${option}3`),
  },
  {
    category: '견과류',
    options: MOCK_OPTIONS.map((option) => `${option}4`),
  },
  {
    category: '단내',
    options: MOCK_OPTIONS.map((option) => `${option}5`),
  },
  {
    category: '유제품',
    options: MOCK_OPTIONS.map((option) => `${option}6`),
  },
];

const DetailFlavorInput = ({ className, label }: DetailFlavorInputProps) => {
  const [selectedFlavor, setSelectedFlavor] = useState<string>();

  return (
    <div className={cx('container', className)}>
      {label && <span className={cx('label')}>{label}</span>}
      <div className={cx('accordion-group')}>
        {DETAIL_FLAVOR_LIST.map(({ category, options }) => (
          <Accordion key={category} header={category}>
            <div>
              {options.map((option) => (
                <button
                  key={option}
                  className={cx('flavor-option')}
                  type="button"
                  onClick={() => setSelectedFlavor(option)}
                >
                  <Chip
                    label={option}
                    type={option === selectedFlavor ? 'Primary' : 'Secondary'}
                    appearance="squircle"
                    size="medium"
                  />
                </button>
              ))}
            </div>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default DetailFlavorInput;
