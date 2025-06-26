import { makeAutoObservable, runInAction } from "mobx";
import { WishModel } from "../models/WishModel";
import AsyncStorage from "@react-native-async-storage/async-storage";

class WishStore {
  wishes: WishModel[] = [];

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
    this.loadWishes();
  }

  addWish(wish: WishModel) {
    this.wishes.push(wish);
    this.saveWishes();
  }

  setWishes(newOrder: WishModel[]) {
    this.wishes = newOrder;
    this.saveWishes();
  }

  deleteWish(id: string) {
    this.wishes = this.wishes.filter((wish) => wish.id !== id);
    this.saveWishes();
  }

  updateWish(updatedWish: WishModel) {
    const index = this.wishes.findIndex((w) => w.id === updatedWish.id);
    if (index !== -1) {
      this.wishes[index] = updatedWish;
      this.saveWishes();
    }
  }

  async saveWishes() {
    try {
      await AsyncStorage.setItem("wishes", JSON.stringify(this.wishes));
    } catch (error) {
      console.error("Failed to save wishes:", error);
    }
  }

  async loadWishes() {
    try {
      const data = await AsyncStorage.getItem("wishes");
      if (data) {
        const parsed: WishModel[] = JSON.parse(data);
        runInAction(() => {
          this.wishes = parsed;
        });
      }
    } catch (error) {
      console.error("Failed to load wishes:", error);
    }
  }
}

export const wishStore = new WishStore();
