const router = require('koa-router')();
const user = require('../controllers/user');

router.get('/user/login', async (ctx)=>{
    await new user(ctx).login();
});

module.exports = router;