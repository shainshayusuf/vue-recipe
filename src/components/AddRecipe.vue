<template>
  <div class="add-recipe container">
    <h2 class="center-align indio-text">Add new Recipe</h2>
    <form @submit.prevent="AddRecipe">
      <div class="field title">
        <label for="title">Recipe title</label>
        <input type="text" name="title" v-model="title" />
      </div>
      <div v-for="(ing,index) in ingredients" :key="index" class="field">
        <label for="ingredient">Ingredient</label>

        <input type="text" name="ingredient" v-model="ingredients[index]" />
        <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
      </div>
      <div class="field add-ingredient">
        <label for="add-ingredient">Add ingredients</label>
        <input type="text" name="add-ingredient" @keydown.tab.prevent="addIng" v-model="add" />
      </div>
      <div class="field center-align">
        <p v-if="feedback" class="red-text">{{feedback}}</p>
        <button class="btn pink">Add Recipe</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from "@/firebase/init";
import slugify from "slugify";
export default {
  name: "AddRecipe",
  data() {
    return {
      title: null,
      add: null,
      ingredients: [],
      feedback: null,
      slu: null
    };
  },
  methods: {
    AddRecipe() {
      if (this.title) {
        this.feedback = null;
        //create a slug
        this.slug = slugify(this.title, {
          replacement: "-",
          remove: /[$_`*+~.()'"!:@]/g,
          lower: true
        });
        //console.log(this.slug)
        db.collection("recipies")
          .add({
            title: this.title,
            ingredients: this.ingredients,
            slug: this.slug
          })
          .then(() => {
            this.$router.push({ name: "Index" });
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.feedback = "You must enter a smoothie";
      }
    },
    addIng() {
      if (this.add) {
        this.ingredients.push(this.add);
        this.add = null;
        this.feedback = null;
      } else {
        this.feedback = "You have to enter any value to add ingredient";
      }
    },
    deleteIng(ing) {
      this.ingredients = this.ingredients.filter(ingredient => {
        return ingredient != ing;
      });
    }
  }
};
</script>


<style scoped>
.add-recipe {
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}
.add-recipe h2 {
  font-size: 2em;
  margin: 20px auto;
}
.add-recipe .field {
  margin: 20px auto;
  position: relative;
}
.add-recipe .delete {
  position: absolute;
  right: 0;
  bottom: 16px;
  color: #aaa;
  font-size: 1.4em;
  cursor: pointer;
}
</style>