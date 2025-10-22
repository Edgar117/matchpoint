<template>
    <div class="overflow-auto">
        <table class="table-auto">
            <thead>
                <tr>
                    <th></th>
                    <th></th>
                    <th class="border-2 border-[#f1f5f9] bg-white px-2 py-1" v-for="i in  moment(new Date()).daysInMonth()"
                        :key="i">
                        {{ i }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, i) in items" :key="i">
                    <td class="border-2 border-[#f1f5f9] bg-white px-2 py-1">
                        <p class="whitespace-nowrap">{{ item.title }}</p>
                    </td>
                    <td class="border-2 border-[#f1f5f9] bg-white px-2 py-1">
                        <div>
                            {{ item.subtitle }}
                        </div>
                    </td>
                    <td class="border-2 border-[#f1f5f9] bg-white px-2 py-1"
                        v-for="(d, j) in moment(new Date()).daysInMonth()" :key="j">
                        {{ moment(item.values[j]?.date).date() === d && item.values.length >= d ? item.values[j]?.value : 0
                        }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <!-- moment(new Date()).daysInMonth() -->
</template>
<script setup lang="ts">
import moment from 'moment'

export interface Items {
    title: string,
    subtitle: string,
    values: ItemValue[]
}

export interface ItemValue {
    date: string | Date,
    value: string | number
}


const items: Items[] = [
    {
        title: "sobre estante",
        subtitle: "Pax",
        values: [
            {
                date: '2023/07/01',
                value: '12',
            },
            {
                date: '2023/07/02',
                value: '13'
            },
            {
                date: '2023/07/03',
                value: '13'
            }
        ]
    },
    {
        title: "cabo",
        subtitle: "Pax",
        values: [
            {
                date: '2023/07/01',
                value: '12'
            },
            {
                date: '2023/07/02',
                value: '10'
            },
            {
                date: '2023/07/03',
                value: '13'
            }
        ]
    }
]
</script>