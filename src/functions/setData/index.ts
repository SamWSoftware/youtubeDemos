import { formatJSONResponse } from "@libs/apiGateway";
import { dynamo } from "@libs/dynamo";
import { APIGatewayProxyEvent } from "aws-lambda";
import { v4 as uuid } from "uuid";

export const handler = async (event: APIGatewayProxyEvent) => {
  try {
    const body = JSON.parse(event.body);
    const tableName = process.env.myTable;

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
