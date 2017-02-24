const express = require('express');
const chai = require('chai');
const should = chai.should();
const expect = chai.expect();
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);

describe('GET /api/grudges', function() {
  it('should return a 200 status code', function(done) {
      chai.request(server)
      .get('/api/grudges')
      .end(function(err, res) {
        res.should.have.status(200);
        done()
      })
  });
  it('should return json', function(done) {
    chai.request(server)
    .get('/api/grudges')
    .end(function(err, res) {
      res.should.be.json; // jshint ignore:line
      done()
    })
  });
  it('should return a grudge list greater than 0', function(done) {
    chai.request(server)
    .get('/api/grudges')
    .end(function(err, res) {
      res.body.length.should.not.eql(0) // jshint ignore:line
      done()
    })
  });
  it('should return a grudge list with keys', function(done) {
    chai.request(server)
    .get('/api/grudges')
    .end(function(err, res) {
      res.body[0].should.include.keys(
        'id', 'name', 'offense', 'forgiven', 'created_at'
      ); // jshint ignore:line
      done()
    })
  });
  it('should be an array', function(done) {
    chai.request(server)
    .get('/api/grudges')
    .end(function(err, res) {
      res.body.should.be.a('array');
      done()
    })
  });
});

describe('GET /', function() {
  it('should return a 200 status code', function(done) {
      chai.request(server)
      .get('/')
      .end(function(err, res) {
        res.should.have.status(200);
        done()
      })
  });
});

describe('GET /:id', function() {
  it('should return a 200 status code', function(done) {
      chai.request(server)
      .get('/1')
      .end(function(err, res) {
        res.should.have.status(200);
        done()
      })
  });
  it('should return a 200 status code', function(done) {
      chai.request(server)
      .get('/3')
      .end(function(err, res) {
        res.should.have.status(200);
        done()
      })
  });
  it('should respond with 404 for no route', (done) => {
    chai.request(server)
    .get('/api/testing')
    .end(function(err, res) {
      res.should.have.status(404);
      done()
    })
  });
});

describe('POST /api/grudges', function() {
  it('should respond with a success message that a grudge was added', (done) => {
    chai.request(server)
    .post('/api/grudges')
    .send({
      name: 'Lacey',
      offense: 'Being the worst',
      forgiven: false
    })
    .end((err, res) => {
      should.not.exist(err);
      res.should.have.status(200);
      res.body.should.include.keys(
        'id', 'name', 'forgiven'
      );
      done();
    })
  });
});
