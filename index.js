var _ = require("lodash");
var vitalchat = require("vitalchat");
var client = new vitalchat({
  host: process.env.VITALCHAT_HOST,
  key: process.env.VITALCHAT_KEY,
  secret: process.env.VITALCHAT_SECRET,
});

client.on("event", (event) => {
  console.log(event);
});

client.on("log", (log) => {
  console.log(log);
});

client.on("error", (err) => {
  console.log(err);
});

(async () => {
  console.log("connecting to", process.env.VITALCHAT_HOST);
  var devices = await client.devices();
  if (devices.length === 0) {
    console.log("no devices found");
    return;
  }
  let device = _.find(devices, { status: "online" });
  if (!device) {
    console.log("no online device found");
    return;
  }
  console.log(`creating call link to ${device.name}`);
  var data = await client.enter({
    device: device.device_id,
    name: "test caller",
    device_description: "John Smith",
  });
  console.log(data);
  client.listen();
})().catch((err) => {
  console.error(err);
});
