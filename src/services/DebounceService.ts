export default class DebounceService{
    static createDebounce(delay: number = 2000) {
        let timeoutId: ReturnType<typeof setTimeout> | null = null;
      
        const debounce = (callback: () => void) => {
          if (timeoutId) {
            clearTimeout(timeoutId);
          }
      
          timeoutId = setTimeout(() => {
            callback();
            timeoutId = null;
          }, delay);
        };
      
        const cancel = () => {
          if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;
          }
        };
      
        return { debounce, cancel };
    }
}