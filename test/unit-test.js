const express = require('express');
const chai = require('chai');
const should = chai.should();
const expect = chai.expect();
const chaiHttp = require('chai-http');
const server = require('../server');
const jsdom = require('mocha-jsdom')

chai.use(chaiHttp);

describe('unit testing', function() {
  jsdom();

  it('should display a list', (done) => {
    chai.request(server)
    .get('/')
    .end(function(err, res) {
      res.text.should.include('hate-list')
      done()
    })
  });
  it('sortByName()', function() {
    const grudgeArray = [
  {
    id: 1,
    name: 'lacey',
    offense: 'being mean',
    created_at: '2016-09-10T16:44:28.015Z'
  },
  {
    id: 2,
    username: 'mike',
    offense: 'forgetting the cookies',
    created_at: '2015-09-10T16:44:28.015Z'
  },
  {
    id: 3,
    username: 'trump',
    offense: 'having bad hair',
    created_at: '2014-09-10T16:44:28.015Z'
  }
];
  })
});
