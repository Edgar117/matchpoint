<template>
    <div class="min-h-screen bg-background text-foreground">
        <!-- Header -->
        <header
            class="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border"
        >
            <div class="container mx-auto px-4 py-4">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-2">
                        <div
                            class="w-10 h-10 bg-primary rounded-full flex items-center justify-center cursor-pointer"
                            @click="goBack"
                        >
                            <svg
                                class="w-6 h-6 text-primary-foreground"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                                />
                            </svg>
                        </div>
                        <h1 class="text-2xl font-bold text-primary">
                            MATCH-POINT
                        </h1>
                    </div>

                    <nav class="hidden md:flex items-center space-x-8">
                        <a
                            href="#"
                            @click.prevent="goHome"
                            class="text-foreground hover:text-primary transition-colors font-medium"
                            >Inicio</a
                        >
                        <a
                            href="#"
                            @click.prevent="goToAllTournaments"
                            class="text-foreground hover:text-primary transition-colors font-medium"
                            >Torneos</a
                        >
                    </nav>
                </div>
            </div>
        </header>

        <!-- Loading State -->
        <div v-if="loading" class="flex items-center justify-center min-h-screen">
            <div class="text-center">
                <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                <p class="mt-4 text-muted-foreground">Cargando detalles del torneo...</p>
            </div>
        </div>

        <!-- Tournament Details -->
        <div v-else-if="tournament" class="py-20">
            <div class="container mx-auto px-4">
                <!-- Back Button -->
                <button
                    @click="goBack"
                    class="mb-8 flex items-center text-muted-foreground hover:text-primary transition-colors"
                >
                    <svg
                        class="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                    Volver
                </button>

                <!-- Tournament Header -->
                <div class="bg-card rounded-xl overflow-hidden shadow-lg mb-8">
                    <div class="relative h-64 md:h-96">
                        <img
                            :src="getTournamentImage(tournament)"
                            :alt="tournament.nombre"
                            class="w-full h-full object-cover"
                            @error="handleImageError"
                        />
                        <div
                            class="absolute top-6 right-6 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold"
                        >
                            {{ tournament.estatus || 'Disponible' }}
                        </div>
                    </div>
                    <div class="p-8">
                        <div class="flex flex-wrap items-center gap-4 mb-4">
                            <span
                                v-if="tournament.tipoTorneo"
                                class="bg-secondary/20 text-secondary px-4 py-2 rounded-lg font-medium"
                            >
                                {{ tournament.tipoTorneo }}
                            </span>
                            <span
                                v-if="tournament.empresa"
                                class="text-muted-foreground"
                            >
                                Organizado por: {{ tournament.empresa }}
                            </span>
                        </div>
                        <h1 class="text-4xl md:text-5xl font-bold mb-4 text-card-foreground">
                            {{ tournament.nombre }}
                        </h1>
                        <p class="text-xl text-muted-foreground mb-6">
                            {{ tournament.descripcion }}
                        </p>
                        <div class="grid md:grid-cols-2 gap-6">
                            <div class="flex items-center space-x-3">
                                <div
                                    class="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center"
                                >
                                    <svg
                                        class="w-6 h-6 text-primary"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <p class="text-sm text-muted-foreground">Fecha de Inicio</p>
                                    <p class="font-semibold text-card-foreground">
                                        {{ formatDate(tournament.fechaInicio) }}
                                    </p>
                                </div>
                            </div>
                            <div class="flex items-center space-x-3">
                                <div
                                    class="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center"
                                >
                                    <svg
                                        class="w-6 h-6 text-primary"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <p class="text-sm text-muted-foreground">Fecha de Fin</p>
                                    <p class="font-semibold text-card-foreground">
                                        {{ formatDate(tournament.fechaFin) }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Tournament Info Cards -->
                <div class="grid md:grid-cols-3 gap-6 mb-8">
                    <div class="bg-card rounded-xl p-6 shadow-lg">
                        <div class="flex items-center space-x-3 mb-4">
                            <div
                                class="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center"
                            >
                                <svg
                                    class="w-6 h-6 text-primary"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                                    />
                                </svg>
                            </div>
                            <h3 class="font-semibold text-card-foreground">Clave</h3>
                        </div>
                        <p class="text-2xl font-bold text-primary">
                            {{ tournament.clave }}
                        </p>
                    </div>
                    <div class="bg-card rounded-xl p-6 shadow-lg">
                        <div class="flex items-center space-x-3 mb-4">
                            <div
                                class="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center"
                            >
                                <svg
                                    class="w-6 h-6 text-secondary"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                                    />
                                </svg>
                            </div>
                            <h3 class="font-semibold text-card-foreground">Tipo</h3>
                        </div>
                        <p class="text-xl font-bold text-secondary">
                            {{ tournament.tipoTorneo || 'No especificado' }}
                        </p>
                    </div>
                    <div class="bg-card rounded-xl p-6 shadow-lg">
                        <div class="flex items-center space-x-3 mb-4">
                            <div
                                class="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center"
                            >
                                <svg
                                    class="w-6 h-6 text-accent"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                            <h3 class="font-semibold text-card-foreground">Estado</h3>
                        </div>
                        <p class="text-xl font-bold text-accent">
                            {{ tournament.estatus || 'Disponible' }}
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Error State -->
        <div v-else class="flex items-center justify-center min-h-screen">
            <div class="text-center">
                <p class="text-xl text-muted-foreground mb-4">No se pudo cargar el torneo.</p>
                <button
                    @click="goBack"
                    class="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                    Volver
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import router from "@/router";
import { useTorneoService } from "../../torneo/composables/useTorneoService";
import { Torneo } from "@/interfaces/Torneo";
import { URLS } from "@/helpers/constants";

const route = useRoute();
const { fetchTorneosPublicos } = useTorneoService();

const tournament = ref<Torneo | null>(null);
const loading = ref(false);

const getTournamentImage = (tournament: Torneo): string => {
    if (tournament.logo && tournament.torneoId) {
        return `${URLS.COTBUILDER}/api/Torneo/logo/${tournament.torneoId}/${tournament.logo}`;
    }
    // Fallback placeholder image
    return "https://img.freepik.com/vector-gratis/diseno-fondo-torneo-baloncesto-abstracto_1017-39244.jpg";
};

const handleImageError = (event: Event) => {
    const target = event.target as HTMLImageElement;
    if (target) {
        target.src = "https://img.freepik.com/vector-gratis/diseno-fondo-torneo-baloncesto-abstracto_1017-39244.jpg";
    }
};

const formatDate = (date: string | Date | null): string => {
    if (!date) return "No especificada";
    
    const d = new Date(date);
    const months = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    
    return `${d.getDate()} de ${months[d.getMonth()]} de ${d.getFullYear()}`;
};

const goBack = () => {
    router.back();
};

const goHome = () => {
    router.push({ name: "inicio" });
};

const goToAllTournaments = () => {
    router.push({ name: "TodosLosTorneos" });
};

const loadTournament = async () => {
    try {
        loading.value = true;
        const torneoId = Number(route.params.id);
        
        // Fetch tournaments and find the one we need
        const result = await fetchTorneosPublicos({
            EmpresaId: 0,
            SortColumn: "fechaInicio",
            Offset: 0,
            Next_Rows: 100, // Get more to find the tournament
            SortDirection: "ASC",
        });
        
        const found = result.tournaments.find(t => t.torneoId === torneoId);
        if (found) {
            tournament.value = found;
        }
    } catch (error) {
        console.error("Error loading tournament:", error);
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    loadTournament();
});
</script>

