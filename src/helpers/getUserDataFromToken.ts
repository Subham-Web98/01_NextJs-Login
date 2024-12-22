/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const getUserDataFormToken = (request: NextRequest) => {
  try {
    const encodedToken = request.cookies.get("token")?.value || "";

    const decodedToken: any = jwt.verify(
      encodedToken,
      process.env.TOKEN_SECRET!
    );

    return decodedToken.username;
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message, success: false },
      { status: 400 }
    );
  }
};
