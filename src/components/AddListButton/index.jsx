import React, {useState} from "react";
import Badge from "../Badge";
import List from "../List";

import closesvg from '../../assets/img/close.svg'

import './AddListButton.scss'
const AddListButton = ({colors}) => {
  const [visiblePopup, setVisiblePopup] = useState(false);
  const [selectedColor, selectColor] = useState(colors[0].id)

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
            onClick={() => setVisiblePopup(false)}
            alt="Close button" 
            className="add-list__popup-close-btn" 
          />
          <input className="field" type='text' placeholder='Название задачи' />
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
          <button className="button">Создать</button>
        </div>
      )}
    </div>
  );
}

export default AddListButton