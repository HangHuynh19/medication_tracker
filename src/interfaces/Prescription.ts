import {Document, Types} from 'mongoose';
import {PrescribedItem} from './PrescribedItem';

interface Prescription extends Document {
  issuedDate: Date;
  issuedBy: Types.ObjectId;
  expiryDate: Date;
  medicineList: Types.ObjectId[] | PrescribedItem[];
  patientId: Types.ObjectId;
}

export {Prescription};
