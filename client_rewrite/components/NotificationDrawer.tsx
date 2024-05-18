import { Drawer, Notification, ScrollArea } from '@mantine/core'
import React from 'react'



interface INotificationDrawer {
    opened: boolean,
    close: () => void
}

export default function NotificationDrawer({ opened, close }: INotificationDrawer) {


    return (
        <Drawer
            opened={opened}
            onClose={close}
            title="Notifications"
            position="right"
            scrollAreaComponent={ScrollArea.Autosize}
        >
            <div className="mt-5">
                {Array.from({ length: 20 }).map((item, index) => (
                    <div key={index} className="mb-5">
                        <Notification
                            color={index % 2 == 0 ? 'blue' : 'pink'}
                            key={index}
                            title="We notify you that"
                            onClose={() => console.log('closing')}
                        >
                            <p className="text-right mt-2">May 15, 2024</p>
                        </Notification>
                    </div>
                ))}
            </div>


        </Drawer>
    );
}
