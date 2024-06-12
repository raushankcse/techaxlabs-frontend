import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './Todo.css';
import {FaPlus, FaEdit, FaTrash} from 'react-icons/fa';
import ReactPaginate from 'react-paginate';
import {  toast } from 'react-toastify';
import EditTaskModal from './EditTaskModal.js';
import config from '../../config.js';

const Todo = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const tasksPerPage = 5;


  useEffect(()=>{
    const token = localStorage.getItem('token');
    if(!token){
      navigate('/');
    }
  }, [navigate]);


  useEffect(()=>{
    const fetchTasks = async () => {
      try{
        const response = await fetch(`${config.baseURL}/todos`,{
          headers:{
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          }
        });
        const data = await response.json();
        setTasks(data);
      } catch(error){
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  },[]);

  const handleAddTask = async () => {
    if(newTask.trim() === '') return;
    try{
      const response = await fetch(`${config.baseURL}/todos`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({title: newTask}),
      });

      if(!response.ok){
        throw new Error('Failed to add task');
      }
 
      const newTaskObj = await response.json();

      setTasks([...tasks, newTaskObj]);
      setNewTask('');
      toast.success('Task added successfully');
    } catch(error){
      toast.error('Failed task add');
    }
  }

  const handleDeleteTask = async (id) => {
    try{
      const response = await fetch(`${config.baseURL}/todos/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization' : `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if(!response.ok){
        throw new Error('Failed to delete task');
      }

      const updatedTasks = tasks.filter(task => task.id !== id);
      setTasks(updatedTasks);
      toast.success('Task deleted successfully');

    } catch(error){
      toast.error('Failed to delete task');
    }
  }

  const handleEditTask = async (id, newText) => {

    if(!newText) return;

    try{
      const response = await fetch(`${config.baseURL}/todos/${id}`,{
        method: 'PUT',
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({title: newText}),
      });

      if(!response.ok){
        throw new Error('Failed to edit task');
      }

      const updatedTask = await response.json();
      const updatedTasks = tasks.map(task => 
        task.id === id ? updatedTask : task
      );
      setTasks(updatedTasks);
      toast.success('Task updated successfully');
    } catch (error){
      console.error('Error updating task:', error);
      toast.error('Failed to update task');
    }
  };

  const handleToggleTask = async (id) => {
    const task = tasks.find(task => task.id === id);
    if(!task) return;

    try{
      const response = await fetch(`${config.baseURL}/todos/${id}/toggle`,{
        method: 'POST',
        headers: {
          'Authorization' : `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if(!response.ok){
        throw new Error('Failed to toggle task');
      }
      const updatedTask = await response.json();
      const updatedTasks = tasks.map(task=> 
        task.id === id? updatedTask : task
      );
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error toggling task:', error);
    }
  };

  const openEditModal = (task)=>{
    setTaskToEdit(task);
    setIsModalOpen(true);
  }

  const handleSaveTask = (id, newText) => {
    handleEditTask(id, newText);
  };



  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  }

  const filteredTasks = tasks.filter(task=>{
    if(filter === 'all') return true;
    if(filter === 'completed') return task.completed;
    if(filter === 'pending') return !task.completed;
    return true;
  })


  const pageCount = Math.ceil(filteredTasks.length / tasksPerPage);
  const offset = currentPage*tasksPerPage;
  const currentTasks = filteredTasks.slice(offset, offset+tasksPerPage);

  const handleKeyDown = (e) => {
    if(e.key === 'Enter'){
      handleAddTask();
    }
  };





  return (
    <div className='todo-container'> 
      <div className='header'>
        <h1>Todo</h1>
        
        <button onClick={handleLogout} className='logout-button'>Logout</button>
      </div>
      <div className='add-task'>
        <input 
          type="text" 
          value={newTask}
          onChange={(e)=> setNewTask(e.target.value)}
          placeholder='Add a new task'
          onKeyDown={handleKeyDown}
        />
      <button onClick={handleAddTask} className='add-button'>
        <FaPlus/>
      </button>
      </div>
      <div className='filter-section'>
        <button onClick={()=> setFilter('all')}>All</button>
        <button onClick={()=> setFilter('completed')}>Completed</button>
        <button onClick={()=> setFilter('pending')}>Pending</button>
      </div>
      <ul className='task-list'>
        {currentTasks.map(task =>(
          <li key={task.id} className='task-item'>
            <div className='content'>
              <input 
                type="checkbox" 
                checked={task.completed}
                onChange={()=> handleToggleTask(task.id)}
              />
              <span className={task.completed ? 'completed': ''}>{task.title}</span>
            </div>
            <div className='button-right'>
              <button onClick={()=> openEditModal(task)} className='edit-button'>
                <FaEdit/>
              </button>
              <button onClick={()=> handleDeleteTask(task.id)} className='delete-button'>
                <FaTrash/>
              </button>
            </div>
          </li>
        ))}
      </ul>
      <ReactPaginate
        previousLabel={'previous'}
        nextLabel={'next'}
        breakLabel={'...'}
        pageCount={pageCount}
        marginPagesDisplayed={5}
        pageRangeDisplayed={5}
        onPageChange={(data)=> setCurrentPage(data.selected)}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />

      {
        taskToEdit && (
          <EditTaskModal
            show={isModalOpen}
            handleClose={()=> setIsModalOpen(false)}
            handleSave={handleSaveTask}
            task={taskToEdit}
          />
        )
      }

    </div>
  )
}

export default Todo;