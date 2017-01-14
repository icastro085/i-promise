var chai = require('chai');
var spies = require('chai-spies');
var expect = chai.expect;
var assert = chai.assert;
var should = chai.should;
var IPromise = require('./../src/i-promise.js');

chai.use(spies);

describe('IPromise #then', function() {

    describe('When I create a new promise', function(){
        it('and resolve with value 1', function(done){

            var p = new IPromise(function(resolve){
                resolve(1);
            });

            p.then(function(value){
                expect(value).to.equal(1);
            }).finally(done);

        });

        it('and resolve with 2 value', function(done){

            var p = new IPromise(function(resolve){
                resolve(1);
            });

            p.then(function(value){
                expect(value).to.equal(1);
                return value + 1;
            }).then(function(value){
                expect(value).to.equal(2);
           }).finally(done);

        });

        it('and execute other promise', function(done){
            var p = new IPromise(function(resolve){
                resolve(2);
            });

            p.then(function(value){

                var t = new IPromise(function(resolve){
                    resolve(value + 3);
                }).then(function(value){
                    return value + 1;
                });

                return t;

            }).then(function(value){
                expect(value).to.equal(6);
            }).finally(done);
        });


        it('and execute other promise with timeout', function(done){
            var p = new IPromise(function(resolve){
                resolve(2);
            });

            p.then(function(value){

                var t = new IPromise(function(resolve){
                    setTimeout(function(){
                        resolve(value + 3);
                    }, 10);
                }).then(function(value){
                    return value + 1;
                });

                return t;

            }).then(function(value){
                expect(value).to.equal(6);
            }).finally(done);
        });

        it('and execute other promise with timeout and more one promise', function(done){
            var p = new IPromise(function(resolve){
                resolve(2);
            });

            p.then(function(value){

                var p = new IPromise(function(resolve){
                    setTimeout(function(){
                        resolve(value + 3);
                    }, 10);
                }).then(function(value){
                    return IPromise.resolved(value + 1).then(function(value){
                        return value + 2;
                    });
                });

                return p;

            }).then(function(value){
                expect(value).to.equal(8);
            }).finally(done);
        });

        it('and execute immediately', function(done){
            var p = new IPromise(function(resolve){
                resolve(1);
            });

            p.then(function(value){
                return value + 1;
            }).then(function(value){
                expect(value).to.equal(2);
            }).finally(done).done();
        });

    });

});
