import React, { useState, useEffect } from 'react'
import { TechnicalAnalysis } from "react-ts-tradingview-widgets";
import { SymbolOverview } from "react-ts-tradingview-widgets";
import { CompanyProfile } from "react-ts-tradingview-widgets";
import plane from './Images/plane.svg'
import logo from './Images/logo.svg'

export default function App() {
  const [data, setData] = useState({})
  const [searchTerm, setSearchTerm] = useState()
  const [submittedTerm, setSubmittedTerm] = useState('AAPL')
  const url = "/data?ticker=" + submittedTerm

  useEffect(() => {
    function fetchData() {
      fetch(url).then(
        res => res.json()
      ).then(
        data => {
          setData(data)
          console.log(data)
        }
      )
    }
    fetchData()
  }, [submittedTerm])


  function submit(e) {
    setSubmittedTerm(searchTerm)
    e.preventDefault()
  }

  return (
    <div>

      <div class="w-screen z-96 py-9 shadow-2xl bg-gradient-to-r from-blue-100 to-blue-500 flex items-center justify-center">
        <img class="pr-14" src={logo} alt='logo'></img>
        <form class="flex" onSubmit={(e) => submit(e)}>
          <input style={{ width: 900 }} class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for stocks, ETFs, cryptos & more" type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}></input>
          <div class="pl-9 pr-9">
            <button class="font-bold px-9 w-full border border-gray-300 text-white-900 text-sm rounded-lg w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 bg-black hover:bg-slate-700" onSubmit={submit}> Search </button>
          </div>
        </form>
      </div>

      <div class="grid grid-flow-col auto-cols-max justify-items-center">
        <div class="pt-20 pl-12 drop-shadow-lg ">
          <SymbolOverview width={800} symbols={[submittedTerm]}></SymbolOverview>
        </div>
        <div class="pt-20 pl-12 drop-shadow-lg">
          <CompanyProfile height={400} symbol={submittedTerm}></CompanyProfile>
        </div>
      </div>

      <div class="grid grid-flow-col auto-cols-max flex justify-items-center">
        <div class="pt-14 pl-12">
          <div class="w-auto py-4 px-9 border border-grey-200 rounded grid justify-items-center bg-white drop-shadow-lg">
            <div class="flex">
              <p class="text-xl pb-5 pt-4 font-medium ">Social Stats for&nbsp;</p>
              <p style={{ color: '#3b6eff' }} class="text-xl pb-5 pt-4 font-medium ">{submittedTerm.toUpperCase()}</p>
            </div>
            <div class="grid justify-items-begin">
              {(typeof data.reddit === 'undefined') ? (
                <p>Loading...</p>
              ) : (
                <div class="grid grid-cols-1 divide-y divide-black-500">
                  <div>
                    <p class="font-bold">Reddit</p>
                    <p> Rank: {data.reddit.info.rank} </p>
                    <p> Upvotes: {data.reddit.info.upvotes} </p>
                    <p> Mentions: {data.reddit.info.mentions} </p>
                    <p class="pb-3"> Trending: {data.reddit.trending.symbol1}, {data.reddit.trending.symbol2}, {data.reddit.trending.symbol3} </p>
                  </div>
                  <div>
                    <p class="font-bold pt-3">Stocktwits</p>
                    <p> {(typeof data.stocktwits.info.watchlist_count === "undefined") ? (<p>Watchlist: 0</p>) : (<p>Watchlist: {data.stocktwits.info.watchlist_count}</p>)}</p>
                    <p class="pb-3"> Trending:  {data.stocktwits.trending.symbol1}, {data.stocktwits.trending.symbol2}, {data.stocktwits.trending.symbol3} </p>
                  </div>
                  <div class="grid justify-items-center">
                    <p class="font-bold pt-3 pb-3">More platforms coming soon!</p>
                    <img class="w-28 pb-1" src={plane} alt='img'></img>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div class="pt-14 pl-12 drop-shadow-lg ">
          <TechnicalAnalysis symbol={submittedTerm}></TechnicalAnalysis>
        </div>

        <div class="pt-14 pl-12 pb-20">
          <div class="w-auto py-4 px-9 border border-grey-200 rounded grid justify-items-center bg-white drop-shadow-lg">
            <div class="flex">
              <p class="text-xl pb-5 pt-4 font-medium ">News for&nbsp;</p>
              <p style={{ color: '#3b6eff' }} class="text-xl pb-5 pt-4 font-medium ">{submittedTerm.toUpperCase()}</p>
            </div>
            <div class="grid justify-items-begin">
              {(typeof data.reddit === 'undefined') ? (
                <p>Loading...</p>
              ) : (
                <div class="grid grid-cols-1 divide-y divide-black-500">
                  <div class="pb-3">
                    <p class="font-bold"> {data.news.article1.title}</p>
                    <p class="text-sm"> Published by: {data.news.article1.publisher}</p>
                    <p class="text-sm"> Visit article&nbsp;
                      <a class="underline text-blue-500" href={data.news.article1.link}>here</a>
                    </p>
                  </div>
                  <div class="pt-3 pb-3">
                    <p class="font-bold"> {data.news.article2.title}</p>
                    <p class="text-sm"> Published by: {data.news.article2.publisher}</p>
                    <p class="text-sm"> Visit article&nbsp;
                      <a class="underline text-blue-500" href={data.news.article2.link}>here</a>
                    </p>
                  </div>
                  <div class="pt-3 pb-3">
                    <p class="font-bold"> {data.news.article3.title}</p>
                    <p class="text-sm"> Published by: {data.news.article3.publisher}</p>
                    <p class="text-sm"> Visit article&nbsp;
                      <a class="underline text-blue-500" href={data.news.article3.link}>here</a>
                    </p>
                  </div>
                  <div class="pt-3 pb-5">
                    <p class="font-bold"> {data.news.article4.title}</p>
                    <p class="text-sm"> Published by: {data.news.article4.publisher}</p>
                    <p class="text-sm"> Visit article&nbsp;
                      <a class="underline text-blue-500" href={data.news.article4.link}>here</a>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <p class="grid justify-items-center pt-14 pb-9">Created with 💙 by Tariq Kharseh</p>

    </div>
  )
}