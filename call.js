
var vitalchat = require('vitalchat');
var client = new vitalchat({
    host: process.env.VITALCHAT_HOST,
    key: process.env.VITALCHAT_KEY,
    secret: process.env.VITALCHAT_SECRET
});

async function call() {
    var devices = await client.devices();
    var data = await client.call({
        device_id: devices[0],
        caller_id: 'test caller',
        action: 'knock'
    });
    return data;
}

(async () => {
    var data = await call();
    console.log(data);
})().catch((err) => {
    console.error(err);
});
