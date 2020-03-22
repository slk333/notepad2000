import React from 'react'

export default function Notepad() {

  const data = {
    "untitled note" : {
      title:"untitled note",
      content:``
      }
   
  }
  if (localStorage.getItem("notes") === null){
    localStorage.setItem("notes",JSON.stringify(data))
  }
  let [notesDictionary,setNotesDictionary] = React.useState(JSON.parse(localStorage.getItem("notes")) )

  
  
let notesArray = Object.values(notesDictionary)

  
  let notesJSX = notesArray.map((note)=>(
    <>
  <h2 onClick={function(){
  setCurrentNoteTitle(note.title)
  setText(notesDictionary[note.title].content)
  console.log(note.title)
  console.log(currentNoteTitle)
  }} >{note.title}</h2>

 
  </>
  )
  )
  







  /* define the state*/
  let [currentNoteTitle, setCurrentNoteTitle] = React.useState("")
  console.log(currentNoteTitle)




  
function save() {
 
setNotesDictionary(
  function(prevState){
    let updatedNote = {"title":currentNoteTitle,content:text}
    let newDictionary = Object.assign({}, prevState); 
    newDictionary[currentNoteTitle] = updatedNote
    console.log(newDictionary)
    localStorage.setItem("notes",JSON.stringify(newDictionary))
    return newDictionary
  }
)
}

  function create(){
    
    let note = {
      title: (new Date()).toLocaleString(),
      content:``
      }
  setNotesDictionary(function(prevState){
    let newDictionary = Object.assign({}, prevState); 
    newDictionary[note.title] = note
    return newDictionary
  })
  setCurrentNoteTitle(note.title)
  setText('')
  save()
  }

  /* update state after event */
  function update(event) {
     setText(event.target.value)
  }
  function remove(){
    if (Object.values(notesDictionary).length === 1){
     alert("forbidden: at least one note must exist")
      return}

    setNotesDictionary(function(prevState){
      let newDictionary = Object.assign({}, prevState); 
       delete newDictionary[currentNoteTitle]

       console.log(newDictionary)
      localStorage.setItem("notes",JSON.stringify(newDictionary))
   
   
      return newDictionary
    })
    setCurrentNoteTitle("")
    setText("")
  
  }

 let [text,setText]=React.useState(notesDictionary[currentNoteTitle] ? notesDictionary[currentNoteTitle].content : "")

 function editTitle(){
   
   let newTitle = prompt("Select a new name")
   
   if (newTitle === null) {return}
   setNotesDictionary(
    function(prevState){
      console.log(newTitle)
     
  
      let newDictionary = Object.assign({}, prevState); 
      let newNote = {"title":newTitle,content:newDictionary[currentNoteTitle].text}
      newDictionary[newTitle] = newNote
      delete newDictionary[currentNoteTitle]
      localStorage.setItem("notes",JSON.stringify(newDictionary))
      setCurrentNoteTitle(newTitle)
      return newDictionary
   
    }
  )

 

 }




  return (
    <>
     {(currentNoteTitle === "") ? (<div></div>) : (
     <>
     <h2 className="current">{currentNoteTitle}</h2>
 
      <textarea value={text} onChange={update}></textarea>
      <button onClick={save}>SAVE</button>
      <button onClick={create}>NEW</button>
      <button onClick={remove}>DELETE</button>
      <button onClick={editTitle}>EDIT TITLE</button>
      </>)

      }

      {notesJSX}
    </>
  )


}

// define what is a note






