import { NextFunction, Request, Response } from "express";
import { authServices } from "./auth.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import config from "../../config";
import { clearAuthCookie, setAuthCookie } from "../../utils/authCookies";
import { createUserTokens } from "../../utils/authToken";
import passport from "passport";
import { User } from "../../../generated/prisma/client";

const registerUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const result = await authServices.registerUser(payload);
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      message: "User registered successfully",
      data: { result },
    });
  },
);

const loginUser = catchAsync(async (req, res) => {
  const { accessToken, refreshToken } = await authServices.loginUser(req.body);
  setAuthCookie(res, { accessToken, refreshToken });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "User logged in successfully",
    data: { accessToken, refreshToken },
  });
});

const googleCallback = catchAsync(async (req, res) => {
  const user = req.user as unknown as User;
  const { accessToken, refreshToken } = authServices.loginWithGoogle(user);
  setAuthCookie(res, { accessToken, refreshToken });
  res.redirect(config.frontend_url as string);
});

const refreshToken = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.refreshToken;
    const { accessToken } = await authServices.refreshToken(token);

    setAuthCookie(res, { accessToken });

    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: "User logged in successfully",
      data: { accessToken },
    });
  },
);

const getMyProfile = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id as string;
    const result = await authServices.getMyProfile(userId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: "User profile fetched successfully",
      data: { result },
    });
  },
);

const updateMyProfile = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id as string;
    const payload = req.body;
    const result = await authServices.updateMyProfile(userId, payload);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: "Profile updated successfully",
      data: { result },
    });
  },
);

const logoutUser = catchAsync(async (req, res) => {
  clearAuthCookie(res);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Logged out successfully",
    data: null,
  });
});
export const authController = {
  registerUser,
  loginUser,
  googleCallback,
  refreshToken,
  getMyProfile,
  updateMyProfile,
  logoutUser,
};
