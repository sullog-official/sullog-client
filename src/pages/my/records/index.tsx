import classNames from 'classnames/bind';
import { useMemo, useState } from 'react';

import AlcoholPreview from '@/features/alcohol/components/AlcoholPreview';
import AlcoholCategoryTab from '@/features/search/components/AlcoholCategoryTab';
import { useGetMyRecords } from '@/shared/apis/records/getMyRecords';
import BottomNavigator from '@/shared/components/BottomNavigator';
import PageLayout from '@/shared/components/PageLayout';
import TopNavigator from '@/shared/components/TopNavigator';

import styles from './index.module.scss';

const cx = classNames.bind(styles);

const MyRecords = () => {
  const { data: records = [] } = useGetMyRecords();
  const [selectedTab, setSelectedTab] = useState<string>('전체');

  const filteredRecords = useMemo(
    () =>
      selectedTab === '전체'
        ? records
        : records.filter(
            (record) => {
              if (record.alcoholType === '소주/증류주') {
                return selectedTab.includes('소주');
              } else if (record.alcoholType === '탁주') {
                return selectedTab.includes('막걸리');
              } else if (record.alcoholType !== '과실주') {
                return selectedTab.includes('기타');
              } else {
                return selectedTab.includes(record.alcoholType);
              }
            },
            [records, selectedTab]
          ),
    [records, selectedTab]
  );

  return (
    <PageLayout className={cx('main')} hasBottomNavigatorPadding>
      <TopNavigator title={'나의 술로그'} highlighted>
        <AlcoholCategoryTab
          selectedTab={selectedTab}
          onTabChange={setSelectedTab}
        />
      </TopNavigator>
      <div className={cx('preview-wrapper')}>
        {filteredRecords.map((record) => (
          <AlcoholPreview
            key={record.recordId}
            name={record.alcoholName}
            brand={record.brandName}
            description={record.description}
            imgSrc={record.mainPhotoPath}
          />
        ))}
      </div>
      <BottomNavigator />
    </PageLayout>
  );
};

export default MyRecords;
