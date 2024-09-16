export const messagesFromApi = (
  message: string[] | string,
): string[] | string => {
  const messages: string[] = [];
  if (typeof message === 'string') {
    message = [message];
  }
  for (let i = 0; i < message.length; i++) {
    switch (message[i]) {
      case 'email must be an email':
        messages.push('Некорректный email');
        break;
      case 'password must be longer than or equal to 6 characters':
        messages.push('Пароль должен быть длиннее или равен 6 символам');
        break;
      case 'User already exist':
        messages.push('Пользователь с таким email уже зарегистрирован');
        break;
      case 'incorrect login/password':
        messages.push('Неправильный логин или пароль');
    }
  }
  return messages;
};
