import { defineStore } from 'pinia'
import { ref } from 'vue'



export const useSearchStore = defineStore('search', {
    state: () => ({
        value: localStorage.getItem("search_query") !== null ? ref(localStorage.getItem("search_query")) : ref("https://jsonplaceholder.typicode.com/photos") //если LocalStorage пуст, то задается значение по умолчанию
    }),
    actions: {
        getSearchArray(search_string){
            let search_result;
            //Дополнительная проверка search string, если поле ввода пустое, то выводится стандартная выборка
            if(search_string === "undefined"){
                search_result = "https://jsonplaceholder.typicode.com/photos";
            }
            else{
                let search_array = search_string.split(" ");

                search_result = "https://jsonplaceholder.typicode.com/photos?";

                search_array.forEach((value) => {
                    search_result = search_result + "&albumId=" + value;
                });
            }
            
            this.value = search_result;

            localStorage.setItem("search_query", search_result)

            console.log(search_result);
        }
    }
})