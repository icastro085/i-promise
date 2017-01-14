var chai = require('chai');
var spies = require('chai-spies');
var expect = chai.expect;
var assert = chai.assert;
var should = chai.should;
var IPromise = require('./../src/i-promise.js');

chai.use(spies);

describe('IPromise #deferred', function() {

    describe('When execute "deferred"', function(){
        it('should return a instance of IPromise', function(done){
            var deferred = IPromise.deferred();
            var p = deferred.promise;

            p.then(function(value){
                expect(value).to.equal(2);
                return value + 2;
            }).finally(done);

            p.then(function(value){
                expect(value).to.equal(4);
            });

            deferred.resolve(2)
        });

    });

});
