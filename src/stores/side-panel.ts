import { ref, type Component } from 'vue';
import { defineStore } from 'pinia';

export const useSidePanelStore = defineStore('sidePanel', () => {
  const sidePanelComponent = ref<Component | undefined>();
  const currentComponentProps = ref<Record<string, unknown> | undefined>();
  const isOpen = ref<boolean>(false);

  const openSidePanel = () => (isOpen.value = true);
  const closeSidePanel = () => (isOpen.value = false);

  const openSidePanelWithComponent = (component: Component) => {
    sidePanelComponent.value = component;
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
