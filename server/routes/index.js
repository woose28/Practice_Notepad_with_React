import express from 'express';
import account from './account';

const router = express();

router.use('/account', account);

export default router;
