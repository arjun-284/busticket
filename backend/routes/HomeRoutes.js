import express from 'express';
import { home, locations, invoiceData, booking, initiateEsewaPayment, esewaSuccess, esewaFailure } from '../controllers/HomeController.js';

const router = express.Router();

router.get('/locations', locations);
router.post('/home', home);
router.post('/booking', booking);
router.get('/get-invoice-data/:id', invoiceData);
router.post('/payment/initiate-esewa', initiateEsewaPayment);
router.get('/payment/esewa-success', esewaSuccess);
router.get('/payment/esewa-failure', esewaFailure);

export const homeRoutes = router;
