var IPromise = require('./../src/i-promise.js');

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
