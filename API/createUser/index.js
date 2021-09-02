const AWS = require("aws-sdk");
AWS.config.update({
  region: "us-east-2",
});
const dynamodb = new AWS.DynamoDB.DocumentClient();
const dynamodbTableName = "user";

exports.handler = async (event) => {
  // TODO implement

  let response = await saveUser(JSON.parse(event.body));
  return response;
};

async function saveUser(requestBody) {
  console.log(requestBody);
  const params = {
    TableName: dynamodbTableName,
    Item: {
      userId: requestBody.userId,
      name: requestBody.name,
      email: requestBody.email,
      phone: requestBody.phone,
      address: requestBody.address,
    },
  };
  return await dynamodb
    .put(params)
    .promise()
    .then(
      () => {
        const body = {
          Operation: "SAVE",
          Message: "SUCCESS",
          Item: {
            userId: requestBody.userId,
            name: requestBody.name,
            email: requestBody.email,
            phone: requestBody.phone,
            address: requestBody.address,
          },
        };
        return buildResponse(200, body);
      },
      (error) => {
        console.error(
          "Do your custom error handling here. I am just gonna log it: ",
          error
        );
      }
    );
}

function buildResponse(statusCode, body) {
  return {
    statusCode: statusCode,
    headers: {
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
    },
    body: JSON.stringify(body),
  };
}
