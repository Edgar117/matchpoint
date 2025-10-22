<template>
  <div class="hidden lg:flex lg:w-full h-full items-center justify-center bg-blue-900 relative overflow-hidden">
    <div class="football-pattern absolute inset-0 opacity-30"></div>

    <!-- Background Football Elements -->
    <div class="absolute top-20 left-10 w-16 h-16 border-2 border-yellow-400/30 rounded-full"></div>
    <div class="absolute bottom-32 right-16 w-12 h-12 border-2 border-yellow-400/20 rounded-full"></div>
    <div class="absolute top-1/2 right-20 w-8 h-8 bg-yellow-400/20 rounded-full"></div>

    <div class="relative z-10 flex flex-col justify-center items-center text-center p-12 text-white">
      <!-- Logo and Trophy -->
      <div class="mb-8 relative">
        <div class="trophy-animate">
          <svg class="w-20 h-20 text-yellow-400 mb-4 mx-auto" fill="currentColor" viewBox="0 0 24 24">
            <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20.38C20.77 4 21.08 4.31 21.08 4.69C21.08 4.86 21.02 5.02 20.91 5.14L20.07 6.14C19.58 6.68 18.86 7 18.1 7H17V8C17 10.76 14.76 13 12 13S7 10.76 7 8V7H5.9C5.14 7 4.42 6.68 3.93 6.14L3.09 5.14C2.98 5.02 2.92 4.86 2.92 4.69C2.92 4.31 3.23 4 3.62 4H7ZM9 8C9 9.66 10.34 11 12 11S15 9.66 15 8V6H9V8ZM12 15C12.55 15 13 15.45 13 16V22H11V16C11 15.45 11.45 15 12 15Z"/>
          </svg>
        </div>
        <div class="relative">
          <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <div class="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center">
              <div class="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                <div class="w-4 h-4 bg-blue-900 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Brand Text -->
      <h1 class="text-5xl font-bold mb-4 tracking-tight">
        MATCH<span class="text-yellow-400">POINT</span>
      </h1>

      <p class="text-xl mb-2 font-medium">Sistema para la creación de torneos</p>
      <p class="text-lg mb-8 opacity-90">¡Únete al juego!</p>

      <!-- Features -->
      <div class="space-y-4 text-left">
        <div class="flex items-center gap-3">
          <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M16 4C18.21 4 20 5.79 20 8S18.21 12 16 12C15.67 12 15.35 11.96 15.04 11.88C14.62 12.73 13.81 13.37 12.83 13.66C12.94 13.76 13 13.87 13 14V16H14C14.55 16 15 16.45 15 17S14.55 18 14 18H13V20C13 20.55 12.55 21 12 21S11 20.55 11 20V18H10C9.45 18 9 17.55 9 17S9.45 16 10 16H11V14C11 13.87 11.06 13.76 11.17 13.66C10.19 13.37 9.38 12.73 8.96 11.88C8.65 11.96 8.33 12 8 12C5.79 12 4 10.21 4 8S5.79 4 8 4C8.35 4 8.69 4.05 9.01 4.14C9.43 3.28 10.25 2.64 11.24 2.36C11.13 2.26 11.07 2.14 11.07 2.01C11.07 1.46 11.52 1.01 12.07 1.01S13.07 1.46 13.07 2.01C13.07 2.14 13.01 2.26 12.9 2.36C13.89 2.64 14.71 3.28 15.13 4.14C15.45 4.05 15.79 4 16.14 4H16Z"/>
          </svg>
          <span>Gestiona equipos y jugadores</span>
        </div>
        <div class="flex items-center gap-3">
          <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1L13.5 2.5L16.17 5.17L10.5 10.84L11.92 12.25L15.83 8.34L17.5 10H19V9H21ZM1 9H3V7H1V9ZM3 21V19H1V21H3ZM5 21H7V19H5V21ZM9 21H11V19H9V21ZM13 21H15V19H13V21ZM17 21H19V19H17V21ZM21 21H23V19H21V21Z"/>
          </svg>
          <span>Organiza torneos profesionales</span>
        </div>
        <div class="flex items-center gap-3">
          <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20.38C20.77 4 21.08 4.31 21.08 4.69C21.08 4.86 21.02 5.02 20.91 5.14L20.07 6.14C19.58 6.68 18.86 7 18.1 7H17V8C17 10.76 14.76 13 12 13S7 10.76 7 8V7H5.9C5.14 7 4.42 6.68 3.93 6.14L3.09 5.14C2.98 5.02 2.92 4.86 2.92 4.69C2.92 4.31 3.23 4 3.62 4H7ZM9 8C9 9.66 10.34 11 12 11S15 9.66 15 8V6H9V8ZM12 15C12.55 15 13 15.45 13 16V22H11V16C11 15.45 11.45 15 12 15Z"/>
          </svg>
          <span>Sigue estadísticas en tiempo real</span>
        </div>
      </div>

      <div class="mt-12 text-sm opacity-75">
        <p>Todos los derechos reservados</p>
        <p class="font-semibold">UNIQUECORE | 2025</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.football-pattern {
  background-image:
    radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.1) 2px, transparent 2px),
    radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.1) 2px, transparent 2px);
  background-size: 50px 50px;
}

.trophy-animate {
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}
</style>
