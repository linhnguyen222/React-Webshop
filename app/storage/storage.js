class Cart {
    constructor() {

    }
    get = () => {
        try {
            const items = JSON.parse(localStorage.getItem("cart"));
            return items ? items : [];
        } catch (e) {
            return [];
        }
    }
    add = (addedItem) => {
        const currentItemsInCart = this.get();
        const newID = addedItem.id;
        let alreadyExist = false;
        let newCart = currentItemsInCart.map((item) => {
            if (item.id === newID) {
                alreadyExist = true;
                const newItem = Object.assign({}, item, { amount: item.amount + addedItem.amount });
                return newItem;
            }
            return item;
        });
        if (!alreadyExist) {
            newCart = newCart.concat([addedItem]);
        }
        localStorage.setItem("cart", JSON.stringify(newCart));
    }
    delete = (id) => {
        const newCart = this.get("cart").filter((item) => item.id != id);
        localStorage.setItem("cart", JSON.stringify(newCart));
    }

    deleteAll = () => {
        localStorage.removeItem("cart");
    }

}

export default new Cart();
