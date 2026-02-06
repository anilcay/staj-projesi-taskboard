import React from 'react';

const TodoItem = ({ todo, onDelete, onToggle }) => {
  return (
    <div className="group bg-white p-3 rounded-xl shadow-sm border border-gray-100 mb-2 hover:shadow-md transition-all flex items-center justify-between">
      
      {/* Sol Taraf: Yazı ve Tıklama Alanı */}
      <div 
        onClick={() => onToggle(todo.id)} 
        className="flex-1 cursor-pointer flex items-center gap-2 overflow-hidden"
      >
        {/* Tamamlandıysa Yeşil Tik, Değilse Boş Daire */}
        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${todo.isCompleted ? 'border-green-500 bg-green-500' : 'border-gray-300'}`}>
          {todo.isCompleted && (
            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
          )}
        </div>

        {/* Yazı */}
        <span className={`text-sm font-medium truncate transition-all ${todo.isCompleted ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
          {todo.text}
        </span>
      </div>

      {/* Sağ Taraf: Silme Butonu (Çöp Kutusu) */}
      <button 
        onClick={(e) => {
          e.stopPropagation(); // Tıklayınca çizilmeyi engelle, sadece sil
          onDelete(todo.id);
        }}
        className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-lg transition-colors"
        title="Görevi Sil"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  );
};

export default TodoItem;