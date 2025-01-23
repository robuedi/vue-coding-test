import { defineStore } from 'pinia';
import { type IFile} from '@/types/upload'
import Axios from 'axios';

export const useFilesStore = defineStore("files",{
    state: () => ({
        _files: [] as IFile[],
    }),
    getters: {
        files: (state) => state._files,
    },
    actions: {
        async getAll() {
            try {
                const response = await Axios.get<{ data: IFile[] }>('/v1/files');
                if (Array.isArray(response.data.data)) {
                    this._files = response.data.data; 
                } else {
                    throw new Error('Unexpected response format');
                }
            }
            catch (error) {
                throw error; 
            }
        },
    }
});