<script setup>
    import { ref, onMounted, computed, watch } from 'vue';
    import { useSearchStore } from '../stores/search' 
    import { Icon } from '@iconify/vue';

    const photos = ref([]);
    const visibleCount = ref(30);
    const isLoading = ref(true);
    const error = ref(null);
    const tableContainer = ref(null);
    const isFetchingMore = ref(false);

    const direction = ref("DESC");
    /*
    Для того, чтобы результаты запроса сохранялись даже после загрузки, мы сохраняем запрос в store 
    /store/search.js 
    */ 
    const search = useSearchStore();

    // Вычисляемое свойство для отображаемых фото
    const visiblePhotos = computed(() => {
        return photos.value.slice(0, visibleCount.value); //Возвращает количество фото, равное переменной visibleCount 
    });
    // Получение данных по запросу
    const fetchData = async () => {
        try {
            const response = await fetch(search.value);
            photos.value = await response.json();
        } catch (err) {
            error.value = err.message;
            console.error('Error fetching data:', err);
        } 

        isLoading.value = false;
    };

    //Загрузка дополнительных строк таблицы
    const handleScroll = () => {
        if (isFetchingMore.value || visibleCount.value >= photos.value.length) return;

        const container = tableContainer.value;
        const scrollPosition = container.scrollTop + container.clientHeight;
        const scrollThreshold = container.scrollHeight - 100;

        if (scrollPosition >= scrollThreshold) {
            loadMore();
        }
    };

    //Функция добавления новых строк
    const loadMore = () => {
        isFetchingMore.value = true;
        // Имитация задержки сети
        setTimeout(() => {
            visibleCount.value += 30;
            isFetchingMore.value = false;
        }, 500);
    };
    //При загрузке страницы получаем данные
    onMounted(() => {
        fetchData();
    });
    //Отслеживаем изменения переменной запроса
    watch (() => search.value, () => {
        fetchData();
    });

    
    //Функция сортировки 
    const sortRows = (sortBy) => {
      if(sortBy === 'id' || sortBy === 'albumId')
        photos.value.sort((a,b) => {
          return (direction.value === 'ASC' ? a : b)[sortBy] - (direction.value === 'ASC' ? b : a)[sortBy]
        })
      else
        photos.value.sort((a,b) => {
            return (direction.value === 'ASC' ? a : b)[sortBy].localeCompare((direction.value === 'ASC' ? b : a)[sortBy]) 
        })
      
      direction.value === 'ASC' ? direction.value = 'DESC' : direction.value = 'ASC';
    } 
</script>

<template>
  <div ref="tableContainer" class="overflow-y-auto max-w-[600px] max-h-[600px] rounded-md scrollbar" v-on:scroll="handleScroll">
    <table v-if="photos.length > 0" class="max-w-xl rounded-md">
      <thead>
        <tr class = "bg-sky-950 dark:bg-sky-900 sticky top-0">
          <th class = "max-w-1/2  p-3 text-white cursor-pointer" v-on:click = "sortRows('id')">    
            <div class="flex items-center gap-2">
              <span>ID</span> 
              <Icon icon="mdi:sort" style="font-size: inherit;" class="cursor-pointer"/>
            </div>
          </th>
          <th class = "max-w-1/2  p-3 text-white cursor-pointer" v-on:click = "sortRows('albumId')">
            <div class="flex items-center gap-2">
              <span>Альбом</span>
              <Icon icon="mdi:sort" style="font-size: inherit;" class="cursor-pointer"/>
            </div>
          </th>
          <th class = "max-w-1/2  p-3 text-white cursor-pointer" v-on:click = "sortRows('title')">
            <div class="flex items-center gap-2">
              <span>
                Название
              </span>
              <Icon icon="mdi:sort" style="font-size: inherit;" class="cursor-pointer"/>
            </div>
          </th>
          <th class = "max-w-[100px]  text-white p-3 cursor-pointer" v-on:click = "sortRows('url')">
            <div class="flex items-center gap-2">
              <span>
                Ссылка
              </span>
              <Icon icon="mdi:sort" style="font-size: inherit;" class="cursor-pointer"/>
            </div>
          </th>
          <th class = "max-w-1/5  text-white p-3 cursor-pointer" v-on:click = "sortRows('thumbnailUrl')">
            <div class="flex items-center gap-2">
              <span>
                Миниатюра
              </span>
              <Icon icon="mdi:sort" style="font-size: inherit;" class="cursor-pointer"/>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="photo in visiblePhotos" :key="photo.id">
          <td class = "text-ellipsis p-3">{{ photo.id }}</td>
          <td class = "text-ellipsis p-3">{{ photo.albumId }}</td>
          <td class = "text-ellipsis p-3">{{ photo.title }}</td>
          <td class = "text-ellipsis max-w-[170px] overflow-hidden p-3" v-bind:title="photo.url"><a v-bind:href = "photo.url" target="_blank">{{ photo.url }} </a></td>
          <td class = "text-ellipsis max-w-[170px] overflow-hidden p-3" v-bind:title="photo.thumbnailUrl"><a v-bind:href = "photo.thumbnailUrl" target="_blank"> {{ photo.thumbnailUrl }}</a></td>

        </tr>
      </tbody>
    </table>
    <div v-if="isLoading" class="loading">Загрузка данных...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="!isLoading && photos.length === 0" class="no-data">Данные не обнаружены</div>
  </div>
</template>

