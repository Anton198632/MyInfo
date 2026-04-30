import { sortByPk } from "./actions"


const firstInit = {

    connection: true,

    theme: "light",

    isEditState: false,

    toast: {show: false, type: "negative", message: "Сообщение"},

    keyPair: null,
    // {
    //     sessionId: "",
    //     clientPublicKeyPem: "",
    //     clientPrivateKeyPem: "",
    //     serverPublicKeyPem: ""
    // }
    hash: null,

    user: {
        id: 1,
        username: "Anton",
        first_name: "",
        is_admin: true,
        avatar: "1.jpg"
    },

    sections: [
        // {id: 1, title: "Алгебра", icon: "555.png"},
        // {id: 1, title: "Геометрия", icon: ""},
        // {id: 1, title: "Физика", icon: ""},
        // {id: 1, title: "Химия", icon: ""},

    ],

    
    selectedSection: {id: 1, title: "", icon: ""},
    sectionMenuCoords: undefined,

    items: [],
    // [
    //     {
    //         "id": 1,
    //         "title": "1. Основы алгебры",
    //         "icon": "",
    //         "childs": [
    //             {
    //                 "id": 2,
    //                 "title": "1.01. Косинус",
    //                 "icon": "",
    //                 "childs": [
    //                     {
    //                         "id": 4,
    //                         "title": "1.1.01 Определение косинуса",
    //                         "icon": ""
    //                     },
    //                     {
    //                         "id": 5,
    //                         "title": "1.1.02 Таблица значений косинуса",
    //                         "icon": ""
    //                     }
    //                 ]
    //             },
    //             {
    //                 "id": 3,
    //                 "title": "1.02 Синус",
    //                 "icon": ""
    //             }
    //         ]
    //     }
    // ],
    
    itemsListWidth: 350,
    selectedItemId: null,
    itemMenuCoords: undefined,
    showAddItemWindow: false,
    showEditItemWindow: false,


    data: 
    [
        // {
        //     "id": 1,
        //     "order_id": 1,
        //     "type": "code-cpp",
        //     "data_content": ""
        // },
        
    ],

    currentEditTextNumber: -1,
    textEditMenuCoords: undefined,
    textEditMenuFont: {
        fontSize: 16,
        fontBold: false,
        fontItalic: false,
        fontColor: "black",
        fontBackground: "white"
    },

    showIconsWindow: false,

    allIcons: [],

    icons: [
        {id: 0, attach_id: 29, name: "bits"},
        {id: 1, attach_id: 40, name: "python"},
        {id: 2, attach_id: 11, name: ""},
        {id: 3, attach_id: 12, name: ""},
        {id: 0, attach_id: 29, name: "bits"},
        {id: 1, attach_id: 40, name: "python"},
        {id: 2, attach_id: 11, name: ""},
        {id: 3, attach_id: 12, name: ""},
        {id: 0, attach_id: 29, name: "bits"},
        {id: 1, attach_id: 40, name: "python"},
        {id: 2, attach_id: 11, name: ""},
        {id: 3, attach_id: 12, name: ""},
        {id: 0, attach_id: 29, name: "bits"},
        {id: 1, attach_id: 40, name: "python"},
        {id: 2, attach_id: 11, name: ""},
        {id: 3, attach_id: 12, name: ""},
        {id: 0, attach_id: 29, name: "bits"},
        {id: 1, attach_id: 40, name: "python"},
        {id: 2, attach_id: 11, name: ""},
        {id: 3, attach_id: 12, name: ""},
        {id: 0, attach_id: 29, name: "bits"},
        {id: 1, attach_id: 40, name: "python"},
        {id: 2, attach_id: 11, name: ""},
        {id: 3, attach_id: 12, name: ""},
        {id: 0, attach_id: 29, name: "bits"},
        {id: 1, attach_id: 40, name: "python"},
        {id: 2, attach_id: 11, name: ""},
        {id: 3, attach_id: 12, name: ""},
        {id: 0, attach_id: 29, name: "bits"},
        {id: 1, attach_id: 40, name: "python"},
        {id: 2, attach_id: 11, name: ""},
        {id: 3, attach_id: 12, name: ""},
        {id: 0, attach_id: 29, name: "bits"},
        {id: 1, attach_id: 40, name: "python"},
        {id: 2, attach_id: 11, name: ""},
        {id: 3, attach_id: 12, name: ""},
        {id: 0, attach_id: 29, name: "bits"},
        {id: 1, attach_id: 40, name: "python"},
        {id: 2, attach_id: 11, name: ""},
        {id: 3, attach_id: 12, name: ""},
        {id: 0, attach_id: 29, name: "bits"},
        {id: 1, attach_id: 40, name: "python"},
        {id: 2, attach_id: 11, name: ""},
        {id: 3, attach_id: 12, name: ""},
        {id: 0, attach_id: 29, name: "bits"},
        {id: 1, attach_id: 40, name: "python"},
        {id: 2, attach_id: 11, name: ""},
        {id: 3, attach_id: 12, name: ""},
        {id: 0, attach_id: 29, name: "bits"},
        {id: 1, attach_id: 40, name: "python"},
        {id: 2, attach_id: 11, name: ""},
        {id: 3, attach_id: 12, name: ""},
        {id: 0, attach_id: 29, name: "bits"},
        {id: 1, attach_id: 40, name: "python"},
        {id: 2, attach_id: 11, name: ""},
        {id: 3, attach_id: 12, name: ""},
        {id: 0, attach_id: 29, name: "bits"},
        {id: 1, attach_id: 40, name: "python"},
        {id: 2, attach_id: 11, name: ""},
        {id: 3, attach_id: 12, name: ""},
        {id: 0, attach_id: 29, name: "bits"},
        {id: 1, attach_id: 40, name: "python"},
        {id: 2, attach_id: 11, name: ""},
        {id: 3, attach_id: 12, name: ""},
        {id: 0, attach_id: 29, name: "bits"},
        {id: 1, attach_id: 40, name: "python"},
        {id: 2, attach_id: 11, name: ""},
        {id: 3, attach_id: 12, name: ""},
        {id: 0, attach_id: 29, name: "bits"},
        {id: 1, attach_id: 40, name: "python"},
        {id: 2, attach_id: 11, name: ""},
        {id: 3, attach_id: 12, name: ""},
        {id: 0, attach_id: 29, name: "bits"},
        {id: 1, attach_id: 40, name: "python"},
        {id: 2, attach_id: 11, name: ""},
        {id: 3, attach_id: 12, name: ""},
    ]




       
}

// Функция для установки значения поля "icon" по полю "id"
const setIconById = (items, id, iconValue) => {
    for (var i = 0; i < items.length; i++) {
      if (items[i].id === id) {
        items[i].icon = iconValue;
        return; // Если нашли соответствующий элемент, завершаем поиск
      }
      if (items[i].childs) {
        setIconById(items[i].childs, id, iconValue); // Рекурсивный вызов для вложенных элементов
      }
    }
  }

// Функция для установки значения поля "title" по полю "id"
const setTitleById = (items, id, title) => {
    for (var i = 0; i < items.length; i++) {
      if (items[i].id === id) {
        items[i].title = title;
        return; // Если нашли соответствующий элемент, завершаем поиск
      }
      if (items[i].childs) {
        setTitleById(items[i].childs, id, title); // Рекурсивный вызов для вложенных элементов
      }
    }
  }


export const reducer = (state = firstInit, action) => {

    switch (action.type){

        
        case "SET_CONNECTION_STATE":
            return {
                ...state, connection: action.isConnect
            }

        case "SET_KEY_PAIR":
            return {...state, keyPair: action.keyPair, hash: action.hash}

        case "SET_HASH":
            return {...state, hash: action.hash}

        case "SET_USER":
            return { ...state, user: action.user }

        case "SET_USER_AVATAR":
            return {...state, user: {...state.user, avatar: action.filePath}}

        case "SET_SECTIONS":
            return {...state, sections: action.sections}

        case "SET_SECTION_ICON":
            const iSections = state.sections.map(section => {
                if (section.id === action.sectionId)
                    return {...section, icon: action.iconPath}

                return section
            })

            console.log(iSections);

            return {...state, sections: iSections}

        case "ADD_SECTION":
            const sections = state.sections

            sections.push(action.section)

            return {...state, sections: sections}

        case "SET_SELECTED_SECTION":
            return {...state, selectedSection: action.section}

        case "SET_SECTION_MENU_COORDS":
            return {...state, sectionMenuCoords: action.coords}


        case "SET_ITEMS_LIST":
            return {...state, items: action.items}

        case "SET_ITEMS_LIST_WIDTH":
            return {...state, itemsListWidth: action.width}

        case "SET_ITEM_ICON":
            const items = [...state.items]

            setIconById(items, action.id, action.iconValue);

            return {...state, items: items}

        case "SET_ITEM_TITLE":
            const itemsT = [...state.items]

            setTitleById(itemsT, action.id, action.title);

            console.log(itemsT);

            return {...state, items: itemsT}

        case "SET_ITEM_MENU_COORDS":
            return {...state, itemMenuCoords: action.coords}

        case "SET_SELECTED_ITEM":
            return {...state, selectedItemId: action.item}

        case "SHOW_ADD_ITEM_WINDOW":
            return {...state, showAddItemWindow: action.isShow}

        case "SHOW_EDIT_ITEM_WINDOW":
            return {...state, showEditItemWindow: action.isShow}

        case "SET_DATA":
            return {...state, data: action.data}

        case "SET_TEXT_EDIT_MENU_COORDS":
            return {...state, textEditMenuCoords: action.coords}

        case "SET_TEXT_EDIT_MENU_FONT":
            return {...state, textEditMenuFont: action.font}

        case "ADD_TEXT_FIELD_TO_DATA":
            const data = state.data
            let maxOrderId = 0
            if (data.length > 0)
                maxOrderId = data.reduce((max, obj) => (obj.order_id > max ? obj.order_id : max), data[0].order_id);
            
            data.push({id: -1, order_id: maxOrderId+1, type: "text", data_content: ""})

            return {...state, data: data }

        case "ADD_YOUTUBE_DATA":
            const dataY = state.data
            let maxOrderIdY = 0
            if (dataY.length > 0)
                maxOrderIdY = dataY.reduce((max, obj) => (obj.order_id > max ? obj.order_id : max), dataY[0].order_id);
            
            dataY.push({id: -1, order_id: maxOrderIdY+1, type: "video", data_content: ""})

            return {...state, data: dataY }



        case "ADD_FORMULA_FIELD_TO_DATA":
            const dataF = state.data
            let maxOrderIdF = 0
            if (dataF.length > 0)
                maxOrderIdF = dataF.reduce((max, obj) => (obj.order_id > max ? obj.order_id : max), dataF[0].order_id);
            
            dataF.push({id: -1, order_id: maxOrderIdF+1, type: "formula", data_content: ""})

            return {...state, data: dataF }

        case "ADD_IMAGE_FIELD_TO_DATA":
            const dataI = state.data

            let maxOrder_Id = 0
            if (dataI.length > 0)
                maxOrder_Id = dataI.reduce((max, obj) => (obj.order_id > max ? obj.order_id : max), dataI[0].order_id);

                dataI.push({id: -1, order_id: maxOrder_Id+1, type: "image", data_content: action.imagePath})

            return {...state, data: dataI }

        case "ADD_FILE_FIELD_TO_DATA":
            const dataFile = state.data

            let maxOrder_Id_file = 0
            if (dataFile.length > 0)
            maxOrder_Id_file = dataFile.reduce((max, obj) => (obj.order_id > max ? obj.order_id : max), dataFile[0].order_id);

                dataFile.push({id: -1, order_id: maxOrder_Id_file+1, type: "file", data_content: action.filePath})

            return {...state, data: dataFile }

        case "ADD_CODE_FIELD_TO_DATA":
            const dataC = state.data
            let maxOrderIdC = 0
            if (dataC.length > 0)
                maxOrderIdC = dataC.reduce((max, obj) => (obj.order_id > max ? obj.order_id : max), dataC[0].order_id);
            
            dataC.push({id: -1, order_id: maxOrderIdC+1, type: `code-${action.lang}`, data_content: ""})

            return {...state, data: dataC }


        case "SET_CURRENT_EDIT_TEXT_NUMBER":
            return {...state, currentEditTextNumber: action.num}

        case "REWRITE_TEXT_DATA":
            const newData = state.data.map(d => {
                if (d.order_id === action.orderId)
                    return {...d, data_content: action.text}
                return d
            })

            return {...state, data: newData}

        case "SET_EDIT_STATE":
            return {...state, isEditState: action.isEdit}

        case "DELETE_DATA_NUM":
            const dataD = [...state.data];
            dataD.splice(action.num, 1)
            console.log(dataD);
            
            return {...state, data: dataD}

        case "SHOW_TOAST":
            return {
                ...state,
                toast: {show: action.isShow, type: action.type_, message: action.message}
            }

        case "SET_SHOW_ICONS_WINDOW":
            return {...state, showIconsWindow: action.isShow}

        case "ADD_ICON":
            const icons = state.icons;
            icons.push(action.icon);

            return { ...state, icons: icons }

        case "SET_ICONS": 
            return {...state, icons: action.icons, allIcons: action.icons}

        case "SET_ICON_NAME":
            const iconsN = state.icons.map(icon => {
                if (icon.id === action.iconId)
                    return {...icon, name: action.name}
                return icon
            })

            return {...state, icons: iconsN, allIcons: iconsN}

        case "DELETE_ICON":
            const iconsD = state.icons.filter(icon => icon.id !== action.iconId);
            return {...state, icons: iconsD, allIcons: iconsD}

        case "FILTER_WORD":
            const iconsF = state.allIcons.filter(
                icon => icon.name.toLocaleLowerCase().includes(action.word.toLocaleLowerCase()))

            console.log(iconsF);

            return {...state, icons: iconsF}

        case "SET_THEME":
            return {...state, theme: action.isLight? "light": "dark"}




        

        
        default:
            return state;
    }
}