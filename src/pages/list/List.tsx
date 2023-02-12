import classNames from 'classnames/bind';

import AlcoholPreview from '@/features/alcohol/AlcoholPreview';
import AlcoholCategoryTabItem from '@/features/search/AlcoholCategoryTabItem';
import BottomNavigator from '@/shared/components/BottomNavigator';

import styles from './List.module.scss';

const cx = classNames.bind(styles);

// TODO: api 연결시 삭제
const sampleDescription =
  '테이스팅, 시식, 시음, 맛 평가. 식품의 질을 맛으로 평가하는 것. 특히버터, 오일, 푸아그라, 초콜릿 등은 전문 맛 감정사가 있다. 파리 시 연구소에';

const AlcoholCategories = ['Soju', 'FruitWine', 'Makgeolli', 'Etc', 'All'];

const List = () => {
  return (
    <>
      <header>나의 술로그</header>
      <main>
        <div className={cx('category-wrapper')}>
          {AlcoholCategories.map((category: any) => {
            return (
              <AlcoholCategoryTabItem
                key={category}
                alcohol={category}
                isSelected={false}
              />
            );
          })}
        </div>
        <div className={cx('preview-wrapper')}>
          <AlcoholPreview
            name={'술 이름'}
            brand={'브랜드'}
            description={sampleDescription}
            imgSrc={'https://via.placeholder.com/100'}
          />
          <AlcoholPreview
            name={'술 이름'}
            brand={'브랜드'}
            description={sampleDescription}
            imgSrc={'https://via.placeholder.com/100'}
          />
          <AlcoholPreview
            name={'술 이름'}
            brand={'브랜드'}
            description={sampleDescription}
            imgSrc={'https://via.placeholder.com/100'}
          />
          <AlcoholPreview
            name={'술 이름'}
            brand={'브랜드'}
            description={sampleDescription}
            imgSrc={'https://via.placeholder.com/100'}
          />
          <AlcoholPreview
            name={'술 이름'}
            brand={'브랜드'}
            description={sampleDescription}
            imgSrc={'https://via.placeholder.com/100'}
          />
          <AlcoholPreview
            name={'술 이름'}
            brand={'브랜드'}
            description={sampleDescription}
            imgSrc={'https://via.placeholder.com/100'}
          />
        </div>
      </main>
      <nav className={cx('bottom-navigator')}>
        <BottomNavigator />
      </nav>
    </>
  );
};

export default List;
