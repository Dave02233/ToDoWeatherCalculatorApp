import { useEffect, useState } from 'react';
import styles from './ListItem.module.css'

[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[PROBLEMONE CON LA CLASSE, ELIMINARE GLI ELEMENTI __]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]



function ListItem ({ data, changeData}) {
    const [editState, setEditState] = useState(false);
    const [newData, setNewData] = useState(data);

    const handleClickEdit = () => {
        if (editState) {
            // Se stai salvando, chiama la funzione fornita dal parent
            changeData(newData.id, newData);
        }
        setEditState(!editState);
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

    useEffect(() => {
        setNewData(data);
    }, [data]);

    return (
        <div>
            <header>
                { editState 
                    ? <input onChange={handleTitleChange} value={newData?.title || ''} />
                    : <h1>{newData?.title || ''}</h1>
                }
            </header>
            <section>
                { editState
                    ? <textarea onChange={handleDescriptionChange} value={newData?.description || ''} />
                    : <p>{newData?.description || ''}</p>
                }
                <section>
                    <h3>Date</h3>
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
                        <p>{newData?.creationDate ? newData.creationDate.toLocaleDateString() : ''} - {newData?.expirationDate ? newData.expirationDate.toLocaleDateString() : ''}</p>
                    )}
                </section>
            </section>
            <footer>
                <button onClick={handleClickEdit}>{editState ? 'Salva' : 'Modifica'}</button>
                <h6>Unique ID: {newData?.id || ''}</h6>
            </footer>
        </div>
    );
}

export default ListItem;