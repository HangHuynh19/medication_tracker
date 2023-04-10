import mongoose from 'mongoose';
import {Prescription} from '../../interfaces/Prescription';

const prescriptionSchema = new mongoose.Schema<Prescription>({
  issuedDate: {
    type: Date,
    required: true,
  },
  issuedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  expiryDate: {
    type: Date,
    required: true,
  },
  medicineList: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'PrescribedItem',
    required: true,
  },
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

export default mongoose.model<Prescription>('Prescription', prescriptionSchema);
