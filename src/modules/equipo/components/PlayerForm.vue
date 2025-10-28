<template>
  <div class="max-w-2xl">
    <h2 class="text-2xl font-bold text-slate-900 mb-6">Crear Nuevo Jugador</h2>
    
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Nombre -->
        <div class="md:col-span-2">
          <label for="name" class="block text-sm font-medium text-slate-700 mb-2">
            Nombre Completo
          </label>
          <input
            id="name"
            v-model="form.name"
            type="text"
            required
            class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Ej: Carlos Rodríguez"
          />
        </div>

        <!-- Posición -->
        <div>
          <label for="position" class="block text-sm font-medium text-slate-700 mb-2">
            Posición
          </label>
          <select
            id="position"
            v-model="form.position"
            required
            class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">Seleccionar posición</option>
            <option value="Portero">Portero</option>
            <option value="Defensa">Defensa</option>
            <option value="Mediocampista">Mediocampista</option>
            <option value="Delantero">Delantero</option>
          </select>
        </div>

        <!-- Número -->
        <div>
          <label for="number" class="block text-sm font-medium text-slate-700 mb-2">
            Número de Camiseta
          </label>
          <input
            id="number"
            v-model.number="form.number"
            type="number"
            required
            min="1"
            max="99"
            class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Ej: 10"
          />
        </div>

        <!-- Edad -->
        <div>
          <label for="age" class="block text-sm font-medium text-slate-700 mb-2">
            Edad
          </label>
          <input
            id="age"
            v-model.number="form.age"
            type="number"
            required
            min="10"
            max="50"
            class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Ej: 25"
          />
        </div>
      </div>

      <!-- Botones -->
      <div class="flex gap-4">
        <button
          type="submit"
          class="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
        >
          <UserPlus class="w-5 h-5" />
          Crear Jugador
        </button>
        <button
          type="button"
          @click="resetForm"
          class="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium"
        >
          Limpiar
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { UserPlus } from 'lucide-vue-next'

interface PlayerForm {
  name: string
  position: string
  number: number | null
  age: number | null
}

const emit = defineEmits<{
  playerCreated: [player: { name: string; position: string; number: number; age: number }]
}>()

const form = reactive<PlayerForm>({
  name: '',
  position: '',
  number: null,
  age: null
})

const handleSubmit = () => {
  if (form.name && form.position && form.number && form.age) {
    emit('playerCreated', {
      name: form.name,
      position: form.position,
      number: form.number,
      age: form.age
    })
    resetForm()
  }
}

const resetForm = () => {
  form.name = ''
  form.position = ''
  form.number = null
  form.age = null
}
</script>