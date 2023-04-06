import {Document, Types} from 'mongoose';

interface Prescription extends Document {
  issuedDate: Date;
  issuedBy: Types.ObjectId;
  expiryDate: Date;
  medicineList: Types.ObjectId[];
}

export {Prescription};
