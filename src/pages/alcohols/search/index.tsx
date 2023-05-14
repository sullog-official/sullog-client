import classNames from 'classnames/bind';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ChangeEvent, useState } from 'react';

import SearchBar from '@/features/search/components/SearchBar';
import { useSearchAlcohol } from '@/shared/apis/alcohols/searchAlcohol';
import TopNavigator from '@/shared/components/TopNavigator';

import styles from './index.module.scss';
const cx = classNames.bind(styles);

const AlcoholSearch = () => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState('');
  const [isEnterPressed, setIsEnterPressed] = useState(false);
  const { data, fetchNextPage, hasNextPage, isLoading } = useSearchAlcohol({
    variables: { keyword: searchValue, limit: 20, cursor: 1 },
    enabled: isEnterPressed && searchValue.trim() !== '',
  });

  // const { alcoholInfoDtoList: alcohols, pagingInfoDto } = data.pages[0];

  const onClickItem = (alcoholId: number) => {
    router.push(`/records/create?alcoholId=${alcoholId}`);
  };

  return (
    <>
      <TopNavigator
        title={'검색'}
        extra={
          <div className={cx('extra-btn')}>
            <Link href="/records/create">다음</Link>
          </div>
        }
      />
      <main className={cx('wrapper')}>
        <div className={cx('search-bar-wrapper')}>
          <SearchBar
            placeholder={'마신 술 이름을 검색해주세요.'}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={(e) => setIsEnterPressed(e.code === 'Enter')}
          />
        </div>
        <div className={cx('result-wrapper')}>
          <div className={cx('label')}>해당하는 술을 선택해주세요.</div>
          <div className={cx('alcohol-card-wrapper')}>
            {/* {alcohols.map((alcohol) => {
              return (
                <div
                  className={cx('alcohol-card', {
                    'alcohol--is-selected': false,
                  })}
                  onClick={() => onClickItem(alcohol.alcoholId)}
                  key={alcohol.alcoholId}
                >
                  <div className={cx('alcohol-info')}>
                    <span>{alcohol.alcoholType}</span>
                    <span>{alcohol.brandName}</span>
                  </div>
                  <span className={cx('alcohol-name')}>
                    {alcohol.alcoholName}
                  </span>
                </div>
              );
            })} */}
          </div>
        </div>
      </main>
    </>
  );
};

export default AlcoholSearch;
