import config from '../../config'
import AppError from '../../errors/AppError'
import { User } from '../user/user.model'
import { TLoginUser } from './auth.interface'
import httpStatus from 'http-status'
import jwt, { JwtPayload } from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const loginUser = async (payload: TLoginUser) => {
  const user = await User.isUserExistsByEmail(payload?.email)
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'Email is not valid')
  }
  if (await User.isUserBlocked(payload?.email)) {
    throw new AppError(httpStatus.FORBIDDEN, 'User is Blocked')
  }
  if (!(await User.isPasswordMatched(payload.password, user.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'Incorrect Password')
  }
  const jwtPayload = {
    email: user.email,
    role: user.role,
  }
  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '10d',
  })
  const refreshToken = jwt.sign(
    jwtPayload,
    config.jwt_refresh_secret as string,
    {
      expiresIn: '10m',
    },
  )
  return { accessToken, refreshToken }
}
const refreshToken = async (token: string) => {
  // checking if the given token is valid
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string,
  ) as JwtPayload

  const { email } = decoded

  // checking if the user is exist

  const user = await User.isUserExistsByEmail(email)

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !')
  }
  // checking if the user is already deleted
  if (await User.isUserBlocked(email)) {
    throw new AppError(httpStatus.FORBIDDEN, 'User is Blocked')
  }

  const jwtPayload = {
    email: user.email,
    role: user.role,
  }
  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '10d',
  })

  return {
    accessToken,
  }
}
const updatePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  // checking if the user is exist
  const user = await User.isUserExistsByEmail(userData?.email)

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !')
  }
  // checking if the user is already deleted
  if (await User.isUserBlocked(userData?.email)) {
    throw new AppError(httpStatus.FORBIDDEN, 'User is Blocked')
  }

  //checking if the password is correct

  if (!(await User.isPasswordMatched(payload.oldPassword, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, 'Incorrect old Password')

  //hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_round),
  )

  await User.findOneAndUpdate(
    {
      email: userData.email,
      role: userData.role,
    },
    {
      password: newHashedPassword,
      passwordChangedAt: new Date(),
    },
  )

  return null
}

export const AuthService = {
  loginUser,
  refreshToken,
  updatePassword,
}
