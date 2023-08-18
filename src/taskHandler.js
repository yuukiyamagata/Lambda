import { DynamoDB } from 'aws-sdk';
import crypto from 'crypto';

export const list = async (event, context) => {
    const dynamodb = new DynamoDB({
        region: 'ap-northeast-1'
    })
    
    const result = await dynamodb.scan({
        TableName: 'tasks'
    }).promise()
    
    const tasks = result.Items.map(item => ({ id: item.id.S, title: item.title.S }))
    
    return { tasks,}
}


export const post  = async (event, context) => {
   const requestBody = JSON.parse(event.body);
   
   
// JSON.parse
// JSON.parse()メソッドは文字列をJSONとして解析し、文字列によって記述されているJavaScriptの値やオブジェクトを構築します。
// 任意のreviver関数で、生成されたオブジェクトが返される前に変換を実行することができます。

   
   const item = {
       id: { S: crypto.randomUUID() },
       title: { S: requestBody.title }
   }
   
   const dynamodb = new DynamoDB({
       region: 'ap-northeast-1'
   })
   
   await dynamodb.putItem({
       TableName: 'tasks',
       Item: item
   }).promise()
   
   return item;
}