import classNames from 'classnames/bind';

import Icon from '@/shared/components/Icon';

import styles from './Login.module.scss';

const cx = classNames.bind(styles);

const Login = () => {
  return (
    <main className={cx('wrapper')}>
      <div className={cx('title-wrapper')}>
        <h1 className={cx('main-title')}>술로그</h1>
        <h2 className={cx('sub-title')}>전통주를 기록하다</h2>
      </div>
      <div className={cx('button-wrapper')}>
        <button
          type="button"
          aria-label="카카오 로그인"
          className={cx('kakao-btn')}
        >
          <Icon
            name="Kakao"
            size={24}
            style={{ position: 'absolute', left: '8vw' }}
          />
          <span>카카오톡 로그인</span>
        </button>
        <button
          type="button"
          aria-label="네이버 로그인"
          className={cx('naver-btn')}
        >
          <Icon
            name="Naver"
            size={24}
            style={{ position: 'absolute', left: '8vw' }}
          />
          <span>네이버 로그인</span>
        </button>
        <div className={cx('terms-of-service')}>
          <span>
            첫 로그인 시{' '}
            <button type="button" className={cx('terms-of-service-modal-btn')}>
              이용약관
            </button>{' '}
            및
          </span>
          <span>
            <button
              type="button"
              className={cx('terms-of-personal-info-modal-btn')}
            >
              개인정보처리방침
            </button>{' '}
            동의로 간주됩니다
          </span>
        </div>
      </div>
    </main>
  );
};

export default Login;
