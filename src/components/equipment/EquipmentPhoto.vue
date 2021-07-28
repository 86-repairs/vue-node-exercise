<template>
  <img v-if="hasPhoto" :src="thumbnail" />
  <h2 class="missing__image" v-else>NO PHOTOS</h2>
</template>

<script>
export default {
  name: "Photo",
  props: ["equipmentPhotos"],
  computed: {
    hasPhoto() {
      return (
        this.equipmentPhotos &&
        this.equipmentPhotos.length > 0 &&
        this.equipmentPhotos[0].thumbnail_url.length > 0
      );
    },
    thumbnail() {
      return this.equipmentPhotos[0].thumbnail_url;
    },
  },
};
</script>

<style scoped>
.missing__image {
  width: 10rem;
  padding: 0px;
  margin-top: 3px;
}
</style>
