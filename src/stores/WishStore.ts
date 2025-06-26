import { makeAutoObservable } from "mobx";
import { WishModel } from "../models/WishModel";
import AsyncStorage from "@react-native-async-storage/async-storage";

class WishStore {
  wishes: WishModel[] = [];

  constructor() {
    makeAutoObservable(this);
    this.loadWishes();
  }

  addWish = (wish: WishModel) => {
    this.wishes.push(wish);
    this.saveWishes();
    this.loadWishes();
  };

setWishes(newOrder: WishModel[]) {
    this.wishes = newOrder;
  }

  removeWish = (id: string) => {
    this.wishes = this.wishes.filter(w => w.id !== id);
    this.saveWishes();
  };

  async saveWishes() {
    await AsyncStorage.setItem("wishes", JSON.stringify(this.wishes));
  }

  async loadWishes() {
    const data = await AsyncStorage.getItem("wishes");
    if (data) this.wishes = JSON.parse(data);
  }

  deleteWish(id: string) {
  this.wishes = this.wishes.filter((wish) => wish.id !== id);
}
updateWish(updatedWish: WishModel) {
  const index = this.wishes.findIndex(w => w.id === updatedWish.id);
  if (index !== -1) {
    this.wishes[index] = updatedWish;
  }
}

}

export const wishStore = new WishStore();

