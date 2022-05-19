import type { AWS } from "@serverless/typescript";

const functions: AWS["functions"] = {
  setData: {
    handler: "src/functions/setData/index.handler",
    events: [
      {
        httpApi: {
          path: "/",
          method: "post",
        },
      },
    ],
  },
  listToStream: {
    handler: "src/functions/listenToStream/index.handler",
    events: [
      {
        stream: {
          type: "dynamodb",
          arn: {
            "Fn::GetAtt": ["myTable", "StreamArn"],
          },
        },
      },
    ],
  },
};

export default functions;
