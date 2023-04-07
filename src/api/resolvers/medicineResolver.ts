import {Medicine} from '../../interfaces/Medicine';
import {PrescribedItem} from '../../interfaces/PrescribedItem';
import medicineModel from '../models/medicineModel';

export default {
  PrescribedItem: {
    medicine: async (parent: PrescribedItem) => {
      return await medicineModel.findById(parent.medicine);
    },
  },
  Query: {
    medicines: async () => {
      return await medicineModel.find();
    },
    medicineById: async (_parent: undefined, args: Medicine) => {
      return await medicineModel.findById(args.id);
    },
  },
  Mutation: {
    createMedicine: async (_parent: undefined, args: Medicine) => {
      return await medicineModel.create(args);
    },
    updateMedicine: async (_parent: undefined, args: Medicine) => {
      return await medicineModel.findByIdAndUpdate(args.id, args, {
        new: true,
      });
    },
    deleteMedicine: async (_parent: undefined, args: Medicine) => {
      return await medicineModel.findByIdAndDelete(args.id);
    },
  },
};
