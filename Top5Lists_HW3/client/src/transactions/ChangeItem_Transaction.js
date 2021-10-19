import jsTPS_Transaction from "../common/jsTPS.js"

export default class ChangeItem_Transaction extends jsTPS_Transaction {
    constructor(initStore, initIndex, initOldName, initNewName) {
        super();
        this.store = initStore;
        this.index = initIndex;
        this.oldName = initOldName;
        this.newName = initNewName;
    }

    doTransaction() {
        this.store.changeItem(this.newName, this.index);
    }
    
    undoTransaction() {
        this.store.changeItem(this.oldName, this.index);
    }
}