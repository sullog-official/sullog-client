import { useRouter } from 'next/router';

import {
  NEXT_PUBLIC_KAKAO_BASE_URI,
  NEXT_PUBLIC_KAKAO_CLIENT_ID,
  NEXT_PUBLIC_KAKAO_REDIRECT_URI,
  NEXT_PUBLIC_KAKAO_SCOPE,
} from '@/shared/constants';
import {
  getAccessToken,
  removeAccessToken,
  removeRefreshToken,
} from '@/shared/utils/auth';
import { generateUrl } from '@/shared/utils/generateUrl';

import { refreshTokens } from '../apis/auth/refreshTokens';

import useConfirm from './useConfirm';

const useAuth = () => {
  const router = useRouter();
  const { confirm } = useConfirm();

  const getKakaoOAuthAuthorizeUrl = () => {
    return generateUrl({
      url: NEXT_PUBLIC_KAKAO_BASE_URI!,
      params: {
        response_type: 'code',
        client_id: NEXT_PUBLIC_KAKAO_CLIENT_ID,
        scope: NEXT_PUBLIC_KAKAO_SCOPE,
        redirect_uri: NEXT_PUBLIC_KAKAO_REDIRECT_URI,
      },
    });
  };

  const loginWithKakao = () => {
    location.href = getKakaoOAuthAuthorizeUrl();
  };

  const loginWithNaver = () => {
    alert('준비중입니다!');
  };

  const logout = async () => {
    if (
      await confirm({
        message: '로그아웃 하시겠습니까?',
        okText: '로그아웃',
      })
    ) {
      removeAccessToken();
      removeRefreshToken();
      router.push('/login');
    }
  };

  const verifyLoggedIn = async (): Promise<boolean> => {
    const accessToken = getAccessToken();
    if (accessToken) {
      return true;
    }

    return await refreshTokens();
  };

  return {
    loginWithKakao,
    loginWithNaver,
    logout,
    verifyLoggedIn,
  };
};

export default useAuth;
