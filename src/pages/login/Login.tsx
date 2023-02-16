import classNames from 'classnames/bind';
import Image from 'next/image';
import loginKakao from 'src/assets/images/loginKakao.png';
import loginNaver from 'src/assets/images/loginNaver.png';

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
        <button className={cx('kakao-btn')}>
          <Image src={loginKakao} alt="kakaologin" />
        </button>
        <button>
          <Image src={loginNaver} alt="naverlogin" />
        </button>
        <div className={cx('terms-of-service')}>
          <span>
            첫 로그인 시{' '}
            <button className={cx('terms-of-service-modal-btn')}>
              이용약관
            </button>{' '}
            및
          </span>
          <span>
            <button className={cx('terms-of-personal-info-modal-btn')}>
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
