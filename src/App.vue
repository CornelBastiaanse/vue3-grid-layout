<template>
  <GridLayout
      id="grid-layout"
      :margin="[0, 0]"
      :layout.sync="layout"
      :col-num="12"
      :row-height="30"
      :is-draggable="true"
      :is-resizable="true"
      :is-mirrored="false"
      :is-bounded="false"
      :prevent-collision="true"
      :vertical-compact="false"
      :restore-on-drag="true"
      :use-css-transforms="true"
      :responsive="true"
      :transformScale="1"
  >
    <GridItem 
        style="background: rgba(0, 0, 0, 50%)"
        v-for="item in layout"
        :key="item.i"
        :static="item.static"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
        :min-w="item.minW"
        :max-w="item.maxW"
        :min-x="item.minX"
        :max-x="item.maxX"
        :min-y="item.minY"
        :max-y="item.maxY"
        :preserve-aspect-ratio="item.preserveAspectRatio"
    >
      {{item.i}}
    </GridItem>
  </GridLayout>
</template>

<script setup lang="ts">
import GridLayout from "@/components/Grid/GridLayout.vue";
import GridItem from "@/components/Grid/GridItem.vue";

let layout = [
  {"x":0,"y":0,"w":2,"h":2,"i":"0", resizable: true, draggable: true, static: true, minY: 0, maxY: 2},
  {"x":2,"y":0,"w":2,"h":4,"i":"1", resizable: null, draggable: null, static: true},
  {"x":4,"y":0,"w":2,"h":5,"i":"2", resizable: false, draggable: false, static: true, minX: 4, maxX: 4, minW: 2, maxW: 2, preserveAspectRatio: true},
  {"x":6,"y":0,"w":2,"h":3,"i":"3", resizable: false, draggable: false, static: true, preserveAspectRatio: true},
  {"x":8,"y":0,"w":2,"h":3,"i":"4", resizable: false, draggable: false, static: true},
  {"x":10,"y":0,"w":2,"h":3,"i":"5", resizable: false, draggable: false, static: true},
  {"x":0,"y":5,"w":2,"h":5,"i":"6", resizable: false, draggable: false, static: false},
  {"x":2,"y":5,"w":2,"h":5,"i":"7", resizable: false, draggable: false, static: true},
  {"x":4,"y":5,"w":2,"h":5,"i":"8", resizable: false, draggable: false, static: true},
  {"x":6,"y":3,"w":2,"h":4,"i":"9", resizable: false, draggable: false, static: true},
  {"x":8,"y":4,"w":2,"h":4,"i":"10", resizable: false, draggable: false, static: true},
  {"x":10,"y":4,"w":2,"h":4,"i":"11", resizable: false, draggable: false, static: true, minY: 4},
  {"x":0,"y":10,"w":2,"h":5,"i":"12", resizable: false, draggable: false, static: true},
  {"x":2,"y":10,"w":2,"h":5,"i":"13", resizable: false, draggable: false, static: true},
  {"x":4,"y":8,"w":2,"h":4,"i":"14", resizable: false, draggable: false, static: true},
  {"x":6,"y":8,"w":2,"h":4,"i":"15", resizable: false, draggable: false, static: true},
  {"x":8,"y":10,"w":2,"h":5,"i":"16", resizable: false, draggable: false, static: true},
  {"x":10,"y":4,"w":2,"h":2,"i":"17", resizable: false, draggable: false, static: true},
  {"x":0,"y":9,"w":2,"h":3,"i":"18", resizable: false, draggable: false, static: true},
  {"x":2,"y":6,"w":2,"h":2,"i":"19", resizable: false, draggable: false, static: true}
];
</script>

<style scoped>

</style>
