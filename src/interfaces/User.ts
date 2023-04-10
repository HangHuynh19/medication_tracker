interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
  token?: string;
}

interface UserIdWithToken {
  id: string;
  token: string;
}

export {User, UserIdWithToken};
