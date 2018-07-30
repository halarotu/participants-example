import React, { Component } from 'react'
import {HeaderRow, ParticipantList} from './Components'
import './App.css'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      participants: [
        {id: 1, name: "Aapeli", email: "aa@mail.fi", phone: "040111111"},
        {id: 2, name: "Bertta", email: "bee@mail.fi", phone: "040222222"},
        {id: 3, name: "Charlie", email: "cee@mail.fi", phone: "040333333"},
        {id: 4, name: "Daavid", email: "dee@mail.fi", phone: "040444444"},
        {id: 5, name: "Einari", email: "ee@mail.fi", phone: "040555555"},
        {id: 6, name: "Fidel", email: "äf@mail.fi", phone: "040666666"},
        {id: 7, name: "Gabriel", email: "gee@mail.fi", phone: "040777777"},
        {id: 8, name: "Hannu", email: "hoo@mail.fi", phone: "040888888"},
        {id: 9, name: "Iivari", email: "ii@mail.fi", phone: "040999999"},
        {id: 10, name: "Jalmari", email: "jii@mail.fi", phone: "040101010"},
        {id: 11, name: "Katri", email: "koo@mail.fi", phone: "042111111"},
        {id: 12, name: "Laura", email: "äl@mail.fi", phone: "042222222"},
        {id: 13, name: "Matti", email: "äm@mail.fi", phone: "042333333"},
        {id: 14, name: "Niilo", email: "än@mail.fi", phone: "042444444"},
        {id: 15, name: "Olli", email: "oo@mail.fi", phone: "042555555"},
        {id: 16, name: "Pauliina", email: "pee@mail.fi", phone: "042666666"},
        {id: 17, name: "Q", email: "kuu@mail.fi", phone: "042777777"},
        {id: 18, name: "Ripe", email: "är@mail.fi", phone: "042888888"},
        {id: 19, name: "Sanna", email: "äs@mail.fi", phone: "042999999"},
        {id: 20, name: "Tuukka", email: "tee@mail.fi", phone: "042101010"}
      ],
      editModeOn: -1,
      fullname: "",
      phone: "",
      email: "",
      editableName: '',
      editablePhone: '',
      editableEmail: '',
      nextId: 21,
      sortBy: 'name',
      sortAscending: true
    }
    
  }

  componentWillMount() {
  }

  sort = (sortBy, sortAscending) => {
    let part = this.state.participants.concat()
    part.sort((p, o) => p[sortBy] > o[sortBy] ? 1 : -1)
    if (!sortAscending) {
      part.reverse()
    }
    return part
  }

  changeSortingRule = (clicked) => {
    let sortAscending = this.state.sortAscending
    if (clicked === this.state.sortBy) {
      sortAscending = sortAscending ? false : true
    }
    const participants = this.sort(clicked, sortAscending)
    this.setState({participants: participants, sortAscending, sortBy: clicked})
  }

  handleDataChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }
  
  handleAddNew = () => {
    if (this.validateData()) {
      const newParticipant = {id: this.state.nextId, name: this.state.fullname, phone: this.state.phone, email: this.state.email}
      const nextId = this.state.nextId + 1 
      const participants = this.state.participants.concat(newParticipant)
      this.setState({participants: participants, fullname: '', phone: '', email: '', nextId: nextId})
    }
  }

  validateData = () => {
    if (!Number.isInteger(Number.parseInt(this.state.phone, 10)) || this.state.phone.length < 5) {
      this.setState({phone: 'Not Valid!'})
      return false
    }
    const email = /\S+@\S+\.\S+/
    if (!email.test(this.state.email)) {
      this.setState({email: 'Not Valid!'})
      return false
    }
    if (this.state.fullname.length < 4) {
      this.setState({fullname: 'Not Valid!'})
      return false
    }

    return true
  }

  handleDelete = (id) => {
    const newParticipantList = this.state.participants.filter(p => p.id !== id)
    this.setState({participants: newParticipantList})
  }

  handleEditData = (id) => {
    const person = this.state.participants.find(p => p.id === id)
    this.setState({editModeOn: id, editableName: person.name, editableEmail: person.email, editablePhone: person.phone})
  }

  handleCancelEdit = () => {
    this.setState({editModeOn: -1, editableName: '', editableEmail: '', editablePhone: ''})
  }

  handleSaveEdit = () => {
    if (this.validateEditedData()) {
      const newParticipantList = this.state.participants.filter(p => p.id !== this.state.editModeOn)
      const editedParticipant = {id: this.state.editModeOn, name: this.state.editableName, 
          phone: this.state.editablePhone, email: this.state.editableEmail}
      this.setState({participants: newParticipantList.concat(editedParticipant), 
        editModeOn: -1, editableName: '', editableEmail: '', editablePhone: ''})
    }
  }

  validateEditedData = () => {
    if (!Number.isInteger(Number.parseInt(this.state.editablePhone, 10)) || this.state.editablePhone.length < 5) {
      this.setState({editablePhone: 'Not Valid!'})
      return false
    }
    const email = /\S+@\S+\.\S+/
    if (!email.test(this.state.editableEmail)) {
      this.setState({editableEmail: 'Not Valid!'})
      return false
    }
    if (this.state.editableName.length < 4) {
      this.setState({editableName: 'Not Valid!'})
      return false
    }
    return true
  }

  render() {

    return (
      <div className="App">
        <HeaderRow />
        <ParticipantList  participants={this.state.participants} 
                          fullname={this.state.fullname}
                          email={this.state.email}
                          phone={this.state.phone}
                          editableName={this.state.editableName}
                          editableEmail={this.state.editableEmail}
                          editablePhone={this.state.editablePhone}
                          handleDataChange={this.handleDataChange}
                          handleAddNew={this.handleAddNew} 
                          changeSortingRule={this.changeSortingRule}
                          sortBy={this.state.sortBy}
                          sortAscending={this.state.sortAscending}
                          handleDelete={this.handleDelete}
                          handleEditData={this.handleEditData}
                          editModeOn={this.state.editModeOn}
                          handleCancelEdit={this.handleCancelEdit}
                          handleSaveEdit={this.handleSaveEdit}/>
      </div>
    )
  }
}

export default App
