import mongoose from 'mongoose';
import {PrescribedItem} from '../../interfaces/PrescribedItem';

const prescribedItemSchema = new mongoose.Schema<PrescribedItem>({
  medicine: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Medicine',
    required: true,
  },
  dosage: {
    type: Number,
    required: true,
  },
  intakeTime: {
    type: [String],
    required: true,
  },
});

export default mongoose.model<PrescribedItem>(
  'PrescribedItem',
  prescribedItemSchema
);
