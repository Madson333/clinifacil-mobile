import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

interface AddRatingParams {
  appointmentId: number;
  rating: number;
  comment?: string;
}

export function useAddRating() {
  return useMutation<
    any, // tipo de retorno
    Error, // tipo de erro
    AddRatingParams // tipo do parâmetro
  >({
    mutationFn: async (params: AddRatingParams) => {
      const response = await axios.post(
        `/api/appointments/${params.appointmentId}/ratings`,
        {
          rating: params.rating,
          comment: params.comment
        }
      );
      return response.data;
    }
  });
}
