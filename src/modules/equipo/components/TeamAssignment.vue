<template>
  <div>
    <h2 class="text-2xl font-bold text-slate-900 mb-6">Asignar Jugadores a Categorías</h2>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <!-- Selector de Rama -->
      <div>
        <label for="rama-select" class="block text-sm font-medium text-slate-700 mb-2">
          Seleccionar Rama
        </label>
        <select
          id="rama-select"
          v-model="selectedRamaId"
          class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        >
          <option value="">Elegir rama...</option>
          <option v-for="rama in ramas" :key="rama.ramaId" :value="rama.ramaId">
            {{ rama.nombre }}
          </option>
        </select>
      </div>

      <!-- Selector de Jugador -->
      <div>
        <label for="player-select" class="block text-sm font-medium text-slate-700 mb-2">
          Seleccionar Jugador
        </label>
        <select
          id="player-select"
          v-model="selectedPlayerId"
          class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        >
          <option value="">Elegir jugador...</option>
          <option v-for="player in players" :key="player.id" :value="player.jugadorId.toString()">
            {{ player.name }}
            <span v-if="player.equipoJugador && player.equipoJugador.length > 0">
              ({{ player.equipoJugador.length }} asignación{{ player.equipoJugador.length > 1 ? 'es' : '' }})
            </span>
          </option>
        </select>
      </div>

      <!-- Selector de Equipo -->
      <div>
        <label for="team-select" class="block text-sm font-medium text-slate-700 mb-2">
          Seleccionar Categoria
        </label>
        <select
          id="team-select"
          v-model="selectedTeamId"
          class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        >
          <option value="">Elegir Categoria...</option>
          <option v-for="team in teams" :key="team.id" :value="team.id">
            {{ team.name }}
          </option>
        </select>
      </div>
    </div>

    <button
      @click="handleAssign"
      :disabled="!selectedPlayerId || !selectedTeamId || !selectedRamaId"
      class="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed mb-8"
    >
      <UserCheck class="w-5 h-5" />
      Asignar Jugador
    </button>

    <!-- Vista de Equipos -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="team in teams"
        :key="team.id"
        class="bg-white border border-slate-200 rounded-xl overflow-hidden"
      >
        <div :class="['p-4', team.color || 'bg-purple-500']">
          <h3 class="text-xl font-bold text-white">{{ team.name }}</h3>
          <p class="text-white/80 text-sm">{{ getTeamPlayers(team.categoriaId).length }} jugadores</p>
        </div>
        
        <div class="p-4 space-y-3">
          <div
            v-for="assignment in getTeamPlayers(team.categoriaId)"
            :key="`${assignment.player.jugadorId}-${assignment.asignacion.equipoJugadorId}`"
            class="flex items-center gap-3 p-3 bg-slate-50 rounded-lg"
          >
            <div class="w-10 h-10 bg-gradient-to-br from-purple-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
              {{ assignment.asignacion.num || '—' }}
            </div>
            <div class="flex-1">
              <p class="font-medium text-slate-900 text-sm">{{ assignment.player.name }}</p>
              <p class="text-xs text-slate-600">
                {{ assignment.asignacion.ramaNombre ? `Rama: ${assignment.asignacion.ramaNombre}` : 'Sin rama asignada' }}
              </p>
            </div>
          </div>

          <div v-if="getTeamPlayers(team.categoriaId).length === 0" class="text-center py-6 text-slate-400 text-sm">
            Sin jugadores asignados
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { UserCheck } from 'lucide-vue-next'
import type { EquipoJugadorAsignacion, RamaEquipo } from '@/interfaces/Jugador'

interface Player {
  id: string
  jugadorId: number
  name: string
  age: number | null
  curp?: string
  fechaNacimiento?: string | null
  equipoJugador: EquipoJugadorAsignacion[]
}

interface Team {
  id: string
  name: string
  color?: string
  categoriaId: number
}

const props = defineProps<{
  players: Player[]
  teams: Team[]
  ramas: RamaEquipo[]
}>()

const emit = defineEmits<{
  assignPlayer: [playerId: string, teamId: string, ramaId: string]
}>()

const selectedPlayerId = ref('')
const selectedTeamId = ref('')
const selectedRamaId = ref('')

// Retornar jugadores con sus asignaciones para una categoría específica
const getTeamPlayers = (categoriaId: number) => {
  const result: Array<{ player: Player; asignacion: EquipoJugadorAsignacion }> = []
  
  props.players.forEach(player => {
    const asignaciones = player.equipoJugador.filter(
      asignacion => asignacion.categoriaId === categoriaId
    )
    asignaciones.forEach(asignacion => {
      result.push({ player, asignacion })
    })
  })
  
  return result
}

const handleAssign = () => {
  if (selectedPlayerId.value && selectedTeamId.value && selectedRamaId.value) {
    emit('assignPlayer', selectedPlayerId.value, selectedTeamId.value, selectedRamaId.value)
    selectedPlayerId.value = ''
    selectedTeamId.value = ''
    selectedRamaId.value = ''
  }
}
</script>