import classNames from 'classnames/bind';
import Link from 'next/link';
import { ChangeEvent } from 'react';

import SearchBar from '@/features/search/components/SearchBar';
import TopNavigator from '@/shared/components/TopNavigator';

import styles from './index.module.scss';
const cx = classNames.bind(styles);

const MySearch = () => {
  const onClickItem = () => {
    // Do something
  };

  const onDeleteAll = () => {
    // Do something
  };

  const renderExtraButton = () => {
    return (
      <div className={cx('extra-btn')}>
        <Link href="/records/create">다음</Link>
      </div>
    );
  };

  return (
    <>
      <TopNavigator title={'검색'} extra={renderExtraButton} />
      <main className={cx('wrapper')}>
        <div className={cx('search-bar-wrapper')}>
          <SearchBar
            placeholder={'마신 술 이름을 검색해주세요.'}
            value={''}
            onChange={function (event: ChangeEvent<HTMLInputElement>): void {
              throw new Error('Function not implemented.');
            }}
          />
        </div>
        <div className={cx('result-wrapper')}>
          <div className={cx('label')}>해당하는 술을 선택해주세요.</div>
          <div className={cx('alcohol-card-wrapper')}>
            <div
              className={cx('alcohol-card', { 'alcohol--is-selected': true })}
            >
              <div className={cx('alcohol-info')}>
                <span>기타</span>
                <span>신평양조장</span>
              </div>
              <span className={cx('alcohol-name')}>백련 맑은 술</span>
            </div>
            <div
              className={cx('alcohol-card', { 'alcohol--is-selected': false })}
            >
              <div className={cx('alcohol-info')}>
                <span>기타</span>
                <span>신평양조장</span>
              </div>
              <span className={cx('alcohol-name')}>백련 맑은 술</span>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default MySearch;
