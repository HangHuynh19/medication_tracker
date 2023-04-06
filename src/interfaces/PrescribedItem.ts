import {Document, Types} from 'mongoose';

interface PrescribedItem extends Document {
  medicine: Types.ObjectId;
  dosage: number;
  intakeTime: string[];
}

export {PrescribedItem};
