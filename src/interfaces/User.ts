enum Role {
  PATIENT = 'patient',
  HEALTHCARE_PROVIDER = 'healthcare_provider',
  ADMIN = 'admin',
}

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
  role: Role;
}

interface UserOutput {
  id: string;
  username: string;
  email: string;
  avatar: string;
  role?: Role;
  token?: string;
}

export {Role, User, UserIdWithToken, UserOutput};
