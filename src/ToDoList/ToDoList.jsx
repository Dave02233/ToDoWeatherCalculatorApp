import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import ListItem from './components/ListItem'
import styles from './ToDoList.module.css';


class toDoListItem {
    
    constructor(title = 'Titolo', description = 'Descrizione', creationDate = new Date(), expirationDate, priority = 'Bassa') {
        this.title = title;
        this.description = description;
        this.creationDate = creationDate;
        const expDate = new Date(creationDate);
        expDate.setDate(expDate.getDate() + 7);
        this.expirationDate = expDate;
        this.priority = priority;
        this.id = generateRandomID();
    }

    //Getters


    // Methods

    isExpired() {
      const now = new Date();
      return this.expirationDate < now;
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
            ?{ ...item, ...newData } // mantenere id originale per Dio
            : item
      )
    );
  } 

  
  // Elimina un elemento tramite ID
    const deleteData = (id) => {
        setToDoListItems(prevToDoListItems => 
            prevToDoListItems.filter(utente => utente.id !== id)
        )
    } 


  return (
    <>
      <Outlet context={{toDoListItems}}/>
      <div className={styles.buttonContainer}>
          <button className={styles.addToDoItem} onClick={handleClickAddToDo}>Aggiungi un evento</button>
      </div>
      <div className={styles.ToDoList}>
          {
              toDoListItems.length > 0
              ? toDoListItems.map((listItem) => <ListItem key={listItem.id} data={listItem} changeData={changeData} deleteData={deleteData} /> )
              : <p>Nessun evento in programma</p>
          }
      </div>
    </>
    )

}

export default ToDoList ;