import classNames from 'classnames/bind';

import Icon from '@/shared/components/Icon';

import styles from './SearchBar.module.scss';

const cx = classNames.bind(styles);

type SearchBarProps = {
  placeholder: string;
};

const SearchBar = ({ placeholder }: SearchBarProps) => {
  return (
    <div className={cx('wrapper')}>
      <Icon name={'Search'} size={12} />
      <input className={cx('search-input')} placeholder={placeholder} />
    </div>
  );
};

export default SearchBar;
