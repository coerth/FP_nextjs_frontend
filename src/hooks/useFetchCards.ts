import { useQueryClient } from 'react-query';
import { fetchCards } from '@/services/cardService';
import { MtGCard } from '@/types/mtgCard';

export const useFetchCards = () => {
  const queryClient = useQueryClient();

  const getCards = async (page: number, queryParams: { [key: string]: any }): Promise<MtGCard[]> => {
    const queryKey = ['cards', page, queryParams];
    const cachedData = queryClient.getQueryData<MtGCard[]>(queryKey);

    if (cachedData) {
      return cachedData;
    }

    const newCards = await fetchCards(queryParams);
    queryClient.setQueryData(queryKey, newCards);
    return newCards;
  };

  return { getCards };
};
