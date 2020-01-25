<template>
  <div>
    <p>My name is {{ name }}</p>
    <input type="text" v-model="name" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: 'My name'
    };
  }
};
</script>
