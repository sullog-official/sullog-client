import { useDeleteMyRecentSearchHistory } from '@/shared/apis/me/deleteMyRecentSearchHistory';
import { useGetMyRecentSearchHistory } from '@/shared/apis/me/getMyRecentSearchHistory';
import { useResetMyRecentSearchHistory } from '@/shared/apis/me/resetMyRecentSearchHistory';
import { queryClient } from '@/shared/configs/reactQuery';

export const useMyRecentSearchKeywords = () => {
  const { data: myRecentSearchHistory } = useGetMyRecentSearchHistory();
  const { mutate: deleteMyRecentSearchHistory } =
    useDeleteMyRecentSearchHistory();
  const { mutate: resetMyRecentSearchHistory } =
    useResetMyRecentSearchHistory();

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
    deleteKeyword,
    resetKeywords,
  };
};
