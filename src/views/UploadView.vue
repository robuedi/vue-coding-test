<script lang="ts" setup>
import PageHeader from '@/layout/PageHeader.vue'
import UploadFile from '@/components/UploadFile.vue'
</script>

<template>
  <main>
    <PageHeader>Upload</PageHeader>
    <UploadFile 
      accept=".png,.jpg,.jpeg,.pdf"
      uploadUrl="http://localhost:8000/api/v1/files"
      />
  </main>
</template>
