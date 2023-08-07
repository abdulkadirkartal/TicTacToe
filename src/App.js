import React, { useState } from 'react';
import './App.css';

function App() {
  const [pano, setPano] = useState(Array(9).fill(null));
  const [xNext, setXNext] = useState(true);

  const handleClick = (index) => {
    if (pano[index] || sonuc(pano)) {
      return;
    }

    const newPano = pano.slice();
    newPano[index] = xNext ? 'X' : 'O';
    setPano(newPano);
    setXNext(!xNext);
  };
  const islemKare = (index) => {
    return (
      <button className="kare" onClick={() => handleClick(index)}>
        {pano[index]}
      </button>
    );
  };

  const handleReset = () => {
    setPano(Array(9).fill(null));
    setXNext(true);
  };

  const kazanan = sonuc(pano);
  let durum;
  if (kazanan) {
    durum = 'Kazanan: ' + kazanan;
  } else if (pano.every((kare) => kare !== null)) {
    durum = 'Kazanan Yok. Durum Beraberlik.';
  } else {
    durum = 'Sıradaki Oyuncu: ' + (xNext ? 'X' : 'O');
  }

  return (
    <div className="oyun">
      <h1 className="baslik">X O X</h1>
      <div className="oyun-ekran">
        <div className="pano-sıra">
          {islemKare(0)}
          {islemKare(1)}
          {islemKare(2)}
        </div>
        <div className="pano-sıra">
          {islemKare(3)}
          {islemKare(4)}
          {islemKare(5)}
        </div>
        <div className="pano-sıra">
          {islemKare(6)}
          {islemKare(7)}
          {islemKare(8)}
        </div>
      </div>
      <div className="oyun-detay">
        <>{durum}</>
      </div>
      <button className="buton" onClick={handleReset}>
        Reset
      </button>
    </div>
  );
}

function sonuc(kareler) {
  const hat = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < hat.length; i++) {
    const [a, b, c] = hat[i];
    if (
      kareler[a] &&
      kareler[a] === kareler[b] &&
      kareler[b] === kareler[c] &&
      kareler[c]
    )
      return kareler[a];
  }
  return null;
}

export default App;
