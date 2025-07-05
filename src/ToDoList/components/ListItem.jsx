import { useEffect, useState } from 'react';
import styles from './ListItem.module.css'



function ListItem ({ data, changeData, deleteData}) {
    const [editState, setEditState] = useState(false);
    const [newData, setNewData] = useState(data);

    const handleClickEdit = () => {
        if (editState) {
            // Se stai salvando, chiama la funzione fornita dal parent
            changeData(newData.id, newData);
        }
        setEditState(!editState);
        console.log(newData)
    }


    const handleClickDelete = () => {
        deleteData(newData.id)
    }


    const handleTitleChange = ({ target }) => {
        setNewData(prev => ({
            ...prev,
            title: target.value,
            description: prev.description,
            creationDate: new Date(prev.creationDate),
            expirationDate: new Date(prev.expirationDate),
            id: prev.id
        }))
    }

    const handleDescriptionChange = ({ target }) => {
        setNewData(prev => ({
            ...prev,
            description: target.value,
            title: prev.title,
            creationDate: new Date(prev.creationDate),
            expirationDate: new Date(prev.expirationDate),
            id: prev.id
        }))
    }

    const handleCreationDateChange = ({ target }) => {
        setNewData(prev => ({
            ...prev,
            creationDate: new Date(target.value),
            title: prev.title,
            description: prev.description,
            expirationDate: new Date(prev.expirationDate),
            id: prev.id
        }))
    }

    const handleExpirationDateChange = ({ target }) => {
        setNewData(prev => ({
            ...prev,
            expirationDate: new Date(target.value),
            title: prev.title,
            description: prev.description,
            creationDate: new Date(prev.creationDate),
            id: prev.id
        }))
    }

    const isExpired = () => {
        const now = new Date();
        //console.log('Verifica scadenza →', newData.expirationDate, '<', now, '=', newData.expirationDate < now);
        return newData.expirationDate < now;
    };

    useEffect(() => {
        setNewData(data);
    }, [data]);

    return (
        <div className={styles.ListItem}>
            <header>
                { editState 
                    ? <input onChange={handleTitleChange} name='Title' value={newData?.title || ''} />
                    : <h1>{newData?.title || ''}</h1>
                }
            </header>
            <section>
                { editState
                    ? <textarea onChange={handleDescriptionChange} name='description' value={newData?.description || ''} />
                    : <p>{newData?.description || ''}</p>
                }
                <hr />
                <section>
                    {editState ? (
                        <>
                            <label>
                                Creazione:
                                <input
                                    type="date"
                                    onChange={handleCreationDateChange}
                                    value={newData?.creationDate ? newData.creationDate.toISOString().split('T')[0] : ''}
                                />
                            </label>
                            <label>
                                Scadenza:
                                <input
                                    type="date"
                                    onChange={handleExpirationDateChange}
                                    value={newData?.expirationDate ? newData.expirationDate.toISOString().split('T')[0] : ''}
                                />
                            </label>
                        </>
                    ) : (
                        <>
                            <p>{newData?.creationDate ? 'Creazione: ' + newData.creationDate.toLocaleDateString() : ''} </p>
                            <br /> 
                            <p>{newData?.expirationDate ? 'Scadenza: ' + newData.expirationDate.toLocaleDateString() : ''}</p>
                            <br />
                            <h3 className={isExpired() ? styles.expired : styles.notExpired}>{'Status: ' + (isExpired() ? 'Scaduto' : 'In scadenza')}</h3>
                        </>
                    )}
                </section>
            </section>
            <footer>
                <button onClick={handleClickEdit}>{editState ? 'Salva' : 'Modifica'}</button>
                <button onClick={handleClickDelete}>Elimina</button>
                <h6>Unique ID: {newData?.id || ''}</h6>
            </footer>
        </div>
    );
}

export default ListItem;