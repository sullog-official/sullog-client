import classNames from 'classnames/bind';

import { useState } from 'react';
import Icon from '@/shared/components/Icon';
import Chip from '@/shared/components/Chip';
import styles from './Accordion.module.scss';

const cx = classNames.bind(styles);

type AccordionProps = {
  label: string;
  items: string[];
};

const Accordion = ({ label, items }: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleAccordion = () => {
    isOpen ? setIsOpen(false) : setIsOpen(true);
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('preview')}>
        <h3 className={cx('label')}>{label}</h3>
        <button onClick={handleAccordion}>
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
              <Chip
                key={item}
                label={item}
                type="Secondary"
                appearance="squircle"
                size="medium"
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Accordion;
