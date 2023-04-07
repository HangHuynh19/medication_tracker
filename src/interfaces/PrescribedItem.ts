import {Document, Types} from 'mongoose';
import {Medicine} from './Medicine';

interface PrescribedItem extends Document {
  medicine: Types.ObjectId | Medicine;
  dosage: number;
  intakeTime: string[];
}

export {PrescribedItem};
