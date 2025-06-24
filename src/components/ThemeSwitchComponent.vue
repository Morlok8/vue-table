<script setup>   
import {ref , onMounted} from 'vue';
import { Icon } from '@iconify/vue';

const isDark = ref('light');

onMounted(()=>{
    const savedTheme = localStorage.getItem('theme');
    isDark.value = savedTheme !== null ? savedTheme : "light";

    updateTheme();
});

const toggleTheme = () => {
    if(isDark.value === 'light')
        isDark.value = 'dark'
    else
        isDark.value = 'light'

    updateTheme();
    localStorage.setItem('theme', isDark.value);
}

const updateTheme = () => {
    if(isDark.value === "dark" ){
        document.documentElement.classList.add('dark');
    }
    else{
        document.documentElement.classList.remove('dark');
    }
}
</script>

<template>
    <button v-on:click="toggleTheme" title="Переключение темы"> <Icon icon="mdi:theme-light-dark" style="font-size: 24px;" class="cursor-pointer"
  /></button>
    
</template>