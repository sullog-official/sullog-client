import classNames from 'classnames/bind';

import AbvInput from '@/features/record/AbvInput';
import DetailFlavorInput from '@/features/record/DetailFlavorInput';
import FlavorSliderGroup from '@/features/record/FlavorSliderGroup';
import ImageSwiper from '@/features/record/ImageSwiper';
import Rating from '@/features/record/Rating';
import TextArea from '@/shared/components/TextArea';
import TextField from '@/shared/components/TextField';

import styles from './index.module.scss';

const cx = classNames.bind(styles);

const RecordCreate = () => {
  /**
   * TODO: 입력할 필드
   * 날짜
   * 별점
   * 도수
   * 플레이버
   * 상세 플레이버
   * 상세 내용
   */

  return (
    <main>
      <ImageSwiper mode="edit" max={3} />
      <div className={cx('contents')}>
        <div className={cx('input-row')}>
          <TextField
            className={cx('name')}
            label="술이름"
            value="백련 맑은 술"
            disabled
          />
          <TextField
            className={cx('category')}
            label="주종"
            value="기타"
            disabled
          />
        </div>
        <div className={cx('input-row')}>
          <TextField
            className={cx('brand')}
            label="브랜드"
            value="신평 양조장"
            disabled
          />
          <TextField
            className={cx('date')}
            label="날짜"
            value="2023-02-20"
            type="date"
          />
        </div>
        <TextField
          className={cx('brand')}
          label="지역"
          value="신평 양조장"
          disabled
        />
        <Rating className={cx('rating')} label="별점" />
        <AbvInput label="도수" />
        <FlavorSliderGroup label="플레이버" />
        <DetailFlavorInput label="상세 플레이버" />
        <TextArea
          className={cx('detail-text')}
          label="상세 내용"
          placeholder="내용을 입력해주세요"
          rows={8}
        />
      </div>
    </main>
  );
};

export default RecordCreate;
