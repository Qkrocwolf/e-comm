import { isAxiosError } from 'axios';
import { messagesFromApi } from './messages.api';

export const errorHandler = async (
  err: unknown,
): Promise<string[] | string> => {
  if (isAxiosError(err)) {
    return messagesFromApi(err.response.data.message);
  }
};
