const AWS = require("aws-sdk");
AWS.config.update({
  region: "us-east-2",
});
const dynamodb = new AWS.DynamoDB.DocumentClient();
const dynamodbTableName = "user";

exports.handler = async (event) => {
  // TODO implement
  let response = await getProducts();
  return response;
};

async function getProducts() {
  const params = {
    TableName: dynamodbTableName,
  };
  const allUsers = await scanDynamoRecords(params, []);
  const body = {
    users: allUsers,
  };
  return buildResponse(200, body);
}

async function scanDynamoRecords(scanParams, itemArray) {
  try {
    const dynamoData = await dynamodb.scan(scanParams).promise();
    itemArray = itemArray.concat(dynamoData.Items);
    if (dynamoData.LastEvaluatedKey) {
      scanParams.ExclusiveStartkey = dynamoData.LastEvaluatedKey;
      return await scanDynamoRecords(scanParams, itemArray);
    }
    return itemArray;
  } catch (error) {
    console.error(
      "Do your custom error handling here. I am just gonna log it: ",
      error
    );
  }
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
