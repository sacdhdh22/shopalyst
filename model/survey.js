const mongoose = require('mongoose');
const Schema  =new mongoose.Schema;
const surveySchema = new mongoose.Schema({
  rating : {
      food : {
          value : {type : Number,
              enum : [1,2,3,4,5]}
      },
      ambiance : {
          value : {type : Number,
              enum : [1,2,3,4,5]}
      },
      service : {
          value : {type : Number,
              enum : [1,2,3,4,5]}
      },
      pricing : {
          value : {type : Number,
              enum : [1,2,3,4,5]}
      },
      feedback : String
  },
  user: {
     type:  mongoose.Schema.Types.ObjectId, ref : 'user'
  },
  submittedOn : {
      type : Date
  }
});


surveySchema.statics.getSurveyResult = function(callback) {
   this.aggregate([
       {
         $project : {
             food : {
                 foodBad: {$cond: [{$eq: ["$rating.food.value", 1]}, 1, 0]},
                 foodPoor: {$cond: [{$eq: ["$rating.food.value", 2]}, 1, 0]},
                 foodAverage: {$cond: [{$eq: ["$rating.food.value", 3]}, 1, 0]},
                 foodGood: {$cond: [{$eq: ["$rating.food.value", 4]}, 1, 0]},
                 foodExcellent: {$cond: [{$eq: ["$rating.food.value", 5]}, 1, 0]}
             }, ambiance : {
                 ambianceBad: {$cond: [{$eq: ["$rating.ambiance.value", 1]}, 1, 0]},
                 ambiancePoor: {$cond: [{$eq: ["$rating.ambiance.value", 2]}, 1, 0]},
                 ambianceAverage: {$cond: [{$eq: ["$rating.ambiance.value", 3]}, 1, 0]},
                 ambianceGood: {$cond: [{$eq: ["$rating.ambiance.value", 4]}, 1, 0]},
                 ambianceExcellent: {$cond: [{$eq: ["$rating.ambiance.value", 5]}, 1, 0]}
             }, service : {
                 serviceBad: {$cond: [{$eq: ["$rating.service.value", 1]}, 1, 0]},
                 servicePoor: {$cond: [{$eq: ["$rating.service.value", 2]}, 1, 0]},
                 serviceAverage: {$cond: [{$eq: ["$rating.service.value", 3]}, 1, 0]},
                 serviceGood: {$cond: [{$eq: ["$rating.service.value", 4]}, 1, 0]},
                 serviceExcellent: {$cond: [{$eq: ["$rating.service.value", 5]}, 1, 0]}
             },pricing : {
                 pricingBad: {$cond: [{$eq: ["$rating.pricing.value", 1]}, 1, 0]},
                 pricingPoor: {$cond: [{$eq: ["$rating.pricing.value", 2]}, 1, 0]},
                 pricingAverage: {$cond: [{$eq: ["$rating.pricing.value", 3]}, 1, 0]},
                 pricingGood: {$cond: [{$eq: ["$rating.pricing.value", 4]}, 1, 0]},
                 pricingExcellent: {$cond: [{$eq: ["$rating.pricing.value", 5]}, 1, 0]}
             }
         }
       },
       {
           $group : {
               _id: 1,
               total : {$sum : 1},
               foodBad : {$sum :"$food.foodBad"},
               foodPoor : {$sum :"$food.foodPoor"},
               foodAverage : {$sum :"$food.foodAverage"},
               foodGood : {$sum :"$food.foodGood"},
               foodExcellent : {$sum :"$food.foodExcellent"},
               ambianceBad : {$sum :"$ambiance.ambianceBad"},
               ambiancePoor : {$sum :"$ambiance.ambiancePoor"},
               ambianceAverage : {$sum :"$ambiance.ambianceAverage"},
               ambianceGood : {$sum :"$ambiance.ambianceGood"},
               ambianceExcellent : {$sum :"$ambiance.ambianceExcellent"},
               serviceBad : {$sum :"$service.serviceBad"},
               servicePoor : {$sum :"$service.servicePoor"},
               serviceAverage : {$sum :"$service.serviceAverage"},
               serviceGood : {$sum :"$service.serviceGood"},
               serviceExcellent : {$sum :"$service.serviceExcellent"},
               pricingBad : {$sum :"$pricing.pricingBad"},
               pricingPoor : {$sum :"$pricing.pricingPoor"},
               pricingAverage : {$sum :"$pricing.pricingAverage"},
               pricingGood : {$sum :"$pricing.pricingGood"},
               pricingExcellent : {$sum :"$pricing.pricingExcellent"}
           }
       }
   ]).exec(function (err, doc) {
       if (err) callback(err);
       else callback(null, doc);
   });
};
var Survey = mongoose.model('survey', surveySchema);
module.exports = Survey;
