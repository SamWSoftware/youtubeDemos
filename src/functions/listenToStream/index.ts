import { DynamoDBStreamEvent } from "aws-lambda";

export const handler = async (event: DynamoDBStreamEvent) => {
  try {
    event.Records.map((record) => {
      console.log(record);
    });
    return;
  } catch (error) {
    console.log("error", error);
    return;
  }
};
