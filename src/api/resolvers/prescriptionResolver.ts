import {Prescription} from '../../interfaces/Prescription';
import prescriptionModel from '../models/prescriptionModel';

export default {
  Query: {
    prescriptions: async () => {
      return await prescriptionModel.find();
    },
    prescriptionById: async (_parent: undefined, args: Prescription) => {
      return await prescriptionModel.findById(args.id);
    },
  },
  Mutation: {
    createPrescription: async (_parent: undefined, args: Prescription) => {
      const prescription = new prescriptionModel(args);
      return await prescription.save();
    },
    updatePrescription: async (_parent: undefined, args: Prescription) => {
      return await prescriptionModel.findByIdAndUpdate(args.id, args, {
        new: true,
      });
    },
    deletePrescription: async (_parent: undefined, args: Prescription) => {
      return await prescriptionModel.findByIdAndDelete(args.id);
    },
  },
};
