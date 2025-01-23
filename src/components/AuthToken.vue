<script lang="ts" setup>
import Auth from "@/services/Auth";
import { ref, watch } from "vue";

const authToken = ref('')
const feeback = ref('')

// setting the token globally in axios
const setToken = (event: Event) => {
  const input = event.target as HTMLInputElement;
  authToken.value = input.value
  Auth.setToken(input.value)
};

//some exampke of watch function use, not the gratest one though
watch(authToken, (newVal:string, oldVal:string) => {
    if(newVal !== 'artificially-token'){
        feeback.value='Migth not work, try \'artificially-token\''
        return;
    } 
    
    feeback.value=''
})
</script>

<template>
    <section class="p-3">
        <article >
            <label for="token" class="block mb-2">Authorisation token:</label>
            <input id="token" class="text-black" type="text" @change="setToken" >
        </article>
        <p v-if="!authToken" class="text-red-700">Token not set!</p> 
        <p v-if="feeback">{{feeback}}</p>
    </section>
</template>