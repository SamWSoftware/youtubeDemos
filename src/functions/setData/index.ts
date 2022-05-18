import { formatJSONResponse } from "@libs/apiGateway";
import { dynamo } from "@libs/dynamo";
import { APIGatewayProxyEvent } from "aws-lambda";
import { v4 as uuid } from "uuid";

export const handler = async (event: APIGatewayProxyEvent) => {
  try {
    const body = JSON.parse(event.body);
    const tableName = process.env.reminderTable;

    const data = {
      ...body,
      id: uuid(),
    };
    await dynamo.write(data, tableName);

    return formatJSONResponse({
      data: {
        message: `data is saved`,
        id: data.id,
      },
    });
  } catch (error) {
    console.log("error", error);
    return formatJSONResponse({
      statusCode: 502,
      data: {
        message: error.message,
      },
    });
  }
};

const validateInputs = ({
  email,
  phoneNumber,
  reminder,
  reminderDate,
}: {
  email?: string;
  phoneNumber?: string;
  reminder: string;
  reminderDate: number;
}) => {
  if (!email && !phoneNumber) {
    return formatJSONResponse({
      statusCode: 400,
      data: {
        message: "email or phone number required to create a reminder",
      },
    });
  }
  if (!reminder) {
    return formatJSONResponse({
      statusCode: 400,
      data: {
        message: "reminder required to create a reminder",
      },
    });
  }
  if (!reminderDate) {
    return formatJSONResponse({
      statusCode: 400,
      data: {
        message: "reminderDate required to create a reminder",
      },
    });
  }

  return;
};
