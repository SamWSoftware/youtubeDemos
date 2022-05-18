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
};

export default functions;
