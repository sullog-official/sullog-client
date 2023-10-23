import { useRouter } from 'next/router';

import {
  deleteAccessToken,
  getAccessToken,
  getAppleOAuthAuthorizeUrl,
  getKakaoOAuthAuthorizeUrl,
} from '@/shared/utils/auth';

import { logout as authLogout } from '../apis/auth/logout';
import { refreshTokens } from '../apis/auth/refreshTokens';

import useConfirm from './useConfirm';

const useAuth = () => {
  const router = useRouter();
  const { confirm } = useConfirm();

  const loginWithKakao = () => {
    location.href = getKakaoOAuthAuthorizeUrl();
  };

  const loginWithApple = () => {
    location.href = getAppleOAuthAuthorizeUrl();
  };

  const logout = async () => {
    if (
      await confirm({
        message: '로그아웃 하시겠습니까?',
        okText: '로그아웃',
      })
    ) {
      deleteAccessToken();
      await authLogout();

      router.push('/login');
    }
  };

  const verifyLoggedIn = async (): Promise<boolean> => {
    const accessToken = getAccessToken();

    if (!accessToken) {
      const { data } = await refreshTokens();
      return !!data.result;
    }

    return !!accessToken;
  };

  return {
    loginWithKakao,
    loginWithApple,
    logout,
    verifyLoggedIn,
  };
};

export default useAuth;
