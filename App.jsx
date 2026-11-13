import React, { useState } from 'react';
import { Users, Video, Shield, DollarSign, Trophy } from 'lucide-react';

// Firebase config placeholder (To be filled by user)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

export default function App() {
  const [view, setView] = useState('login'); // login, admin, spectator
  const [loginRole, setLoginRole] = useState('spectator');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  
  const handleLogin = (e) => {
    e.preventDefault();
    if (loginRole === 'admin' && password === '01131114') {
      setView('admin');
    } else if (loginRole === 'spectator' && password.length > 0 && username.length > 0) {
      setView('spectator');
    } else {
      alert('ログイン情報が正しくありません。');
    }
  };

  if (view === 'login') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
        <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md text-white">
          <h1 className="text-2xl font-bold mb-6 text-center text-red-500">空手大会 ベッティング</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">権限</label>
              <select 
                value={loginRole} 
                onChange={(e) => setLoginRole(e.target.value)}
                className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:border-red-500 outline-none"
              >
                <option value="spectator">観戦者 (一般)</option>
                <option value="admin">管理者 (運営)</option>
              </select>
            </div>
            
            {loginRole === 'spectator' && (
              <div>
                <label className="block text-sm font-medium mb-1">ユーザー名</label>
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:border-red-500 outline-none"
                  required
                />
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium mb-1">パスワード</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:border-red-500 outline-none"
                required
              />
              {loginRole === 'spectator' && <p className="text-xs text-gray-400 mt-1">※新規登録の場合は好きなパスワードを入力してください</p>}
            </div>
            
            <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition">
              {loginRole === 'admin' ? '管理者ログイン' : '観戦者として参加'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (view === 'admin') {
    return (
      <div className="min-h-screen bg-gray-100 p-4 md:p-8">
        <header className="flex justify-between items-center mb-8 bg-white p-4 rounded-lg shadow">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center"><Shield className="mr-2 text-red-600"/> 管理者ダッシュボード</h1>
          <button onClick={() => setView('login')} className="text-sm bg-gray-200 px-3 py-1 rounded hover:bg-gray-300">ログアウト</button>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4 flex items-center"><Video className="mr-2"/> ライブカメラ配信</h2>
            <div className="aspect-video bg-gray-900 rounded flex items-center justify-center text-white relative overflow-hidden">
              <div className="absolute top-2 left-2 bg-red-600 text-xs px-2 py-1 rounded font-bold animate-pulse">LIVE</div>
              <p className="text-gray-400">※ここにカメラ映像が接続されます</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4 flex items-center"><Users className="mr-2"/> 観戦者ポイント管理</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b pb-2">
                <span>ユーザーA</span>
                <div className="flex items-center space-x-2">
                  <input type="number" defaultValue="1000" className="w-24 p-1 border rounded" />
                  <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">更新</button>
                </div>
              </div>
              <div className="flex items-center justify-between border-b pb-2">
                <span>ユーザーB</span>
                <div className="flex items-center space-x-2">
                  <input type="number" defaultValue="0" className="w-24 p-1 border rounded" />
                  <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">更新</button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow md:col-span-2">
            <h2 className="text-xl font-bold mb-4 flex items-center"><DollarSign className="mr-2"/> 試合精算・報酬分配（運営プール: 12000pt）</h2>
            <div className="bg-gray-50 p-4 rounded border">
              <p className="mb-2 font-medium">第1試合: Aさん vs Dさん (総ベット額: 5000pt)</p>
              <p className="text-sm text-gray-600 mb-4">勝者配当 (60%): 3000pt / 運営プール (40%): 2000pt</p>
              
              <div className="flex space-x-4">
                <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex-1">
                  勝者(Aさん)に通常報酬(プールから)支払う
                </button>
                <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 flex-1 font-bold">
                  ジャイキリ発動！(プール行き40%を直接勝者へ)
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Spectator View
  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
      <header className="flex justify-between items-center mb-6 bg-gray-800 p-4 rounded-lg">
        <h1 className="text-xl font-bold text-red-500">観戦モード</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center bg-gray-700 px-3 py-1 rounded">
            <DollarSign size={16} className="text-yellow-400 mr-1"/>
            <span className="font-bold">1,000 pt</span>
          </div>
          <button onClick={() => setView('login')} className="text-sm text-gray-400 hover:text-white">退出</button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-gray-800 p-4 rounded-lg">
             <h2 className="text-lg font-bold mb-3 flex items-center"><Video className="mr-2"/> ライブ配信</h2>
             <div className="aspect-video bg-black rounded flex items-center justify-center border border-gray-700 relative">
               <div className="absolute top-2 left-2 bg-red-600 text-xs px-2 py-1 rounded font-bold animate-pulse">LIVE</div>
               <p className="text-gray-500">配信待機中...</p>
             </div>
          </div>

          <div className="bg-gray-800 p-4 rounded-lg">
            <h2 className="text-lg font-bold mb-3">現在ベット受付中の試合</h2>
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-gray-700 p-4 rounded">
              <div className="text-center flex-1">
                <p className="font-bold text-xl">Aさん (SS)</p>
                <p className="text-sm text-gray-400">オッズ: 1.8倍</p>
                <button className="mt-2 w-full bg-blue-600 hover:bg-blue-700 py-2 rounded font-bold">100pt 賭ける</button>
              </div>
              <div className="font-bold text-2xl text-red-500">VS</div>
              <div className="text-center flex-1">
                <p className="font-bold text-xl">Dさん (SS)</p>
                <p className="text-sm text-gray-400">オッズ: 1.9倍</p>
                <button className="mt-2 w-full bg-red-600 hover:bg-red-700 py-2 rounded font-bold">100pt 賭ける</button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
           <div className="bg-gray-800 p-4 rounded-lg">
              <h2 className="text-lg font-bold mb-3 flex items-center"><Trophy className="mr-2 text-yellow-400"/> ファイター名鑑</h2>
              <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
                {[
                  {name: "Aさん", rank: "SS", style: "空手/柔術/剣術"},
                  {name: "Dさん", rank: "SS", style: "ボクシング/MMA/柔道"},
                  {name: "Cさん", rank: "A", style: "MMA/ボクシング"},
                  {name: "Fさん", rank: "B+", style: "喧嘩自慢"},
                  {name: "Gさん", rank: "B", style: "運動神経抜群"},
                  {name: "Eさん", rank: "C", style: "未経験/軽量"},
                  {name: "Bさん", rank: "D", style: "未経験/超軽量"}
                ].map(f => (
                  <div key={f.name} className="bg-gray-700 p-2 rounded text-sm">
                    <div className="flex justify-between font-bold">
                      <span>{f.name}</span>
                      <span className={f.rank === 'SS' ? 'text-yellow-400' : 'text-blue-300'}>Rank: {f.rank}</span>
                    </div>
                    <p className="text-gray-400 text-xs mt-1">{f.style}</p>
                  </div>
                ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
