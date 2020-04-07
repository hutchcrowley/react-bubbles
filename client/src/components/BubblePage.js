import React, { useState, useEffect } from 'react'

import NavBar from './NavBar'
import Bubbles from './Bubbles'
import ColorList from './ColorList'
import Spinner from './Spinner'

import { axiosWithAuth } from '../utils/axiosWithAuth'

const BubblePage = () => {
  const [colorList, setColorList] = useState([])

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    axiosWithAuth()
      .get(`/api/colors`)
      .then(res => setColorList(res.data))
      .then(setIsLoading(false))
      .catch(err => console.log(err))
  }, [])

  return (
    <div className='bubble-page'>
      <div className='bubble-nav'>
        <NavBar />
      </div>
      {!isLoading ? (
        <>
          <ColorList colors={colorList} updateColors={setColorList} />
          <Bubbles colors={colorList} />
        </>
      ) : (
        <Spinner />
      )}
    </div>
  )
}

export default BubblePage
