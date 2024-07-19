const router = require('express').Router();
const authRouter = require('./auth.api.router');
const tokensRouter = require('./tokens.api.router');
const receptsRouter = require('./recepts.api.router');
const favoritiesRouter = require('./favorities.api.router');

router.use('/tokens', tokensRouter);
router.use('/auth', authRouter);
router.use('/recepts', receptsRouter);
router.use('/favorities', favoritiesRouter);

module.exports = router;
