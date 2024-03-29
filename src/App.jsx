import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinised, setShowFinised] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(toString){
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])
  

  const saveTodos = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  const toggleFinished = (e) => {
    setShowFinised(!showFinised);
  }
  
  

  const handleEdit = (e, id) =>{
    let t = todos.filter(i=>i.id === id)
    setTodo(t[0].todo)

    let newtodos = todos.filter(item=>{
      return item.id !==id;
    });
    setTodos(newtodos)
    saveTodos()
  }

  const handleDelete = (e, id) =>{

    let newtodos = todos.filter(item=>{
      return item.id !==id;
    });
    setTodos(newtodos)
    saveTodos()
  }

  const handleAdd = () =>{
    setTodos([...todos, {id: uuidv4(), todo, isCompleted: false}])
    setTodo("")
    saveTodos()
  }

  const handleChange = (e) =>{
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item=>{
      return item.id === id;
    })
    let newtodos = [...todos];
    newtodos[index].isCompleted = !newtodos[index].isCompleted;
    setTodos(newtodos)
    saveTodos()
  }
  
  

  return (
    <>
      <Navbar />
      <div className='md:container md:mx-auto my-5 rounded-xl bg-violet-100 p-5 min-h-[80vh] md:w-1/2'>
        <h1 className='font-bold text-center text-xl'>iTask - Manage your todos at one place</h1>
        <div className='addTodo my-5 flex flex-col gap-4'>
          <h2 className='text-xl font-bold'>Add ToDo</h2>
          <input className='rounded-lg px-4 py-1 w-full' onChange={handleChange} value={todo} type="text" name="" id="" />
          <button onClick={handleAdd} disabled={todo.length < 3} className='bg-violet-800 disabled:bg-violet-700 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md'>Add</button>
        </div>
        <input onChange={toggleFinished} type="checkbox" checked={showFinised} name="" id="" /> 
        <label className='mx-2'  htmlFor="show">Show Finised</label>
        <h2 className='text-xl font-bold'>Your todos</h2>
        <div className="todos ">
          {todos.length == 0 && <div className='m-5'>Not todos to display </div>}
          {todos.map((item, i)=>{


            return (showFinised || !item.isCompleted) && <div key={item.id} className="todo flex md:w-full justify-between my-3">
              <div className='flex gap-5'>
                <input onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} name={item.id} id="" />
                <div className={item.isCompleted?"line-through":""}>
                  {item.todo}
                </div>
              </div>
              <div className="bittons flex h-full">
                <button onClick={(e) =>handleEdit(e, item.id)} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><FaEdit /></button>
                <button onClick={(e) =>{handleDelete(e, item.id)}} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><MdDeleteSweep /></button>
              </div>
            </div>
          })}

        </div>
      </div>
    </>
  )
}

export default App
