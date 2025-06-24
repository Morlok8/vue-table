import { defineStore } from 'pinia'
import { ref } from 'vue'



export const useSearchStore = defineStore('search', {
    state: () => ({
        value: localStorage.getItem("search_query") !== null ? ref(localStorage.getItem("search_query")) : ref("https://jsonplaceholder.typicode.com/photos")
    }),
    actions: {
        getSearchArray(search_string){
            if(search_string === "undefined"){
                localStorage.setItem("search_query", "https://jsonplaceholder.typicode.com/photos")
                return true;
            }
            let search_array = search_string.split(" ");

            let search_result = "https://jsonplaceholder.typicode.com/photos?";

            search_array.forEach((value) => {
                search_result = search_result + "&albumId=" + value;
            });
            
            this.value = search_result;

            localStorage.setItem("search_query", search_result)

            console.log(search_result);
        }
    }
})