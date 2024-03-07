<script setup lang="ts">
import TransitionFade from '@/components/transitions/TransitionFade.vue';
import TransitionSlideFromRight from '@/components/transitions/TransitionSlideFromRight.vue';
import BaseButton from '@/components/base/BaseButton.vue';

import { UIVariant } from '@/enums/UIEnums';

import { useSidePanelStore } from '@/stores/side-panel';

const store = useSidePanelStore();
</script>

<template>
  <!-- overlay -->
  <TransitionFade>
    <div
      v-if="store.isOpen"
      class="fixed inset-0 overlay z-index-overlay transition ease-out"
    ></div>
  </TransitionFade>

  <!-- panel -->
  <TransitionSlideFromRight>
    <div
      v-if="store.isOpen"
      class="fixed inset-0 md:ml-auto w-screen lg:w-1/2 xl:w-2/5 2xl:w-1/3 z-index-side-panel bg-white border overflow-y-auto"
    >
      <div class="flex flex-col gap-y-4 p-8">
        <suspense>
          <div>
            <component
              :is="store.sidePanelComponent"
              v-bind="store.currentComponentProps"
            ></component>
          </div>
        </suspense>
        <div class="flex">
            <BaseButton aria-label="close side panel" :variant="UIVariant.Default" @click="store.closeSidePanel">Close</BaseButton>
        </div>
      </div>
    </div>
  </TransitionSlideFromRight>
</template>
