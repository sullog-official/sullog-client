import classNames from 'classnames/bind';

import FlavorSliderGroup from '@/features/record/components/FlavorSliderGroup';
import ImageSwiper from '@/features/record/components/ImageSwiper';
import Chip from '@/shared/components/Chip';
import Icon from '@/shared/components/Icon';

import styles from './index.module.scss';

const cx = classNames.bind(styles);

const mockData = [
  {
    url: 'https://i.pinimg.com/564x/30/8d/7d/308d7d49609c1172b02297772e1b885e.jpg',
  },
  {
    url: 'https://i.pinimg.com/564x/d6/da/c9/d6dac9be66de47795d403ed094b12838.jpg',
  },
  {
    url: 'https://i.pinimg.com/564x/8b/a8/f6/8ba8f6e12a8f4a78948ce18f53be1416.jpg',
  },
];

// TODO : TopNavigation 추가
const RecordDetail = () => {
  return (
    <main>
      <ImageSwiper images={mockData} />
      <div className={cx('contents-wrap')}>
        <Chip
          label="과실주"
          type="Primary"
          appearance="round"
          size="mediumLarge"
        />
        <div className={cx('title-area')}>
          <h1 className={cx('title')}>백련 맑은 백련 맑은 술</h1>
          <span className={cx('location')}>신평 양조장</span>
        </div>
        <div className={cx('tags')}>
          {['16.5도', '독하다', '아카시아'].map((label) => (
            <Chip
              key={label}
              className={cx('tag')}
              label={label}
              type="OutlinedPurple"
              appearance="round"
              size="mediumSmall"
            />
          ))}
        </div>
        <div className={cx('rate')}>
          <Icon name="Star" size={18} />
          <span>4.0</span>
        </div>
        <FlavorSliderGroup
          className={cx('flavor-slider-group')}
          readOnly
          value={{
            scentScore: 3,
            tasteScore: 4,
            textureScore: 2,
          }}
        />
        <p className={cx('detail')}>
          백련 맑은 술 뱅련 말근{'\n'}술 100련 맑은 술자리어카백련 맑은 술
          먹었다리미
        </p>
        <div className={cx('date')}>2022.07.22</div>
      </div>
    </main>
  );
};

export default RecordDetail;
