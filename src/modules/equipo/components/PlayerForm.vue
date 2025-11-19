<template>
  <div class="max-w-3xl">
    <h2 class="text-2xl font-bold text-slate-900 mb-6">Crear Nuevo Jugador</h2>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label for="nombre" class="block text-sm font-medium text-slate-700 mb-2">
            Nombre
          </label>
          <input
            id="nombre"
            v-model="form.nombre"
            type="text"
            required
            class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Ej: Carlos"
          />
        </div>

        <div>
          <label for="apellidoPaterno" class="block text-sm font-medium text-slate-700 mb-2">
            Apellido Paterno
          </label>
          <input
            id="apellidoPaterno"
            v-model="form.apellidoPaterno"
            type="text"
            required
            class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Ej: Rodríguez"
          />
        </div>

        <div>
          <label for="apellidoMaterno" class="block text-sm font-medium text-slate-700 mb-2">
            Apellido Materno
          </label>
          <input
            id="apellidoMaterno"
            v-model="form.apellidoMaterno"
            type="text"
            class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Ej: Gómez"
          />
        </div>

        <div>
          <label for="curp" class="block text-sm font-medium text-slate-700 mb-2">
            CURP
          </label>
          <input
            id="curp"
            v-model="form.curp"
            type="text"
            required
            maxlength="18"
            class="w-full px-4 py-2 border border-slate-300 rounded-lg uppercase focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Ej: ROGC000101HMCLRS09"
          />
        </div>

        <div>
          <label for="fechaNacimiento" class="block text-sm font-medium text-slate-700 mb-2">
            Fecha de Nacimiento
          </label>
          <input
            id="fechaNacimiento"
            v-model="form.fechaNacimiento"
            type="date"
            required
            class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        <div>
          <label for="posicion" class="block text-sm font-medium text-slate-700 mb-2">
            Posición
          </label>
          <select
            id="posicion"
            v-model.number="form.posicionTipoTorneoId"
            required
            class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">Seleccionar posición</option>
            <option 
              v-for="posicion in posiciones" 
              :key="posicion.posicionTipoTorneoId" 
              :value="posicion.posicionTipoTorneoId"
            >
              {{ posicion.posicion }} - {{ posicion.descripcion }}
            </option>
          </select>
        </div>

        <div>
          <label for="rama" class="block text-sm font-medium text-slate-700 mb-2">
            Rama
          </label>
          <select
            id="rama"
            v-model.number="form.ramaId"
            required
            class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">Seleccionar rama</option>
            <option v-for="rama in ramas" :key="rama.ramaId" :value="rama.ramaId">
              {{ rama.nombre }}
            </option>
          </select>
        </div>
      </div>

      <!-- Sección de Categorías y Números de Camiseta -->
      <div class="mt-6">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-3">
            <label class="block text-sm font-medium text-slate-700">
              Categorías y Números de Camiseta
            </label>
            <span
              v-if="form.categoriaAssignments.length > 0"
              class="px-2.5 py-0.5 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold"
            >
              {{ form.categoriaAssignments.length }}
            </span>
          </div>
          <button
            type="button"
            @click="addCategoriaAssignment"
            :disabled="!form.ramaId || filteredCategorias.length === 0"
            class="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus class="w-4 h-4" />
            Agregar Categoría
          </button>
        </div>

        <div v-if="form.categoriaAssignments.length === 0" class="text-center py-8 border-2 border-dashed border-slate-300 rounded-lg bg-slate-50">
          <p class="text-slate-500 text-sm">
            No hay categorías asignadas. Haz clic en "Agregar Categoría" para comenzar.
          </p>
        </div>

        <div v-else class="space-y-3">
          <div
            v-for="(assignment, index) in form.categoriaAssignments"
            :key="assignment.id"
            class="bg-white border border-slate-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div class="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
              <div class="md:col-span-5">
                <label class="block text-xs font-medium text-slate-600 mb-2">
                  Categoría
                </label>
                <select
                  v-model.number="assignment.categoriaId"
                  required
                  @change="onCategoriaChange(index)"
                  class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Seleccionar categoría</option>
                  <option
                    v-for="categoria in availableCategoriasForAssignment(index)"
                    :key="categoria.categoriaId"
                    :value="categoria.categoriaId"
                  >
                    {{ categoria.categoria }}
                  </option>
                </select>
              </div>

              <div class="md:col-span-4">
                <label class="block text-xs font-medium text-slate-600 mb-2">
                  Número de Camiseta
                </label>
                <input
                  v-model.number="assignment.num"
                  type="number"
                  required
                  min="0"
                  max="99"
                  class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Ej: 10"
                />
              </div>

              <div class="md:col-span-3 flex gap-2">
                <button
                  type="button"
                  @click="removeCategoriaAssignment(index)"
                  class="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium"
                >
                  <Trash2 class="w-4 h-4" />
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CFileUploader
        titulo="Fotografía del jugador"
        :accepted-formats="'image/*'"
        @file-uploaded="handleFileUpload"
      />

      <div class="flex gap-4">
        <button
          type="submit"
          :disabled="!canSubmit || isSaving"
          class="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <UserPlus class="w-5 h-5" />
          {{ isSaving ? 'Guardando...' : 'Crear Jugador' }}
        </button>
        <button
          type="button"
          @click="resetForm"
          :disabled="isSaving"
          class="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium disabled:opacity-60 disabled:cursor-not-allowed"
        >
          Limpiar
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, watch, ref } from 'vue'
import { UserPlus, Plus, Trash2 } from 'lucide-vue-next'
import { CFileUploader } from '@core/index'
import type { CategoriaEquipo, JugadorRequest, RamaEquipo } from '@/interfaces/Jugador'
import { useEquipoService } from '../composables/useEquipoService'

interface Props {
  equipoId?: number
  torneoId?: number | null
  tipoDeporteId?: number | null
  ramas: RamaEquipo[]
  categorias: CategoriaEquipo[]
  isSaving?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  equipoId: 0,
  torneoId: null,
  tipoDeporteId: null,
  ramas: () => [],
  categorias: () => [],
  isSaving: false
})

const emit = defineEmits<{
  submit: [payload: JugadorRequest]
}>()

interface CategoriaAssignment {
  id: string
  categoriaId: number | null
  num: number | null
}

interface FormState {
  nombre: string
  apellidoPaterno: string
  apellidoMaterno: string
  curp: string
  fechaNacimiento: string
  posicionTipoTorneoId: number | null
  ramaId: number | null
  categoriaAssignments: CategoriaAssignment[]
  logo?: string
  extensionImg?: string
}

let assignmentIdCounter = 0

const form = reactive<FormState>({
  nombre: '',
  apellidoPaterno: '',
  apellidoMaterno: '',
  curp: '',
  fechaNacimiento: '',
  posicionTipoTorneoId: null,
  ramaId: null,
  categoriaAssignments: [],
  logo: '',
  extensionImg: ''
})

// Servicio para posiciones
const { selectPosicionesTipoTorneo } = useEquipoService()

const posiciones = ref<Array<{
  posicionTipoTorneoId: number;
  tipoTorneoId: number;
  tipoTorneo: string;
  posicion: string;
  descripcion: string;
}>>([])

// Función para cargar posiciones
const loadPosiciones = async () => {
  if (props.tipoDeporteId) {
    posiciones.value = await selectPosicionesTipoTorneo(props.tipoDeporteId)
  } else {
    posiciones.value = []
    form.posicionTipoTorneoId = null
  }
}

// Watcher para cargar posiciones cuando cambie tipoDeporteId
watch(
  () => props.tipoDeporteId,
  async (newValue) => {
    await loadPosiciones()
    if (form.posicionTipoTorneoId !== null) {
      form.posicionTipoTorneoId = null
    }
  },
  { immediate: true }
)

const filteredCategorias = computed(() => {
  if (!form.ramaId) return props.categorias
  return props.categorias.filter(
    (categoria) => !categoria.ramaId || categoria.ramaId === form.ramaId
  )
})

// Obtener categorías disponibles para una asignación específica
// (excluyendo las que ya están seleccionadas en otras asignaciones, pero incluyendo la actual)
const availableCategoriasForAssignment = (currentIndex: number) => {
  const currentAssignment = form.categoriaAssignments[currentIndex]
  const selectedCategoriaIds = form.categoriaAssignments
    .map((assignment, index) => index !== currentIndex ? assignment.categoriaId : null)
    .filter((id): id is number => id !== null)
  
  return filteredCategorias.value.filter(
    (categoria) => 
      !selectedCategoriaIds.includes(categoria.categoriaId) ||
      categoria.categoriaId === currentAssignment?.categoriaId
  )
}

// Agregar una nueva asignación de categoría
const addCategoriaAssignment = () => {
  if (!form.ramaId) return
  
  form.categoriaAssignments.push({
    id: `assignment-${++assignmentIdCounter}`,
    categoriaId: null,
    num: null
  })
}

// Eliminar una asignación de categoría
const removeCategoriaAssignment = (index: number) => {
  form.categoriaAssignments.splice(index, 1)
}

// Manejar cambio de categoría
const onCategoriaChange = (index: number) => {
  // Si se selecciona una categoría, asegurar que tenga un número
  const assignment = form.categoriaAssignments[index]
  if (assignment.categoriaId && assignment.num === null) {
    assignment.num = 0
  }
}

// Limpiar asignaciones cuando cambia la rama
watch(
  () => form.ramaId,
  () => {
    // Limpiar todas las asignaciones cuando cambia la rama
    form.categoriaAssignments = []
  }
)

const canSubmit = computed(() => {
  const hasBasicFields = Boolean(props.equipoId) &&
    !!form.nombre &&
    !!form.apellidoPaterno &&
    !!form.curp &&
    !!form.fechaNacimiento &&
    form.posicionTipoTorneoId !== null &&
    form.ramaId !== null

  const hasValidAssignments = form.categoriaAssignments.length > 0 &&
    form.categoriaAssignments.every(
      (assignment) => assignment.categoriaId !== null && assignment.num !== null && assignment.num >= 0
    )

  return hasBasicFields && hasValidAssignments
})

const buildFechaIso = (value: string) => {
  if (!value) return null
  const date = new Date(`${value}T00:00:00`)
  if (Number.isNaN(date.getTime())) return null
  return date.toISOString()
}

const handleSubmit = () => {
  if (!canSubmit.value || !props.equipoId) return

  // Crear un array de equipoJugador para cada asignación de categoría
  const equipoJugadorArray = form.categoriaAssignments
    .filter((assignment) => assignment.categoriaId !== null && assignment.num !== null)
    .map((assignment) => ({
      equipoJugadorId: 0,
      ramaId: form.ramaId ?? 0,
      categoriaId: assignment.categoriaId ?? 0,
      posicionTipoTorneoId: form.posicionTipoTorneoId ?? 0,
      num: assignment.num ?? 0,
      jugador: `${form.nombre} ${form.apellidoPaterno} ${form.apellidoMaterno ?? ''}`.trim()
    }))

  const payload: JugadorRequest = {
    equipoId: props.equipoId,
    jugadorId: 0,
    nombre: form.nombre,
    apellidoPaterno: form.apellidoPaterno,
    apellidoMaterno: form.apellidoMaterno,
    logo: form.logo ?? '',
    fechaNacimiento: buildFechaIso(form.fechaNacimiento),
    curp: form.curp,
    extensionImg: form.extensionImg ?? '',
    equipoJugador: equipoJugadorArray
  }

  emit('submit', payload)
  resetForm()
}

const resetForm = () => {
  form.nombre = ''
  form.apellidoPaterno = ''
  form.apellidoMaterno = ''
  form.curp = ''
  form.fechaNacimiento = ''
  form.posicionTipoTorneoId = null
  form.ramaId = null
  form.categoriaAssignments = []
  form.logo = ''
  form.extensionImg = ''
  assignmentIdCounter = 0
}

const handleFileUpload = (fileData: any) => {
  if (!fileData) {
    form.logo = ''
    form.extensionImg = ''
    return
  }
  const base64 = fileData.base64?.split(',')[1] ?? ''
  if (base64) {
    form.logo = base64
  }
  if (fileData.name) {
    const parts = fileData.name.split('.')
    form.extensionImg = parts.length > 1 ? parts.pop() : ''
  }
}

const isSaving = computed(() => props.isSaving ?? false)
</script>
