import { ref } from "vue";
import { useSignalR } from "../composables/useSignalR";
import { defineStore } from "pinia";
import { HubConnection } from "@microsoft/signalr";
const { handleConnectSocket } = useSignalR();

// Define el tipo de socket que estás usando, aquí asumo que es un WebSocket
type SocketType = HubConnection;

export const useSocketStore = defineStore("socket", () => {
    // Estado del socket
    const socket = ref<SocketType>();

    // Acción para inicializar el socket
    const initSocket = async () => {
        if (!socket.value) {
            socket.value = await handleConnectSocket();
        }
    };

    // Acción para establecer manualmente el socket
    const setSocket = (newSocket: HubConnection) => {
        socket.value = newSocket;
    };

    // Retornar el estado y acciones
    return {
        socket,
        initSocket,
        setSocket,
    };
});
