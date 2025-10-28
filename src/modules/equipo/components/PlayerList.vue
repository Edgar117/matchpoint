<template>
  <div>
    <h2 class="text-2xl font-bold text-slate-900 mb-6">Lista de Jugadores</h2>
    
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead>
          <tr class="border-b border-slate-200">
            <th class="text-left py-3 px-4 text-sm font-semibold text-slate-700">Jugador</th>
            <th class="text-left py-3 px-4 text-sm font-semibold text-slate-700">Posición</th>
            <th class="text-left py-3 px-4 text-sm font-semibold text-slate-700">Número</th>
            <th class="text-left py-3 px-4 text-sm font-semibold text-slate-700">Edad</th>
            <th class="text-left py-3 px-4 text-sm font-semibold text-slate-700">Estado</th>
            <th class="text-left py-3 px-4 text-sm font-semibold text-slate-700">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="player in players"
            :key="player.id"
            class="border-b border-slate-100 hover:bg-slate-50 transition-colors"
          >
            <td class="py-4 px-4">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-gradient-to-br from-purple-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                  {{ player.name.charAt(0) }}
                </div>
                <span class="font-medium text-slate-900">{{ player.name }}</span>
              </div>
            </td>
            <td class="py-4 px-4 text-slate-600">{{ player.position }}</td>
            <td class="py-4 px-4">
              <span class="inline-flex items-center justify-center w-8 h-8 bg-slate-100 rounded-full text-sm font-bold text-slate-700">
                {{ player.number }}
              </span>
            </td>
            <td class="py-4 px-4 text-slate-600">{{ player.age }} años</td>
            <td class="py-4 px-4">
              <span
                :class="[
                  'inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium',
                  player.teamId
                    ? 'bg-green-100 text-green-700'
                    : 'bg-amber-100 text-amber-700'
                ]"
              >
                <component :is="player.teamId ? CheckCircle : Clock" class="w-3 h-3" />
                {{ player.teamId ? 'Asignado' : 'Sin asignar' }}
              </span>
            </td>
            <td class="py-4 px-4">
              <button
                @click="emit('deletePlayer', player.id)"
                class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Eliminar jugador"
              >
                <Trash2 class="w-4 h-4" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="players.length === 0" class="text-center py-12">
        <Users class="w-16 h-16 text-slate-300 mx-auto mb-4" />
        <p class="text-slate-600">No hay jugadores registrados</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CheckCircle, Clock, Trash2, Users } from 'lucide-vue-next'

interface Player {
  id: string
  name: string
  position: string
  number: number
  age: number
  teamId?: string
}

defineProps<{
  players: Player[]
}>()

const emit = defineEmits<{
  deletePlayer: [playerId: string]
}>()
</script>