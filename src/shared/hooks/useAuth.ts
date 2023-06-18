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

const useAuth = () => {
  const router = useRouter();

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

  const logout = () => {
    removeAccessToken();
    removeRefreshToken();
    router.push('/login');
  };

  const verifyLogin = async () => {
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
    verifyLogin,
  };
};

export default useAuth;
