import mongoose from 'mongoose';
import {Medicine} from '../../interfaces/Medicine';

const medicineSchema = new mongoose.Schema<Medicine>({
  medicineName: {
    type: String,
    required: true,
  },
  purpose: {
    type: String,
    //required: true,
  },
  sideEffects: {
    type: String,
    //required: true,
  },
});

export default mongoose.model<Medicine>('Medicine', medicineSchema);
