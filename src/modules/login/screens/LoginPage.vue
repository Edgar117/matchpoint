<template>
    <LayoutLogin>
        <div class="flex flex-row h-screen">
            <div class="w-[0%] lg:w-[60%]">
                <CarouselLogin />
            </div>
            <div
                class="w-[100%] lg:w-[40%] flex flex-col justify-between items-center"
            >
                <FormLogin class="p-8 md:p-10 lg:p-14 xl:p-24" />
                <FooterLogin />
            </div>
        </div>
    </LayoutLogin>
</template>
<script setup lang="ts">
import LayoutLogin from "@/layouts/LayoutLogin.vue";
import FormLogin from "../components/FormLogin.vue";
import CarouselLogin from "../components/CarouselLogin.vue";
import FooterLogin from "../components/FooterLogin.vue";
</script>
