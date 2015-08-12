'use strict';

var mongoose = require('mongoose');
var _ = require('lodash');
var user = require('../../serveur/data/models/user');
var spend = require('../../serveur/data/models/spend');
var colocation = require('../../serveur/data/models/colocation');
var should = require('should');

var userId = '';
describe('Models', () =>{
  describe('Users', () =>{
    describe('#create()', () => {
      it('should create a new user', (done) => {
        user.create({name: 'modelTest1', password: 'modelTest1'}, (err, createdUser) =>{
          should.not.exist(err);
          createdUser.should.have.property('_id');
          userId = createdUser._id;
          createdUser.should.have.property('name');
          done();
        });
      });
      it('should return unique constraint error', (done) => {
        user.create({name: 'modelTest1', password: 'modelTest1'}, (err, createdUser) =>{
          should.exist(err);
          done();
        });
      });
    });
    describe('#find()', () => {
      it('should get user by name', (done) => {
        user.find({name : 'modelTest1'}, (err, result) => {
          should.not.exist(err);
          result.should.have.length(1);
          result[0].name.should.be.exactly('modelTest1');
          done();
        });
      });
      it('should get user by id', (done) => {
        user.findById(userId, (err, result) => {
          should.not.exist(err);
          result.name.should.be.exactly('modelTest1');
          done();
        });
      });
    });
    describe('#delete()', () => {
      var userToDelete = {};
      var spendDxpectDel = {};
      before((done) => {
        Promise.all([
          user.create({name: 'userdeleteTest', password: 'userdeleteTest'}),
          user.create({name: 'userdeleteTest2', password: 'userdeleteTest2'}),
          colocation.create({name: 'colocDeleteTest'})
        ]).then((results) => {
          userToDelete = results[0];
          spend.create({creator: results[0]._id, toUser: results[1], colocation: results[2]}).then((model) =>{
            spendDxpectDel = model;
            done();
          });
        });
      });
      it('should return delete spend related to user', (done) => {
        userToDelete.remove(() => {
          spend.findById(spendDxpectDel._id, (err, results) => {
            should.not.exist(results);
            done();
          });
        });
      });
    });
    describe('#update()', () => {
      var userToUpdate = {};
      before((done) => {
        user.create({name: 'userUpdateTest', password: 'userUpdateTest'}).then((model) => {
          userToUpdate = model;
          done();
        });
      });
      it('should update user name', (done) => {
        spend.update({_id: userToUpdate._id}, {name : 'updatedName'}, () => {
          spend.findById(userToUpdate._id, (err, result) => {
            result.name.should.be.exactly('updatedName');
            done();
          });
        });
        done();
      });
    });
  });
});
