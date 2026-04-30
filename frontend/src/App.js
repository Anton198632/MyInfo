import { useEffect } from 'react';
import './App.css';
import { DrawerAppBar } from './components/app-draw-bar/app-draw-bar';

import "./components/styles/scroll-bar.css"
import useDataBaseService from './services/DataBaseService';
import { useDispatch, useSelector } from 'react-redux';
import AuthorizationForm from './components/authorization-form/authorization-form';

import { setItemMenuCoords, setSections, setUser, setTextEditMenuCoords, setSectionMenuCoords, setKeyPair, setTheme } from './redux/actions';
import Header from './components/header/header';
import Content from './components/content/content';
import TooltipMenuItem from './components/menu/tooltip-menu-item';
import AddItemWindow from './components/modal-windows/add-item-window/add-item-window';
import TextEditMenu from './components/menu/text-edit-menu';
import ConfirmWindow from './components/modal-windows/confirm-window/confirm-window';
import TooltipMenuSection from './components/menu/tooltip-menu-section';
import Toast from './components/modal-windows/toast/toast';
import EditItemWindow from './components/modal-windows/edit-item-window/edit-item-window';
import IconsWindow from './components/modal-windows/icons-window/icons-window';
import { createKeyPair, decrypt, decrypt_async, encrypt } from './utils/encryption';
import { useState } from 'react';



function App() {

  const {getAuthorizationData, getSections, 
    getPublicKey, sendEncryptData, getSettings} = useDataBaseService();

  const {user, keyPair, hash, theme} = useSelector(state=>state);
  const [isLightTheme, setIsLightTheme] = useState(true);

  
  

  const dispatch = useDispatch();

  useEffect(() => {

    setIsLightTheme(theme==="light");

  }, [theme])


  useEffect(() => {


    // // Обмен ключами шифрования с сервером
    // getPublicKey().then(response => {

    //   // Создаем пару публичный-приватный ключи
    //   const keyPair = createKeyPair()
      

    //   // формируем ответ для сервера содержащий публичный ключ клиента и шифруем его
    //   // const json_data = JSON.stringify({clientPublicKeyPem: keyPair.clientPublicKeyPem});
    //   // const base64EncodedData = encrypt(response.server_public_key, json_data) 

    //   // Отправляем на сервер
    //   sendEncryptData(response.session_id, 
    //     // JSON.stringify({data: base64EncodedData})
    //     response.server_public_key,
    //     {clientPublicKeyPem: keyPair.clientPublicKeyPem}
    //     ).then(res => {
        
    //     // Дешифруем ответ с сервера
    //     const data = decrypt(keyPair.clientPrivateKeyPem, res.encrypted_data)

    //     console.log(data);

    //     // Устанавливаем их и публичный ключ сервера с сессией в хранилище данных (технология redux)
    //     dispatch(setKeyPair({
    //       ...keyPair, 
    //       sessionId: response.session_id, 
    //       serverPublicKeyPem: response.server_public_key,
    //       expire: response.expire
    //     }, data.hash))



    //   });

    // })




    

  }, [])

  useEffect(() => {

    if (keyPair?.sessionId) {
      
      getAuthorizationData().then(response => {
        if (response.user === "anonymous_user") {
          dispatch(setUser(null));
        } else {
          setDataUser(response.user);
          getSettings(response.user.username).then(response => {
            console.log(response);
          })
        }
      })

    } else {

      // Обмен ключами шифрования с сервером
      getPublicKey().then(response => {
      
        // Создаем пару публичный-приватный ключи
        const keyPair = createKeyPair()
        
      
        // формируем ответ для сервера содержащий публичный ключ клиента и шифруем его
        // const json_data = JSON.stringify({clientPublicKeyPem: keyPair.clientPublicKeyPem});
        // const base64EncodedData = encrypt(response.server_public_key, json_data) 
       
      
        // Отправляем на сервер
        sendEncryptData(response.session_id, 
          // JSON.stringify({data: base64EncodedData})
          response.server_public_key,
          {clientPublicKeyPem: keyPair.clientPublicKeyPem}
          ).then(res => {
          
          // Дешифруем ответ с сервера
          const data = decrypt(keyPair.clientPrivateKeyPem, res.encrypted_data)
          
          console.log(data);
          
          // Устанавливаем их и публичный ключ сервера с сессией в хранилище данных (технология redux)
          dispatch(setKeyPair({
            ...keyPair, 
            sessionId: response.session_id, 
            serverPublicKeyPem: response.server_public_key,
            expire: response.expire
          }, data.hash))
        
        
        
      });

    })


    }

    

  }, [keyPair])


  useEffect(() => {
    // console.log(hash);
  }, [hash])


  const setDataUser = (user) => {
    dispatch(setUser(user));


    getSettings(user.username).then(resp => {

      dispatch(setTheme(resp.setting.theme === "light"))

            getSections(user.username).then(response => {

              if (response.registration === "logout")
                dispatch(setUser(null));
        
              if (response.sections)
                dispatch(setSections(response.sections));
            })


    })

    

  }


  const onClickHandle = (e) => {

    e.preventDefault();

    dispatch(setItemMenuCoords(undefined));
    dispatch(setSectionMenuCoords(undefined));
    // dispatch(setTextEditMenuCoords(undefined));
  }




  return (
    <div className={`App ${!isLightTheme?"dark":"light"}`} onClick={onClickHandle}>

      {user === null ? <AuthorizationForm setDataUser={setDataUser} /> :

        <div style={{position: "relative"}}>

              

             <DrawerAppBar />
             {/* <TooltipMenuSection /> */}
             <TooltipMenuItem />
             <TextEditMenu />
             
             <AddItemWindow />
             <EditItemWindow />
             <IconsWindow />


             <Header />

             <Content />

            
             <Toast />

            
        </div>
      
      
      
      
      
      }

       
      
    </div>
  );
}

export default App;
