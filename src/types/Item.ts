import User from "./User";

export default class Item {
    id: number;
    title: string;
    owner: User;

    constructor(id: number, title: string, owner: User) {
      this.id = id;
      this.title = title;
      this.owner = owner;
    }
}