import {ApolloClient, InMemoryCache, gql, useQuery} from '@apollo/client';
import {UserIdWithToken} from '../../interfaces/User';
import {Prescription} from '../../interfaces/Prescription';

const client = new ApolloClient({
  uri: process.env.AUTH_URL,
  cache: new InMemoryCache(),
});

export default {
  Prescription: {
    issuedBy: async (parent: Prescription) => {
      const query = `
      query {
        user(id: "${parent.issuedBy}") {
          id
          username
          email
          avatar
        }
      }
    `;
      const {data} = await client.query({
        query: gql(query),
      });
      return data.user;
    },
    patientId: async (parent: Prescription) => {
      const query = `
      query {
        user(id: "${parent.patientId}") {
          id
          username
          email
          avatar
        }
      }
    `;
      const {data} = await client.query({
        query: gql(query),
      });
      return data.user;
    },
  },

  Query: {
    users: async () => {
      const query = `
        query {
          users {
            id
            username
            email
            avatar
            token
          }
        }
      `;
      const {data} = await client.query({
        query: gql(query),
      });
      return data.users;
    },
    user: async (_parent: unknown, args: {id: string}) => {
      const query = `
      query {
        user(id: "${args.id}") {
          id
          username
          email
          avatar
          token
        }
      }
    `;
      const {data} = await client.query({
        query: gql(query),
      });
      return data.user;
    },
  },
  Mutation: {
    register: async (
      _parent: unknown,
      args: {
        username: string;
        email: string;
        password: string;
        avatar: string;
      }
    ) => {
      const query = `
      mutation {
        register(input: {
          username: "${args.username}",
          email: "${args.email}",
          password: "${args.password}",
          avatar: "${args.avatar}"
        }) {
          id
          username
          email
          avatar
          token
        }
      }
    `;
      const {data} = await client.mutate({
        mutation: gql(query),
      });
      return data.register;
    },
    login: async (
      _parent: unknown,
      args: {
        email: string;
        password: string;
      },
      user: UserIdWithToken
    ) => {
      const query = `
      mutation {
        login(email: "${args.email}", password: "${args.password}") {
          id
          username
          email
          avatar
          token
        }
      }
    `;
      const headers = {
        authorization: `Bearer ${user.token}`,
      };
      const {data} = await client.mutate({
        mutation: gql(query),
        context: {
          headers,
        },
      });
      return data.login;
    },
    updateUser: async (
      _parent: unknown,
      args: {
        username: string;
        email: string;
        password: string;
        avatar: string;
      },
      user: UserIdWithToken
    ) => {
      let params = '';
      if (args.username) {
        params += `username: "${args.username}",`;
      }
      if (args.email) {
        params += `email: "${args.email}",`;
      }
      if (args.password) {
        params += `password: "${args.password}",`;
      }
      if (args.avatar) {
        params += `avatar: "${args.avatar}"`;
      }

      const query = `
      mutation {
        updateAvatar(${params}) {
          id
          username
          email
          avatar
          token
        }
      }
    `;
      const headers = {
        Authorization: `Bearer ${user.token}`,
      };
      const {data} = await client.mutate({
        mutation: gql(query),
        context: {
          headers,
        },
      });
      return data.updateUser;
    },
    deleteUser: async (
      _parent: unknown,
      _agrs: unknown,
      user: UserIdWithToken
    ) => {
      const query = `
        mutation {
          deleteUser {
            id
            username
            email
            avatar
            token
          }
        }
      `;
      const headers = {
        Authorization: `Bearer ${user.token}`,
      };
      const {data} = await client.mutate({
        mutation: gql(query),
        context: {
          headers,
        },
      });
      return data.deleteUser;
    },
  },
};
