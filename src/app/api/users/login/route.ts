/* eslint-disable @typescript-eslint/no-explicit-any */

import { connectDb } from "@/app/db/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connectDb();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log(reqBody);

    // Check if the User is existing or not

    const user = await User.findOne({ email: email });
    if (!user) {
      return NextResponse.json(
        { error: "Couldn't find user" },
        { status: 400 }
      );
    }

    // check if the password is correct or not

    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json(
        { error: "Password is incorrect" },
        { status: 400 }
      );
    }

    // create token data
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    //create token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: process.env.TOKEN_EXPIRY,
    });

    const nextResponse = NextResponse.json(
      {
        massage: "Login successful",
        success: true,
      },
      { status: 200 }
    );
    nextResponse.cookies.set("token", token, {
      httpOnly: true,
    });

    return nextResponse;
  } catch (error: any) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
