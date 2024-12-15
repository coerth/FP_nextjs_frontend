import { useQueryClient } from 'react-query';
import { fetchSets } from '@/services/setService';
import { MtgSet } from '@/types/mtgSet';

interface FetchSetsParams {
  limit: number;
  skip: number;
  [key: string]: any;
}

export const useFetchSets = () => {
  const queryClient = useQueryClient();

  const getSets = async (page: number, queryParams: FetchSetsParams): Promise<MtgSet[]> => {
    const queryKey = ['sets', page, queryParams];
    const cachedData = queryClient.getQueryData<MtgSet[]>(queryKey);

    if (cachedData) {
      return cachedData;
    }

    const newSets = await fetchSets(queryParams);
    queryClient.setQueryData(queryKey, newSets);
    return newSets;
  };

  return { getSets };
};