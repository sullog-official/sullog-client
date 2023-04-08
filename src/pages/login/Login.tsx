import classNames from 'classnames/bind';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { kakaoLoginCallback } from '@/shared/apis/auth/kakaoLogin';
import Icon from '@/shared/components/Icon';
import { TokenKeys } from '@/shared/configs/axios';
import { setCookie } from '@/shared/utils/cookie';

import styles from './Login.module.scss';

const cx = classNames.bind(styles);

const Login = () => {
  const router = useRouter();
  const { code } = router.query;

  const onClickKakaoLoginBtn = () =>
    (location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=209bdcaaebd1d90d002f358651d8ef4b&scope=profile_nickname,account_email&redirect_uri=http://localhost:3000/login`);

  const setToken = async (code: string) => {
    const response = await kakaoLoginCallback(code);
    sessionStorage.setItem(TokenKeys.Access, response.headers['authorization']);
    setCookie(
      TokenKeys.Refresh,
      response.headers['refresh'],
      24 * 60 * 60 * 1000 * 14
    );
  };

  useEffect(() => {
    if (code) setToken(code as string);
  }, [code]);

  return (
    <main className={cx('wrapper')}>
      <div className={cx('title-wrapper')}>
        <h1 className={cx('main-title')}>
          <span>술로그</span>
          <span className={cx('sub-title')}>전통주를 기록하다</span>
        </h1>
      </div>
      <div className={cx('button-wrapper')}>
        <button
          type="button"
          aria-label="카카오 로그인"
          className={cx('kakao-btn')}
          onClick={onClickKakaoLoginBtn}
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
