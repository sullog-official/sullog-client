import classNames from 'classnames/bind';
import { groupBy } from 'lodash-es';
import Link from 'next/link';

import AlcoholPreview from '@/features/alcohol/components/AlcoholPreview';
import { useSearchMyRecords } from '@/shared/apis/records/searchMyRecords';
import Icon from '@/shared/components/Icon';

import styles from './MyRecordSearchResult.module.scss';

const cx = classNames.bind(styles);

type MyRecordSearchResultProps = {
  keyword: string;
};

const MyRecordSearchResult = ({ keyword }: MyRecordSearchResultProps) => {
  const { data: searchMyRecordsInfiniteData } = useSearchMyRecords({
    variables: { keyword },
    enabled: !!keyword,
  });

  const myRecords = searchMyRecordsInfiniteData?.pages.flatMap(
    (page) => page.recordMetaList
  );

  if (!myRecords?.length) {
    return <div className={cx('empty-state')}>검색 결과가 없습니다.</div>;
  }

  const groupByRecordsObject = groupBy(
    myRecords,
    (record) => record.productionLocation
  );

  const groupByRecords = Object.entries(groupByRecordsObject).map(
    ([productionLocation, records]) => ({
      productionLocation,
      records,
    })
  );

  return (
    <div className={cx('my-record-list')}>
      {groupByRecords.map(({ productionLocation, records }, i) => (
        <div
          key={`${productionLocation}-${i}`}
          className={cx('my-record-group')}
        >
          <div className={cx('location')}>
            <Icon name="LocationPin" size={10} aria-hidden />
            {productionLocation}
          </div>
          <ul>
            {records.map((record, j) => (
              <li className={cx('record-card')} key={`${record.recordId}-${j}`}>
                <Link href={`/records/${record.recordId}`}>
                  <AlcoholPreview
                    name={record.alcoholName}
                    brand={record.brandName}
                    description={record.description}
                    imgSrc={record.mainPhotoPath}
                    highlightKeyword={keyword}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default MyRecordSearchResult;
