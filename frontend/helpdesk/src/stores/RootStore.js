import { makeAutoObservable, action, computed } from "mobx";
import { TicketsStore } from "./TicketsStore";

export class RootStore {
  authStore;

  constructor(authStore) {
    this.authStore = authStore;
    this.ticketsStore = new TicketsStore(this);

    makeAutoObservable(this);
  }

  resetRootStore = () => {
    this.ticketsStore = new TicketsStore(this);
  };
}

export default RootStore;
