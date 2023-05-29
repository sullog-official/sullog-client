import classNames from 'classnames/bind';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { mapoFlowerIsland } from '@/assets/styles/fonts';
import { kakaoLoginCallback } from '@/shared/apis/auth/kakaoLogin';
import Icon from '@/shared/components/Icon';
import PageLayout from '@/shared/components/PageLayout';
import { TokenKeys } from '@/shared/configs/axios';
import {
  NEXT_PUBLIC_KAKAO_BASE_URI,
  NEXT_PUBLIC_KAKAO_CLIENT_ID,
  NEXT_PUBLIC_KAKAO_REDIRECT_URI,
  NEXT_PUBLIC_KAKAO_SCOPE,
} from '@/shared/constants';
import { setCookie } from '@/shared/utils/cookie';

import styles from './index.module.scss';

const cx = classNames.bind(styles);

const Login = () => {
  const router = useRouter();
  const { code } = router.query as { code: string };

  const onClickKakaoLoginBtn = () =>
    (location.href = `${NEXT_PUBLIC_KAKAO_BASE_URI}&client_id=${NEXT_PUBLIC_KAKAO_CLIENT_ID}&scope=${NEXT_PUBLIC_KAKAO_SCOPE}&redirect_uri=${NEXT_PUBLIC_KAKAO_REDIRECT_URI}`);

  const onClickNaverLoginBtn = () => alert('준비중입니다!');

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
    if (code) {
      setToken(code)
        .then(() => {
          router.push('/');
        })
        .catch((e) => {
          console.error(e);
        });
    }
  }, [code, router]);

  useEffect(() => {
    const accessToken = sessionStorage.getItem(TokenKeys.Access);

    if (
      accessToken !== undefined &&
      accessToken !== 'undefined' &&
      accessToken !== null
    ) {
      router.push('/');
    }
  }, [router]);

  return (
    <PageLayout className={cx('main')}>
      {code && <div className={cx('setting-token')} />}
      <div className={cx('title-wrapper')}>
        <h1 className={cx('main-title')} style={mapoFlowerIsland.style}>
          <span>술로그</span>
          <span className={cx('sub-title')}>전통주를 기록하다</span>
        </h1>
      </div>
      <div className={cx('button-wrapper')}>
        <button
          type="button"
          aria-label="카카오 로그인"
          className={cx('login-button', 'login-button--kakao')}
          onClick={onClickKakaoLoginBtn}
        >
          <Icon name="Kakao" size={24} />
          <span>카카오톡 로그인</span>
        </button>
        <button
          type="button"
          aria-label="네이버 로그인"
          className={cx('login-button', 'login-button--naver')}
          onClick={onClickNaverLoginBtn}
        >
          <Icon name="Naver" size={24} />
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
    </PageLayout>
  );
};

export default Login;
