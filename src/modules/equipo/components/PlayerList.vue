<template>
  <div>
    <h2 class="text-2xl font-bold text-slate-900 mb-6">Lista de Jugadores</h2>

    <div class="overflow-x-auto">
      <table class="w-full">
        <thead>
          <tr class="border-b border-slate-200">
            <th class="text-left py-3 px-4 text-sm font-semibold text-slate-700">Jugador</th>
            <th class="text-left py-3 px-4 text-sm font-semibold text-slate-700">Número</th>
            <th class="text-left py-3 px-4 text-sm font-semibold text-slate-700">Edad</th>
            <th class="text-left py-3 px-4 text-sm font-semibold text-slate-700">Rama</th>
            <th class="text-left py-3 px-4 text-sm font-semibold text-slate-700">Categoría</th>
            <th class="text-left py-3 px-4 text-sm font-semibold text-slate-700">CURP</th>
            <th class="text-left py-3 px-4 text-sm font-semibold text-slate-700">Estado</th>
            <th class="text-left py-3 px-4 text-sm font-semibold text-slate-700">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="isLoading">
            <td colspan="8" class="py-6 px-4 text-center text-slate-500">
              Cargando jugadores...
            </td>
          </tr>
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
                <div>
                  <span class="font-medium text-slate-900 block">{{ player.name }}</span>
                  <span v-if="player.fechaNacimiento" class="text-xs text-slate-500">
                    Nac: {{ formatDate(player.fechaNacimiento) }}
                  </span>
                </div>
              </div>
            </td>
            <td class="py-4 px-4">
              <span class="inline-flex items-center justify-center w-8 h-8 bg-slate-100 rounded-full text-sm font-bold text-slate-700">
                {{ player.number ?? '-' }}
              </span>
            </td>
            <td class="py-4 px-4 text-slate-600">
              {{ player.age ? `${player.age} años` : '—' }}
            </td>
            <td class="py-4 px-4 text-slate-600">{{ player.ramaNombre || '—' }}</td>
            <td class="py-4 px-4 text-slate-600">{{ player.categoriaNombre || '—' }}</td>
            <td class="py-4 px-4 text-slate-600">{{ player.curp || '—' }}</td>
            <td class="py-4 px-4">
              <span
                :class="[
                  'inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium',
                  player.categoriaId
                    ? 'bg-green-100 text-green-700'
                    : 'bg-amber-100 text-amber-700'
                ]"
              >
                <component :is="player.categoriaId ? CheckCircle : Clock" class="w-3 h-3" />
                {{ player.categoriaId ? 'Asignado' : 'Sin asignar' }}
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

      <div v-if="!isLoading && players.length === 0" class="text-center py-12">
        <Users class="w-16 h-16 text-slate-300 mx-auto mb-4" />
        <p class="text-slate-600">No hay jugadores registrados</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { CheckCircle, Clock, Trash2, Users } from 'lucide-vue-next'

interface Player {
  id: string
  name: string
  number: number | null
  age: number | null
  categoriaId?: number | null
  categoriaNombre?: string
  ramaNombre?: string
  curp?: string
  fechaNacimiento?: string | null
}

const props = defineProps<{
  players: Player[]
  isLoading?: boolean
}>()

const emit = defineEmits<{
  deletePlayer: [playerId: string]
}>()

const formatDate = (value: string) => {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleDateString()
}

const isLoading = computed(() => props.isLoading ?? false)
</script>