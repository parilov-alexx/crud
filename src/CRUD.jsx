import React from 'react';
import Title from './Title/title';
import NoteForm from './NoteForm/noteform';
import Note from './Notes/notes';
import link from './ServerLink/link';
import './App.css';

export default class CRUD extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      notes: [],
    };

    this.requestNotes = this.requestNotes.bind(this);
    this.handleNoteRemove = this.handleNoteRemove.bind(this);
    this.requestAddNote = this.requestAddNote.bind(this);
  }

  handleNoteRemove = async (noteId) => {
    const response = await fetch(`${link.notes}/${noteId}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    if (!data.success) return;

    this.requestNotes();
  }

  requestNotes = async () => {
    const response = await fetch(`${link.notes}`);
    const notes = await response.json();
    this.setState((prevState) => ({ ...prevState, notes }));
  }

  requestAddNote = async (content) => {
    const response = await fetch(`${link.notes}`, {
      method: 'POST',
      body: JSON.stringify({ content }),
    })

    const data = await response.json();
    if (!data.success) return;

    this.requestNotes();
  }

  componentDidMount() {
    this.requestNotes();
  }

  render() {
    return (
      <div className={'crud'}>
        <Title requestNotes={this.requestNotes} />

        <ul className={'crud__notes'}>
          {this.state.notes.map((note) =>
            <li className={'crud__note'} key={note.id}>
              <Note note={note} handleNoteRemove={this.handleNoteRemove} />
            </li>
          )}
        </ul>

        <NoteForm requestAddNote={this.requestAddNote} />
      </div>
    )
  }
}
