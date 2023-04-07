import {Document, Types} from 'mongoose';
import {PrescribedItem} from './PrescribedItem';

interface Prescription extends Document {
  issuedDate: Date;
  //issuedBy: Types.ObjectId;
  issuedBy: string;
  expiryDate: Date;
  medicineList: Types.ObjectId[] | PrescribedItem[];
}

export {Prescription};
