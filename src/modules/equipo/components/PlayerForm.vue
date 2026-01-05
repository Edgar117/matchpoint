<template>
  <div class="max-w-3xl">
    <h2 class="text-2xl font-bold text-slate-900 mb-6">{{ props.editPlayer ? 'Editar Jugador' : 'Crear Nuevo Jugador' }}</h2>

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
        :valor-inicial="initialImageValue"
        @file-uploaded="handleFileUpload"
      />

      <div class="flex gap-4">
        <button
          type="submit"
          :disabled="!canSubmit || isSaving"
          class="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <UserPlus class="w-5 h-5" />
          {{ isSaving ? 'Guardando...' : (props.editPlayer ? 'Actualizar Jugador' : 'Crear Jugador') }}
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
import { computed, reactive, watch, ref, nextTick } from 'vue'
import { UserPlus, Plus, Trash2 } from 'lucide-vue-next'
import { CFileUploader } from '@core/index'
import type { CategoriaEquipo, JugadorRequest, RamaEquipo } from '@/interfaces/Jugador'
import { useEquipoService } from '../composables/useEquipoService'
import { URLS } from '@/helpers/constants'

interface Props {
  equipoId?: number
  torneoId?: number | null
  tipoDeporteId?: number | null
  ramas: RamaEquipo[]
  categorias: CategoriaEquipo[]
  isSaving?: boolean
  editPlayer?: {
    jugadorId: number
    nombre: string
    apellidoPaterno: string
    apellidoMaterno: string
    curp: string
    fechaNacimiento: string | null
    logo?: string
    extensionImg?: string
    equipoJugador: Array<{
      equipoJugadorId: number
      ramaId: number
      categoriaId: number
      posicionTipoTorneoId: number
      num: number
    }>
  } | null
}

const props = withDefaults(defineProps<Props>(), {
  equipoId: 0,
  torneoId: null,
  tipoDeporteId: null,
  ramas: () => [],
  categorias: () => [],
  isSaving: false,
  editPlayer: null
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
  async () => {
    await loadPosiciones()
    // Solo resetear la posición si NO estamos editando un jugador
    // Si estamos editando, el watcher de editPlayer ya estableció el valor correcto
    if (!props.editPlayer && form.posicionTipoTorneoId !== null) {
      form.posicionTipoTorneoId = null
    }
  },
  { immediate: true }
)

// Función para resetear el formulario (definida antes del watcher)
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

// Watcher para cargar datos del jugador cuando se pasa en modo edición
watch(
  () => props.editPlayer,
  async (player) => {
    if (player) {
      // Asegurarse de que las posiciones estén cargadas antes de establecer el valor
      if (props.tipoDeporteId) {
        await loadPosiciones()
      }
      
      // Cargar datos básicos
      form.nombre = player.nombre || ''
      form.apellidoPaterno = player.apellidoPaterno || ''
      form.apellidoMaterno = player.apellidoMaterno || ''
      form.curp = player.curp || ''
      // NO setear form.logo y form.extensionImg aquí, loadInitialImage lo hará con el base64 correcto
      
      // Cargar fecha de nacimiento
      if (player.fechaNacimiento) {
        const date = new Date(player.fechaNacimiento)
        if (!Number.isNaN(date.getTime())) {
          const year = date.getFullYear()
          const month = String(date.getMonth() + 1).padStart(2, '0')
          const day = String(date.getDate()).padStart(2, '0')
          form.fechaNacimiento = `${year}-${month}-${day}`
        }
      }
      
      // Cargar asignaciones de categorías
      if (player.equipoJugador && player.equipoJugador.length > 0) {
        const firstAssignment = player.equipoJugador[0]
        form.ramaId = firstAssignment.ramaId ?? null
        
        // Establecer la posición después de asegurar que las posiciones estén cargadas
        const posicionId = firstAssignment.posicionTipoTorneoId ?? null
        if (posicionId !== null && posicionId !== undefined) {
          // Convertir a número para asegurar que coincida con el tipo del select
          const posicionIdNum = Number(posicionId)
          if (!Number.isNaN(posicionIdNum)) {
            // Usar nextTick para asegurar que el select esté renderizado
            await nextTick()
            form.posicionTipoTorneoId = posicionIdNum
          }
        }
        
        // Cargar todas las asignaciones de categorías
        form.categoriaAssignments = player.equipoJugador.map((asignacion) => ({
          id: `assignment-${++assignmentIdCounter}`,
          categoriaId: asignacion.categoriaId ?? null,
          num: asignacion.num ?? null
        }))
      }
      
      // Cargar la imagen después de setear los otros datos
      // Esto asegura que form.logo tenga el base64 correcto
      await loadInitialImage()
    } else {
      // Si no hay jugador para editar, resetear el formulario
      resetForm()
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
    .map((assignment) => {
      // Si estamos editando, mantener el equipoJugadorId si existe
      const existingAssignment = props.editPlayer?.equipoJugador?.find(
        (eq) => eq.categoriaId === assignment.categoriaId
      )
      return {
        equipoJugadorId: existingAssignment?.equipoJugadorId ?? 0,
        ramaId: form.ramaId ?? 0,
        categoriaId: assignment.categoriaId ?? 0,
        posicionTipoTorneoId: form.posicionTipoTorneoId ?? 0,
        num: assignment.num ?? 0,
        jugador: `${form.nombre} ${form.apellidoPaterno} ${form.apellidoMaterno ?? ''}`.trim()
      }
    })
  const payload: JugadorRequest = {
    equipoId: props.equipoId,
    jugadorId: props.editPlayer?.jugadorId ?? 0,
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
  if (!props.editPlayer) {
    resetForm()
  }
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

// Estado para la imagen inicial cargada desde el servidor
const initialImageLoaded = ref<{
  base64: string
  name: string
  type: string
} | null>(null)

// Función auxiliar para convertir Blob a Base64 (similar a empresa)
const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}

// Función para cargar la imagen desde el endpoint y convertirla a base64
// Aplicando la misma lógica que EmpresaForm.vue
const loadInitialImage = async () => {
  if (!props.editPlayer || !props.editPlayer.logo || !props.editPlayer.jugadorId) {
    initialImageLoaded.value = null
    form.logo = ''
    form.extensionImg = ''
    return
  }
  
  try {
    // Construir el nombre del logo completo
    let nombreLogo = props.editPlayer.logo
    if (!nombreLogo.includes('.')) {
      const extension = props.editPlayer.extensionImg || 'jpg'
      nombreLogo = `${nombreLogo}.${extension}`
    }
    
    // Obtener la imagen desde el endpoint
    const imageUrl = `${URLS.COTBUILDER}/api/Jugador/logo/${props.editPlayer.jugadorId}/${nombreLogo}`
    
    // Hacer fetch de la imagen
    const response = await fetch(imageUrl)
    if (!response.ok) {
      initialImageLoaded.value = null
      form.logo = ''
      form.extensionImg = ''
      return
    }
    
    const blob = await response.blob()
    const baseImagen = await blobToBase64(blob)
    
    // Aplicar la misma lógica que EmpresaForm.vue (líneas 272-285)
    initialImageLoaded.value = baseImagen
      ? {
          base64: `${baseImagen}`,
          name: `jugador.${props.editPlayer.extensionImg || 'jpg'}`,
          type: props.editPlayer.extensionImg === 'png' ? 'image/png' : 
                props.editPlayer.extensionImg === 'gif' ? 'image/gif' : 
                props.editPlayer.extensionImg === 'webp' ? 'image/webp' : 
                'image/jpeg'
        }
      : null

    // Guardar el base64 en form.logo y form.extensionImg para que se envíe la misma info si no cambia
    // Similar a como funciona en empresa (líneas 280-285)
    form.logo =
      typeof baseImagen === "string" && baseImagen !== null
        ? baseImagen.split(",")[1]
        : ""
    form.extensionImg = props.editPlayer.extensionImg || 'jpg'
  } catch (error) {
    console.error('Error loading player image:', error)
    initialImageLoaded.value = null
    form.logo = ''
    form.extensionImg = ''
  }
}

// Computed para preparar el valor inicial de la imagen cuando se está editando
const initialImageValue = computed(() => {
  return initialImageLoaded.value || undefined
})
</script>
