"use strict";

var IPromise = require('./../src/i-promise.js');

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
