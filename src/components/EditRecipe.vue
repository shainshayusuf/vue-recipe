<template>
  <div v-if="recipe" class="edit-recipe container">
    <h2>Edit a recipe {{recipe.title}}</h2>
    <form @submit.prevent="EditRecipe">
      <div class="field title">
        <label for="title">Recipe title</label>
        <input type="text" name="title" v-model="recipe.title" />
      </div>
      <div v-for="(ing,index) in recipe.ingredients" :key="index" class="field">
        <label for="ingredient">Ingredient</label>

        <input type="text" name="ingredient" v-model="recipe.ingredients[index]" />
        <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
      </div>
      <div class="field add-ingredient">
        <label for="add-ingredient">Add ingredients</label>
        <input type="text" name="add-ingredient" @keydown.tab.prevent="addIng" v-model="add" />
      </div>
      <div class="field center-align">
        <p v-if="feedback" class="red-text">{{feedback}}</p>
        <button class="btn pink">Update Recipe</button>
      </div>
    </form>
  </div>
</template>


<script>
import db from "@/firebase/init";
import slugify from 'slugify';
export default {
  name: "EditRecipe",
  data() {
    return {
      recipe: null,
      add: null,
      feedback: null
    };
  },
  methods: {
    EditRecipe() {
      if (this.recipe.title) {
        this.feedback = null;
        //create a slug
        this.recipe.slug = slugify(this.recipe.title, {
          replacement: "-",
          remove: /[$_`*+~.()'"!:@]/g,
          lower: true
        });
        //console.log(this.slug)
        db.collection("recipies").doc(this.recipe.id)
          .update({
            title: this.recipe.title,
            ingredients: this.recipe.ingredients,
            slug: this.recipe.slug
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
        this.recipe.ingredients.push(this.add);
        this.add = null;
        this.feedback = null;
      } else {
        this.feedback = "You have to enter any value to add ingredient";
      }
    },
    deleteIng(ing) {
      this.recipe.ingredients = this.recipe.ingredients.filter(ingredient => {
        return ingredient != ing;
      });
    }
  },
  created() {
    let ref = db
      .collection("recipies")
      .where("slug", "==", this.$route.params.recipe_slug);
    ref.get().then(snapshot => {
      snapshot.forEach(doc => {
        this.recipe = doc.data();
        this.recipe.id = doc.id;
      });
    });
  }
};
</script>

<style scoped>
.edit-recipe {
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}
.edit-recipe h2 {
  font-size: 2em;
  margin: 20px auto;
}
.edit-recipe .field {
  margin: 20px auto;
  position: relative;
}
.edit-recipe .delete {
  position: absolute;
  right: 0;
  bottom: 16px;
  color: #aaa;
  font-size: 1.4em;
  cursor: pointer;
}
</style>