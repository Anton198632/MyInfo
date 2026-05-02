import { Password } from "@mui/icons-material";
import { useHttp } from "../hooks/http.hook"
import { useSelector } from "react-redux";
import { encrypt, encrypt_file } from "../utils/encryption";
import { useEffect } from "react";

const ADDRESS =  process.env.REACT_APP_CONTENT_URL || `http://${window.location.hostname}:${window.location.port}`; //'http://localhost:8000'; //

const useDataBaseService = () => {

    const {request, process_, setProcess} = useHttp();

    const {keyPair, hash} = useSelector(state=>state);

    

    const getServerAddress = () => {
        return ADDRESS;
    }


    const getPublicKey = async () => {
        console.log(ADDRESS);
        
        return await request("", `${ADDRESS}/api/v1/get_public_key?`);
    }

    const sendEncryptData = async (sessionId, serverPublicKeyPem, data) => {
        const encrypt_data = encrypt(serverPublicKeyPem, data, hash);
        return await request("", `${ADDRESS}/api/v1/send_encrypt_data?session_id=${sessionId}`, 
            "POST", JSON.stringify({data: encrypt_data}));
    }


    const setTheme = async (username, theme) => {

        const encrypt_data = encodeURIComponent(encrypt(keyPair.serverPublicKeyPem, {username, theme, hash}));
        return await request("", `${ADDRESS}/api/v1/set_theme?session_id=${keyPair.sessionId}&data=${encrypt_data}`);
    }

    const getSettings = async (username) => {

        const encrypt_data = encodeURIComponent(encrypt(keyPair.serverPublicKeyPem, {username, hash}));
        return await request("", `${ADDRESS}/api/v1/get_settings?session_id=${keyPair.sessionId}&data=${encrypt_data}`);
    }



    const getAuthorizationData = async () => {
        
        const encrypt_data = encrypt(keyPair.serverPublicKeyPem, {session_id: keyPair.sessionId, hash})
        return await request("", `${ADDRESS}/api/v1/get_authorization_data?session_id=${keyPair.sessionId}`, 
                "POST", JSON.stringify({data: encrypt_data}));
    }

    const registration = async (login, password, passwordRep) => {

        const encrypt_data = encrypt(keyPair.serverPublicKeyPem, {login, password, passwordRep, hash})
        return await request("", `${ADDRESS}/api/v1/registration?session_id=${keyPair.sessionId}`,
                "POST", JSON.stringify({data: encrypt_data}));
    }

    const logIn = async (login, password) => {

        const encrypt_data = encrypt(keyPair.serverPublicKeyPem, {login, password, hash})
        return await request("", `${ADDRESS}/api/v1/login?session_id=${keyPair.sessionId}`,
                "POST", JSON.stringify({data: encrypt_data}));
    }

    const logOut = async () => {
        return await request("", `${ADDRESS}/api/v1/logout?session_id=${keyPair.sessionId}`);
    }

    const changeUserAvatar = async (userId, file) => {

        const encrypt_data = encodeURIComponent(encrypt(keyPair.serverPublicKeyPem, {user_id: userId, hash})[0])
        return await request("", 
            `${ADDRESS}/api/v1/change_user_avatar?session_id=${keyPair.sessionId}&data=${encrypt_data}`, 
            "POST", file, {})
        
    }



    
    const getSections = async (userName) => {

        const encrypt_data = encodeURIComponent(encrypt(keyPair.serverPublicKeyPem, {username: userName, hash})[0])
        return await request("", 
            `${ADDRESS}/api/v1/get_sections?session_id=${keyPair.sessionId}&data=${encrypt_data}`)
    }

    const uploadSectionImage = async (sectionId, file) => {

        const encrypt_data = encodeURIComponent(encrypt(keyPair.serverPublicKeyPem, {sectionId: sectionId})[0])
        return await request("", 
            `${ADDRESS}/api/v1/upload_section_image?session_id=${keyPair.sessionId}&data=${encrypt_data}`, 
            "POST", file, {})
    }

    const addNewSection = async (userName, title) => {

        const encrypt_data = encodeURIComponent(encrypt(keyPair.serverPublicKeyPem, {username: userName, title: title})[0])
        return await request("", 
            `${ADDRESS}/api/v1/add_new_section?session_id=${keyPair.sessionId}&data=${encrypt_data}`)
    } 

    const deleteSection = async (sectionId) => {

        const encrypt_data = encodeURIComponent(encrypt(keyPair.serverPublicKeyPem, {sectionId})[0])
        return await request("", 
            `${ADDRESS}/api/v1/delete_section?session_id=${keyPair.sessionId}&data=${encrypt_data}`)
    }




    const getItems = async (sectionId) => {

        const encrypt_data = encodeURIComponent(encrypt(keyPair.serverPublicKeyPem, {sectionId})[0])
        return await request("", 
            `${ADDRESS}/api/v1/get_items?session_id=${keyPair.sessionId}&data=${encrypt_data}`)
    }

    const getItemsByWords = async(sectionId, words) => {

        const encrypt_data = encodeURIComponent(encrypt(keyPair.serverPublicKeyPem, {sectionId, words})[0])
        return await request("", 
        `${ADDRESS}/api/v1/get_items_by_words?session_id=${keyPair.sessionId}&data=${encrypt_data}`)
    }

    const uploadItemImage = async (itemId, file) => {

        const encrypt_data = encodeURIComponent(encrypt(keyPair.serverPublicKeyPem, {itemId})[0])
        return await request("", 
        `${ADDRESS}/api/v1/upload_item_image?session_id=${keyPair.sessionId}&data=${encrypt_data}`, 
            "POST", file, {})
    }

    const addNewItem = async (sectionId, itemId, title) => {

        const encrypt_data = encodeURIComponent(encrypt(keyPair.serverPublicKeyPem, {sectionId, itemId, title})[0])
        return await request("", 
            `${ADDRESS}/api/v1/add_new_item?session_id=${keyPair.sessionId}&data=${encrypt_data}`)
    }

    const updateItem = async (itemId, title, tags) => {
        const encrypt_data = encodeURIComponent(encrypt(keyPair.serverPublicKeyPem, {itemId, title, tags})[0])

        return await request("", 
            `${ADDRESS}/api/v1/update_item?session_id=${keyPair.sessionId}&data=${encrypt_data}`)
    }

    const deleteItem = async (itemId) => {
        const encrypt_data = encodeURIComponent(encrypt(keyPair.serverPublicKeyPem, {itemId})[0])
        
        return await request("", 
            `${ADDRESS}/api/v1/delete_item?session_id=${keyPair.sessionId}&data=${encrypt_data}`)
    }

    const setItemIcon = async (itemId, attach_id) => {

        const encrypt_data = encodeURIComponent(encrypt(keyPair.serverPublicKeyPem, {itemId, attachId: attach_id})[0])
        return await request("", 
            `${ADDRESS}/api/v1/set_item_icon?session_id=${keyPair.sessionId}&data=${encrypt_data}`)
    }

       
    
    
    const uploadUserIcon = async (username, file) => {

        const encrypt_data = encodeURIComponent(encrypt(keyPair.serverPublicKeyPem, {username})[0])
        return await request("", 
        `${ADDRESS}/api/v1/upload_icon?session_id=${keyPair.sessionId}&data=${encrypt_data}`, 
            "POST", file, {})
    }

    const getIcons = async (username) => {

        const encrypt_data = encodeURIComponent(encrypt(keyPair.serverPublicKeyPem, {username})[0])
        return await request("", 
        `${ADDRESS}/api/v1/get_icons?session_id=${keyPair.sessionId}&data=${encrypt_data}`)
    }

    const setIconName = async (iconId, name) => {

        const encrypt_data = encodeURIComponent(encrypt(keyPair.serverPublicKeyPem, {iconId, name})[0])
        return await request("", 
        `${ADDRESS}/api/v1/set_icon_name?session_id=${keyPair.sessionId}&data=${encrypt_data}`)
    }

    const deleteIcon = async (iconId) => {

        const encrypt_data = encodeURIComponent(encrypt(keyPair.serverPublicKeyPem, {iconId})[0])
        return await request("", 
        `${ADDRESS}/api/v1/delete_icon?session_id=${keyPair.sessionId}&data=${encrypt_data}`)
    }
        
        
    const getData = async (itemId) => {

        const encrypt_data = encodeURIComponent(encrypt(keyPair.serverPublicKeyPem, {itemId})[0])
        return await request("", 
        `${ADDRESS}/api/v1/get_data?session_id=${keyPair.sessionId}&data=${encrypt_data}`)
    }

    const uploadDataImage = async (file) => {
   
        const encrypt_data = encodeURIComponent(encrypt(keyPair.serverPublicKeyPem, {})[0])
        return await request("", 
        `${ADDRESS}/api/v1/upload_data_image?session_id=${keyPair.sessionId}&data=${encrypt_data}`, 
            "POST", file, {})
    }

    const uploadFile = async (fileName, file) => {

        const encrypt_data = encodeURIComponent(encrypt(keyPair.serverPublicKeyPem, {fileName})[0])
        
        return await request("", 
        `${ADDRESS}/api/v1/upload_file?session_id=${keyPair.sessionId}&data=${encrypt_data}`, 
            "POST", file, {})
    }

    const saveData = async (itemId, data) => {

        const encrypt_data = encrypt(keyPair.serverPublicKeyPem, {itemId, data})
        return await request("", `${ADDRESS}/api/v1/save_data?session_id=${keyPair.sessionId}`,
                "POST", JSON.stringify({data: encrypt_data}));
    }

    const deleteData = async (dataId) => {

        const encrypt_data = encodeURIComponent(encrypt(keyPair.serverPublicKeyPem, {dataId})[0])
        return await request("", 
        `${ADDRESS}/api/v1/delete_data?session_id=${keyPair.sessionId}&data=${encrypt_data}`)
    }




    return {

        getServerAddress,

        getPublicKey,
        sendEncryptData,

        setTheme,
        getSettings,

        getAuthorizationData,
        registration,
        logIn,
        logOut,
        changeUserAvatar,

        getSections,
        uploadSectionImage,
        addNewSection,
        deleteSection,

        getItems,
        getItemsByWords,
        uploadItemImage,
        setItemIcon,
        addNewItem,
        updateItem,
        deleteItem,


        uploadUserIcon,
        getIcons,
        setIconName,
        deleteIcon,

        getData,
        uploadDataImage,
        saveData,
        deleteData, 
        uploadFile
    }

}


export default useDataBaseService;