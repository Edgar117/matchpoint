<template>
    <v-dialog v-model="showModal" max-width="700px" persistent>
        <v-card style="border-radius: 12px">
            <v-card-title
                style="
                    background: linear-gradient(to right, #9333ea, #f97316);
                    color: #ffffff;
                    padding: 16px 24px;
                "
            >
                <div
                    style="
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        width: 100%;
                    "
                >
                    <h3 style="font-size: 20px; font-weight: bold; margin: 0">
                        Credencial del Jugador
                    </h3>
                    <v-btn
                        icon
                        variant="text"
                        color="white"
                        @click="closeModal"
                        style="background-color: rgba(255, 255, 255, 0.2)"
                    >
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </div>
            </v-card-title>

            <v-card-text style="padding: 24px">
                <div v-if="loading" style="text-align: center; padding: 32px 0">
                    <p style="color: #475569; margin: 0">
                        Cargando credencial...
                    </p>
                </div>

                <div
                    v-else
                    style="
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                    "
                >
                    <p
                        style="
                            font-size: 14px;
                            color: #475569;
                            margin-bottom: 16px;
                            margin-top: 0;
                        "
                    >
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
                            borderRadius: '16px',
                            border: 'none',
                            boxShadow: 'none',
                            margin: '0',
                            padding: '0',
                            outline: 'none',
                        }"
                    >
                        <!-- Deep blue background with diagonal stripe pattern -->
                        <div
                            style="
                                position: absolute;
                                top: 0;
                                left: 0;
                                right: 0;
                                bottom: 0;
                                background: #1e3a8a;
                            "
                        >
                            <!-- Diagonal stripe pattern on edges -->
                            <div
                                style="
                                    position: absolute;
                                    top: 0;
                                    left: 0;
                                    width: 100%;
                                    height: 100%;
                                    background: repeating-linear-gradient(
                                        45deg,
                                        transparent,
                                        transparent 10px,
                                        rgba(59, 130, 246, 0.15) 10px,
                                        rgba(59, 130, 246, 0.15) 20px
                                    );
                                    pointer-events: none;
                                "
                            ></div>
                        </div>

                        <!-- Top Section: Player Name on White Background -->
                        <div
                            style="
                                position: absolute;
                                top: 0;
                                left: 0;
                                right: 0;
                                background: #ffffff;
                                padding: 20px 32px;
                                z-index: 10;
                                text-align: center;
                                height: 100px;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                            "
                        >
                            <div
                                style="
                                    font-weight: 900;
                                    font-size: 36px;
                                    color: #1e3a8a;
                                    text-transform: uppercase;
                                    letter-spacing: 3px;
                                    font-family: 'Arial Black', 'Arial',
                                        sans-serif;
                                    line-height: 1.2;
                                    margin: 0;
                                    padding: 0;
                                "
                            >
                                {{
                                    playerName.toUpperCase() ||
                                    "NOMBRE DEL JUGADOR"
                                }}
                            </div>
                        </div>

                        <!-- Middle Section: White Background with Photo, Signature, and Badge -->
                        <div
                            style="
                                position: absolute;
                                top: 100px;
                                left: 0;
                                right: 0;
                                background: #ffffff;
                                padding: 32px;
                                height: 320px;
                                z-index: 10;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                            "
                        >
                            <!-- Signature on the left -->
                            <div
                                class="signature-text"
                                style="
                                    position: absolute;
                                    left: 8px;
                                    top: 50%;
                                    transform: translateY(-50%);
                                    writing-mode: vertical-rl;
                                    text-orientation: mixed;
                                    font-family: 'Brush Script MT',
                                        'Lucida Handwriting', 'Arial', cursive;
                                    font-size: 32px;
                                    color: #000000;
                                    font-weight: bold;
                                    white-space: nowrap;
                                    z-index: 15;
                                    opacity: 0.9;
                                    line-height: 1;
                                    margin: 0;
                                    padding: 0;
                                "
                            >
                                {{ playerFirstName }}
                                {{
                                    playerLastNames.split(" ")[0]?.charAt(0) ||
                                    ""
                                }}
                            </div>

                            <!-- Player Photo (rectangular, not circular) -->
                            <div
                                style="
                                    width: 240px;
                                    height: 280px;
                                    overflow: hidden;
                                    background-color: #f1f5f9;
                                    position: relative;
                                    filter: grayscale(30%) brightness(0.9)
                                        sepia(10%);
                                "
                            >
                                <img
                                    v-if="playerImageUrl && !imageError"
                                    :src="playerImageUrl"
                                    :alt="playerName"
                                    style="
                                        width: 100%;
                                        height: 100%;
                                        object-fit: cover;
                                    "
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
                                        style="
                                            width: 120px;
                                            height: 120px;
                                            fill: #cbd5e1;
                                        "
                                    >
                                        <path
                                            d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                                        />
                                    </svg>
                                </div>
                            </div>

                            <!-- SUPER STAR! Badge on the right -->
                            <div
                                style="
                                    position: absolute;
                                    right: 24px;
                                    top: 50%;
                                    transform: translateY(-50%);
                                    z-index: 15;
                                "
                            >
                                <div
                                    style="
                                        width: 80px;
                                        height: 80px;
                                        background: #3b82f6;
                                        clip-path: polygon(
                                            50% 0%,
                                            61% 35%,
                                            98% 35%,
                                            68% 57%,
                                            79% 91%,
                                            50% 70%,
                                            21% 91%,
                                            32% 57%,
                                            2% 35%,
                                            39% 35%
                                        );
                                        display: flex;
                                        flex-direction: column;
                                        align-items: center;
                                        justify-content: center;
                                        padding: 8px;
                                        box-shadow: 0 4px 12px
                                            rgba(0, 0, 0, 0.3);
                                    "
                                >
                                    <div
                                        style="
                                            color: #ffffff;
                                            font-weight: 900;
                                            font-size: 10px;
                                            text-transform: uppercase;
                                            text-align: center;
                                            line-height: 1.1;
                                            letter-spacing: 0.5px;
                                        "
                                    >
                                        <div>SUPER</div>
                                        <div>STAR!</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Bottom Section: Deep Blue Background with Stats and Info -->
                        <div
                            style="
                                position: absolute;
                                top: 420px;
                                left: 0;
                                right: 0;
                                bottom: 0;
                                background: #1e3a8a;
                                padding: 24px 32px;
                                z-index: 10;
                            "
                        >
                            <!-- Position and Number Row -->
                            <div
                                style="
                                    position: relative;
                                    width: 100%;
                                    height: 40px;
                                    margin-bottom: 16px;
                                "
                            >
                                <div
                                    class="position-text"
                                    style="
                                        position: absolute;
                                        left: 0;
                                        top: 0;
                                        font-weight: 900;
                                        font-size: 28px;
                                        color: #ffffff;
                                        text-transform: uppercase;
                                        letter-spacing: 2px;
                                        line-height: 40px;
                                        margin: 0;
                                        padding: 0;
                                        height: 40px;
                                        white-space: nowrap;
                                    "
                                >
                                    {{ playerPosition || "POSICIÓN" }}
                                </div>
                                <div
                                    class="number-text"
                                    style="
                                        position: absolute;
                                        right: 0;
                                        top: 0;
                                        font-weight: 900;
                                        font-size: 28px;
                                        color: #ffffff;
                                        text-transform: uppercase;
                                        letter-spacing: 2px;
                                        line-height: 40px;
                                        margin: 0;
                                        padding: 0;
                                        height: 40px;
                                        white-space: nowrap;
                                    "
                                >
                                    #{{
                                        playerNumber
                                            ? String(playerNumber).padStart(
                                                  2,
                                                  "0"
                                              )
                                            : "00"
                                    }}
                                </div>
                            </div>

                            <!-- Horizontal Line -->
                            <div
                                style="
                                    width: 100%;
                                    height: 2px;
                                    background: #ffffff;
                                    margin-bottom: 16px;
                                "
                            ></div>

                            <!-- Team and Federation Info Row -->
                            <div
                                style="
                                    display: flex;
                                    justify-content: space-between;
                                    align-items: flex-end;
                                "
                            >
                                <!-- Team Info (Left) -->
                                <div
                                    style="
                                        display: flex;
                                        align-items: center;
                                        gap: 12px;
                                    "
                                >
                                    <div
                                        style="
                                            width: 40px;
                                            height: 40px;
                                            border-radius: 50%;
                                            background: #ffffff;
                                            display: flex;
                                            align-items: center;
                                            justify-content: center;
                                            border: 2px solid #3b82f6;
                                        "
                                    >
                                        <img
                                            :src="basketballIcon"
                                            alt="Basketball"
                                            style="
                                                width: 28px;
                                                height: 28px;
                                                object-fit: contain;
                                            "
                                        />
                                    </div>
                                    <div>
                                        <div
                                            style="
                                                font-weight: 700;
                                                font-size: 18px;
                                                color: #ffffff;
                                                margin-bottom: 4px;
                                                white-space: nowrap;
                                            "
                                        >
                                            {{ equipoNombre }}
                                        </div>
                                        <div
                                            style="
                                                font-weight: 400;
                                                font-size: 14px;
                                                color: rgba(255, 255, 255, 0.8);
                                                text-transform: uppercase;
                                                white-space: nowrap;
                                            "
                                        >
                                            Basket Team
                                        </div>
                                    </div>
                                </div>

                                <!-- Federation Info (Right) -->
                                <div style="text-align: right">
                                    <div
                                        style="
                                            font-weight: 700;
                                            font-size: 18px;
                                            color: #ffffff;
                                            margin-bottom: 4px;
                                        "
                                    >
                                        MatchPoint
                                    </div>
                                    <div
                                        style="
                                            font-weight: 400;
                                            font-size: 14px;
                                            color: rgba(255, 255, 255, 0.8);
                                            white-space: nowrap;
                                        "
                                    >
                                        https://uniquecore.dev/
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Export button -->
                    <div style="margin-top: 24px; display: flex; gap: 12px">
                        <v-btn
                            color="purple"
                            variant="flat"
                            @click="exportToPNG"
                            :loading="exporting"
                            style="padding-left: 24px; padding-right: 24px"
                        >
                            <v-icon start>mdi-download</v-icon>
                            Exportar a PNG
                        </v-btn>
                        <v-btn
                            variant="outlined"
                            color="grey"
                            @click="closeModal"
                            style="padding-left: 24px; padding-right: 24px"
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

const playerNumber = computed(() => {
    if (
        !props.player ||
        !props.player.equipoJugador ||
        props.player.equipoJugador.length === 0
    ) {
        return null;
    }

    const firstAssignment = props.player.equipoJugador[0];
    return firstAssignment.num || null;
});

const playerStats = computed(() => {
    // Placeholder stats - these would come from actual player statistics if available
    // For now, using placeholder values that match the design
    return {
        points: 189,
        assists: 78,
        shots: 90,
    };
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

const onImageLoad = () => {
    imageLoaded.value = true;
};

const exportToPNG = async () => {
    if (!credentialContainer.value) return;

    exporting.value = true;
    try {
        // Wait for images to load completely
        await nextTick();

        // Wait for fonts to load
        await document.fonts.ready;

        // Wait a bit more to ensure all images are loaded and rendered
        if (imageLoaded.value || imageError.value) {
            await new Promise((resolve) => setTimeout(resolve, 300));
        } else {
            await new Promise((resolve) => setTimeout(resolve, 500));
        }

        // Force a reflow to ensure all styles are applied
        credentialContainer.value.offsetHeight;
        
        // Force render of position and number elements
        const positionElements = credentialContainer.value.querySelectorAll('.position-text, .number-text');
        positionElements.forEach((el) => {
            (el as HTMLElement).offsetHeight;
        });
        
        // Additional wait to ensure positioning is stable
        await new Promise((resolve) => setTimeout(resolve, 100));

        const dataUrl = await domtoimage.toPng(credentialContainer.value, {
            quality: 1.0,
            width: 1080,
            height: 1360,
            style: {
                transform: "scale(2)",
                transformOrigin: "top left",
            },
            fontEmbedCSS: `
                @import url('https://fonts.googleapis.com/css2?family=Arial:wght@400;700;900&display=swap');
            `,
            useCORS: true,
            cacheBust: true,
            filter: (node: Node) => {
                // Ensure text nodes are properly rendered
                if (node.nodeType === Node.TEXT_NODE) {
                    return true;
                }
                return true;
            },
        });

        const link = document.createElement("a");
        link.download = `credencial-${playerName.value.replace(
            /\s+/g,
            "-"
        )}.png`;
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
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

.credential-card * {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
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

/* Fix text positioning for export */
.signature-text {
    transform: translateY(-50%) !important;
    will-change: transform;
}

/* Fix position and number text alignment for export */
.position-text,
.number-text {
    position: absolute !important;
    top: 0 !important;
    line-height: 40px !important;
    height: 40px !important;
    transform: none !important;
    will-change: auto;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    display: block !important;
}

.position-text {
    left: 0 !important;
}

.number-text {
    right: 0 !important;
}

/* Ensure stable text rendering */
.credential-card div {
    border: 0px solid transparent !important;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
}

.credential-card span {
    border: 0px solid transparent !important;
}

.credential-card div div {
    border: 0px solid transparent !important;
}

.credential-card div div svg {
    border: 0px solid transparent !important;
}
</style>
