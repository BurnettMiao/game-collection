// class User {
//   public email: string;
//   private name: string;
//   readonly city: string = 'Jaipur';
//   constructor(email: string, name: string) {
//     this.email = email;
//     this.name = name;
//   }
// }
class User {
    email;
    name;
    city = 'Jaipur';
    constructor(email, name) {
        this.email = email;
        this.name = name;
    }
}
const tom = new User('tom@mail.com', 'tom');
tom.name;
export {};
//# sourceMappingURL=index.js.map