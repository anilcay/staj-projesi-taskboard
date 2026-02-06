import React, { useState, useEffect, useRef } from 'react';
import TodoItem from '../components/TodoItem';

const HomePage = () => {
  // --- STATE (VERİ) ---
  const initialData = [
    { 
      id: 1, 
      title: "Yapılacaklar 📝", 
      cards: [{ id: 101, text: "Ahmet Anıl Çay - Web Projesi", isCompleted: false }] 
    },
    { 
      id: 2, 
      title: "Devam Edenler 🚀", 
      cards: [{ id: 102, text: "React geliştirmesi", isCompleted: true }] 
    }
  ];

  const [lists, setLists] = useState(() => {
    const saved = localStorage.getItem("kanbanBoardV3");
    return saved ? JSON.parse(saved) : initialData;
  });

  const [newCardText, setNewCardText] = useState({});
  const [isProfileOpen, setIsProfileOpen] = useState(false); // Profil menüsü açık mı?

  // --- EFFECT ---
  useEffect(() => {
    localStorage.setItem("kanbanBoardV3", JSON.stringify(lists));
  }, [lists]);


  // --- İKON AKSİYONLARI ---
  const handleAnnouncement = () => {
    alert("📢 SİTE BİLGİSİ:\n\nBu proje 6 Şubat tarihinde Ahmet Anıl Çay tarafından geliştirilmiştir.");
  };

  const handleNotification = () => {
    alert("🔔 BİLDİRİMLER:\n\nŞu an yeni bir bildiriminiz yok. Her şey yolunda!");
  };

  const handleHelp = () => {
    alert("❓ NASIL KULLANILIR?\n\n1. '+ YENİ LİSTE' butonu ile yeni kolon açın.\n2. Kolon altındaki kutuya yazıp 'Ekle' diyerek kart oluşturun.\n3. Kartın üzerine tıklayarak tamamlandı (yeşil) yapın.\n4. Çöp kutusu ikonları ile liste veya kart silin.");
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  // --- CRUD FONKSİYONLARI ---
  const addCard = (listId) => {
    const text = newCardText[listId];
    if (!text || text.trim() === "") return;
    const newCard = { id: Date.now(), text: text, isCompleted: false };
    setLists(lists.map(list => list.id === listId ? { ...list, cards: [...list.cards, newCard] } : list));
    setNewCardText({ ...newCardText, [listId]: "" });
  };

  const deleteCard = (listId, cardId) => {
    setLists(lists.map(list => list.id === listId ? { ...list, cards: list.cards.filter(c => c.id !== cardId) } : list));
  };

  const toggleCard = (listId, cardId) => {
    setLists(lists.map(list => list.id === listId ? { ...list, cards: list.cards.map(c => c.id === cardId ? { ...c, isCompleted: !c.isCompleted } : c) } : list));
  };

  const deleteList = (listId) => {
    if(confirm("Bu listeyi silmek istediğine emin misin?")) setLists(lists.filter(l => l.id !== listId));
  };

  const addNewList = () => {
    const title = prompt("Yeni Liste Adı:");
    if (title) setLists([...lists, { id: Date.now(), title: title, cards: [] }]);
  };

  return (
    // Arka Plan: Canlı ama yumuşak (Indigo -> Purple -> Pink geçişi)
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 font-sans flex flex-col text-gray-800">
      
      {/* --- HEADER (Üst Bar) --- */}
      <div className="bg-white/70 backdrop-blur-md sticky top-0 z-50 border-b border-white/50 shadow-sm px-6 py-4 flex justify-between items-center">
        
        {/* Sol: Logo / İsim */}
        <div>
          <h1 className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            TaskBoard
          </h1>
          <p className="text-xs text-gray-500 font-semibold tracking-wide">Staj Yönetim Paneli</p>
        </div>

        {/* Sağ: İkonlar Grubu */}
        <div className="flex items-center gap-4 relative">
          
          {/* 1. Duyuru İkonu */}
          <button onClick={handleAnnouncement} className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all" title="Duyurular">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"></path></svg>
          </button>

          {/* 2. Bildirim İkonu */}
          <button onClick={handleNotification} className="p-2 text-gray-600 hover:text-yellow-600 hover:bg-yellow-50 rounded-full transition-all" title="Bildirimler">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
          </button>

          {/* 3. Yardım İkonu */}
          <button onClick={handleHelp} className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-full transition-all" title="Yardım">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </button>

          {/* 4. Profil İkonu ve Dropdown Menü */}
          <div className="relative">
            <button onClick={toggleProfile} className="flex items-center gap-2 p-1 pr-3 rounded-full hover:bg-white/50 border border-transparent hover:border-gray-200 transition-all">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                AA
              </div>
            </button>

            {/* Profil Dropdown (Açılır Menü) */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-fade-in-down">
                {/* Üst Kısım: Avatar ve İsim */}
                <div className="p-4 bg-gray-50 border-b border-gray-100 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-400 to-purple-500 flex items-center justify-center text-white text-2xl font-bold mb-2 shadow-inner">
                    AA
                  </div>
                  <h3 className="font-bold text-gray-800">Ahmet Anıl Çay</h3>
                  <span className="text-xs text-gray-500">Yönetici Hesabı</span>
                </div>
                
                {/* Alt Kısım: Aksiyonlar */}
                <div className="p-2">
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg flex items-center gap-2 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                    Profili Düzenle
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg flex items-center gap-2 transition-colors mt-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                    Hesap Değiştir
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* --- KANBAN PANOSU --- */}
      <div className="flex-1 overflow-x-auto p-8 flex items-start gap-8">
        {lists.map(list => (
          <div key={list.id} className="min-w-[320px] w-[320px] bg-white/60 backdrop-blur-lg rounded-2xl p-5 shadow-xl border border-white/50 flex flex-col max-h-[75vh] hover:shadow-2xl transition-shadow duration-300">
            {/* Liste Başlığı */}
            <div className="flex justify-between items-center mb-4 px-1">
              <h2 className="font-bold text-gray-800 text-lg tracking-tight">{list.title}</h2>
              <div className="flex items-center gap-2">
                <span className="bg-white/80 text-gray-600 text-xs px-2.5 py-1 rounded-full font-bold shadow-sm">{list.cards.length}</span>
                <button onClick={() => deleteList(list.id)} className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-lg transition-all" title="Listeyi Sil">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>
              </div>
            </div>

            {/* Kartlar */}
            <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-3">
              {list.cards.map(card => (
                <TodoItem key={card.id} todo={card} onDelete={(cardId) => deleteCard(list.id, cardId)} onToggle={(cardId) => toggleCard(list.id, cardId)} />
              ))}
            </div>

            {/* Ekleme Inputu */}
            <div className="mt-4 relative group">
              <input 
                type="text" 
                placeholder="Yeni görev ekle..." 
                className="w-full pl-4 pr-12 py-3 bg-white rounded-xl border border-gray-200 shadow-sm focus:ring-2 focus:ring-purple-400 focus:border-transparent text-sm outline-none transition-all group-hover:shadow-md"
                value={newCardText[list.id] || ""}
                onChange={(e) => setNewCardText({ ...newCardText, [list.id]: e.target.value })}
                onKeyDown={(e) => e.key === 'Enter' && addCard(list.id)}
              />
              <button onClick={() => addCard(list.id)} className="absolute right-2 top-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white p-1.5 rounded-lg transition-all shadow-md transform active:scale-95">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
              </button>
            </div>
          </div>
        ))}

        {/* Yeni Liste Butonu */}
        <button onClick={addNewList} className="min-w-[60px] h-[300px] bg-white/30 hover:bg-white/50 backdrop-blur-md rounded-2xl flex items-center justify-center border-2 border-dashed border-purple-300 text-purple-600 hover:text-purple-800 transition-all group shadow-sm hover:shadow-lg">
          <div className="rotate-90 font-bold whitespace-nowrap tracking-widest text-sm group-hover:scale-110 transition-transform">
            + LİSTE EKLE
          </div>
        </button>
      </div>
    </div>
  );
};

export default HomePage;