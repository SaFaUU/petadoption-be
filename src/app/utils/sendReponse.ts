import { NextFunction, Request, Response } from "express";

const sendResponse = (res: Response, data: any) => {
  res.status(data.statusCode).json({
    success: true,
    statusCode: data.statusCode,
    message: data.message,
    data: data.data,
  });
};

export default sendResponse;

// const sendResponse = async (abc: Response, data: any) => {

//   // Define and immediately invoke the returned function
//   return ((res: Response, data: any) => {
//     res.status(data.statusCode).json({
//       success: true,
//       statusCode: data.statusCode,
//       message: data.message,
//       data: data.data,
//     });
//   })(abc, data); // Invoke the function with the provided res and data
// };

// export default sendResponse;
