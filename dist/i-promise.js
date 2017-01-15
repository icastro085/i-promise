/**

MIT License

Copyright (c) 2017 Ivanildo de Castro

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/
!function(){
"use strict";

/**
 * Class for use promise
 * @author Ivanildo de Castro
 * @license MIT
 */
function IPromise(callback){
    if(typeof callback === 'function'){
        this.execute = this.execute.bind(this, callback);
        this.execute();
    }
}

/**
 * Resolve the result as promise
 * @return IPromise
 */
IPromise.resolved = function(result){
    return new IPromise(function(resolve){
        resolve(result);
    });
};

/**
 * Take all arguments and create a new promise
 * @return {IPromise}
 */
IPromise.all = function(){

    var p = IPromise.resolved();
    var i;
    for(i = 0 ; i < arguments.length ; i++){
        p.then(arguments[i]);
    }

    return p;
};

/**
 * Create a new promise that will use soon
 * @return {Object}
 */
IPromise.deferred = function(){
    var promise = new IPromise();

    return {
        promise: promise,
        resolve: promise.resolve.bind(promise)
    };
};

IPromise.prototype.wasExecuted = false;

IPromise.prototype.thenArray = [];

IPromise.prototype.failArray = [];

IPromise.prototype.finallyArray = [];

/**
 * Execute the promise
 * @return {Void}
 */
IPromise.prototype.execute = function(callback, immediately){

    clearTimeout(this.wasExecuted);
    this.wasExecuted = null;

    if(immediately){
        callback(
            this.resolve.bind(this)
        );
    }else{

        this.thenArray = [];
        this.failArray = [];
        this.finallyArray = [];

        this.wasExecuted = setTimeout(
            callback.bind(
                callback,
                this.resolve.bind(this)
            ),
            0
        );
    }
};

/**
 * Execute the promise immediately
 * @return Void
 */
IPromise.prototype.done = function(){
    this.execute(true);
};

/**
 * Resolve the result for each then, fail and finally function
 * @param {Mixed} result
 * @return {Void}
 */
IPromise.prototype.resolve = function(result){
    try{
        var ipromise = this.forEachCallback(this.thenArray, result);
        if(ipromise){
            this.concatenateCallbacks(ipromise);
            ipromise.done();
        }
        this.thenArray = [];
    }catch(e){
        this.forEachCallback(this.failArray, {message: e});
        this.failArray = [];
    }finally {
        this.forEachCallback(this.finallyArray);
        this.failArray = [];
    }
};

/**
 * Loop for each list add to primise
 * @param {Array} list
 * @param {Mixed} result
 * @return {Void|IPromise}
 */
IPromise.prototype.forEachCallback = function(list, result){

    var i, callback, index;

    for(i = 0 ; i < list.length ; i++){
        callback = list[i];
        if(typeof callback === 'function'){
            result = callback(result);
        }

        if(result instanceof IPromise){
            index = i;
            break;
        }
    }

    if(result instanceof IPromise){
        list.splice(0, index + 1);
        return result;
    }
};

/**
 * To concatenate the list of callback in promise
 * @param {IPromise} promise
 * @return {Void}
 */
IPromise.prototype.concatenateCallbacks = function(promise){
    ['thenArray', 'failArray','finallyArray'].map(
        function(index){
            this.concatenateLists(
                promise[index],
                this[index]
            );
            this[index] = [];
        }.bind(this)
    );
};

/**
 * To concatenate two list of callback
 * @param {Array} list1
 * @param {Array} list2
 * @return {Void}
 */
IPromise.prototype.concatenateLists = function(list1, list2){
    var i;
    for(i = 0 ; i < list2.length ; i++){
        list1.push(list2[i]);
    }
};

/**
 * Then List
 * @param {Function} callback
 * @return {IPromise}
 */
IPromise.prototype.then = function(callback){
    this.thenArray.push(callback);
    return this;
};

/**
 * Fail List
 * @param {Function} callback
 * @return {IPromise}
 */
IPromise.prototype.fail = function(callback){
    this.failArray.push(callback);
    return this;
};

/**
 * Finally List
 * @param {Function} callback
 * @return {IPromise}
 */
IPromise.prototype.finally = function(callback){
    this.finallyArray.push(callback);
    return this;
};

if(module && module.exports){
    module.exports = IPromise;
}else{
    window.IPromise = IPromise;
}
}();