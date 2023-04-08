const leaveModel = require('../Models/LeaveModel');

module.exports = {
    addLeave: data => {
        return leaveModel.create(data);
    },
    getAllLeave: () => {
        return leaveModel.find();
    },
    getLeaveById: leave_id => {
        return leaveModel.findOne({leave_id:leave_id});
        // return leaveModel.findOne(leave_id);
    },
    updateLeave: (leave_id, data) => {
        return leaveModel.findOneAndUpdate(leave_id, data);
        // return airlineModel.updateOne({ leave_id: leave_id }, body);
    },
    deleteLeave: leave_id => {
        return leaveModel.findOneAndDelete(leave_id);
        // return leaveModel.deleteOne({ leave_id: leave_id });
    }
};