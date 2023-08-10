import { useDeleteMyRecentSearchHistory } from '@/shared/apis/me/deleteMyRecentSearchHistory';
import { useGetMyRecentSearchHistory } from '@/shared/apis/me/getMyRecentSearchHistory';
import { useResetMyRecentSearchHistory } from '@/shared/apis/me/resetMyRecentSearchHistory';
import { useSaveMyRecentSearchKeyword } from '@/shared/apis/me/saveMyRecentSearchKeyword';
import { queryClient } from '@/shared/configs/reactQuery';

export const useMyRecentSearchKeywords = () => {
  const { data: myRecentSearchHistory } = useGetMyRecentSearchHistory();
  const { mutate: saveMyRecentSearchKeyword } = useSaveMyRecentSearchKeyword();
  const { mutate: deleteMyRecentSearchHistory } =
    useDeleteMyRecentSearchHistory();
  const { mutate: resetMyRecentSearchHistory } =
    useResetMyRecentSearchHistory();

  const saveKeyword = (keyword: string) => {
    saveMyRecentSearchKeyword(
      { keyword },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries(
            useSaveMyRecentSearchKeyword.getKey()
          );
        },
      }
    );
  };

  const deleteKeyword = (item: string) => {
    deleteMyRecentSearchHistory(
      { keyword: item },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries(
            useGetMyRecentSearchHistory.getKey()
          );
        },
      }
    );
  };

  const resetKeywords = () => {
    resetMyRecentSearchHistory(undefined, {
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          useGetMyRecentSearchHistory.getKey()
        );
      },
    });
  };

  return {
    myRecentSearchKeywords: myRecentSearchHistory?.recentSearchWordList,
    saveKeyword,
    deleteKeyword,
    resetKeywords,
  };
};
