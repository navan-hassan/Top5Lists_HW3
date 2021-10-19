import React, { useContext, useEffect } from 'react'
import { useHistory, Redirect } from 'react-router-dom'
import ListCard from './ListCard.js'
import { GlobalStoreContext } from '../store'
import DeleteModal from './DeleteModal'
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const ListSelector = () => {
    const { store } = useContext(GlobalStoreContext);
    store.history = useHistory();

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    function handleCreateList(){
        store.createNewList();
        
    }

    if(store.currentList){
        return <Redirect to={`top5List/${store.currentList._id}`}/>
    }

     
    

    let cardStatus = false;
    if (store.isListNameEditActive) {
        cardStatus = true;
    }

    let enabledButtonClass = "top5-button";
    if(cardStatus){
        enabledButtonClass = "top5-button-disabled";
    }

    

    let listCard = "";
    if (store) {
        listCard = store.idNamePairs.map((pair) => (
            <ListCard
                key={pair._id}
                idNamePair={pair}
                selected={false}
            />
        ))
    }
    return (
        <div id="top5-list-selector">
            <div id="list-selector-heading">
                <input
                    type="button"
                    id="add-list-button"
                    className={enabledButtonClass}
                    value="+"
                    disabled={cardStatus}
                    onClick={handleCreateList} 
                    />
                Your Lists
            </div>
            <div id="list-selector-list">
                {
                    listCard
                }
                <DeleteModal />
            </div>
        </div>)
}

export default ListSelector;