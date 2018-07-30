import React from 'react'
import './App.css'

const Participant = (props) => {
    const participant = props.participant
    return (
        props.editModeOn === participant.id ?
            <tr className="EditableRow">
                <td><input name='editableName' value={props.editableName} onChange={props.handleDataChange} /></td>
                <td><input name='editableEmail' value={props.editableEmail} onChange={props.handleDataChange}/></td>
                <td><input name='editablePhone' value={props.editablePhone} onChange={props.handleDataChange}/></td>
                <td><button className="CancelEditButton" onClick={() => props.handleCancelEdit()} >Cancel</button>
                    <button className="SaveEditButton" onClick={() => props.handleSaveEdit()}>Save</button></td>
            </tr>
        :
            <tr className="Participant">
                <td className="ParticipantData">{participant.name}</td>
                <td className="ParticipantData">{participant.email}</td>
                <td className="ParticipantData">{participant.phone}</td>
                <td>
                    <button className="fa fa-pencil EditButton" onClick={() => props.handleEditData(participant.id)}/>
                    <button className="fa fa-trash TrashButton" onClick={() => props.handleDelete(participant.id)}/></td>
            </tr> 
    )
  }

  const ParticipantList = (props) => {
    return (
      <div className="ParticipantList">
      
        <div className="ParticipantListHeader">
            List of participants
        </div>
        
        <table id="participantTable" key="participantTable" className="ParticipantTable">
            <tbody>
            <AddNewForm handleDataChange={props.handleDataChange} 
                        fullname={props.fullname} phone={props.phone} email={props.email}
                        handleAddNew={props.handleAddNew}/>
            <tr className="TableHeaderRow">
                <th onClick={() => props.changeSortingRule('name')} >
                    Name {props.sortBy === 'name' ? (props.sortAscending ? <span>&darr;</span> : <span>&uarr;</span>) : ''}</th>
                <th onClick={() => props.changeSortingRule('email')} >
                    Email {props.sortBy === 'email' ? (props.sortAscending ? <span>&darr;</span> : <span>&uarr;</span>) : ''}</th>
                <th onClick={() => props.changeSortingRule('phone')} >
                    Phone {props.sortBy === 'phone' ? (props.sortAscending ? <span>&darr;</span> : <span>&uarr;</span>) : ''}</th>
                <th></th>
            </tr>
            {props.participants.map(participant => 
                <Participant participant={participant} key={participant.id} editModeOn={props.editModeOn}
                        handleDelete={props.handleDelete} handleEditData={props.handleEditData}
                        handleCancelEdit={props.handleCancelEdit} handleSaveEdit={props.handleSaveEdit}
                        handleDataChange={props.handleDataChange} editableName={props.editableName}
                        editableEmail={props.editableEmail} editablePhone={props.editablePhone}/>) }
            </tbody>
        </table>

      </div>
    )
  }

  const AddNewForm = (props) => {
    return (
      <tr id="addNewRow" key="addNewRow" className="AddNewForm">
      
        <td><input type="text" name="fullname" key="fullname" placeholder="Full name" value={props.fullname} onChange={props.handleDataChange} /> </td>
        <td><input type="email" name="email" key="email" placeholder="E-mail address" value={props.email} onChange={props.handleDataChange}/> </td>
        <td><input type="text" name="phone" key="phone" placeholder="Phone number" value={props.phone} onChange={props.handleDataChange}/></td>
        <td><button className='AddButton' onClick={props.handleAddNew} >Add new</button></td>
      
      </tr>
    )
  }

  const HeaderRow = (props) => {
    return (
      <div className="HeaderRow">
        
        <h1><div className="fa fa-square" ></div> Header goes here</h1>
      </div>
    )
  }

export {ParticipantList, HeaderRow}