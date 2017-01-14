var chai = require('chai');
var spies = require('chai-spies');
var expect = chai.expect;
var assert = chai.assert;
var should = chai.should;
var IPromise = require('./../src/i-promise.js');

chai.use(spies);

describe('IPromise #all', function() {

    describe('When execute "all"', function(){
        it('should execute each one callback', function(done){
            IPromise.all(
                function(){
                    return 1;
                },
                function(value){
                    return value + 1;
                }
            ).then(function(value){
                expect(value).to.equal(2);
            }).finally(done);
        });

    });

});
