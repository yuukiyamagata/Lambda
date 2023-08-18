import { IncomingWebhook } from '@slack/webhook';
import { start, end } from './utilities/day.js';
import formatdate from './utilities/dayFormat.js';
import AWS from 'aws-sdk';
 
export async function handler(event, context) {
    const formattedStartDate = formatdate(start);
    const formattedEndDate = formatdate(end);
    
    const ce = new AWS.CostExplorer({region: 'us-east-1'})
    
    const params = {
        TimePeriod: {
            Start: formattedStartDate,
            End: formattedEndDate
        },
        Granularity: 'MONTHLY',
        Metrics: ['UnblendedCost']
    }
    
    const costAndUsage = await ce.getCostAndUsage(params).promise();
    const usdCost = costAndUsage.ResultsByTime[0].Total.UnblendedCost.Amount

    const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;
    const slackWebhook = new IncomingWebhook(slackWebhookUrl);
    await slackWebhook.send(`今月のAWS使用料：${usdCost}ドル`);

}