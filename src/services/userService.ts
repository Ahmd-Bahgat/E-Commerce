import userModel from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface registerParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const register = async ({
  firstName,
  lastName,
  email,
  password,
}: registerParams) => {
  const findUser = await userModel.findOne({ email });
  if (findUser) {
    return { data: "email already exists!", statusCode: 400 };
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new userModel({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });
  await newUser.save();
  return { data: generateJWT({ firstName, lastName, email }), statusCode: 200 };
};

interface userLogin {
  email: string;
  password: string;
}

export const login = async ({ email, password }: userLogin) => {
  const findUser = await userModel.findOne({ email });
  if (!findUser) {
    return { data: "incorrect email or password", statusCode: 400 };
  }
  const passwordMatch = await bcrypt.compare(password, findUser.password);
  if (passwordMatch) {
    return {
      data: generateJWT({
        firstName: findUser,
        lastName: findUser,
        email: findUser,
      }),
      statusCode: 200,
    };
  }
  return { data: "incorrect email or password", statusCode: 400 };
};

const generateJWT = (data: any) => {
  return jwt.sign(data, "#)7Gvq7vyV(Cm^c&(5F4+UZ62S$%ayZFqhUA#mIe!xrFQ6!8xV");
};
