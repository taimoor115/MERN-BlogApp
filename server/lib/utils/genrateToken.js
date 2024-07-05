import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign(
    {
      userId,
    },
    process.env.JSON_WEB_TOKEN_SECRET_KEY,
    { expiresIn: "7d" }
  );

  console.log(token);
  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
  });
};
