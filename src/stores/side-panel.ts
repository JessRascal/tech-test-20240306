import { ref, type Component, markRaw } from 'vue';
import { defineStore } from 'pinia';

export const useSidePanelStore = defineStore('sidePanel', () => {
  const sidePanelComponent = ref<Component | undefined>();
  const currentComponentProps = ref<Record<string, unknown> | undefined>();
  const isOpen = ref<boolean>(false);

  const openSidePanel = () => (isOpen.value = true);
  const closeSidePanel = () => (isOpen.value = false);

  const openSidePanelWithComponent = (component: Component, props?: Record<string, unknown>) => {
    sidePanelComponent.value = markRaw(component);
    currentComponentProps.value = props;
    openSidePanel();
  };

  return {
    sidePanelComponent,
    currentComponentProps,
    isOpen,
    openSidePanel,
    closeSidePanel,
    openSidePanelWithComponent,
  };
});
