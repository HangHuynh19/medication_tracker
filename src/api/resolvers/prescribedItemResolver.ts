import {PrescribedItem} from '../../interfaces/PrescribedItem';
import {Prescription} from '../../interfaces/Prescription';
import prescribedItemModel from '../models/prescribedItemModel';

export default {
  Prescription: {
    medicineList: async (parent: Prescription) => {
      const ids = parent.medicineList.map((id) => id.toString());

      const items = ids.map(
        async (id) => (await prescribedItemModel.findById(id)) as PrescribedItem
      );
      return items;
    },
  },
  Query: {
    prescribedItems: async () => {
      return await prescribedItemModel.find();
    },
    prescribedItemById: async (_parent: undefined, args: PrescribedItem) => {
      return await prescribedItemModel.findById(args.id);
    },
  },
  Mutation: {
    createPrescribedItem: async (_parent: undefined, args: PrescribedItem) => {
      const prescribedItem = new prescribedItemModel(args);
      return await prescribedItem.save();
    },
    updatePrescribedItem: async (_parent: undefined, args: PrescribedItem) => {
      return await prescribedItemModel.findByIdAndUpdate(args.id, args, {
        new: true,
      });
    },
    deletePrescribedItem: async (_parent: undefined, args: PrescribedItem) => {
      return await prescribedItemModel.findByIdAndDelete(args.id);
    },
  },
};
