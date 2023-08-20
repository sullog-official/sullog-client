import classNames from 'classnames/bind';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import * as MoonAnimationData from '@/assets/lotties/moon_motion.json';
import { mapoFlowerIsland } from '@/assets/styles/fonts';
import Icon from '@/shared/components/Icon';
import Lottie from '@/shared/components/Lottie';
import PageLayout from '@/shared/components/PageLayout';
import useAuth from '@/shared/hooks/useAuth';

import styles from './index.module.scss';

const cx = classNames.bind(styles);

const Login = () => {
  const [isMoonLottieStopped, setIsMoonLottieStopped] =
    useState<boolean>(false);
  const router = useRouter();

  const { loginWithKakao, loginWithApple, verifyLoggedIn } = useAuth();

  useEffect(() => {
    verifyLoggedIn().then((isLoggedIn) => {
      if (isLoggedIn) {
        router.push('/');
      }
    });
  }, [router, verifyLoggedIn]);

  return (
    <PageLayout className={cx('main')}>
      <div className={cx('title-wrapper')}>
        <Lottie
          className={cx('lottie', isMoonLottieStopped && 'hidden')}
          animationData={MoonAnimationData}
          onCompleted={() => setIsMoonLottieStopped(true)}
        />
        <h1 className={cx('main-title')} style={mapoFlowerIsland.style}>
          <Icon
            name="MoonLogo"
            size={18}
            className={cx('moon-logo', isMoonLottieStopped && 'visible')}
          />
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
          aria-label="애플 로그인"
          className={cx('login-button', 'login-button--apple')}
          onClick={loginWithApple}
        >
          <Icon name="Apple" size={24} />
          <span>Apple로 로그인</span>
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
