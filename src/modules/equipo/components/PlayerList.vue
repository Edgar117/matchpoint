<template>
  <div>
    <h2 class="text-2xl font-bold text-slate-900 mb-6">Lista de Jugadores</h2>

    <div class="overflow-x-auto">
      <table class="w-full">
        <thead>
          <tr class="border-b border-slate-200">
            <th class="text-left py-3 px-4 text-sm font-semibold text-slate-700">Jugador</th>
            <th class="text-left py-3 px-4 text-sm font-semibold text-slate-700">Edad</th>
            <th class="text-left py-3 px-4 text-sm font-semibold text-slate-700">CURP</th>
            <th class="text-left py-3 px-4 text-sm font-semibold text-slate-700">Estado</th>
            <th class="text-left py-3 px-4 text-sm font-semibold text-slate-700">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="isLoading">
            <td colspan="5" class="py-6 px-4 text-center text-slate-500">
              Cargando jugadores...
            </td>
          </tr>
          <template v-else>
            <tr
              v-for="player in players"
              :key="player.id"
              class="border-b border-slate-100 hover:bg-slate-50 transition-colors"
            >
              <td class="py-4 px-4">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0 bg-gradient-to-br from-purple-500 to-orange-500 relative">
                    <img
                      v-if="player.logo && !imageErrors[player.jugadorId]"
                      :src="getPlayerImageUrl(player)"
                      :alt="player.name"
                      class="w-full h-full object-cover absolute inset-0"
                      @error="() => handleImageError(player.jugadorId)"
                    />
                    <span class="text-white font-bold z-10">{{ player.name.charAt(0) }}</span>
                  </div>
                  <div>
                    <span class="font-medium text-slate-900 block">{{ player.name }}</span>
                    <span v-if="player.fechaNacimiento" class="text-xs text-slate-500">
                      Nac: {{ formatDate(player.fechaNacimiento) }}
                    </span>
                  </div>
                </div>
              </td>
              <td class="py-4 px-4 text-slate-600">
                {{ player.age ? `${player.age} años` : '—' }}
              </td>
              <td class="py-4 px-4 text-slate-600">{{ player.curp || '—' }}</td>
              <td class="py-4 px-4">
                <span
                  :class="[
                    'inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium',
                    hasAssignments(player)
                      ? 'bg-green-100 text-green-700'
                      : 'bg-amber-100 text-amber-700'
                  ]"
                >
                  <component :is="hasAssignments(player) ? CheckCircle : Clock" class="w-3 h-3" />
                  {{ hasAssignments(player) ? 'Asignado' : 'Sin asignar' }}
                </span>
              </td>
              <td class="py-4 px-4">
                <div class="flex items-center gap-2">
                  <button
                    @click="openDetailsModal(player)"
                    class="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                    title="Ver detalles"
                  >
                    <Eye class="w-4 h-4" />
                  </button>
                  <button
                    @click="emit('editPlayer', player)"
                    class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Editar jugador"
                  >
                    <Pencil class="w-4 h-4" />
                  </button>
                  <button
                    @click="emit('deletePlayer', player.jugadorId.toString())"
                    class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Eliminar jugador"
                  >
                    <Trash2 class="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          </template>
        </tbody>
      </table>

      <div v-if="!isLoading && players.length === 0" class="text-center py-12">
        <Users class="w-16 h-16 text-slate-300 mx-auto mb-4" />
        <p class="text-slate-600">No hay jugadores registrados</p>
      </div>
    </div>

    <!-- Modal de Detalles del Jugador -->
    <v-dialog v-model="showDetailsModal" max-width="800px" persistent>
      <v-card v-if="selectedPlayer" class="rounded-xl">
        <v-card-title class="bg-gradient-to-r from-purple-600 to-orange-500 text-white px-6 py-4">
          <div class="flex items-center justify-between w-full">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white font-bold text-lg">
                {{ selectedPlayer.name.charAt(0) }}
              </div>
              <div>
                <h3 class="text-xl font-bold">{{ selectedPlayer.name }}</h3>
                <p class="text-sm text-white/80" v-if="selectedPlayer.fechaNacimiento">
                  Nac: {{ formatDate(selectedPlayer.fechaNacimiento) }} ({{ selectedPlayer.age }} años)
                </p>
              </div>
            </div>
            <v-btn
              icon
              variant="text"
              color="white"
              @click="closeDetailsModal"
              class="hover:bg-white/20"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
        </v-card-title>

        <v-card-text class="px-6 py-6">
          <div class="mb-6">
            <p class="text-sm text-slate-600 mb-1">CURP</p>
            <p class="text-base font-medium text-slate-900">{{ selectedPlayer.curp || '—' }}</p>
          </div>

          <div v-if="selectedPlayer.equipoJugador && selectedPlayer.equipoJugador.length > 0">
            <h4 class="text-lg font-semibold text-slate-900 mb-4">Asignaciones</h4>
            <div class="space-y-3">
              <div
                v-for="(asignacion, index) in enrichedAssignments"
                :key="`${selectedPlayer.jugadorId}-${asignacion.equipoJugadorId}-${index}`"
                class="bg-slate-50 rounded-lg p-4 border border-slate-200"
              >
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p class="text-xs text-slate-600 mb-1">Número</p>
                    <p class="text-base font-bold text-slate-900">{{ asignacion.num || '—' }}</p>
                  </div>
                  <div>
                    <p class="text-xs text-slate-600 mb-1">Rama</p>
                    <p class="text-base font-medium text-slate-900">{{ asignacion.ramaNombre || '—' }}</p>
                  </div>
                  <div>
                    <p class="text-xs text-slate-600 mb-1">Categoría</p>
                    <p class="text-base font-medium text-slate-900">{{ asignacion.categoriaNombre || '—' }}</p>
                  </div>
                  <div>
                    <p class="text-xs text-slate-600 mb-1">ID Asignación</p>
                    <p class="text-sm text-slate-500">{{ asignacion.equipoJugadorId }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="text-center py-8 bg-amber-50 rounded-lg border border-amber-200">
            <Clock class="w-12 h-12 text-amber-400 mx-auto mb-2" />
            <p class="text-amber-700 font-medium">Este jugador no tiene asignaciones</p>
          </div>
        </v-card-text>

        <v-card-actions class="px-6 py-4 bg-slate-50">
          <v-spacer></v-spacer>
          <v-btn
            color="purple"
            variant="flat"
            @click="closeDetailsModal"
            class="px-6"
          >
            Cerrar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { CheckCircle, Clock, Trash2, Users, Eye, Pencil } from 'lucide-vue-next'
import type { EquipoJugadorAsignacion, RamaEquipo, CategoriaEquipo } from '@/interfaces/Jugador'
import { URLS } from '@/helpers/constants'

interface Player {
  id: string
  jugadorId: number
  name: string
  age: number | null
  curp?: string
  fechaNacimiento?: string | null
  logo?: string
  extensionImg?: string
  equipoJugador: EquipoJugadorAsignacion[]
}

const props = defineProps<{
  players: Player[]
  isLoading?: boolean
  ramas?: RamaEquipo[]
  categorias?: CategoriaEquipo[]
}>()

const emit = defineEmits<{
  deletePlayer: [playerId: string]
  editPlayer: [player: Player]
}>()

const showDetailsModal = ref(false)
const selectedPlayer = ref<Player | null>(null)
const imageErrors = ref<Record<number, boolean>>({})

const formatDate = (value: string) => {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleDateString('es-MX', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

const isLoading = computed(() => props.isLoading ?? false)

const hasAssignments = (player: Player): boolean => {
  return player.equipoJugador && player.equipoJugador.length > 0
}

// Funciones para obtener nombres de los catálogos
const getRamaNombre = (ramaId?: number | null): string => {
  if (!ramaId || ramaId === 0 || !props.ramas) return ''
  const rama = props.ramas.find(r => r.ramaId === ramaId)
  return rama?.nombre ?? ''
}

const getCategoriaNombre = (categoriaId?: number | null): string => {
  if (!categoriaId || categoriaId === 0 || !props.categorias) return ''
  const categoria = props.categorias.find(c => c.categoriaId === categoriaId)
  return categoria?.categoria ?? ''
}

// Computed para enriquecer las asignaciones del jugador seleccionado con los nombres de los catálogos
const enrichedAssignments = computed(() => {
  if (!selectedPlayer.value) return []
  
  return selectedPlayer.value.equipoJugador.map(asignacion => ({
    ...asignacion,
    ramaNombre: asignacion.ramaNombre || getRamaNombre(asignacion.ramaId),
    categoriaNombre: asignacion.categoriaNombre || getCategoriaNombre(asignacion.categoriaId)
  }))
})

const openDetailsModal = (player: Player) => {
  selectedPlayer.value = player
  showDetailsModal.value = true
}

const closeDetailsModal = () => {
  showDetailsModal.value = false
  selectedPlayer.value = null
}

// Función para construir la URL de la imagen del jugador
const getPlayerImageUrl = (player: Player): string => {
  if (!player.logo || !player.jugadorId) return ''
  
  // Construir el nombre del logo completo
  // Si el logo ya incluye la extensión, usarlo tal cual
  // Si no, agregar la extensión desde extensionImg
  let nombreLogo = player.logo
  if (!nombreLogo.includes('.')) {
    const extension = player.extensionImg || 'jpg'
    nombreLogo = `${nombreLogo}.${extension}`
  }
  
  // Construir la URL del endpoint
  return `${URLS.COTBUILDER}/api/Jugador/logo/${player.jugadorId}/${nombreLogo}`
}

// Manejar error al cargar imagen
const handleImageError = (jugadorId: number) => {
  imageErrors.value[jugadorId] = true
}
</script>