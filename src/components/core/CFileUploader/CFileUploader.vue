<template>
    <div class="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 class="text-lg font-bold mb-4 text-gray-800">{{ props.titulo }}</h2>

        <!-- Zona de arrastre / selección -->
        <div
            @drop.prevent="handleDrop"
            @dragover.prevent="isDragging = true"
            @dragleave.prevent="isDragging = false"
            :class="[
                'border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer',
                isDragging
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 hover:border-gray-400',
            ]"
            @click="$refs.fileInput.click()"
        >
            <Upload class="w-12 h-12 mx-auto mb-3 text-gray-400" />
            <p class="text-gray-600 mb-2">
                {{ t("generales.FileUpload.DefaultMessage") }}
            </p>
            <p class="text-sm text-gray-400">
                {{ t("generales.FileUpload.SupportFiles") }}
            </p>
            <input
                ref="fileInput"
                type="file"
                @change="handleFileChange"
                class="hidden"
                :accept="acceptedFormats"
            />
        </div>

        <!-- Archivo cargado -->
        <div v-if="fileName" class="mt-4 p-4 bg-gray-50 rounded-lg">
            <div class="flex items-center justify-between mb-3">
                <div class="flex items-center gap-2">
                    <FileText class="w-5 h-5 text-blue-500" />
                    <div>
                        <p class="font-medium text-gray-800">{{ fileName }}</p>
                        <p class="text-sm text-gray-500">{{ fileSize }}</p>
                    </div>
                </div>
                <button
                    @click="clearFile"
                    class="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Eliminar archivo"
                >
                    <Trash2 class="w-5 h-5" />
                </button>
            </div>

            <!-- Botón de previsualización -->
            <div v-if="isImage" class="mt-2">
                <button
                    @click="showPreview = !showPreview"
                    class="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                    <Eye class="w-4 h-4" />
                    {{ showPreview ? t("generales.FileUpload.Hide") : t("generales.FileUpload.Show")  }}
                </button>
            </div>

            <!-- Vista previa -->
            <div v-if="showPreview && isImage" class="mt-4">
                <img
                    :src="base64String"
                    :alt="fileName"
                    class="w-full rounded-lg border border-gray-200"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { Upload, FileText, Trash2, Eye } from "lucide-vue-next";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const props = defineProps({
    titulo: {
        type: String,
        default: "Subir Archivo",
    },
    acceptedFormats: {
        type: String,
        default: "image/*,.pdf,.doc,.docx",
    },
    valorInicial: {
        type: Object,
        default: null, // { base64, name, type }
        required: false,
    },
});

const emit = defineEmits(["file-uploaded"]);

const fileInput = ref(null);
const fileName = ref("");
const fileSize = ref("");
const base64String = ref("");
const isDragging = ref(false);
const showPreview = ref(false);

const isImage = computed(() => {
    return base64String.value?.startsWith("data:image/");
});

watch(
    () => props.valorInicial,
    (newVal) => {
        if (newVal && newVal.base64) {
            base64String.value = newVal.base64;
            fileName.value = newVal.name || "Archivo cargado";
            fileSize.value = "";
            emit("file-uploaded", newVal);
        } else {
            clearFile();
        }
    }
);

// Evento al seleccionar archivo
const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) processFile(file);
};

// Evento al soltar archivo
const handleDrop = (event) => {
    isDragging.value = false;
    const file = event.dataTransfer.files[0];
    if (file) processFile(file);
};

// Procesar archivo seleccionado o soltado
const processFile = (file) => {
    fileName.value = file.name;
    fileSize.value = formatFileSize(file.size);

    const reader = new FileReader();
    reader.onload = (e) => {
        base64String.value = e.target.result;
        emit("file-uploaded", {
            name: fileName.value,
            size: fileSize.value,
            base64: base64String.value,
            type: file.type,
        });
    };
    reader.readAsDataURL(file);
};

// Formato de tamaño legible
const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
};

// Limpiar archivo cargado
const clearFile = () => {
    fileName.value = "";
    fileSize.value = "";
    base64String.value = "";
    showPreview.value = false;
    if (fileInput.value) fileInput.value.value = "";
    emit("file-uploaded", null);
};
</script>
