import * as PusherPushNotifications from "@pusher/push-notifications-web";

export const isSafari = function(){
  return (
    /constructor/i.test(window.HTMLElement) ||
    (function (p) {
      return p.toString() === "[object SafariRemoteNotification]";
    })(
      !window["safari"] ||
        (typeof safari !== "undefined" && window["safari"].pushNotification)
    )
  );
}();

export let beamsClient: PusherPushNotifications.Client;
if (!isSafari) {
  beamsClient = new PusherPushNotifications.Client({
    instanceId: "d45267dd-8950-4cbd-ad07-678a6460917d",
  });
}

// beamsClient
//   .start()
//   .then(() => beamsClient.getDeviceId())
//   .then(() => console.log("Successfully registered and subscribed!"))
//   .catch(console.error);
