import {
  onBeforeMount,
  onBeforeUnmount,
  onBeforeUpdate,
  onMounted,
  onUnmounted,
  onUpdated,
} from 'vue';

export function useLifecycleLogger(payload: { name: string }) {
  onBeforeMount(() => {
    //eslint-disable-next-line no-console
    console.log(payload.name, 'onBeforeMount');
  });

  onMounted(() => {
    //eslint-disable-next-line no-console
    console.log(payload.name, 'onMounted');
  });

  onBeforeUpdate(() => {
    //eslint-disable-next-line no-console
    console.log(payload.name, 'onBeforeUpdate');
  });

  onUpdated(() => {
    //eslint-disable-next-line no-console
    console.log(payload.name, 'onUpdated');
  });

  onBeforeUnmount(() => {
    //eslint-disable-next-line no-console
    console.log(payload.name, 'onBeforeUnmount');
  });

  onUnmounted(() => {
    //eslint-disable-next-line no-console
    console.log(payload.name, 'onUnmounted');
  });
}
