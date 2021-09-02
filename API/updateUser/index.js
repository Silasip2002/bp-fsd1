const AWS = require("aws-sdk");
AWS.config.update({
  region: "us-east-2",
});
const dynamodb = new AWS.DynamoDB.DocumentClient();
const dynamodbTableName = "user";

exports.handler = async (event) => {
  // TODO implement

  console.log(event);
  // const requestBody = JSON.parse(event.body);

  let response = await updateUser(
    event.userId,
    event.name,
    event.phone,
    event.email,
    event.address
  );
  return response;
};

async function updateUser(userId, name, phone, email, address) {
  const params = {
    TableName: dynamodbTableName,
    Key: {
      userId: userId,
    },
    UpdateExpression: `set   phone = :phoneValue, email = :emailValue, address = :addressValue`,
    ExpressionAttributeValues: {
      // ':nameValue': name,
      ":phoneValue": phone,
      ":emailValue": email,
      ":addressValue": address,
    },
    ReturnValues: "UPDATED_NEW",
  };
  return await dynamodb
    .update(params)
    .promise()
    .then(
      (response) => {
        const body = {
          Operation: "UPDATE",
          Message: "SUCCESS",
          UpdatedAttributes: response,
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
      "Access-Control-Allow-Methods": "*",
    },
    body: JSON.stringify(body),
  };
}
