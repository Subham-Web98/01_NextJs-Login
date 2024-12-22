/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = NextResponse.json({
      massage: "Logout Successfully",
      success: true,
    });
    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(),
    });
    return response;
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error,
      },
      { status: 400 }
    );
  }
}
