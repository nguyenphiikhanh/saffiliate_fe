import { computed } from 'vue';

export interface PromiseTrackerState {
  activeRequests: number;
}

export function usePromiseTracker() {
  // Use Nuxt's useState to share state reactively across components
  const state = useState<PromiseTrackerState>('global-api-loading', () => ({
    activeRequests: 0,
  }));

  const isLoading = computed(() => state.value.activeRequests > 0);

  const startLoading = () => {
    state.value.activeRequests++;
  };

  const stopLoading = () => {
    state.value.activeRequests = Math.max(0, state.value.activeRequests - 1);
  };

  // Utility helper to wrap and track any standard promise
  const track = <T>(promise: Promise<T>): Promise<T> => {
    startLoading();
    return promise.finally(() => {
      stopLoading();
    });
  };

  return {
    state,
    isLoading,
    startLoading,
    stopLoading,
    track,
  };
}
