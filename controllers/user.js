class User {
    constructor(ctx) {
        this._ctx = ctx;
    }

    async login() {
        // this._ctx.body = 'login ok';
        await this._ctx.render('index', {
            // layout:'layout2',//模版
            user: 'John',
            title:'标题'
        })
    }
}

module.exports = User;