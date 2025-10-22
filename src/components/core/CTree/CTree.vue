<template>
    <ul class="menu menu-md rounded-lg w-full max-w-md">
        <li v-for="file in items" :key="file.name">
            <template v-if="file.type === 'file'">
                <a @click="file.onClick">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="h-4 w-4"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                        />
                    </svg>
                    <span>
                        {{ file.name }}
                    </span>
                </a>
            </template>
            <template v-else>
                <details open>
                    <summary>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="h-4 w-4"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4
                                .5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
                            />
                        </svg>
                        {{ file.name }}
                    </summary>
                    <ul>
                        <li v-for="child in file.children" :key="child.name">
                            <template v-if="child.type === 'file'">
                                <a @click="child.onClick">
                                    <svg
                                        @click="child.onClick"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="h-4 w-4"
                                    >
                                        <rect
                                            @click="child.onClick"
                                            width="24"
                                            height="24"
                                            rx="20"
                                            ry="20"
                                            fill="transparent"
                                        />
                                        <text @click="child.onClick">
                                            <tspan
                                                @click="child.onClick"
                                                x="50%"
                                                y="50%"
                                                fill="#178600"
                                                font-size="16"
                                                font-family="Arial"
                                                alignment-baseline="middle"
                                                text-anchor="middle"
                                                font-weight="bold"
                                            >
                                                C#
                                            </tspan>
                                        </text>
                                    </svg>

                                    <span @click="child.onClick">
                                        {{ child.name }}
                                    </span>
                                </a>
                            </template>
                            <template v-else>
                                <details open>
                                    <summary>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke-width="1.5"
                                            stroke="currentColor"
                                            class="h-4 w-4"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4
                                .5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
                                            />
                                        </svg>
                                        {{ child.name }}
                                    </summary>
                                    <ul>
                                        <li
                                            v-for="subChild in child.children"
                                            :key="subChild.name"
                                        >
                                            <a @click="subChild.onClick">
                                                <template
                                                    v-if="
                                                        subChild.type ===
                                                        'folder'
                                                    "
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke-width="1.5"
                                                        stroke="currentColor"
                                                        class="h-4 w-4"
                                                    >
                                                        <path
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                                                        />
                                                    </svg>
                                                </template>
                                                <template v-else>
                                                    <svg
                                                        @click="
                                                            subChild.onClick
                                                        "
                                                        viewBox="0 0 24 24"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        class="h-4 w-4"
                                                    >
                                                        <rect
                                                            @click="
                                                                subChild.onClick
                                                            "
                                                            width="24"
                                                            height="24"
                                                            rx="20"
                                                            ry="20"
                                                            fill="transparent"
                                                        />
                                                        <text>
                                                            <tspan
                                                                @click="
                                                                    subChild.onClick
                                                                "
                                                                x="50%"
                                                                y="50%"
                                                                fill="#178600"
                                                                font-size="16"
                                                                font-family="Arial"
                                                                alignment-baseline="middle"
                                                                text-anchor="middle"
                                                                font-weight="bold"
                                                            >
                                                                C#
                                                            </tspan>
                                                        </text>
                                                    </svg>
                                                </template>

                                                <span @click="subChild.onClick">
                                                    {{ subChild.name }}
                                                </span>
                                            </a>
                                        </li>
                                    </ul>
                                </details>
                            </template>
                        </li>
                    </ul>
                </details>
            </template>
        </li>
    </ul>
</template>
<script setup lang="ts">
import { defineProps, withDefaults } from "vue";
import { FileSystemItem } from "@/interfaces/FileSystem";
// Define las propiedades con valores por defecto
const props = defineProps({
    items: {
        type: Object as () => FileSystemItem[] | undefined,
        required: true,
    },
});
</script>
