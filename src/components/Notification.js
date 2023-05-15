import React, { useEffect } from 'react';
import ActionCable from 'actioncable';

const Notification = () => {
  console.log("kdkdsj")
  useEffect(() => {
    const cable = ActionCable.createConsumer('ws://localhost:3001/cable');

    console.log(cable)

    const notificationsChannel = cable.subscriptions.create(
      { channel: 'NotificationsChannel' ,room: "notifications_channel"},
      {
        received: (data) => {
          // Handle the received notification data
          console.log('Received notification:', data);
        },
      }
    );

    return () => {
      // Unsubscribe from the notifications channel when the component unmounts
      notificationsChannel.unsubscribe();
    };
  }, []);

  return (
    <div>
      {
        /* Render your notifications UI */
      }
    </div>
  );
};

export default Notification;
