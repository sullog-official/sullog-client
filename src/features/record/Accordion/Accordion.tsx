import Chip from '@/shared/components/Chip';
import Icon from '@/shared/components/Icon';

import classNames from 'classnames/bind';
import { useState } from 'react';

import styles from './Accordion.module.scss';

const cx = classNames.bind(styles);

type AccordionProps = {
  label: string;
  items: string[];
};

const Accordion = ({ label, items }: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [clickedItem, setClickedItem] = useState('');

  const handleAccordion = () => {
    isOpen ? setIsOpen(false) : setIsOpen(true);
  };

  const onClickChip = (item: string) => {
    setClickedItem(item);
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('preview')}>
        <h3 className={cx('label')}>{label}</h3>
        <button type="button" onClick={handleAccordion}>
          {isOpen ? (
            <Icon name={'Close'} size={10} />
          ) : (
            <Icon name={'Plus'} size={10} />
          )}
        </button>
      </div>
      {isOpen && (
        <div className={cx('items-wrapper')}>
          {items.map((item) => {
            return (
              <button
                type="button"
                key={item}
                className={cx('chip-button')}
                onClick={() => onClickChip(item)}
              >
                <Chip
                  label={item}
                  type={clickedItem === item ? 'Primary' : 'Secondary'}
                  appearance="squircle"
                  size="medium"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Accordion;
