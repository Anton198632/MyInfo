export const setConnectionState = (isConnect) => (
    {type: 'SET_CONNECTION_STATE', isConnect}
)

export const setKeyPair = (keyPair, hash) => (
  {type: "SET_KEY_PAIR", keyPair, hash}
)

export const setHash = (hash) => (
  {type: "SET_HASH", hash}
)

export const setUser = (user) => (
    {type: "SET_USER", user}
)

export const setUserAvatar = (filePath) => (
  {type: "SET_USER_AVATAR", filePath}
) 

export const setSections = (sections) => (
    {type: "SET_SECTIONS", sections}
)

export const setSectionIcon = (sectionId, iconPath) => (
    {type: "SET_SECTION_ICON", sectionId, iconPath}
)

export const addSection = (section) => (
    {type: "ADD_SECTION", section}
)

export const setSelectedSection = (section) => (
    {type: "SET_SELECTED_SECTION", section}
)

export const setSectionMenuCoords = (coords) => (
   {type: "SET_SECTION_MENU_COORDS", coords}
)

 export const setItemsList = (items) => (
    {type: "SET_ITEMS_LIST", items}
 )

 export const setItemsListWidth = (width) => (
    {type: "SET_ITEMS_LIST_WIDTH", width}
 )

 export const setItemIcon = (id, iconValue) => (
    {type: "SET_ITEM_ICON", id, iconValue}
 )

 export const setItemTitle = (id, title) => (
  {type: "SET_ITEM_TITLE", id, title}
 )

 export const setItemMenuCoords = (coords) => (
    {type: "SET_ITEM_MENU_COORDS", coords}
 )

 export const setSelectedItem = (item) => (
    {type: "SET_SELECTED_ITEM", item}
 )

 export const setShowAddItemWindow = (isShow) => (
    {type: "SHOW_ADD_ITEM_WINDOW", isShow}
 )

 export const setShowEditItemWindow = (isShow) => (
  {type: "SHOW_EDIT_ITEM_WINDOW", isShow}
 )

 export const setData = (data) => (
   {type: "SET_DATA", data}
 )

 export const setCurrentEditTextNumder = (num) => (
   {type: "SET_CURRENT_EDIT_TEXT_NUMBER", num}
 )

 export const setTextEditMenuCoords = (coords) => (
    {type: "SET_TEXT_EDIT_MENU_COORDS", coords}
 )

 export const setTextEditMenuFont = (font) => (
    {type: "SET_TEXT_EDIT_MENU_FONT", font}
 )

 export const addTextFieldToData = () => (
   {type: "ADD_TEXT_FIELD_TO_DATA",}
 )

 export const addImageFieldData = (imagePath) => (
   {type: "ADD_IMAGE_FIELD_TO_DATA", imagePath}
 )

 export const addFileFieldData = (filePath) => (
  {type: "ADD_FILE_FIELD_TO_DATA", filePath}
 )

 export const addFormulsFieldData = () => (
   {type: "ADD_FORMULA_FIELD_TO_DATA",}
 )

 export const addCodeFieldData = (lang) => (
  {type: "ADD_CODE_FIELD_TO_DATA", lang}
 )

 export const rewriteTextData = (orderId, text) => (
   {type: "REWRITE_TEXT_DATA", orderId, text}
 )

 export const addYouTubeData = () => (
  {type: "ADD_YOUTUBE_DATA"}
 )

 export const setEditState = (isEdit) => (
   {type: "SET_EDIT_STATE", isEdit}
 )

 export const deleteDataItem = (num) => (
   {type: "DELETE_DATA_NUM", num}
 )

 export const showToast = (isShow, type_, message) => (
   {type: "SHOW_TOAST", isShow, type_, message}
 )

 
 export const setShowIconsWindow = (isShow) => (
  {type: "SET_SHOW_ICONS_WINDOW", isShow}
 )

 export const addIcon = (icon) => (
  {type: "ADD_ICON", icon}
 )

export const setIcons = (icons) => (
  {type: "SET_ICONS", icons}
)

export const setNewIconName = (iconId, name) => (
  {type: "SET_ICON_NAME", iconId, name}
)

export const deleteThisIcon = (iconId) => (
  {type: "DELETE_ICON", iconId}
)

export const filterIcons = (word) => (
  {type: "FILTER_WORD", word}
)

export const setTheme = (isLight) => (
  {type: "SET_THEME", isLight}
)

