/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectDb } from "@/app/db/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connectDb();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    console.log(reqBody);

    // user already exists
    const user = await User.findOne({ email: email });
    if (user) {
      console.log("User already exists");

      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // hash the password

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      username: username,
      email: email,
      password: hashPassword,
    });

    const savedUser = await newUser.save();

    console.log(savedUser);

    return NextResponse.json(
      {
        massage: "User Created Successfully",
        success: true,
        User: savedUser,
      },

      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
