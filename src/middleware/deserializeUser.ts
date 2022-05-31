import { get } from "lodash";
import { Request, Response, NextFunction } from "express";
import { decode } from "../utils/jwt.utils";
import { reIssueAccessToken } from "../service/authentication";

const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.headers.accesstoken as string;
  const refreshToken  = req.headers.refreshtoken as string;

    console.log(accessToken);

  if (!accessToken) return next();

  const { decoded, expired } = decode(accessToken);

  if (decoded) {
    // @ts-ignore
    req.user = decoded;

    return next();
  }

  if (expired && refreshToken) {
    const newAccessToken = await reIssueAccessToken({ refreshToken });

    if (newAccessToken) {
      // Add the new access token to the response header
      res.setHeader("x-access-token", newAccessToken);

      const { decoded } = decode(newAccessToken);

      // @ts-ignore
      req.user = decoded;
    }

    return next();
  }

  return next();
};

export default deserializeUser;
