const getAllUserQuery = `
query Query {
  users {
    id
    username
    email
    avatar
  }
}`;

const getUserByIdQuery = `
query User($userId: ID!) {
  user(id: $userId) {
    id
    username
    email
    avatar
  }
}`;

const registerQuery = `
mutation Register($input: UserRegister) {
  register(input: $input) {
    message
    user {
      id
      username
      email
      avatar
    }
  }
}`;

const loginQuery = `
mutation Login($input: UserLogin) {
  login(input: $input) {
    message
    user {
      id
      username
      email
      avatar
      token
    }
  }
}`;

const updateUserQuery = `
mutation UpdateUser($input: UserUpdate) {
  updateUser(input: $input) {
    message
    user {
      id
      username
      email
      avatar
    }
  }
}`;

const deleteUserQuery = `
mutation DeleteUser {
  deleteUser {
    user {
      id
      username
      email
      avatar
    }
    message
  }
}`;

export {
  getAllUserQuery,
  getUserByIdQuery,
  registerQuery,
  loginQuery,
  updateUserQuery,
  deleteUserQuery,
};
