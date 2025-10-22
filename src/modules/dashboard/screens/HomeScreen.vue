<template>

    <div class="flex-1 flex flex-col">

      <!-- Welcome Content -->
      <main class="flex-1 p-6">
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-gray-800 mb-2">Bienvenido: {{ user.user.email }}</h1>
          <p class="text-gray-600">Gestiona tus torneos de basketball de manera eficiente</p>
        </div>

        <!-- Dashboard Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div
            v-for="stat in dashboardStats"
            :key="stat.title"
            class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600">{{ stat.title }}</p>
                <p class="text-2xl font-bold text-gray-900 mt-1">{{ stat.value }}</p>
              </div>
              <div :class="['w-12 h-12 rounded-lg flex items-center justify-center', stat.bgColor]">
                <component :is="stat.icon" :class="['w-6 h-6', stat.iconColor]" />
              </div>
            </div>
            <div class="mt-4 flex items-center">
              <span :class="['text-sm font-medium', stat.changeColor]">
                {{ stat.change }}
              </span>
              <span class="text-sm text-gray-500 ml-1">vs mes anterior</span>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">Acciones Rápidas</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              v-for="action in quickActions"
              :key="action.title"
              class="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-blue-300 transition-colors text-left"
            >
              <div :class="['w-10 h-10 rounded-lg flex items-center justify-center', action.bgColor]">
                <component :is="action.icon" :class="['w-5 h-5', action.iconColor]" />
              </div>
              <div>
                <h4 class="font-medium text-gray-900">{{ action.title }}</h4>
                <p class="text-sm text-gray-500">{{ action.description }}</p>
              </div>
            </button>
          </div>
        </div>
      </main>
    </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useLoginStore } from "../../login/store/state";
import { ref, onMounted } from 'vue'
const { user } = storeToRefs(useLoginStore());

// Reactive data
const userName = ref('sa')
const searchQuery = ref('')
const activeMenu = ref('Home')

// Menu items
const menuItems = ref([
  {
    name: 'Home',
    icon: 'HomeIcon'
  },
  {
    name: 'Torneos',
    icon: 'TrophyIcon'
  },
  {
    name: 'Equipos',
    icon: 'UsersIcon'
  },
  {
    name: 'Jugadores',
    icon: 'UserIcon'
  },
  {
    name: 'Partidos',
    icon: 'CalendarIcon'
  },
  {
    name: 'Estadísticas',
    icon: 'ChartBarIcon'
  }
])

// Dashboard statistics
const dashboardStats = ref([
  {
    title: 'Torneos Activos',
    value: '12',
    change: '+2.5%',
    changeColor: 'text-green-600',
    icon: 'TrophyIcon',
    bgColor: 'bg-blue-100',
    iconColor: 'text-blue-600'
  },
  {
    title: 'Equipos Registrados',
    value: '48',
    change: '+12.3%',
    changeColor: 'text-green-600',
    icon: 'UsersIcon',
    bgColor: 'bg-green-100',
    iconColor: 'text-green-600'
  },
  {
    title: 'Partidos Jugados',
    value: '156',
    change: '+8.1%',
    changeColor: 'text-green-600',
    icon: 'CalendarIcon',
    bgColor: 'bg-orange-100',
    iconColor: 'text-orange-600'
  },
  {
    title: 'Jugadores Activos',
    value: '324',
    change: '+5.7%',
    changeColor: 'text-green-600',
    icon: 'UserIcon',
    bgColor: 'bg-purple-100',
    iconColor: 'text-purple-600'
  }
])

// Quick actions
const quickActions = ref([
  {
    title: 'Crear Torneo',
    description: 'Inicia un nuevo torneo',
    icon: 'PlusIcon',
    bgColor: 'bg-blue-100',
    iconColor: 'text-blue-600'
  },
  {
    title: 'Registrar Equipo',
    description: 'Añade un nuevo equipo',
    icon: 'UsersIcon',
    bgColor: 'bg-green-100',
    iconColor: 'text-green-600'
  },
  {
    title: 'Programar Partido',
    description: 'Agenda un nuevo partido',
    icon: 'CalendarIcon',
    bgColor: 'bg-orange-100',
    iconColor: 'text-orange-600'
  }
])
</script>

<script>
// Icon components (simplified SVG icons)
export default {
  components: {
    HomeIcon: {
      template: `
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
        </svg>
      `
    },
    TrophyIcon: {
      template: `
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
        </svg>
      `
    },
    UsersIcon: {
      template: `
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a4 4 0 11-8 0 4 4 0 018 0z"/>
        </svg>
      `
    },
    UserIcon: {
      template: `
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
        </svg>
      `
    },
    CalendarIcon: {
      template: `
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
        </svg>
      `
    },
    ChartBarIcon: {
      template: `
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
        </svg>
      `
    },
    PlusIcon: {
      template: `
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
        </svg>
      `
    }
  }
}
</script>
