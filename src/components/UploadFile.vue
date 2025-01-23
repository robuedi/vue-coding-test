<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";

const {accept} = defineProps({
    accept: {
        type: String,
        default: "", 
    }
});

const file = ref<File | null>(null);
const isUploading = ref(false);
const uploadMessage = ref("");

// handle file change event
const handleFileChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
        file.value = input.files[0];
        uploadMessage.value = ""; 
    }
};

// upload file to the backend API
const uploadFile = async () => {
    if (!file.value) return;

    if((file.value.size / (1024 * 1024)) > 10){
        uploadMessage.value = 'File size too big! Maximum is 10MB';
        return;
    }

    isUploading.value = true;
    uploadMessage.value = "";

    try {
        const formData = new FormData();
        formData.append("file", file.value);

        //send the request
        const response = await axios.post('v1/files', formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        //clear the input
        file.value = null

        uploadMessage.value = "File uploaded!";
    } catch (error: any) {
        uploadMessage.value = `Upload failed ! ${error.response?.data?.message}`;
    } finally {
        isUploading.value = false;
    }
};

// Helper to format file size
const formatSize = (size: number) => {
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
};
</script>

<template>
    <section class="flex flex-col gap-3">
        <label for="file-input" class="text-center bg-sky-500 text-white p-2 rounded-md mb-5">
            <span>Choose file</span>
            <input type="file" id="file-input" class="hidden" @change="handleFileChange" :accept="accept" />
        </label>

        <div v-if="file" class="text-slate-400">
            <p><strong>Selected file info</strong></p>
            <p><strong>File:</strong> {{ file.name }}</p>
            <p><strong>Size:</strong> {{ formatSize(file.size) }}</p>
        </div>

        <button v-if="file" class="text-center p-2 text-white rounded-md" :class="{'bg-grey-500':isUploading, 'bg-green-500':!isUploading}" :disabled="isUploading" @click="uploadFile" >
            {{ isUploading ? "Uploading..." : "Upload File" }}
        </button>

        <p v-if="uploadMessage" class="text-white">{{ uploadMessage }}</p>
    </section>
</template>