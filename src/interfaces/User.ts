import {Document, Types} from 'mongoose';

interface User extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  associatedClients: Types.ObjectId[];
}

export {User};
