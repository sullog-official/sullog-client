import classNames from 'classnames/bind';
import { ForwardedRef, forwardRef, useState } from 'react';

import Accordion from '@/shared/components/Accordion';
import Chip from '@/shared/components/Chip';
import { FlavorTag } from '@/shared/types/record/flavorTag';

import styles from './DetailFlavorInput.module.scss';
import { FLAVOR_TAGS } from './flavorTags';

const cx = classNames.bind(styles);

type DetailFlavorInputProps = {
  className?: string;
  label?: string;
  value?: FlavorTag;
  onChange?: (value: FlavorTag) => void;
};

const DetailFlavorInput = forwardRef(
  (
    { className, label, value, onChange }: DetailFlavorInputProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <div ref={ref} className={cx('container', className)}>
        {label && <span className={cx('label')}>{label}</span>}
        <div className={cx('accordion-group')}>
          {FLAVOR_TAGS.map(({ majorTag, detailTags }) => (
            <Accordion key={majorTag.label} header={majorTag.label}>
              <div>
                {detailTags.map((detailTag) => (
                  <button
                    key={detailTag.label}
                    className={cx('flavor-option')}
                    type="button"
                    onClick={() =>
                      onChange?.({
                        majorTag: majorTag.value,
                        detailTag: detailTag.value,
                      } as FlavorTag)
                    }
                  >
                    <Chip
                      label={detailTag.label}
                      type={
                        detailTag.value === value?.detailTag
                          ? 'Primary'
                          : 'Secondary'
                      }
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
  }
);

DetailFlavorInput.displayName = 'DetailFlavorInput';

export default DetailFlavorInput;
