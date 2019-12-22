const DataLoader = require('dataloader');
const _ = require('lodash');


module.exports = (Model) => {
    return new DataLoader(async (ids) => {
        const results = await Model.find({
            _id: {
                $in: _.uniq(ids),
            },
        });
        const resultMapping = _.keyBy(results, (result) => result.id.toString());
    
        return _.map(ids, (id) => {
            return resultMapping[id.toString()];
        });
    }, {
        batchScheduleFn: callback => setTimeout(callback, 50)
    });
};
