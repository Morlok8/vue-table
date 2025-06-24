<script setup>
    import { useSearchStore } from '../stores/search'

    import ThemeSwitch from './ThemeSwitchComponent.vue'

    const search = useSearchStore()

    const search_input = defineModel()


    const searchFunction = () => {
        if(/^[\d\s]+$/.test(search_input.value))
          search.getSearchArray(search_input.value);  
        else{
            if(typeof search_input.value === "undefined"){
                search.getSearchArray("undefined")
            }
            else
                alert("При поиске можно указывать только целые числа, раздленные через пробел")
        }
          
    }
</script>

<template>
    <div class="flex gap-4">
        <input type = "text" placeholder = "Введите ID" v-model="search_input" class = "p-3 w-full border-2 border-solid rounded-md placeholder-gray-500"> 
        <button v-on:click="searchFunction" class = "p-3 bg-blue-500 text-white rounded-md cursor-pointer" >Найти </button>
        <ThemeSwitch/>
    </div>
</template>