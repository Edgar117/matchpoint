import * as signalR from "@microsoft/signalr";

export const useSignalR = () => {
    const handleConnectSocket = async () => {
        const connection = new signalR.HubConnectionBuilder()
            .withUrl(`${import.meta.env.VITE_APP_URL_COT_CODE_BUILDER}/HomeRunHub`, {
                skipNegotiation: true,
                transport: signalR.HttpTransportType.WebSockets,
            })
            .withAutomaticReconnect({
                nextRetryDelayInMilliseconds(retryContext) {
                    if (retryContext.elapsedMilliseconds < 2500) {
                        return Math.random() * 5000;
                    } else {
                        return null;
                    }
                },
            })
            .build();

        await connection.start();
        return connection;
    };

    return {
        handleConnectSocket,
    };
};
