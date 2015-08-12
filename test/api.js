'use strict';

var request = require('supertest');
var mongoose = require('mongoose');
var should = require('should');
var _ = require('lodash');
var user = require('../serveur/data/models/user');
var spend = require('../serveur/data/models/spend');
var colocation = require('../serveur/data/models/colocation');

var app = require('../server').app;
var server =  app.listen();

request = request.agent(server);

describe('api', () => {
  before((done) => {
    var users = [];
    require('../serveur/data/dev/').populate().then(() => {
      done();
    });
  });
  describe('users', () => {
    var userToFetch = {};
    before((done) => {
      user.create({name: 'userapiGetById', password: 'tata'}, (err, model) => {
        userToFetch = model;
        done();
      });
    });
    describe('#GET /', () => {
      it('fetch all users', (done) =>{
        request.get('/api/users')
          .set('Accept', 'application/json')
          .expect('status', 200)
          .end((err, res, body) =>{
            res.body.should.not.be.empty();
            done();
          });
      });
    });
    describe('#GET /:Id', () => {
      it('fetch one user by id', (done) =>{
        request.get('/api/users/'+ userToFetch._id)
          .set('Accept', 'application/json')
          .expect('status', 200)
          .end((err, res, body) =>{
            res.body.should.have.property('name', 'userapiGetById');
            done();
          });
      });
    });
    describe('#POST /', () => {
      it('Create users', (done) => {
        request.post('/api/users')
           .send({
             name: 'test',
             password: 'test'
           })
          .expect('Content-Type', /json/)
          .expect(201, done);
      });
    });
    describe('#POST /:ID', () => {
      it('Update user', (done) => {
        request.post('/api/users/'+userToFetch._id)
           .send({
             name: 'testupdate'
           })
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res, body) =>{
            res.body.should.not.be.empty();
            res.body.name.should.be.exactly('testupdate');
            done();
          });
      });
    });
  });
  describe('colocations', () => {
    var colocationToFetch;
    before((done) => {
      colocation.create({name: 'colocationApiGetById'}, (err, model) => {
        colocationToFetch = model;
        done();
      });
    });
    describe('#GET /', () => {
      it('fetch all colocations', (done) =>{
        request.get('/api/colocations')
          .set('Accept', 'application/json')
          .expect('status', 200)
          .end((err, res, body) =>{
            res.body.should.not.be.empty();
            done();
          });
      });
    });
    describe('#GET /:Id', () => {
      it('fetch one user by id', (done) =>{
        request.get('/api/colocations/'+ colocationToFetch._id)
          .set('Accept', 'application/json')
          .expect('status', 200)
          .end((err, res, body) =>{
            res.body.should.have.property('name', 'colocationApiGetById');
            done();
          });
      });
    });
    describe('#POST /', () => {
      it('Create colocation', (done) => {
        request.post('/api/colocations')
           .send({
             name: 'apicreate'
           })
          .expect('Content-Type', /json/)
          .expect(201, done);
      });
    });
  });

  describe('spends', () => {
    var colocationSpend = {};
    var creatorSpend = {};
    var toUserSpend = {};
    var spendToFetch = {};
    before((done) => {
      Promise.all([
        user.create({name: 'userSpendApi', password: 'userSpendApi'}),
        user.create({name: 'userSpendApi2', password: 'userSpendApi2'}),
        colocation.create({name: 'colocSpendApi'})
      ]).then((results) => {
        creatorSpend = results[0];
        toUserSpend = results[1];
        colocationSpend = results[2];
        spend.create({
          creator: creatorSpend._id,
          toUser: toUserSpend._id,
          colocation: colocationSpend._id
        }, (err, model) => {
          spendToFetch = model;
        });
        done();
      });
    });
    describe('#GET /', () => {
      it('Fetch all spends', (done) =>{
        request.get('/api/spends')
          .set('Accept', 'application/json')
          .expect('status', 200)
          .end((err, res, body) =>{
            res.body.should.not.be.empty();
            done();
          });
      });
    });
    describe('#GET /:Id', () => {
      it('fetch one user by id', (done) =>{
        request.get('/api/spends/'+ spendToFetch._id)
          .set('Accept', 'application/json')
          .expect('status', 200)
          .end((err, res, body) =>{
            res.body.should.have.property('creator');
            done();
          });
      });
    });
    describe('#POST /', () => {
      it('Create spend', (done) => {
        request.post('/api/colocations')
        .send({
          colocation: colocationSpend,
          creator: creatorSpend,
          toUser: toUserSpend
        })
        .expect('Content-Type', /json/)
        .expect(201, done);
      });
    });
    describe('#DELETE /:id', () => {

    });
  });
});
