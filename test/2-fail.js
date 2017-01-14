var chai = require('chai');
var spies = require('chai-spies');
var expect = chai.expect;
var assert = chai.assert;
var should = chai.should;
var IPromise = require('./../src/i-promise.js');

chai.use(spies);

describe('IPromise #fail', function() {


    describe('When promise fail', function(){
        it('should execute "fail" function', function(done){
            var p = new IPromise(function(resolve){
                resolve(1);
            });

            p.then(function(){
                throw('error fail');
            }).fail(function(error){
                assert.isOk(true);
                expect(error.message).to.equal('error fail');
            }).fail(done);

        });
    });

});
