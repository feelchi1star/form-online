import connectToDatabase from "@/lib/mongodb";
import tokenSchema from "@/models/tokenSchema";
import userSchema from "@/models/userSchema";
import { headers } from "next/headers";
const resObj = (data, statusCode = 500) =>
  new Response(JSON.stringify({ ...data }), {
    status: statusCode,
    headers: {
      "Content-Type": "application/json", // Set content type to JSON
    },
  });

export async function GET(request) {
  const authorization = headers().get("authorization");
  if (process.env.NEXT_PUBLIC_SECRET_KEY != authorization) {
    return resObj({ msg: "You are not auth" }, 401);
  }
  try {
    await connectToDatabase();
    const token = await tokenSchema.find({ used: false }).limit(10);
    const user = await userSchema.find({});
    return Response.json({
      length: await tokenSchema.countDocuments({ used: false }),
      token,
      user,
      userLength: await userSchema.countDocuments(),
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 401,
      headers: {
        "Content-Type": "application/json", // Set content type to JSON
      },
    });
  }
}
export async function POST(req) {
  const data = await req.json();

  try {
    await connectToDatabase();
    const token = await tokenSchema.findOne({
      token: data.pinToken,
    });
    if (!token) {
      return resObj(
        {
          message:
            "Invalid Pin. Check the pin or contact +2348148494234 on whatsapp",
        },
        406
      );
    }
    // Validate if User Exists
    if (token.used) {
      return resObj(
        {
          message:
            "Pin has already been used. Contact +2348148494234 on whatsapp for your pin",
        },
        409
      );
    }

    const { email, fullName, matricNumber } = data;

    const newUser = await userSchema.create({
      email,
      matricNumber: matricNumber.toLowerCase(),
      name: fullName,
      tokenId: token._id,
    });

    if (!newUser) {
      return resObj({ message: "Unable to send Details" });
    }

    await tokenSchema.updateOne({ _id: token._id }, { used: true });

    return Response.json({ message: "Details sent successfully" });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 401,
      headers: {
        "Content-Type": "application/json", // Set content type to JSON
      },
    });
  }
}
