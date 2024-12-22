/* eslint-disable @typescript-eslint/no-explicit-any */
import { getUserDataFormToken } from "@/helpers/getUserDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connectDb } from "@/app/db/dbConfig";

connectDb();

export async function GET(request: NextRequest) {
  try {
    const userName = await getUserDataFormToken(request);
    const user = await User.findOne({ username: userName }).select("-password");

    return NextResponse.json(
      { massage: "User Found", user: user },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message, success: false },
      { status: 400 }
    );
  }
}
