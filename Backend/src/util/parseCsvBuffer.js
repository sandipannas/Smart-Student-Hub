import csvParser from "csv-parser";
import streamifier from "streamifier";

//kind of helper function
const parseCsvBuffer = (buffer) => {
  return new Promise((resolve, reject) => {
    const result = [];
    const stream = streamifier.createReadStream(buffer).pipe(csvParser());

    stream.on("data", (data) => {
      result.push(data);
    });

    stream.on("end", () => {
      resolve(result);
    });

    stream.on("error", (error) => {
      reject(error);
    });
  });
};

export default parseCsvBuffer;
