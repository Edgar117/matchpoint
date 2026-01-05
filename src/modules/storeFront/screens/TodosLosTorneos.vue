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
                            @click="goHome"
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
                            class="text-foreground hover:text-primary transition-colors font-medium"
                            >Torneos</a
                        >
                        <a
                            href="#"
                            class="text-foreground hover:text-primary transition-colors font-medium"
                            >Equipos</a
                        >
                    </nav>
                </div>
            </div>
        </header>

        <!-- Main Content -->
        <section class="py-20 bg-muted/30">
            <div class="container mx-auto px-4">
                <div class="text-center mb-16">
                    <h2
                        class="text-4xl md:text-5xl font-bold mb-4 text-balance"
                    >
                        Todos los Torneos
                    </h2>
                    <p class="text-xl text-muted-foreground text-pretty">
                        Explora todos los torneos disponibles
                    </p>
                </div>

                <!-- Loading State -->
                <div v-if="loading" class="text-center py-20">
                    <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    <p class="mt-4 text-muted-foreground">Cargando torneos...</p>
                </div>

                <!-- Tournaments Grid -->
                <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    <div
                        v-for="tournament in tournaments"
                        :key="tournament.torneoId"
                        class="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
                    >
                        <div class="relative overflow-hidden">
                            <img
                                :src="getTournamentImage(tournament)"
                                :alt="tournament.nombre"
                                class="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                            <div
                                class="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold"
                            >
                                {{ tournament.estatus || 'Disponible' }}
                            </div>
                        </div>
                        <div class="p-6">
                            <div class="flex items-center justify-between mb-2">
                                <span
                                    v-if="tournament.tipoTorneo"
                                    class="text-xs bg-secondary/20 text-secondary px-2 py-1 rounded"
                                >
                                    {{ tournament.tipoTorneo }}
                                </span>
                                <span
                                    v-if="tournament.empresa"
                                    class="text-xs text-muted-foreground"
                                >
                                    {{ tournament.empresa }}
                                </span>
                            </div>
                            <h4
                                class="text-xl font-bold mb-2 text-card-foreground"
                            >
                                {{ tournament.nombre }}
                            </h4>
                            <p class="text-muted-foreground mb-4 line-clamp-2">
                                {{ tournament.descripcion }}
                            </p>
                            <div class="flex items-center justify-between">
                                <span class="text-sm text-muted-foreground">{{
                                    formatDateRange(tournament.fechaInicio, tournament.fechaFin)
                                }}</span>
                                <button
                                    @click="goToTournamentDetail(tournament.torneoId)"
                                    class="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium hover:bg-secondary/90 transition-colors"
                                >
                                    Ver Más
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Empty State -->
                <div v-if="!loading && tournaments.length === 0" class="text-center py-20">
                    <p class="text-xl text-muted-foreground">No hay torneos disponibles en este momento.</p>
                </div>

                <!-- Pagination -->
                <div
                    v-if="totalCount > itemsPerPage"
                    class="flex justify-center items-center space-x-4 mt-12"
                >
                    <button
                        @click="previousPage"
                        :disabled="currentPage === 1 || loading"
                        class="px-4 py-2 bg-card border border-border rounded-lg font-medium hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Anterior
                    </button>
                    <span class="text-muted-foreground">
                        Página {{ currentPage }} de {{ totalPages }}
                    </span>
                    <button
                        @click="nextPage"
                        :disabled="currentPage === totalPages || loading"
                        class="px-4 py-2 bg-card border border-border rounded-lg font-medium hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Siguiente
                    </button>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import router from "@/router";
import { useTorneoService } from "../../torneo/composables/useTorneoService";
import { Torneo } from "@/interfaces/Torneo";

const { fetchTorneosPublicos } = useTorneoService();

const tournaments = ref<Torneo[]>([]);
const totalCount = ref(0);
const loading = ref(false);
const currentPage = ref(1);
const itemsPerPage = 9;

const totalPages = computed(() => {
    return Math.ceil(totalCount.value / itemsPerPage);
});

const getTournamentImage = (tournament: Torneo): string => {
    return "https://img.freepik.com/vector-gratis/diseno-fondo-torneo-baloncesto-abstracto_1017-39244.jpg";
};

const formatDateRange = (fechaInicio: string | Date | null, fechaFin: string | Date | null): string => {
    if (!fechaInicio || !fechaFin) return "Fecha por definir";
    
    const start = new Date(fechaInicio);
    const end = new Date(fechaFin);
    
    const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
    
    const startStr = `${start.getDate()} ${months[start.getMonth()]}`;
    const endStr = `${end.getDate()} ${months[end.getMonth()]}`;
    
    return `${startStr} - ${endStr}`;
};

const goToTournamentDetail = (torneoId: number) => {
    router.push({ name: "DetalleTorneo", params: { id: torneoId } });
};

const goHome = () => {
    router.push({ name: "inicio" });
};

const loadTournaments = async () => {
    try {
        loading.value = true;
        const offset = (currentPage.value - 1) * itemsPerPage;
        const result = await fetchTorneosPublicos({
            EmpresaId: 0,
            SortColumn: "fechaInicio",
            Offset: offset,
            Next_Rows: itemsPerPage,
            SortDirection: "ASC",
        });
        tournaments.value = result.tournaments;
        totalCount.value = result.totalCount;
    } catch (error) {
        console.error("Error loading tournaments:", error);
    } finally {
        loading.value = false;
    }
};

const nextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
        loadTournaments();
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
};

const previousPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--;
        loadTournaments();
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
};

onMounted(() => {
    loadTournaments();
});
</script>

