const AWS = require("aws-sdk");
AWS.config.update({
  region: "us-east-2",
});
const dynamodb = new AWS.DynamoDB.DocumentClient();
const dynamodbTableName = "user";

exports.handler = async (event) => {
  // TODO implement
  console.log(event.userId);
  let response = await deleteUser(event.userId);
  return response;
};

async function deleteUser(userId) {
  const params = {
    TableName: dynamodbTableName,
    Key: {
      userId: userId,
    },
    ReturnValues: "ALL_OLD",
  };
  return await dynamodb
    .delete(params)
    .promise()
    .then(
      (response) => {
        const body = {
          Operation: "DELETE",
          Message: "SUCCESS",
          Item: response,
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
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET,DELETE",
    },
    body: JSON.stringify(body),
    isBase64Encoded: false,
  };
}
