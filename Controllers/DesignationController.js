const designationModel = require('../Models/DesignationModel');

module.exports = {
    addDesignation: data => {
        return designationModel.create(data);
    },
    getAllDesignation: () => {
        return designationModel.find();
    },
    getDesignationById: designation_id => {
        return designationModel.findOne({ designation_id: designation_id });
        // return designationModel.findById(designation_id);
    },
    updateDesignation: (designation_id, body) => {
        return designationModel.updateOne({ designation_id: designation_id }, body);
        // return designationModel.findOneAndUpdate(designation_id, body);
    },
    deleteDesignation: designation_id => {
        return designationModel.deleteOne({ designation_id: designation_id });
        // return designationModel.findOneAndDelete(designation_id);
    }
};