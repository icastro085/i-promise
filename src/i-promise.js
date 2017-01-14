function IPromise(callback){
    if(typeof callback === 'function'){
        this.execute = this.execute.bind(this, callback);
        this.execute();
    }
}

IPromise.resolved = function(result){
    return new IPromise(function(resolve){
        resolve(result);
    });
};

IPromise.all = function(){

    var p = IPromise.resolved();
    var i;
    for(i = 0 ; i < arguments.length ; i++){
        p.then(arguments[i]);
    }

    return p;
};

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


IPromise.prototype.done = function(){
    this.execute(true);
};

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
    };

    if(result instanceof IPromise){
        list.splice(0, index + 1);
        return result;
    }
};

IPromise.prototype.concatenateCallbacks = function(promise){
    ['thenArray', 'failArray','finallyArray'].map(
        function(index){
            this.concatenateLists(
                ipromise[index],
                this[index]
            );
            this[index] = [];
        }.bind(this)
    );
};

IPromise.prototype.concatenateLists = function(list1, list2){
    var i;
    for(i = 0 ; i < list2.length ; i++){
        list1.push(list2[i]);
    }
};

IPromise.prototype.then = function(callback){
    this.thenArray.push(callback);
    return this;
};

IPromise.prototype.fail = function(callback){
    this.failArray.push(callback);
    return this;
};

IPromise.prototype.finally = function(callback){
    this.finallyArray.push(callback);
    return this;
};

module.exports = IPromise;
