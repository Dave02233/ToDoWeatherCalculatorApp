import { useState } from 'react';
import ListItem from './components/ListItem'
import styles from './ToDoList.module.css';

[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[PROBLEMONE CON LA CLASSE, ELIMINARE GLI ELEMENTI __]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]

class toDoListItem {
    
    constructor(title = 'Titolo', description = 'Descrizione', creationDate = new Date(), expirationDate, priority = 'Bassa') {
        this._title = title;
        this._description = description;
        this._creationDate = creationDate;
        const expDate = new Date(creationDate);
        expDate.setDate(expDate.getDate() + 7);
        this._expirationDate = expDate;
        this._priority = priority;
        this._id = generateRandomID();
    }

    //Setter & Getters

    // Title
    set title(newTitle) {
        if (typeof newTitle !== 'string') {
            throw new TypeError('title deve essere una stringa');
        }
        this._title = newTitle;
    }
    get title() {
        return this._title;
    }

    // Description
    set description(newDescription) {
        if (typeof newDescription !== 'string') {
            throw new TypeError('description deve essere una stringa');
        }
        this._description = newDescription;
    }
    get description() {
        return this._description;
    }

    // CreationDate
    set creationDate(newCreationDate) {
        if (!(newCreationDate instanceof Date)) {
            throw new TypeError('creationDate deve essere un oggetto Date');
        }
        this._creationDate = newCreationDate;
    }
    get creationDate() {
        return this._creationDate;
    }

    // ExpirationDate
    set expirationDate(newExpirationDate) {
        if (!(newExpirationDate instanceof Date)) {
            throw new TypeError('expirationDate deve essere un oggetto Date');
        }
        this._expirationDate = newExpirationDate;
    }
    get expirationDate() {
        return this._expirationDate;
    }

    // Priority
    set priority(newPriority) {
        if (typeof newPriority !== 'string') {
            throw new TypeError('priority deve essere una stringa');
        }
        this._priority = newPriority;
    }
    get priority() {
        return this._priority;
    }

    // Unique ID

    get id() {
        return this._id;
    }

    //

    // Methods

    isExpired() {
        const now = new Date();
        return this._expirationDate < now;
    }

}

const alphabetAndNumbers = [
  'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
  'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
  '0','1','2','3','4','5','6','7','8','9'
];

const generatedIDs = []

function generateRandomID() {

    let newID = '';
    for (let i = 0; i < 10; i++) {
        newID += alphabetAndNumbers[Math.floor(Math.random() * alphabetAndNumbers.length)];
    }

    if (generatedIDs.includes(newID)) {
        return generateRandomID();
    } else {
        generatedIDs.push(newID);
        return newID;
    }
}


function ToDoList (props) {

  const [toDoListItems, setToDoListItems] = useState([]);

  // Aggiunta di un elemento To Do
  const handleClickAddToDo = () => {
    setToDoListItems((prevToDoListItems) => [
    new toDoListItem,
      ...prevToDoListItems
    ]);
  }


  // Modifica di un elemento tramite ID
  const changeData = (id, newData) => {
    setToDoListItems((prevToDoListItems) =>
      prevToDoListItems.map((item) =>
        item.id === id  
            ?{ ...item, ...newData, _id: id } // mantenere id originale
            : item
      )
    );
  } 


  return (
    <>
        <button onClick={handleClickAddToDo}>Aggiungi un evento</button>
        <div>
            {
                toDoListItems.length > 0
                ? toDoListItems.map((listItem) => <ListItem key={listItem.id} data={listItem} changeData={changeData}/> )
                : <p>Nessun evento in programma</p>
            }
        </div>
    </>
    )

}

export default ToDoList ;