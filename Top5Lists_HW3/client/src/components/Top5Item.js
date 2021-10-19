import { React, useContext, useState } from "react";
import { GlobalStoreContext } from '../store'
/*
    This React component represents a single item in our
    Top 5 List, which can be edited or moved around.
    
    @author McKilla Gorilla
*/
function Top5Item(props) {
    const { store } = useContext(GlobalStoreContext);
    const [draggedTo, setDraggedTo] = useState(0);
    const [ editActive, setEditActive ] = useState(false);

    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit();
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsListItemEditActive();
        }
        console.log(newActive);
        setEditActive(newActive);
    }

    function handleDragStart(event) {
        event.dataTransfer.setData("item", event.target.id);
    }

    function handleDragOver(event) {
        event.preventDefault();
    }

    function handleDragEnter(event) {
        event.preventDefault();
        setDraggedTo(true);
    }

    function handleDragLeave(event) {
        event.preventDefault();
        setDraggedTo(false);
    }

    function handleDrop(event) {
        event.preventDefault();
        let target = event.target;
        let targetId = target.id;
        targetId = targetId.substring(target.id.indexOf("-") + 1);
        let sourceId = event.dataTransfer.getData("item");
        sourceId = sourceId.substring(sourceId.indexOf("-") + 1);
        setDraggedTo(false);

        // UPDATE THE LIST
        store.addMoveItemTransaction(sourceId, targetId);
    }

    
    let { index } = props;
    let itemClass = "top5-item";
    if (draggedTo) {
        itemClass = "top5-item-dragged-to";
    }

    let cardStatus = false;
    if (store.isItemEditActive) {
        cardStatus = true;
    }


    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let oldName = props.text;
            let newName = event.target.value;
            console.log("Old: " + props.text);
            store.addChangeItemTransaction(oldName, newName, index);
            toggleEdit();
        }
    }

    if(editActive){
        return (
            <input
                id={'item-' + (index + 1)}
                className='list-card'
                type='text'
                onKeyPress={handleKeyPress}
                defaultValue={props.text}
            />
        )
    }
    else{
        return (
            <div
                id={'item-' + (index + 1)}
                className={itemClass}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                draggable={!cardStatus}
            >
                <input
                    type="button"
                    id={"edit-item-" + index + 1}
                    className="list-card-button"
                    onClick={handleToggleEdit}
                   
                    disabled={cardStatus}
                    value={"\u270E"}
                />
                {props.text}
            </div>)
    }
}

export default Top5Item;