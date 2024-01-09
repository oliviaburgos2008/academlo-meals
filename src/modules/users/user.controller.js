import { catchAsync } from './../../common/errors/catchAsync.js';
import generateJWT from './../../config/plugins/generate-jwt.plugin.js';
import { UserService } from './user.service.js';
import { AppError } from './../../common/errors/appError.js';
import { verifyPassword } from '../../config/plugins/encryted-password.plugin.js';

export const createUser = catchAsync(async (req, next) => {
  const { name, email, password, role } = req.body;

  const user = await UserService.create({ name, email, password, role });

  const token = await generateJWT(user.id);

  return res.status(201).json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
});

export const login = catchAsync(async (req, next) => {
  const { email, password } = req.body;

  const user = await UserService.findOneByEmail(email);

  if (!user) {
    return next(new AppError('User not found', 404));
  }

  const isOkPassword = await verifyPassword(password, user.password);

  if (!isOkPassword) {
    return next(new AppError('Invalid credentials', 401));
  }

  const token = await generateJWT(user.id);

  return res.status(200).json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
});

export const updateProfile = catchAsync(async (req, next) => {});
export const deleteUser = catchAsync(async (req, next) => {});
export const findUserOrders = catchAsync(async (req, next) => {});
export const findOneOrder = catchAsync(async (req, next) => {});
