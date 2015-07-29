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
    describe('#GET /', () => {
      it('fetch all users', (done) =>{
        request.get('/api/users')
          .set('Accept', 'application/json')
          .expect('status', 200)
          .end((err, res, body) =>{
            res.body.should.have.length(2);
            done();
          });
      });
    });
    describe('#POST /', () => {
      it('Create users', (done) => {
        request.post('/api/users')
           .send({
             name: 'test'
           })
          .expect('Content-Type', /json/)
          .expect(201, done);
      });
    });
  });
  describe('colocations', () => {
    describe('#GET /', () => {
      it('fetch all colocations', (done) =>{
        request.get('/api/colocations')
          .set('Accept', 'application/json')
          .expect('status', 200)
          .end((err, res, body) =>{
            res.body.should.have.length(1);
            done();
          });
      });
    });
    describe('#POST /', () => {
      it('Create users', (done) => {
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
    describe('#GET /', () => {
      it('Fetch all spends', (done) =>{
        request.get('/api/colocations')
          .set('Accept', 'application/json')
          .expect('status', 200)
          .end((err, res, body) =>{
            res.body.should.have.length(2);
            done();
          });
      });
    });
    describe('#POST /', () => {
      var colocationSpend = {};
      var creatorSpend = {};
      var toUserSpend = {};
      before((done) => {
        Promise.all([
          user.create({name: 'userSpendApi'}),
          user.create({name: 'userSpendApi2'}),
          colocation.create({name: 'colocSpendApi'})
        ]).then((results) => {
          creatorSpend = results[0];
          toUserSpend = results[1];
          colocationSpend = results[2];

          done();
        });
      });
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
  });
});
