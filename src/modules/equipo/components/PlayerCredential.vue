<template>
    <v-dialog v-model="showModal" max-width="700px" persistent>
        <v-card style="border-radius: 12px;">
            <v-card-title
                style="
                    background: linear-gradient(to right, #9333ea, #f97316);
                    color: #ffffff;
                    padding: 16px 24px;
                "
            >
                <div style="display: flex; align-items: center; justify-content: space-between; width: 100%;">
                    <h3 style="font-size: 20px; font-weight: bold; margin: 0;">Credencial del Jugador</h3>
                    <v-btn
                        icon
                        variant="text"
                        color="white"
                        @click="closeModal"
                        style="background-color: rgba(255, 255, 255, 0.2);"
                    >
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </div>
            </v-card-title>

            <v-card-text style="padding: 24px;">
                <div v-if="loading" style="text-align: center; padding: 32px 0;">
                    <p style="color: #475569; margin: 0;">Cargando credencial...</p>
                </div>

                <div v-else style="display: flex; flex-direction: column; align-items: center;">
                    <p style="font-size: 14px; color: #475569; margin-bottom: 16px; margin-top: 0;">
                        La credencial se exportará en alta resolución
                    </p>
                    <!-- Canvas container for the credential -->
                    <div
                        ref="credentialContainer"
                        class="credential-card"
                        :style="{
                            width: '540px',
                            height: '680px',
                            position: 'relative',
                            overflow: 'hidden',
                            borderRadius: '12px',
                            border: 'none',
                            boxShadow: 'none',
                            margin: '0',
                            padding: '0',
                            outline: 'none',
                        }"
                    >
                        <!-- Background gradient (purple top-left to blue/teal bottom-right) -->
                        <div
                            style="
                                position: absolute;
                                top: 0;
                                left: 0;
                                right: 0;
                                bottom: 0;
                                background: linear-gradient(
                                    135deg,
                                    #9333ea 0%,
                                    #3b82f6 50%,
                                    #14b8a6 100%
                                );
                            "
                        ></div>

                        <!-- Top-left: Matchpoint Logo in white circular button with purple border -->
                        <div
                            style="position: absolute; top: 16px; left: 16px; z-index: 10;"
                        >
                            <div
                                style="
                                    width: 80px;
                                    height: 80px;
                                    border-radius: 50%;
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    background-color: #ffffff;
                                    border: 2px solid #9333ea;
                                    overflow: hidden;
                                "
                            >
                                <img
                                    v-if="!logoError"
                                    :src="matchpointLogo"
                                    alt="Matchpoint"
                                    style="width: 100%; height: 100%; object-fit: cover; border: none; outline: none; display: block;"
                                    @error="handleLogoError"
                                />
                                <div
                                    v-else
                                    style="
                                        width: 100%;
                                        height: 100%;
                                        display: flex;
                                        align-items: center;
                                        justify-content: center;
                                        color: #9333ea;
                                        font-weight: bold;
                                        font-size: 12px;
                                        text-transform: uppercase;
                                    "
                                >
                                    MP
                                </div>
                            </div>
                        </div>

                        <!-- Top-right: Team name with orange globe icon -->
                        <div
                            style="position: absolute; top: 16px; right: 16px; z-index: 10; display: flex; align-items: center; gap: 8px;"
                        >
                            <span
                                style="color:white; font-weight: bold; font-size: 16px; text-transform: uppercase;"
                            >
                                {{ equipoNombre }}
                            </span>
                            <div
                                style="width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; background-color: #f97316; border: 2px solid #ffffff; overflow: hidden;"
                            >
                                <!-- Basketball icon image -->
                                <img
                                    :src="basketballIcon"
                                    alt="Basketball"
                                    style="width: 28px; height: 28px; object-fit: contain; filter: brightness(0) invert(1);"
                                />
                            </div>
                        </div>

                        <!-- Player photo (large white circle in center) -->
                        <div
                            style="position: absolute; top: 120px; left: 50%; transform: translateX(-50%); z-index: 10;"
                        >
                            <div
                                style="
                                    width: 240px;
                                    height: 240px;
                                    border-radius: 50%;
                                    overflow: hidden;
                                    background-color: #ffffff;
                                    border: 6px solid #ffffff;
                                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                                "
                            >
                                <img
                                    v-if="playerImageUrl && !imageError"
                                    :src="playerImageUrl"
                                    :alt="playerName"
                                    style="width: 100%; height: 100%; object-fit: cover;"
                                    @error="imageError = true"
                                    @load="onImageLoad"
                                />
                                <div
                                    v-else
                                    style="
                                        width: 100%;
                                        height: 100%;
                                        display: flex;
                                        align-items: center;
                                        justify-content: center;
                                        color: #94a3b8;
                                        background-color: #f1f5f9;
                                    "
                                >
                                    <svg
                                        viewBox="0 0 24 24"
                                        style="width: 120px; height: 120px; fill: #cbd5e1;"
                                    >
                                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <!-- Bottom panel with player info (light blue with purple gradient) -->
                        <div
                            style="
                                position: absolute;
                                bottom: 0;
                                left: 0;
                                right: 0;
                                z-index: 10;
                                background: linear-gradient(
                                    to bottom right,
                                    #e0f2fe 0%,
                                    #bae6fd 30%,
                                    #93c5fd 60%,
                                    #9333ea 100%
                                );
                                border-top-left-radius: 32px;
                                border-top-right-radius: 32px;
                                padding: 32px 24px 24px 24px;
                                min-height: 280px;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                            "
                        >
                            <div style="text-align: center; width: 100%;">
                                <!-- Nombre del equipo (más llamativo y bold) -->
                                <div
                                    style="font-weight: 900; font-size: 24px; margin-bottom: 16px; text-transform: uppercase; color: #0f172a; letter-spacing: 1px; font-family: 'Arial Black', 'Arial', sans-serif;"
                                >
                                    {{ equipoNombre.toUpperCase() }}
                                </div>
                                
                                <!-- Nombre completo del jugador -->
                                <div
                                    style="font-size: 22px; margin-bottom: 16px; color: #0f172a; font-weight: 600; letter-spacing: 0.5px;"
                                >
                                    {{ playerName || "Nombre del Jugador" }}
                                </div>
                                
                                <!-- POSICIÓN (Position) -->
                                <div
                                    v-if="playerPosition"
                                    style="font-weight: bold; font-size: 20px; text-transform: uppercase; color: #0f172a; letter-spacing: 1px; margin-top: 8px;"
                                >
                                    {{ playerPosition }}
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Export button -->
                    <div style="margin-top: 24px; display: flex; gap: 12px;">
                        <v-btn
                            color="purple"
                            variant="flat"
                            @click="exportToPNG"
                            :loading="exporting"
                            style="padding-left: 24px; padding-right: 24px;"
                        >
                            <v-icon start>mdi-download</v-icon>
                            Exportar a PNG
                        </v-btn>
                        <v-btn
                            variant="outlined"
                            color="grey"
                            @click="closeModal"
                            style="padding-left: 24px; padding-right: 24px;"
                        >
                            Cerrar
                        </v-btn>
                    </div>
                </div>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from "vue";
import type { EquipoJugadorAsignacion } from "@/interfaces/Jugador";
import { URLS } from "@/helpers/constants";
import { useEquipoService } from "../composables/useEquipoService";
import matchpointLogo from "@/assets/Banner.png";
import basketballIcon from "@/assets/c365f14205e2c1f9830d25c919f28561.svg";
// @ts-ignore - dom-to-image-more doesn't have types
import domtoimage from "dom-to-image-more";

interface Player {
    id: string;
    jugadorId: number;
    name: string;
    age: number | null;
    curp?: string;
    fechaNacimiento?: string | null;
    logo?: string;
    extensionImg?: string;
    equipoJugador: EquipoJugadorAsignacion[];
}

const props = defineProps<{
    player: Player | null;
    tipoDeporteId?: number | null;
    equipoNombre?: string;
}>();

const emit = defineEmits<{
    close: [];
}>();

const loading = ref(false);
const exporting = ref(false);
const credentialContainer = ref<HTMLElement | null>(null);
const imageError = ref(false);
const imageLoaded = ref(false);
const logoError = ref(false);

const equipoNombre = computed(() => props.equipoNombre || "EQUIPO");

const { selectPosicionesTipoTorneo } = useEquipoService();
const posiciones = ref<
    Array<{
        posicionTipoTorneoId: number;
        tipoTorneoId: number;
        tipoTorneo: string;
        posicion: string;
        descripcion: string;
    }>
>([]);

// Computed for modal visibility with getter/setter
const showModal = computed({
    get: () => props.player !== null,
    set: (value: boolean) => {
        if (!value) {
            emit("close");
        }
    },
});

// Computed properties
const playerName = computed(() => {
    if (!props.player) return "";
    return props.player.name;
});

const playerFirstName = computed(() => {
    if (!props.player) return "";
    const names = props.player.name.split(" ");
    return names[0] || "";
});

const playerLastNames = computed(() => {
    if (!props.player) return "";
    const names = props.player.name.split(" ");
    if (names.length > 1) {
        return names.slice(1).join(" ");
    }
    return "";
});

const playerPosition = computed(() => {
    if (
        !props.player ||
        !props.player.equipoJugador ||
        props.player.equipoJugador.length === 0
    ) {
        return "";
    }

    const firstAssignment = props.player.equipoJugador[0];
    if (!firstAssignment.posicionTipoTorneoId) return "";

    const posicion = posiciones.value.find(
        (p) => p.posicionTipoTorneoId === firstAssignment.posicionTipoTorneoId
    );
    return posicion?.posicion || "";
});

const playerImageUrl = computed(() => {
    if (!props.player || !props.player.logo || !props.player.jugadorId)
        return "";

    let nombreLogo = props.player.logo;
    if (!nombreLogo.includes(".")) {
        const extension = props.player.extensionImg || "jpg";
        nombreLogo = `${nombreLogo}.${extension}`;
    }

    return `${URLS.COTBUILDER}/api/Jugador/logo/${props.player.jugadorId}/${nombreLogo}`;
});

// Watch for modal opening and load positions
watch(
    () => props.player,
    async (newPlayer) => {
        if (newPlayer) {
            loading.value = true;
            imageError.value = false;

            // Load positions if needed
            if (props.tipoDeporteId && posiciones.value.length === 0) {
                try {
                    posiciones.value = await selectPosicionesTipoTorneo(
                        props.tipoDeporteId
                    );
                } catch (error) {
                    console.error("Error loading positions:", error);
                }
            }

            await nextTick();
            loading.value = false;
        }
    },
    { immediate: true }
);

const closeModal = () => {
    showModal.value = false;
    emit("close");
};

const handleLogoError = () => {
    logoError.value = true;
};

const onImageLoad = () => {
    imageLoaded.value = true;
};

const exportToPNG = async () => {
    if (!credentialContainer.value) return;
    
    exporting.value = true;
    try {
        // Wait for images to load completely
        await nextTick();
        
        // Wait a bit more to ensure all images are loaded
        if (imageLoaded.value || imageError.value) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        
        const dataUrl = await domtoimage.toPng(credentialContainer.value, {
            quality: 1.0,
            width: 1080,
            height: 1360,
            style: {
                transform: "scale(2)",
                transformOrigin: "top left",
            },
        });
        
        const link = document.createElement("a");
        link.download = `credencial-${playerName.value.replace(/\s+/g, "-")}.png`;
        link.href = dataUrl;
        link.click();
    } catch (error) {
        console.error("Error exporting to PNG:", error);
    } finally {
        exporting.value = false;
    }
};

</script>

<style scoped>
.credential-card {
    font-family: "Arial", sans-serif;
    border: none !important;
    outline: none !important;
    box-shadow: none !important;
    margin: 0 !important;
    padding: 0 !important;
}

.credential-card * {
    box-sizing: border-box;
}

/* Ensure no borders appear in export */
.credential-card,
.credential-card::before,
.credential-card::after {
    border: none !important;
    outline: none !important;
}

/* Remove any default image borders */
.credential-card img {
    border: none !important;
    outline: none !important;
    display: block;
    max-width: 100%;
    height: auto;
}
div {
    border: 0px solid transparent !important;
}
div span {
    border: 0px solid transparent !important;
}
div div{
    border: 0px solid transparent !important;
}
div div svg{
    border: 0px solid transparent !important;
}
</style>
