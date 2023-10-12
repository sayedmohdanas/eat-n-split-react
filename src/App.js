import React, { useState } from 'react';

import './App.css';


const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];


export default function App() {
  const [friends, setFriends] = useState(initialFriends)
  const [selectFriend, setSelectFriend] = useState(null)

  const [isOpen, setIsOpen] = useState(false)
 console.log(selectFriend)

  function handleClick() {
    setIsOpen((open) => !open)
  }

  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend])
    setIsOpen(false)
  }

  function handleSelect (friend){
  //  setSelectFriend(friend)
  setSelectFriend((cur)=>(cur?.id === friend.id? null:friend))
  setIsOpen(false)
  }

  function handleSplit(value){
    setFriends((friend)=>friend.map(friend=>friend.id===selectFriend.id? {...friend,balance:friend.balance+value}:friend))

  }
  return (
    <div className='app'>
      <div className='sidebar'>
        <FriendsList friends={friends} selectFriend={selectFriend} onSelect={handleSelect}  />
        {isOpen && <Form onAddFriend={handleAddFriend} />}
        <Button onClick={handleClick}>{!isOpen ? "Add Friend" : "close"}</Button>
      </div>
      {selectFriend && <FormSplitBill  selectFriend={selectFriend}  onsplit={handleSplit}/>}
    </div>

  )
}
function Button({ children, onClick }) {

  return <button className='button' onClick={onClick}>{children}</button>
}

function FriendsList({ friends,onSelect ,selectFriend }) {
  return (

    <ul>
      {friends.map((friend) => (
        <Friends friend={friend} key={friend.id} onSelect={onSelect}  selectFriend={selectFriend}/>
      ))}
    </ul>
  )
}

function Friends({ friend, onSelect ,selectFriend }) {
  const isSelected=selectFriend?.id===friend.id
  return (
    <li className={isSelected ? "selected":""}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && <p className='red'>You owe {friend.name} {Math.abs(friend.balance)} $</p>}
      {friend.balance > 0 && <p className='green'>  {friend.name} owes You {Math.abs(friend.balance)} $</p>}
      {friend.balance === 0 && <p >You and  {friend.name} are even</p>}
      <Button onClick={()=>onSelect(friend)}>{ isSelected?"close":"select"}</Button>

    </li>
  )
}
function Form({ onAddFriend }) {
  const [name, setName] = useState("")
  const [image, setImage] = useState("https://i.pravatar.cc/48")
  function handleSubmit(e) {
    e.preventDefault()
    if (!name || !image) {
      return alert("Please fill Friend Details")

    }
    const id = crypto.randomUUID()
    const newFriend = {

      name,
      image: `${image}?=${id}`,
      balance: 0,
      id,
    }
    onAddFriend(newFriend)
    setName('')
    setImage('https://i.pravatar.cc/48')
  }

  return (
    <form className='form-add-friend' onSubmit={handleSubmit}>
      <label>🧑‍🤝‍🧑Friendname</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <label>🌇Image url</label>
      <input type="text" value={image} onChange={(e) => setImage(e.target.value)} />
      <Button>Add</Button>
    </form>

  )
}
function FormSplitBill({selectFriend ,onsplit}) {
const [bill,setbill]=useState("")
const [payByUser,setPayByUser ]=useState("")
const [whoWillPay,setWhoWillPay ]=useState("user")
const friendPay=bill ? bill-payByUser:''

function handleSubmit(e){
  e.preventDefault()
  if(!bill || !payByUser) return
  
  onsplit(whoWillPay==='user'? friendPay:-payByUser)
}



  return (
    <form className='form-split-bill ' onSubmit={handleSubmit}>
      <h2>Split A Bill With {selectFriend.name}</h2>
      <label>💰 Bill Value </label>
      <input type='text' value={bill} onChange={ (e)=>setbill(Number(e.target.value))} />
      <label>👨‍🦱 Your expense </label>
      <input type='text'  value={payByUser} onChange={ (e)=>setPayByUser(Number(e.target.value)>bill?payByUser:Number(e.target.value))}/>
      <label>🦹‍♂️ {selectFriend.name} expense </label>
      <input type='text' disabled value={friendPay} />
      <label>😒 Who is paying the Bill </label>
      <select value={whoWillPay} onChange={ (e)=>setWhoWillPay( e.target.value)}>
        <option value="user"> You</option>
        <option value="friend">{selectFriend.name}y6t</option>

      </select>
      <Button>Split Bill</Button>


    </form>
  )
}


