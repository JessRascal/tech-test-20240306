<script setup lang="ts">
import NavLogo from '@/components/nav/NavLogo.vue';
import NavItem from '@/components/nav/NavItem.vue';
</script>

<template>
  <nav class="navbar">
    <NavLogo class="nav-logo" />
    <NavItem to="/" label="People" />
    <NavItem to="/settings" label="Settings" is-disabled />
  </nav>
</template>

<style lang="postcss" scoped>
/* note: using instead of Tailwind classes for demo purposes */
.navbar {
  width: 100dvw;
  padding: 1rem;
  display: flex;
  align-items: center;
  column-gap: 2rem;

  /* medium screens (md) */
  @media screen and (min-width: 768px) {
    padding-inline: 2rem;
  }

  .nav-logo {
    margin-right: 2rem;
  }
}
</style>
