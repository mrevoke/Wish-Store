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
}

export const wishStore = new WishStore();

