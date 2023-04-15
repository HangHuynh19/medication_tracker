import {UserIdWithToken} from '../../interfaces/User';
import {Prescription} from '../../interfaces/Prescription';
import {doGraphQLFetch} from '../../functions/fetch';
import {
  deleteUserQuery,
  getAllUserQuery,
  getUserByIdQuery,
  loginQuery,
  registerQuery,
  updateUserQuery,
} from '../../utils/queries';
import {GraphQLError} from 'graphql';

const authServerURL = process.env.AUTH_SERVER_URL as string;

export default {
  Prescription: {
    issuedBy: async (parent: Prescription) => {
      const user = await doGraphQLFetch(authServerURL, getUserByIdQuery, {
        userId: parent.issuedBy,
      });
      return user.user;
    },
    patientId: async (parent: Prescription) => {
      const user = await doGraphQLFetch(authServerURL, getUserByIdQuery, {
        userId: parent.patientId,
      });
      return user.user;
    },
  },

  Query: {
    users: async () => {
      const user = await doGraphQLFetch(authServerURL, getAllUserQuery, {});
      return user.users;
    },
    user: async (_parent: unknown, args: {id: string}) => {
      const user = await doGraphQLFetch(authServerURL, getUserByIdQuery, {
        userId: args.id,
      });
      return user.user;
    },
  },
  Mutation: {
    register: async (
      _parent: unknown,
      args: {
        input: {
          username: string;
          email: string;
          password: string;
          avatar: string;
        };
      }
    ) => {
      const user = await doGraphQLFetch(authServerURL, registerQuery, {
        input: args.input,
      });
      return user.register;
    },
    login: async (
      _parent: unknown,
      args: {
        input: {
          email: string;
          password: string;
        };
      }
    ) => {
      const loginUser = await doGraphQLFetch(authServerURL, loginQuery, {
        input: args.input,
      });
      return loginUser.login;
    },
    updateUser: async (
      _parent: unknown,
      args: {
        input: {
          username: string;
          email: string;
          password: string;
          avatar: string;
        };
      },
      user: UserIdWithToken
    ) => {
      const userFromDb = await doGraphQLFetch(authServerURL, getUserByIdQuery, {
        userId: user.id,
      });
      if (!userFromDb.user) {
        throw new GraphQLError('User not found', {
          extensions: {
            code: 'USER_NOT_FOUND',
          },
        });
      }

      const req = {
        username: args.input.username
          ? args.input.username
          : userFromDb.user.username,
        email: args.input.email ? args.input.email : userFromDb.user.email,
        password: args.input.password
          ? args.input.password
          : userFromDb.user.password,
        avatar: args.input.avatar ? args.input.avatar : userFromDb.user.avatar,
      };
      const updatedUser = await doGraphQLFetch(
        authServerURL,
        updateUserQuery,
        {
          input: req,
        },
        user.token
      );

      return updatedUser.updateUser;
    },
    deleteUser: async (
      _parent: unknown,
      _agrs: unknown,
      user: UserIdWithToken
    ) => {
      const deletedUser = await doGraphQLFetch(
        authServerURL,
        deleteUserQuery,
        {},
        user.token
      );
      return deletedUser.deleteUser;
    },
  },
};
