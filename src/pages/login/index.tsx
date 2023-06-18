import classNames from 'classnames/bind';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { mapoFlowerIsland } from '@/assets/styles/fonts';
import Icon from '@/shared/components/Icon';
import PageLayout from '@/shared/components/PageLayout';
import useAuth from '@/shared/hooks/useAuth';
import { getAccessToken } from '@/shared/utils/auth';

import styles from './index.module.scss';

const cx = classNames.bind(styles);

const Login = () => {
  const router = useRouter();

  const { loginWithKakao, loginWithNaver } = useAuth();

  useEffect(() => {
    const accessToken = getAccessToken();
    if (accessToken) {
      router.push('/');
      return;
    }
  }, [router]);

  return (
    <PageLayout className={cx('main')}>
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
          onClick={loginWithKakao}
        >
          <Icon name="Kakao" size={24} />
          <span>카카오톡 로그인</span>
        </button>
        <button
          type="button"
          aria-label="네이버 로그인"
          className={cx('login-button', 'login-button--naver')}
          onClick={loginWithNaver}
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
