'use strict';

const express = require('express');
const router = express.Router();
const async = require('async');
const ObjectID = require('mongodb').ObjectID;
const User = require('../../../model/user.js');
const Survey = require('../../../model/survey.js');

module.exports = {
    submitFeedback  :function(req, res, next)  {
        async.waterfall([
                registerUser,
                saveSurvey
            ],
            function(err, results) {
                if(err)
                    res.sendStatus(500);
                else
                    res.sendStatus(200);
            });

        function registerUser(callback){
            var user = new User({
                'profile.fullName' : req.body.user.name,
                'profile.dob'      : req.body.user.dob,
                'accountStatus.createdOn' : new Date()
            });
            user.save(function(err, data){
                if(err)
                    callback(err);
                else
                {
                 callback(null,data._id);
                }
            });
        }

        function saveSurvey(id,callback){
            var survey = new Survey({
              rating : req.body.surveyData,
              submittedOn : new Date(),
              user :  ObjectID(id)
            });
            survey.save(function(err, data){
                if(err)
                    callback(err);
                else
                {
                 callback(null, data);
                }
            });
        }
    },
    getResult : function(req, res, next){
        Survey.getSurveyResult(function(err, data){
            if(err)
                res.sendStatus(500);
            else
                res.send(data);
    })
    }
};