import classNames from 'classnames/bind';
import { forwardRef, type ForwardedRef } from 'react';

import Accordion from '@/shared/components/Accordion';
import Chip from '@/shared/components/Chip';
import type { FlavorTag } from '@/shared/types/record/flavorTag';

import styles from './DetailFlavorInput.module.scss';
import { flavorTagOptions } from './flavorTagOptions';

const cx = classNames.bind(styles);

type DetailFlavorInputProps = {
  className?: string;
  label?: string;
  value?: FlavorTag[];
  onChange?: (value: FlavorTag[]) => void;
};

const DetailFlavorInput = forwardRef(
  (
    { className, label, value = [], onChange }: DetailFlavorInputProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const checkIsSameTag = (tag1: FlavorTag, tag2: FlavorTag) => {
      return (
        tag1.majorTag === tag2.majorTag && tag1.detailTag === tag2.detailTag
      );
    };

    const checkIsSelected = (selectedTag: FlavorTag) => {
      return !!value.find((tag) => checkIsSameTag(tag, selectedTag));
    };

    const handleButtonClick = (selectedTag: FlavorTag) => {
      onChange?.(
        checkIsSelected(selectedTag)
          ? value.filter((tag) => !checkIsSameTag(tag, selectedTag))
          : [...value, selectedTag]
      );
    };

    return (
      <div ref={ref} className={cx('container', className)}>
        {label && <span className={cx('label')}>{label}</span>}
        <div className={cx('accordion-group')}>
          {flavorTagOptions.map(({ majorTag, detailTags }) => (
            <Accordion key={majorTag.label} header={majorTag.label}>
              <div className={cx('flavor-options')}>
                {detailTags.map((detailTag) => {
                  const isSelected = checkIsSelected({
                    majorTag: majorTag.value,
                    detailTag: detailTag.value,
                  } as FlavorTag);

                  return (
                    <label
                      className={cx('flavor-option')}
                      key={detailTag.value}
                      htmlFor={detailTag.value}
                    >
                      <input
                        id={detailTag.value}
                        type="checkbox"
                        onClick={() =>
                          handleButtonClick({
                            majorTag: majorTag.value,
                            detailTag: detailTag.value,
                          } as FlavorTag)
                        }
                        checked={isSelected}
                        hidden
                      />
                      <Chip
                        label={detailTag.label}
                        type={isSelected ? 'Primary' : 'Secondary'}
                        appearance="squircle"
                        size="medium"
                      />
                    </label>
                  );
                })}
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
