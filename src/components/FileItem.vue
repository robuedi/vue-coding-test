<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import { type IFile} from '@/types/upload'
import useFileManagement from "@/composable/fileManagement";
import DebounceService from '@/services/DebounceService'

//set the event for when deleted
const emit = defineEmits(['deleted'])

//get the file functions
const {downloadFile, deleteFile} = useFileManagement()

//set props
const {file} = defineProps<{ 
    file: IFile, 
}>()

const userFeedback = ref({
    msg: '',
    good: true
})

//make the date nice
const uploadedAt = computed(()=> new Date(file.created_at).toLocaleString())

//send request to delete the file 
const delete_ = async () => {
    try {
        await deleteFile(`v1/files/${file.id}`)
        emit('deleted')
    } catch (error: any) {
        userFeedback.value.msg = `Deletion failed! ${error.response?.data?.message}`;
        userFeedback.value.good = false;
    } 
}

const download = async () => {
    try {
        await downloadFile(`v1/files/${file.id}`, file.name)
        userFeedback.value.msg = `File ${file.name} downloaded successful`
        userFeedback.value.good = true;
    } catch (error: any) {        
        userFeedback.value.msg = `Download failed! ${error.response?.data?.message}`;
        userFeedback.value.good = false;
    }   
}

//get the debounce functionality
const { debounce, cancel } = DebounceService.createDebounce(2000)

// clean the user feedback in 2 seconds
watch(userFeedback, ()=>{
    debounce(()=>{
        userFeedback.value.msg = ''
    })
}, {deep:true})
</script>

<template>
   <article class="flex bg-sky-900/50 hover:bg-sky-900/80 p-3 gap-2 rounded-md">
        <section class="grow flex flex-col">

            <article class="p-1">
                <p><strong>Name</strong></p>
                <p>{{ file.name }}</p>
            </article>

            <article class="p-1">
                <p><strong>Uploaded at:</strong></p>
                <p>{{ uploadedAt }}</p>
            </article>

            <article v-if="userFeedback.msg" class="p-1 " :class="userFeedback.good ? 'text-green-600':'text-red-600'">
                {{ userFeedback.msg }}
            </article>

        </section>

        <section class="flex flex-col justify-center w-28 gap-2">
            <button @click.prevent="download()" class="bg-sky-600 hover:bg-sky-700 text-white rounded-md h-8" >Download</button>
            <button @click.prevent="delete_()" class="bg-orange-600 hover:bg-orange-700 text-white rounded-md h-8" >Delete</button>
        </section>
   </article>

</template>