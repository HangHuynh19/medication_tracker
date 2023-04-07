import {Document} from 'mongoose';

interface Medicine extends Document {
  medicineName: string;
  purpose: string;
  sideEffects: string;
}

export {Medicine};
