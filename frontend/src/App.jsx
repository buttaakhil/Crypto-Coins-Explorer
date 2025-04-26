import React, { useEffect, useState } from 'react'
import "./App.css"
const App = () => {

  const [cryptoData, setCryptoData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [currentData, setCurrentData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [])

  useEffect(() => {
    setTotalPages(Math.ceil(cryptoData.length / 10));
    setCurrentPageData();
  }, [cryptoData]);


  useEffect(() => {
    setCurrentPageData();
  }, [pageNumber]);



  const fetchData = async () => {
    try {
      const response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd", { headers: { 'x-cg-demo-api-key': 'CG-tw9CTwPKT9eKf169y9iizxPc' } })
      if (!response.ok) {
        return;
      }
      const data = await response.json();
      setCryptoData(data)
    }
    catch (error) {
      console.log(error)
    }
  }

  const setCurrentPageData = () => {
    const startIdx = pageNumber * 10 - 10;
    const EndIdx = pageNumber * 10;
    setCurrentData(cryptoData.slice(startIdx, EndIdx));
  }

  return (
    <div className='App'>
      <h1>Crypto-Coins-Explorer</h1>

      <div className='all-cards'>
        {
          currentData.map((element, _) => {
            return (
              <div key={element.id} className='each-card'>
                <img src={element.image} alt="" className='card-image' />

                <div className='coin-title-price'>
                  <p className='coin-title'>{element.name}</p>
                  <p className="coin-price">$ {element.current_price.toLocaleString()}</p>
                </div>
              </div>
            )
          })
        }
      </div>
      <div className='all-buttons'>
        {
          Array.from({ length: totalPages }).map((_, i) => (
            <button
              style={{
                backgroundColor: pageNumber === i + 1 ? 'black' : '',
                color: pageNumber === i + 1 ? 'white' : '',
              }}
              className='each-button' key={i} onClick={() => setPageNumber(i + 1)}>
              {i + 1}
            </button>
          ))
        }
      </div>
    </div>
  )
}

export default App
