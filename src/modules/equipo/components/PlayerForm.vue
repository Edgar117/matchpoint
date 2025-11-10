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
          <label for="numero" class="block text-sm font-medium text-slate-700 mb-2">
            Número de Camiseta
          </label>
          <input
            id="numero"
            v-model.number="form.numero"
            type="number"
            required
            min="0"
            class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Ej: 10"
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
            <option v-for="posicion in POSICIONES" :key="posicion.id" :value="posicion.id">
              {{ posicion.label }}
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

        <div>
          <label for="categoria" class="block text-sm font-medium text-slate-700 mb-2">
            Categoría
          </label>
          <select
            id="categoria"
            v-model.number="form.categoriaId"
            required
            class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">Seleccionar categoría</option>
            <option
              v-for="categoria in filteredCategorias"
              :key="categoria.categoriaId"
              :value="categoria.categoriaId"
            >
              {{ categoria.categoria }}
            </option>
          </select>
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
import { computed, reactive, watch } from 'vue'
import { UserPlus } from 'lucide-vue-next'
import { CFileUploader } from '@core/index'
import type { CategoriaEquipo, JugadorRequest, RamaEquipo } from '@/interfaces/Jugador'

const POSICIONES = [
  { id: 1, label: 'Portero' },
  { id: 2, label: 'Defensa' },
  { id: 3, label: 'Mediocampista' },
  { id: 4, label: 'Delantero' }
] as const

interface Props {
  equipoId?: number
  torneoId?: number | null
  ramas: RamaEquipo[]
  categorias: CategoriaEquipo[]
  isSaving?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  equipoId: 0,
  torneoId: null,
  ramas: () => [],
  categorias: () => [],
  isSaving: false
})

const emit = defineEmits<{
  submit: [payload: JugadorRequest]
}>()

interface FormState {
  nombre: string
  apellidoPaterno: string
  apellidoMaterno: string
  curp: string
  fechaNacimiento: string
  numero: number | null
  posicionTipoTorneoId: number | null
  ramaId: number | null
  categoriaId: number | null
  logo?: string
  extensionImg?: string
}

const form = reactive<FormState>({
  nombre: '',
  apellidoPaterno: '',
  apellidoMaterno: '',
  curp: '',
  fechaNacimiento: '',
  numero: null,
  posicionTipoTorneoId: null,
  ramaId: null,
  categoriaId: null,
  logo: '',
  extensionImg: ''
})

const filteredCategorias = computed(() => {
  if (!form.ramaId) return props.categorias
  return props.categorias.filter(
    (categoria) => !categoria.ramaId || categoria.ramaId === form.ramaId
  )
})

watch(
  () => form.ramaId,
  () => {
    if (
      form.categoriaId &&
      !filteredCategorias.value.some(
        (categoria) => categoria.categoriaId === form.categoriaId
      )
    ) {
      form.categoriaId = null
    }
  }
)

const canSubmit = computed(() => {
  return (
    Boolean(props.equipoId) &&
    !!form.nombre &&
    !!form.apellidoPaterno &&
    !!form.curp &&
    !!form.fechaNacimiento &&
    form.numero !== null &&
    form.posicionTipoTorneoId !== null &&
    form.ramaId !== null &&
    form.categoriaId !== null
  )
})

const buildFechaIso = (value: string) => {
  if (!value) return null
  const date = new Date(`${value}T00:00:00`)
  if (Number.isNaN(date.getTime())) return null
  return date.toISOString()
}

const handleSubmit = () => {
  if (!canSubmit.value || !props.equipoId) return

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
    equipoJugador: [
      {
        equipoJugadorId: 0,
        ramaId: form.ramaId ?? 0,
        categoriaId: form.categoriaId ?? 0,
        posicionTipoTorneoId: form.posicionTipoTorneoId ?? 0,
        num: form.numero ?? 0,
        jugador: `${form.nombre} ${form.apellidoPaterno} ${form.apellidoMaterno ?? ''}`.trim()
      }
    ]
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
  form.numero = null
  form.posicionTipoTorneoId = null
  form.ramaId = null
  form.categoriaId = null
  form.logo = ''
  form.extensionImg = ''
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
