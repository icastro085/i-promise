var chai = require('chai');
var spies = require('chai-spies');
var expect = chai.expect;
var assert = chai.assert;
var should = chai.should;
var IPromise = require('./../src/i-promise.js');

chai.use(spies);

describe('IPromise #resolved', function() {

    describe('When execute "resolved"', function(){
        it('should return a i-promise', function(done){
            var p = IPromise.resolved(1);
            assert.isOk(p instanceof IPromise);

            done();
        });

        it('should execute "then" function', function(done){
            IPromise.resolved(1)
                .then(function(value){
                    expect(value).to.equal(1);
                }).finally(done);
        });

        it('should execute "fail" function', function(done){
            IPromise.resolved(1)
                .then(function(value){
                    throw('error fail');
                })
                .fail(function(){
                    assert.isOk(true);
                })
                .finally(done);
        });

        it('should execute "finally" function', function(done){
            IPromise.resolved(1)
                .then(function(value){
                    expect(value).to.equal(1);
                }).finally(done);
        });
    });

});
