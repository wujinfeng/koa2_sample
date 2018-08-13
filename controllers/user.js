class User {
    constructor(ctx){
        this._ctx = ctx;
    }

    async login(){
        this._ctx.body = 'login ok';
    }
}

module.exports = User;