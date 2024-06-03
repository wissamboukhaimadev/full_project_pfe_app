import { IDataNotifications } from '@/types/notifications';
import { Drawer, Notification, ScrollArea } from '@mantine/core'
import React from 'react'



interface INotificationDrawer {
    opened: boolean,
    close: () => void,
    notification: IDataNotifications
}

export default function NotificationDrawer({ opened, close, notification }: INotificationDrawer) {
    const { date, source } = notification
    const fdate = new Date(date as Date)

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


    return (
        <Drawer
            opened={opened}
            onClose={close}
            title="Notifications"
            position="right"
            scrollAreaComponent={ScrollArea.Autosize}
        >
            <div className="mt-5">

                <div className="mb-5">
                    {source && <Notification
                        color='blue'

                        title={source}

                        onClose={() => console.log('closing')}
                    >
                        <p className="text-right mt-2">{days[fdate.getDate()] + " " + fdate.getDate() + " " + months[fdate.getMonth()] + " " + fdate.getFullYear() + " at " + fdate.getHours() + "h" + fdate.getMinutes() + "m" + fdate.getSeconds() + "s"}</p>
                    </Notification>}
                </div>

            </div>


        </Drawer>
    );
}
