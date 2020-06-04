import IIngredient from "./IIngredient.ts";

export default interface IDish {
  dish_id: Int32Array,
  title: string,
  description: string,
  thumbnail: string,
  ingredients: Array<IIngredient>,
  prepare: string,
  doing: string,
  eating: string
}

