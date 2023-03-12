import { useEffect, useState } from 'react';
import './App.css';


function App() {
  const [name, setName] = useState('Started');
  const [listName, setlistName] = useState('Started');
  const [note, setNote] = useState('');
  const [list, setList] = useState(localStorage.getItem(listName) ? JSON.parse(localStorage.getItem(listName)) : []);

  const addTODO = (note) => {
    if (!note) return alert('write TODO');
    const newNote = {
      id: Date.now(),
      note: note,
      done: false,
    };
    setList([...list, newNote]);
    setNote('');
  };

  useEffect(() => {
    setList(localStorage.getItem(listName) ? JSON.parse(localStorage.getItem(listName)) : []);
  }, [listName]);

  useEffect(() => {
    localStorage.setItem(listName, JSON.stringify(list));
  }, [list, listName]);

  const deleteNote = (id) => {
    setList(list.filter((note) => note.id !== id))
  };

  const handleDone = (id) => {
    setList(list.map((note) => {
      if (note.id === id) {
        note.done = !note.done;
      }
      return note;
    }))
  }

  const showAll = () => {
    const elements = document.body.getElementsByTagName('li');
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.remove('hide');
    }
  }
  const showActive = () => {
    const elements = document.body.getElementsByTagName('li');
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.contains('comlite') ?
        elements[i].classList.add('hide') :
        elements[i].classList.remove('hide');
    }
  }
  const showDone = () => {
    const elements = document.body.getElementsByTagName('li');
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.contains('comlite') ?
        elements[i].classList.remove('hide') :
        elements[i].classList.add('hide');
    }

  }

  return (
    <div className='app'>
      <h1>TODO <strong></strong>{listName} list!</h1>
      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder='Name...'
        onBlur={() => setlistName(name)}
      />
      <button>Select</button>
      <br></br>
      <input
        type='text'
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder='Write TODO...'
      />
      <button
        onClick={() => addTODO(note)}
      >Add</button>

      <ul>
        {list.map((note) => {
          return <li key={note.id} className={note.done ? 'comlite' : ''} >
            <button className='clear-button' onClick={() => deleteNote(note.id)}>&times;</button>
            <input className={note.done ? 'done' : ''} readOnly type="text" value={note.note}></input>
            <button onClick={() => handleDone(note.id)}>Done</button>
          </li>
        })}
      </ul>
      <label>{list.length} TODOS </label>
      <button onClick={showAll} >All</button>
      <button onClick={showActive}>Active</button>
      <button onClick={showDone}>Done</button>
    </div >
  );
}

export default App;
