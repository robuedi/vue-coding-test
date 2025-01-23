<script lang="ts" setup>
import { onMounted, computed, ref, watch } from "vue";
import { useFilesStore } from "@/stores/files.store";
import FileItem from '@/components/FileItem.vue'
import DebounceService from '@/services/DebounceService'

const filesStore = useFilesStore()

const files = computed(() => filesStore.files);

const feeback = ref('')

//action to fetch the files
const deletedFile = () => {
    feeback.value = 'File Delete'
    filesStore.getAll()
}

//get the debounce functionality
const { debounce, cancel } = DebounceService.createDebounce(2000)

// clean the user feedback in 2 seconds
watch(feeback, ()=>{
    debounce(()=>{
        feeback.value = ''
    })
}, {deep:true})

onMounted(() => {
    filesStore.getAll()
})
</script>

<template>
    <section class="flex flex-col gap-2">
        <template v-if="files.length">
            <p >File count: {{ files.length }}</p>
            <p v-if="feeback">{{ feeback }}</p>
            <FileItem v-for="file in files" :key="file.id" @deleted="deletedFile()" :file="file" />
        </template>
        <p v-else="!files.length">No files found, upload <router-link :to="{ name: 'upload'}">here</router-link></p>
    </section>
</template>
