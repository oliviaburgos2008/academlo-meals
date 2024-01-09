import express from 'express';
import {
  createRestaurant,
  createReview,
  deleteReview,
} from './restaurant.controller.js';
import { protect, protectAccountOwner } from './../users/user.middleware.js';
import {
  validExistRestaurant,
  validExistReview,
} from './restaurant.middleware.js';

export const router = express.Router();

router.use(protect);

router.route('/').post(createRestaurant);

router.post('/reviews/:Id', validExistRestaurant, createReview);

router
  .route('/reviews/:restaurantId/:id')
  .delete(
    validExistRestaurant,
    validExistReview,
    protectAccountOwner,
    deleteReview
  );
