<template>
  <div class="index container">
    <div class="card" v-for="recipe in recipies" :key="recipe.id">
      <div class="card-content">
        <i class="material-icons delete" @click="deleteRecipies(recipe.id)">delete</i>
        <h2 class="indigo-text">{{recipe.title}}</h2>
        <ul class="ingredients">
          <li v-for="ing in recipe.ingredients" :key="ing.id">
            <span class="chip">{{ing}}</span>
          </li>
        </ul>
      </div>
      <span class="btn-floating btn-large halfway-fab pink">
        <router-link :to="{name:'EditRecipe',params:{recipe_slug:recipe.slug}}">
          <i class="material-icons edit">edit</i>
        </router-link>
      </span>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/init";
export default {
  name: "Index",
  data() {
    return {
      recipies: []
    };
  },
  methods: {
    deleteRecipies(id) {
      db.collection("recipies")
        .doc(id)
        .delete()
        .then(() => {
          this.recipies = this.recipies.filter(recipe => {
            return recipe.id != id;
          });
        });
    }
  },
  created() {
    db.collection("recipies")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          let item = doc.data();
          item.id = doc.id;
          this.recipies.push(item);
        });
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.index {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
  margin-top: 60px;
}
.index h2 {
  font-size: 1.8em;
  text-align: center;
  margin-top: 0;
}
.index .ingredients {
  margin: 30px auto;
}
.index .ingredients li {
  display: inline-block;
}
.index .delete {
  position: absolute;
  top: 4px;
  right: 4px;
  cursor: pointer;
  color: #aaa;
  font-size: 1.4em;
}
</style>
