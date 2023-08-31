import { useRouter } from 'next/router';
import { useContext } from 'react';

import {
  NEXT_PUBLIC_KAKAO_BASE_URI,
  NEXT_PUBLIC_KAKAO_CLIENT_ID,
  NEXT_PUBLIC_KAKAO_REDIRECT_URI,
  NEXT_PUBLIC_KAKAO_SCOPE,
} from '@/shared/constants';
import { deleteAccessToken, getAccessToken } from '@/shared/utils/auth';
import { generateUrl } from '@/shared/utils/generateUrl';

import { logout as authLogout } from '../apis/auth/logout';
import { AuthContext } from '../stores/AuthContext';

import useConfirm from './useConfirm';

const useAuth = () => {
  const context = useContext(AuthContext);
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

  const loginWithApple = () => {
    location.href =
      'https://appleid.apple.com/auth/authorize?client_id=sullogapp.sullog.com&redirect_uri=https://sullog-client.vercel.app/api/redirect/apple&response_type=code&scope=name%20email&response_mode=form_post';
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
    const accessToken = context?.accessToken;
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
