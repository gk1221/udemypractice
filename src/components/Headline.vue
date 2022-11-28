<template>
  <section>
    <h1
      data-test="action-phrase"
     class="font-bold tracking-tighter text-8xl mb-14">
        <span :class="actionClasses">{{ action }}</span>
        <br />
        for everyone</h1>
    <h2 class="text-3xl font-light">Find you!</h2>
  </section>
</template>

<script>
import nextElementInList from "@/utils/nextElementInList"

export default {
  name: "Headline",
  data() {
    return {
      action: "Build",
      interval: null,
    };
  },

  computed:{
    actionClasses(){
        return {            
            [this.action.toLowerCase()]:true,
        }
    }
  },

  created() {
    
    this.changeTitle();

  },
  beforeUnmount(){
    clearInterval(this.interval) 
   
  },

  methods: {
    changeTitle() {
      this.interval = setInterval(() => {
        const actions = ["Build", "Create", "Design", "Code"];
        const nextValue = nextElementInList(actions, this.action)
        this.action = nextValue;
      }, 3000);
    },
  },
};
</script>

<style scoped>
.build{
    color:#1a73e8
}
.create{
    color:#34a853
}
.design{
    color:#f9ab00
}
.code{
    color:#d93025
}
</style>
