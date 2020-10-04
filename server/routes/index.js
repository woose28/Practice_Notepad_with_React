import express from 'express';
import account from './account';
import memo from './memo';

const router = express();

router.use('/account', account);
router.use('/memo', memo);

export default router;
