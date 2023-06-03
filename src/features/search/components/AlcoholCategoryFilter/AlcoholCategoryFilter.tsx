import classNames from 'classnames/bind';

import { Button } from '@/shared/components';
import { ALCOHOL_CATEGORIES } from '@/shared/constants/alcohol';

import styles from './AlcoholCategoryFilter.module.scss';

const cx = classNames.bind(styles);

const ALL = '전체';

type AlcoholCategoryFilterProps = {
  selectedCategories: string[];
  onChange: (categories: string[]) => void;
};

const AlcoholCategoryFilter = ({
  selectedCategories,
  onChange,
}: AlcoholCategoryFilterProps) => {
  const toggleSelect = (category: string) => {
    const filteredCategories = selectedCategories.filter((v) => v !== ALL);

    if (filteredCategories.includes(category)) {
      onChange(filteredCategories.filter((v) => v !== category));
    } else {
      onChange([...filteredCategories, category]);
    }
  };

  const handleChipClick = (category: string) => {
    if (category === ALL) {
      onChange([ALL]);
      return;
    }

    toggleSelect(category);
  };

  return (
    <div className={cx('alcohol-category-filter')}>
      {[...ALCOHOL_CATEGORIES, ALL].map((category: string) => (
        <Button
          key={category}
          buttonType="button"
          type={selectedCategories.includes(category) ? 'primary' : 'outline'}
          onClick={() => handleChipClick(category)}
          className={cx('category-chip')}
        >
          {category}
        </Button>
      ))}
    </div>
  );
};

export default AlcoholCategoryFilter;
