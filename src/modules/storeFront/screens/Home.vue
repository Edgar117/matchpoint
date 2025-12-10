<template>
    <div class="min-h-screen bg-background text-foreground">
        <!-- Header -->
        <header
            ref="menuRef"
            class="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border"
        >
            <div class="container mx-auto px-4 py-4">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-2">
                        <div
                            class="w-10 h-10 bg-primary rounded-full flex items-center justify-center"
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
                            class="text-foreground hover:text-primary transition-colors font-medium"
                            >Torneos</a
                        >
                        <a
                            href="#"
                            class="text-foreground hover:text-primary transition-colors font-medium"
                            >Equipos</a
                        >
                        <a
                            href="#"
                            class="text-foreground hover:text-primary transition-colors font-medium"
                            >Estadísticas</a
                        >
                        <a
                            href="#"
                            class="text-foreground hover:text-primary transition-colors font-medium"
                            >Partidos</a
                        >

                        <a
                            href="#"
                            @click="
                                router.push(
                                       user != null ? 'Home' : 'Login'
                                )
                            "
                            class="text-foreground hover:text-primary transition-colors font-medium"
                            >{{
                                user != null ? "Ir al panel" : "Iniciar Sesión"
                            }}</a
                        >
                    </nav>

                    <div class="flex items-center space-x-4">
                        <div class="relative hidden sm:block">
                            <input
                                type="text"
                                placeholder="Buscar..."
                                class="pl-10 pr-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                            />
                            <svg
                                class="absolute left-3 top-2.5 w-5 h-5 text-muted-foreground"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </div>
                        <button 
                            @click.stop="isMenuOpen = !isMenuOpen"
                            class="md:hidden p-2 bg-white rounded hover:bg-muted transition-colors"
                            :class="{ 'bg-primary/10': isMenuOpen }"
                        >
                            <svg
                                v-if="!isMenuOpen"
                                class="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                            <svg
                                v-else
                                class="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            
            <!-- Mobile Menu -->
            <Transition
                enter-active-class="transition ease-out duration-200"
                enter-from-class="opacity-0 -translate-y-2"
                enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition ease-in duration-150"
                leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 -translate-y-2"
            >
                <div
                    v-if="isMenuOpen"
                    class="md:hidden bg-background border-t border-border shadow-lg"
                >
                <nav class="flex flex-col py-4 px-4 space-y-2">
                    <a
                        href="#"
                        class="text-foreground hover:text-primary transition-colors font-medium py-2 px-4 rounded-lg hover:bg-muted"
                        @click="isMenuOpen = false"
                        >Torneos</a
                    >
                    <a
                        href="#"
                        class="text-foreground hover:text-primary transition-colors font-medium py-2 px-4 rounded-lg hover:bg-muted"
                        @click="isMenuOpen = false"
                        >Equipos</a
                    >
                    <a
                        href="#"
                        class="text-foreground hover:text-primary transition-colors font-medium py-2 px-4 rounded-lg hover:bg-muted"
                        @click="isMenuOpen = false"
                        >Estadísticas</a
                    >
                    <a
                        href="#"
                        class="text-foreground hover:text-primary transition-colors font-medium py-2 px-4 rounded-lg hover:bg-muted"
                        @click="isMenuOpen = false"
                        >Partidos</a
                    >
                    <a
                        href="#"
                        @click="
                            router.push(
                                   user != null ? 'Home' : 'Login'
                            );
                            isMenuOpen = false;
                        "
                        class="text-foreground hover:text-primary transition-colors font-medium py-2 px-4 rounded-lg hover:bg-muted"
                        >{{
                            user != null ? "Ir al panel" : "Iniciar Sesión"
                        }}</a
                    >
                </nav>
                </div>
            </Transition>
        </header>

        <!-- Hero Section -->
        <section
            class="relative h-screen flex items-center justify-center overflow-hidden"
        >
            <div
                class="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-background"
            ></div>

            <div class="relative z-10 text-center max-w-4xl mx-auto px-4">
                <h2 class="text-6xl md:text-8xl font-bold mb-6 text-balance">
                    <span
                        class="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
                    >
                        ¡Únete a la
                    </span>
                    <br />
                    <span class="text-foreground">Emoción!</span>
                </h2>
                <p
                    class="text-xl md:text-2xl text-muted-foreground mb-8 text-pretty"
                >
                    Descubre los torneos más emocionantes, sigue a tus equipos
                    favoritos y vive la pasión del basketball
                </p>
                <div class="flex flex-col sm:flex-row gap-4 justify-center">
                    <button

                        class="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold text-lg hover:bg-primary/90 transition-all transform hover:scale-105 shadow-lg"
                    >
                        Ver Torneos
                    </button>
                    <button
                        class="px-8 py-4 bg-secondary text-secondary-foreground rounded-lg font-semibold text-lg hover:bg-secondary/90 transition-all transform hover:scale-105 shadow-lg"
                    >
                        Registrar Equipo
                    </button>
                </div>
            </div>

            <!-- Scroll indicator -->
            <div
                class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
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
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                </svg>
            </div>
        </section>

        <!-- Tournament Highlights -->
        <section ref="tournamentsSection" class="py-20 bg-muted/30">
            <div class="container mx-auto px-4">
                <div class="text-center mb-16">
                    <h3
                        class="text-4xl md:text-5xl font-bold mb-4 text-balance"
                    >
                        Torneos Destacados
                    </h3>
                    <p class="text-xl text-muted-foreground text-pretty">
                        Los eventos más emocionantes te esperan
                    </p>
                </div>

                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div
                        v-for="tournament in tournaments"
                        :key="tournament.id"
                        class="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
                    >
                        <div class="relative overflow-hidden">
                            <img
                                :src="tournament.image"
                                :alt="tournament.name"
                                class="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                            <div
                                class="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold"
                            >
                                {{ tournament.status }}
                            </div>
                        </div>
                        <div class="p-6">
                            <h4
                                class="text-xl font-bold mb-2 text-card-foreground"
                            >
                                {{ tournament.name }}
                            </h4>
                            <p class="text-muted-foreground mb-4">
                                {{ tournament.description }}
                            </p>
                            <div class="flex items-center justify-between">
                                <span class="text-sm text-muted-foreground">{{
                                    tournament.date
                                }}</span>
                                <button
                                    class="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium hover:bg-secondary/90 transition-colors"
                                >
                                    Ver Más
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Team Rankings -->
        <section class="py-20">
            <div class="container mx-auto px-4">
                <div class="text-center mb-16">
                    <h3
                        class="text-4xl md:text-5xl font-bold mb-4 text-balance"
                    >
                        Ranking de Equipos
                    </h3>
                    <p class="text-xl text-muted-foreground text-pretty">
                        Los mejores equipos de la temporada
                    </p>
                </div>

                <div class="max-w-4xl mx-auto">
                    <div class="bg-card rounded-xl shadow-lg overflow-hidden">
                        <div
                            class="bg-primary/10 px-6 py-4 border-b border-border"
                        >
                            <div
                                class="grid grid-cols-12 gap-4 font-semibold text-card-foreground"
                            >
                                <div class="col-span-1">#</div>
                                <div class="col-span-4">Equipo</div>
                                <div class="col-span-2 text-center">PJ</div>
                                <div class="col-span-2 text-center">PG</div>
                                <div class="col-span-2 text-center">PP</div>
                                <div class="col-span-1 text-center">Pts</div>
                            </div>
                        </div>
                        <div class="divide-y divide-border">
                            <div
                                v-for="(team, index) in teamRankings"
                                :key="team.id"
                                class="px-6 py-4 hover:bg-muted/50 transition-colors"
                            >
                                <div
                                    class="grid grid-cols-12 gap-4 items-center"
                                >
                                    <div class="col-span-1">
                                        <span
                                            class="inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold"
                                            :class="
                                                index < 3
                                                    ? 'bg-primary text-primary-foreground'
                                                    : 'bg-muted text-muted-foreground'
                                            "
                                        >
                                            {{ index + 1 }}
                                        </span>
                                    </div>
                                    <div
                                        class="col-span-4 flex items-center space-x-3"
                                    >
                                        <img
                                            :src="team.logo"
                                            :alt="team.name"
                                            class="w-10 h-10 rounded-full"
                                        />
                                        <div>
                                            <div
                                                class="font-semibold text-card-foreground"
                                            >
                                                {{ team.name }}
                                            </div>
                                            <div
                                                class="text-sm text-muted-foreground"
                                            >
                                                {{ team.city }}
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        class="col-span-2 text-center font-medium"
                                    >
                                        {{ team.played }}
                                    </div>
                                    <div
                                        class="col-span-2 text-center font-medium text-green-600"
                                    >
                                        {{ team.won }}
                                    </div>
                                    <div
                                        class="col-span-2 text-center font-medium text-red-600"
                                    >
                                        {{ team.lost }}
                                    </div>
                                    <div
                                        class="col-span-1 text-center font-bold text-primary"
                                    >
                                        {{ team.points }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Statistics Overview -->
        <section class="py-20">
            <div class="container mx-auto px-4">
                <div class="text-center mb-16">
                    <h3
                        class="text-4xl md:text-5xl font-bold mb-4 text-balance"
                    >
                        Estadísticas en Vivo
                    </h3>
                    <p class="text-xl text-muted-foreground text-pretty">
                        Números que cuentan la historia
                    </p>
                </div>

                <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div
                        v-for="stat in stats"
                        :key="stat.label"
                        class="text-center p-6 bg-card rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    >
                        <div
                            class="text-4xl md:text-5xl font-bold text-primary mb-2"
                        >
                            {{ stat.value }}
                        </div>
                        <div class="text-muted-foreground font-medium">
                            {{ stat.label }}
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Upcoming Matches -->
        <section class="py-20 bg-muted/30">
            <div class="container mx-auto px-4">
                <div class="text-center mb-16">
                    <h3
                        class="text-4xl md:text-5xl font-bold mb-4 text-balance"
                    >
                        Próximos Partidos
                    </h3>
                    <p class="text-xl text-muted-foreground text-pretty">
                        No te pierdas la acción
                    </p>
                </div>

                <div class="max-w-4xl mx-auto space-y-6">
                    <div
                        v-for="match in upcomingMatches"
                        :key="match.id"
                        class="bg-card rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                        <div class="flex items-center justify-between">
                            <div class="flex items-center space-x-6">
                                <div class="text-center">
                                    <img
                                        :src="match.team1.logo"
                                        :alt="match.team1.name"
                                        class="w-12 h-12 mx-auto mb-2"
                                    />
                                    <div class="font-semibold text-sm">
                                        {{ match.team1.name }}
                                    </div>
                                </div>
                                <div
                                    class="text-2xl font-bold text-muted-foreground"
                                >
                                    VS
                                </div>
                                <div class="text-center">
                                    <img
                                        :src="match.team2.logo"
                                        :alt="match.team2.name"
                                        class="w-12 h-12 mx-auto mb-2"
                                    />
                                    <div class="font-semibold text-sm">
                                        {{ match.team2.name }}
                                    </div>
                                </div>
                            </div>

                            <div class="text-right">
                                <div
                                    class="text-lg font-semibold text-card-foreground"
                                >
                                    {{ match.date }}
                                </div>
                                <div class="text-muted-foreground">
                                    {{ match.time }}
                                </div>
                                <button
                                    class="mt-2 px-4 py-2 bg-accent text-accent-foreground rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors"
                                >
                                    Recordar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Featured Players -->
        <section class="py-20 bg-muted/30">
            <div class="container mx-auto px-4">
                <div class="text-center mb-16">
                    <h3
                        class="text-4xl md:text-5xl font-bold mb-4 text-balance"
                    >
                        Jugadores Destacados
                    </h3>
                    <p class="text-xl text-muted-foreground text-pretty">
                        Las estrellas que brillan en la cancha
                    </p>
                </div>

                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div
                        v-for="player in featuredPlayers"
                        :key="player.id"
                        class="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
                    >
                        <div class="relative overflow-hidden">
                            <img
                                :src="player.image"
                                :alt="player.name"
                                class="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                            <div
                                class="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold"
                            >
                                #{{ player.number }}
                            </div>
                            <div
                                class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6"
                            >
                                <h4 class="text-xl font-bold text-white mb-1">
                                    {{ player.name }}
                                </h4>
                                <p class="text-gray-200 text-sm">
                                    {{ player.position }} • {{ player.team }}
                                </p>
                            </div>
                        </div>
                        <div class="p-6">
                            <div class="grid grid-cols-3 gap-4 text-center">
                                <div>
                                    <div
                                        class="text-2xl font-bold text-primary"
                                    >
                                        {{ player.stats.points }}
                                    </div>
                                    <div class="text-xs text-muted-foreground">
                                        PPG
                                    </div>
                                </div>
                                <div>
                                    <div
                                        class="text-2xl font-bold text-secondary"
                                    >
                                        {{ player.stats.rebounds }}
                                    </div>
                                    <div class="text-xs text-muted-foreground">
                                        RPG
                                    </div>
                                </div>
                                <div>
                                    <div class="text-2xl font-bold text-accent">
                                        {{ player.stats.assists }}
                                    </div>
                                    <div class="text-xs text-muted-foreground">
                                        APG
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Latest News -->
        <section class="py-20">
            <div class="container mx-auto px-4">
                <div class="text-center mb-16">
                    <h3
                        class="text-4xl md:text-5xl font-bold mb-4 text-balance"
                    >
                        Últimas Noticias
                    </h3>
                    <p class="text-xl text-muted-foreground text-pretty">
                        Mantente al día con todo lo que pasa
                    </p>
                </div>

                <div class="grid lg:grid-cols-3 gap-8">
                    <!-- Featured Article -->
                    <div class="lg:col-span-2">
                        <article
                            class="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
                        >
                            <div class="relative overflow-hidden">
                                <img
                                    :src="latestNews[0].image"
                                    :alt="latestNews[0].title"
                                    class="w-full h-64 lg:h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div
                                    class="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold"
                                >
                                    Destacado
                                </div>
                            </div>
                            <div class="p-6">
                                <div
                                    class="flex items-center space-x-4 mb-4 text-sm text-muted-foreground"
                                >
                                    <span>{{ latestNews[0].category }}</span>
                                    <span>•</span>
                                    <span>{{ latestNews[0].date }}</span>
                                    <span>•</span>
                                    <span>{{ latestNews[0].readTime }}</span>
                                </div>
                                <h4
                                    class="text-2xl font-bold mb-3 text-card-foreground group-hover:text-primary transition-colors"
                                >
                                    {{ latestNews[0].title }}
                                </h4>
                                <p
                                    class="text-muted-foreground mb-4 text-pretty"
                                >
                                    {{ latestNews[0].excerpt }}
                                </p>
                                <button
                                    class="inline-flex items-center text-primary font-semibold hover:text-primary/80 transition-colors"
                                >
                                    Leer más
                                    <svg
                                        class="w-4 h-4 ml-2"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </article>
                    </div>

                    <!-- News List -->
                    <div class="space-y-6">
                        <article
                            v-for="article in latestNews.slice(1)"
                            :key="article.id"
                            class="bg-card rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
                        >
                            <div
                                class="flex items-center space-x-4 mb-3 text-sm text-muted-foreground"
                            >
                                <span>{{ article.category }}</span>
                                <span>•</span>
                                <span>{{ article.date }}</span>
                            </div>
                            <h5
                                class="font-bold mb-2 text-card-foreground group-hover:text-primary transition-colors line-clamp-2"
                            >
                                {{ article.title }}
                            </h5>
                            <p
                                class="text-sm text-muted-foreground line-clamp-3"
                            >
                                {{ article.excerpt }}
                            </p>
                        </article>
                    </div>
                </div>
            </div>
        </section>

        <!-- Footer -->
        <footer class="bg-card py-16">
            <div class="container mx-auto px-4">
                <div class="grid md:grid-cols-4 gap-8">
                    <div>
                        <div class="flex items-center space-x-2 mb-4">
                            <div
                                class="w-8 h-8 bg-primary rounded-full flex items-center justify-center"
                            >
                                <svg
                                    class="w-5 h-5 text-primary-foreground"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                                    />
                                </svg>
                            </div>
                            <h4 class="text-xl font-bold text-primary">
                                MATCH-POINT
                            </h4>
                        </div>
                        <p class="text-muted-foreground">
                            La plataforma líder para torneos de basketball.
                            Conectamos equipos, jugadores y fanáticos.
                        </p>
                    </div>

                    <div>
                        <h5 class="font-semibold mb-4 text-card-foreground">
                            Torneos
                        </h5>
                        <ul class="space-y-2 text-muted-foreground">
                            <li>
                                <a
                                    href="#"
                                    class="hover:text-primary transition-colors"
                                    >Próximos</a
                                >
                            </li>
                            <li>
                                <a
                                    href="#"
                                    class="hover:text-primary transition-colors"
                                    >En Curso</a
                                >
                            </li>
                            <li>
                                <a
                                    href="#"
                                    class="hover:text-primary transition-colors"
                                    >Finalizados</a
                                >
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h5 class="font-semibold mb-4 text-card-foreground">
                            Comunidad
                        </h5>
                        <ul class="space-y-2 text-muted-foreground">
                            <li>
                                <a
                                    href="#"
                                    class="hover:text-primary transition-colors"
                                    >Equipos</a
                                >
                            </li>
                            <li>
                                <a
                                    href="#"
                                    class="hover:text-primary transition-colors"
                                    >Jugadores</a
                                >
                            </li>
                            <li>
                                <a
                                    href="#"
                                    class="hover:text-primary transition-colors"
                                    >Foro</a
                                >
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h5 class="font-semibold mb-4 text-card-foreground">
                            Newsletter
                        </h5>
                        <p class="text-muted-foreground mb-4">
                            Recibe las últimas noticias y actualizaciones
                        </p>
                        <div class="flex">
                            <input
                                type="email"
                                placeholder="Tu email"
                                class="flex-1 px-3 py-2 bg-input border border-border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                            />
                            <button
                                class="px-4 py-2 bg-primary text-primary-foreground rounded-r-lg hover:bg-primary/90 transition-colors"
                            >
                                Suscribir
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    class="border-t border-border mt-12 pt-8 text-center text-muted-foreground"
                >
                    <p>
                        &copy; 2024 MATCH-POINT. Todos los derechos reservados.
                    </p>
                </div>
            </div>
        </footer>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { storeToRefs } from "pinia";
import { useLoginStore } from "../../login/store/state";
const { user } = storeToRefs(useLoginStore());

import { getCurrentUser } from "../../../helpers/localstorageHandler";
const value = getCurrentUser();
import router from "@/router";

if (value) {
    user.value = JSON.parse(value);
}

const tournamentsSection = ref(null);
const isMenuOpen = ref(false);
const menuRef = ref<HTMLElement | null>(null);

// Cerrar menú al hacer clic fuera
const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.value && !menuRef.value.contains(event.target as Node)) {
        isMenuOpen.value = false;
    }
};

onMounted(() => {
    document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
    document.removeEventListener("click", handleClickOutside);
});

const tournaments = ref([
    {
        id: 1,
        name: "Copa Nacional 2024",
        description:
            "El torneo más prestigioso del país con 32 equipos compitiendo por la gloria.",
        date: "15 Mar - 20 Abr",
        status: "Inscripciones Abiertas",
        image: "https://img.freepik.com/vector-gratis/diseno-fondo-torneo-baloncesto-abstracto_1017-39244.jpg",
    },
    {
        id: 2,
        name: "Liga Juvenil",
        description: "Competencia para jóvenes talentos menores de 18 años.",
        date: "1 Feb - 15 Mar",
        status: "En Curso",
        image: "https://img.freepik.com/vector-gratis/diseno-fondo-torneo-baloncesto-abstracto_1017-39244.jpg",
    },
    {
        id: 3,
        name: "Torneo Universitario",
        description:
            "Las mejores universidades se enfrentan en este emocionante torneo.",
        date: "10 May - 25 Jun",
        status: "Próximamente",
        image: "https://img.freepik.com/vector-gratis/diseno-fondo-torneo-baloncesto-abstracto_1017-39244.jpg",
    },
]);

const stats = ref([
    { label: "Equipos Activos", value: "156" },
    { label: "Partidos Jugados", value: "2,847" },
    { label: "Jugadores", value: "3,240" },
    { label: "Torneos", value: "48" },
]);

const upcomingMatches = ref([
    {
        id: 1,
        team1: { name: "Lakers", logo: "https://robohash.org/1" },
        team2: { name: "Warriors", logo: "https://robohash.org/2" },
        date: "15 Marzo",
        time: "19:00",
    },
    {
        id: 2,
        team1: { name: "Bulls", logo: "https://robohash.org/3" },
        team2: { name: "Celtics", logo: "https://robohash.org/4" },
        date: "16 Marzo",
        time: "20:30",
    },
    {
        id: 3,
        team1: { name: "Heat", logo: "https://robohash.org/5" },
        team2: { name: "Spurs", logo: "https://robohash.org/6" },
        date: "17 Marzo",
        time: "18:00",
    },
]);

// const scrollToTournaments = () => {
//     tournamentsSection.value?.scrollIntoView({ behavior: "smooth" });
// };
const teamRankings = ref([
    {
        id: 1,
        name: "Golden Eagles",
        city: "Los Angeles",
        logo: "https://robohash.org/11",
        played: 24,
        won: 20,
        lost: 4,
        points: 44,
    },
    {
        id: 2,
        name: "Thunder Bolts",
        city: "Miami",
        logo: "https://robohash.org/12",
        played: 24,
        won: 18,
        lost: 6,
        points: 42,
    },
    {
        id: 3,
        name: "Fire Dragons",
        city: "Chicago",
        logo: "https://robohash.org/13",
        played: 24,
        won: 17,
        lost: 7,
        points: 41,
    },
    {
        id: 4,
        name: "Storm Riders",
        city: "Boston",
        logo: "https://robohash.org/14",
        played: 24,
        won: 15,
        lost: 9,
        points: 39,
    },
    {
        id: 5,
        name: "Night Hawks",
        city: "New York",
        logo: "https://robohash.org/15",
        played: 24,
        won: 14,
        lost: 10,
        points: 38,
    },
]);

const featuredPlayers = ref([
    {
        id: 1,
        name: "Marcus Johnson",
        number: 23,
        position: "Alero",
        team: "Golden Eagles",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/basketball-player-portrait-pYCxQtgCBC3TpI1zXj5tGT8L6CWINE.png",
        stats: {
            points: "28.5",
            rebounds: "8.2",
            assists: "6.1",
        },
    },
    {
        id: 2,
        name: "Carlos Rodriguez",
        number: 10,
        position: "Base",
        team: "Thunder Bolts",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/basketball-player-shooting-5GcM7jxupJYuWaafggfCIfNxBwASPT.png",
        stats: {
            points: "22.8",
            rebounds: "4.5",
            assists: "11.3",
        },
    },
    {
        id: 3,
        name: "David Thompson",
        number: 34,
        position: "Pívot",
        team: "Fire Dragons",
        image: "https://www.shutterstock.com/shutterstock/photos/2425556573/display_1500/stock-photo-one-teenager-caucasian-male-caucasian-young-man-stand-on-basketball-court-with-ball-in-the-evening-2425556573.jpg",
        stats: {
            points: "24.1",
            rebounds: "12.7",
            assists: "3.2",
        },
    },
]);

const latestNews = ref([
    {
        id: 1,
        title: "Golden Eagles Mantienen su Racha Invicta con Victoria Épica",
        excerpt:
            "En un partido lleno de emociones, los Golden Eagles lograron su vigésima victoria consecutiva tras vencer 98-95 a los Thunder Bolts en tiempo extra.",
        category: "Resultados",
        date: "12 Mar 2024",
        readTime: "3 min",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/basketball-game-action-madrid-b1SaMfPPnICRJcIFm2wSRCt2Lwgy6S.jpg",
    },
    {
        id: 2,
        title: "Nuevo Récord de Asistencias en la Liga",
        excerpt:
            "Carlos Rodriguez establece un nuevo récord histórico con 18 asistencias en un solo partido.",
        category: "Récords",
        date: "11 Mar 2024",
        readTime: "2 min",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/basketball-game-action-madrid-b1SaMfPPnICRJcIFm2wSRCt2Lwgy6S.jpg",
    },
    {
        id: 3,
        title: "Cambios en el Formato de Playoffs",
        excerpt:
            "La liga anuncia modificaciones importantes en el sistema de eliminatorias para la próxima temporada.",
        category: "Noticias",
        date: "10 Mar 2024",
        readTime: "4 min",
        image: "/placeholder.svg?height=200&width=300",
    },
    {
        id: 4,
        title: "Lesión de Marcus Johnson Preocupa a los Fans",
        excerpt:
            "El estrella de los Golden Eagles sufrió una lesión menor en el tobillo durante el último entrenamiento.",
        category: "Lesiones",
        date: "9 Mar 2024",
        readTime: "2 min",
        image: "/placeholder.svg?height=200&width=300",
    },
]);
onMounted(() => {
    // Animaciones adicionales se pueden agregar aquí
});
</script>
