"use strict";

var IPromise = require('./../src/i-promise.js');

describe('IPromise #finally', function() {

    describe('After execute "then"', function(){
        it('should execute finally', function(done){
            var p = new IPromise(function(resolve){
                resolve(1);
            });
            var count = 0;
            p.then(function(){
                count++;
            }).finally(function(){
                expect(count).to.equal(1);
                assert.isOk(true);
            }).finally(done);

        });

        it('should execute finally after execute fail', function(done){
            var p = new IPromise(function(resolve){
                resolve(1);
            });

            p.then(function(){
                throw('error fail');
            }).fail(function(){
                assert.isOk(true);
            }).finally(done);

        });
    });

});
