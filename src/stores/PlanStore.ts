import { makeAutoObservable } from "mobx";

class PlanStore {
  days = "";
  budget = "";
  planResult = "";

  constructor() {
    makeAutoObservable(this);
  }

  setDays = (value: string) => {
    this.days = value;
  };

  setBudget = (value: string) => {
    this.budget = value;
  };

  setPlanResult = (value: string) => {
    this.planResult = value;
  };
}

export const planStore = new PlanStore();
