import axios from "axios";

export default function useFileManagement() {
    //send request to download file
    const downloadFile = async (url:string, fileName:string) => {
        const response = await axios.get(url, {
            responseType: 'blob'
        });
        
        // makee the blow
        const blob = new Blob([response.data]);

        // use native browser download (force)
        const downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(blob);
        downloadLink.setAttribute('download',fileName);
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    const deleteFile = async (url:string) => {
        await axios.delete(url);
    };
    
    return { 
        downloadFile,
        deleteFile
    }
}