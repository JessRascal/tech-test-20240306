<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    default: null,
  },
  id: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: 'search...',
  },
});

const emit = defineEmits(['update:modelValue']);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});
</script>

<template>
  <input
    :id="id"
    :name="id"
    v-model="value"
    type="search"
    :placeholder="placeholder"
    class="input-field"
  />
</template>
