import React from 'react';
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import InboxIcon from '@material-ui/icons/Inbox';
import { useState } from 'react'

type Todo = {
  checked: boolean
  value: string
}

export default function Test() {

  const [textValue, setTextValue] = useState("")
  const [notes, setNotes] = useState<Todo[]>([])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextValue(e.currentTarget.value)
  }
  const handleClick = () => {
    setNotes([...notes, { checked: false, value: textValue }])
  }
  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>, checkIndex: number) => {
    // const newNotes = notes.map((v, i) => ({ ...v, checked: true }))
    const newNotes: Todo[] = []
    for (let i = 0; i < notes.length; i++) {
      if (checkIndex === i) {
        newNotes.push({...notes[i], checked: ! notes[i].checked })
      } else {
        newNotes.push(notes[i])
      }
    }
    setNotes(newNotes)
    console.log(checkIndex)
  }
  // const handleIcon = (e: any) => {
  //   e.target.color = "primary"
  // }

  const checkBoxes = notes.map((obj, i) => {
    return (
      <ListItem button={false}>
        <ListItemIcon>
          <InboxIcon color="primary" />
        </ListItemIcon>
        <FormControlLabel control={<Checkbox name="checkedA" checked={obj.checked} onChange={(e) => handleCheckbox(e, i)} />} label={obj.value} disabled={false} />
      </ListItem>)
  })

  return (
    <Container maxWidth="sm">
      <FormGroup row={true}>
        <TextField id="outlined-basic" label="Outlined" variant="outlined" onChange={handleChange} value={textValue} />
        <Button variant="contained" color="secondary" onClick={handleClick}>
          Add Note
        </Button>
      </FormGroup>
      <List component="nav" aria-label="main mailbox folders">
        {checkBoxes}
      </List>
    </Container>
  );
}

