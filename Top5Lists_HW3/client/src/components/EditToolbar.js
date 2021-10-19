import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { useHistory } from 'react-router-dom'
/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function EditToolbar() {
    const { store } = useContext(GlobalStoreContext);
    const history = useHistory();
    let editStatus =  ((store.isListNameEditActive) || (store.isItemEditActive));
    //let enabledButtonClass = "top5-button";

    let undoButtonClass = "top5-button";
    let redoButtonClass = "top5-button";
    let closeButtonClass = "top5-button";

    if(!store.undoAvailable()){
        undoButtonClass = "top5-button-disabled";
    }
    if(!store.redoAvailable()){
        redoButtonClass = "top5-button-disabled";
    }
    if(!store.currentList){
        closeButtonClass = "top5-button-disabled";
    }
    if(editStatus){
        undoButtonClass = "top5-button-disabled";
        redoButtonClass = "top5-button-disabled";
        closeButtonClass = "top5-button-disabled";

    }
    function handleUndo() {
        if(!editStatus)
            store.undo();
    }
    function handleRedo() {
        if(!editStatus)
            store.redo();
    }
    function handleClose() {
        if (!editStatus){
            history.push("/");
            store.clearTransactionStack();
            store.closeCurrentList();
        }
    }
    
    
    return (
        <div id="edit-toolbar">
            <div
                id='undo-button'
                onClick={handleUndo}
                className={undoButtonClass}>
                &#x21B6;
            </div>
            <div
                id='redo-button'
                onClick={handleRedo}
                className={redoButtonClass}>
                &#x21B7;
            </div>
            <div
                id='close-button'
                onClick={handleClose}
                className={closeButtonClass}>
                &#x24E7;
            </div>
        </div>
    )
}

export default EditToolbar;