


import './components/todo/todo.css'
import TodoData from './components/todo/TodoData'
import TodoNew from './components/todo/TodoNew'

import reactLogo from './assets/react.svg'
import { useContext, useEffect, useState } from 'react';
import Header from './components/layout/header';
import Footer from './components/layout/footer';
import { Outlet } from 'react-router-dom';
import { getAccountAPI } from './services/api.service';
import { AuthContext } from './components/context/auth.context';

import { Spin } from 'antd';
// const ParentComponent = (props) => {
//   console.log("check pr", props)
//   return (
//     <>
//       <div>
//         {props.children}

//         parent component
//       </div>
//     </>
//   )

// }


// const ChildComponent = (props) => {

//   return (

//     <div>

//       child component
//     </div>

//   )

// }




const App = () => {
  const { setUser, isAppLoading, setIsAppLoading } = useContext(AuthContext)

  const delay = (timeout) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, timeout);
    });
  };


  const fetchUserInfo = async () => {

    const res = await getAccountAPI()
    await delay(3000)
    if (res.data) {
      setUser(res.data.user)
      console.log("Check user ", res.data)
    }
    setIsAppLoading(false)
  }

  useEffect(() => {
    fetchUserInfo()
  }, [])





  return (
    <>
      {/* <ParentComponent>

        <ChildComponent />
      </ParentComponent> */}


      {
        isAppLoading === true ?
          <div style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)"

          }}>
            <Spin />
          </div>

          : <>  <Header />
            <Outlet />
            <Footer />
          </>

      }

    </>


  )

}



export default App
