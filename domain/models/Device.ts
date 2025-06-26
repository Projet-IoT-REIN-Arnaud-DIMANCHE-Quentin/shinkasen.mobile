type DeviceStatus = 'online' | 'offline' | 'error';

type Device = {
    id: string;
    name: string;
    status: DeviceStatus;
};

export { Device, DeviceStatus };
