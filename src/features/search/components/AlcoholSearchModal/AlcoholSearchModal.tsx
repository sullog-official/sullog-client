import classNames from 'classnames/bind';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { useSearchAlcohol } from '@/shared/apis/alcohols/searchAlcohol';
import PageLayout from '@/shared/components/PageLayout';
import TopNavigator from '@/shared/components/TopNavigator';

import SearchBar from '../SearchBar';

import styles from './AlcoholSearchModal.module.scss';

const cx = classNames.bind(styles);

type AlcoholSearchModalProps = {
  onClose: VoidFunction;
};

const AlcoholSearchModal = ({ onClose }: AlcoholSearchModalProps) => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState('');
  const { data, fetchNextPage, hasNextPage, isLoading } = useSearchAlcohol({
    variables: { keyword: searchValue, limit: 20, cursor: 1 },
    enabled: searchValue !== '',
    keepPreviousData: true,
  });

  const onClickItem = (alcoholId: number) => {
    router.push(`/records/create?alcoholId=${alcoholId}`);
  };

  return (
    <PageLayout className={cx('alcohol-search-modal')} isModal>
      <TopNavigator title={'검색'} onBack={onClose}>
        <div className={cx('search-bar-wrapper')}>
          <SearchBar
            placeholder={'마신 술 이름을 검색해주세요.'}
            value={searchValue}
            onValueChange={setSearchValue}
            useDebounce
          />
        </div>
      </TopNavigator>
      <div className={cx('wrapper')}>
        <div className={cx('result-wrapper')}>
          <div className={cx('label')}>해당하는 술을 선택해주세요.</div>
          <div className={cx('alcohol-card-wrapper')}>
            {data?.pages
              .flatMap((page) => page.alcoholInfoDtoList)
              .map((alcohol) => {
                return (
                  <button
                    type="button"
                    className={cx('alcohol-card')}
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
                  </button>
                );
              })}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default AlcoholSearchModal;
