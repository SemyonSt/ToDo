import React, {useEffect, useState} from "react";
import Badge from "../Badge";
import List from "../List";

import closesvg from '../../assets/img/close.svg'

import './AddList.scss'
import axios from "axios";


const AddListButton = ({colors, onAdd}) => {
  const [visiblePopup, setVisiblePopup] = useState(false);
  const [selectedColor, selectColor] = useState(3);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if(Array.isArray(colors)) {
      selectColor(colors[0].id)
    }
  }, [colors]);
  
  const onClose = () => {
    setVisiblePopup(false);
    setInputValue('');
    selectColor(colors[0].id)
  }

  const addList = () => {
    if(!inputValue){
      alert('Введите название списка');
      return
    }
    setIsLoading(true)
    axios
      .post('http://localhost:3001/lists', { 
        name: inputValue, 
        colorId: selectedColor
    })
      .then(({data}) => {
        const color = colors.filter(c => c.id === selectedColor)[0].name //фильтруем цвет по id и подставляем выбранный
        const listObj = { ...data, color: {name: color}}
        console.log(data)
        onAdd(listObj)
        onClose()
    }).finally(() => {
      setIsLoading(false)
    })
    
    
  }

  return (
    <div className="add-list">
      <List
        onClick={() => setVisiblePopup(true)}
        items={[
          {
            className: 'list__add-button',
            icon: (
            <svg 
              width="13" 
              height="13" 
              viewBox="0 0 16 16" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
            <path 
              d="M8 1V15" 
              stroke="black" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            <path 
              d="M1 8H15" 
              stroke="black" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            </svg>),
            
            name:'Добавить задачу',
            
          }
        ]}
      />

      {visiblePopup && (
        <div className="add-list__popup">
          <img src={closesvg}                      //иконка с кнопкой (Х) 
            onClick={onClose}
            alt="Close button" 
            className="add-list__popup-close-btn" 
          />
          <input 
            value={inputValue} 
            onChange={e => setInputValue(e.target.value)}
            className="field" 
            type='text' 
            placeholder='Название задачи' 
          />
          <div className="add-list__popup-colors">
            
            {
              colors.map(color => 
              <Badge 
                onClick={() => selectColor(color.id)} //выбираем цвет задачи
                key={color.id}
                color={color.name} 
                className={selectedColor === color.id && 'active'}
              />)
            }
          </div>
          <button onClick={addList} className="button">
            {isLoading ? 'Добавлене..' : 'Добавить'}
          </button>
        </div>
      )}
    </div>
  );
}

export default AddListButton