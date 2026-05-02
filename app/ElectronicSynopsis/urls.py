import json
import threading
from time import sleep

import colorama
import requests
from colorama import Fore
from django.contrib import admin
from django.urls import path

from ElectronicSynopsis.db_helper import UserTable, SectionTable, ItemTable, DataTable, AttachmentTable
from ElectronicSynopsis.encryption import decrypt_part
from ElectronicSynopsis.models import Section, Item, Data
from ElectronicSynopsis.settings import BASE_DIR
from ElectronicSynopsis.views import Main, get_authorization_data_handle, login_handle, logout_handle, \
    get_sections_handle, upload_section_image_handle, add_new_section_handle, get_items_handle, \
    upload_item_image_handle, add_new_item_handle, get_data_handle, upload_data_image_handle, save_data_handle, \
    delete_data_handle, upload_file_handle, delete_item_handle, get_items_by_words_handle, change_user_avatar_handle, \
    delete_section_handle, registration_handle, update_item_handle, upload_icon_handle, get_icons_handle, \
    set_icon_name_handle, delete_icon_handle, set_item_icon_handle, get_settings_handle, set_theme_handle, \
    get_public_key_handle, send_encrypt_data_handle

urlpatterns = [
    path('admin/', admin.site.urls),
    # path("", Main.as_view()),

    path("api/v1/get_authorization_data", get_authorization_data_handle),
    path("api/v1/registration", registration_handle),
    path("api/v1/login", login_handle),
    path("api/v1/logout", logout_handle),
    path("api/v1/change_user_avatar", change_user_avatar_handle),

    path("api/v1/get_public_key", get_public_key_handle),
    path("api/v1/send_encrypt_data", send_encrypt_data_handle),

    path("api/v1/get_settings", get_settings_handle),
    path("api/v1/set_theme", set_theme_handle),

    path("api/v1/get_sections", get_sections_handle),
    path("api/v1/upload_section_image", upload_section_image_handle),
    path("api/v1/add_new_section", add_new_section_handle),
    path("api/v1/delete_section", delete_section_handle),

    path("api/v1/get_items", get_items_handle),
    path("api/v1/get_items_by_words", get_items_by_words_handle),
    path("api/v1/upload_item_image", upload_item_image_handle),
    path("api/v1/set_item_icon", set_item_icon_handle),
    path("api/v1/add_new_item", add_new_item_handle),
    path("api/v1/delete_item", delete_item_handle),
    path("api/v1/update_item", update_item_handle),

    path("api/v1/upload_icon", upload_icon_handle),
    path("api/v1/get_icons", get_icons_handle),
    path("api/v1/set_icon_name", set_icon_name_handle),
    path("api/v1/delete_icon", delete_icon_handle),

    path("api/v1/get_data", get_data_handle),
    path("api/v1/upload_data_image", upload_data_image_handle),
    path("api/v1/save_data", save_data_handle),
    path("api/v1/delete_data", delete_data_handle),

    path("api/v1/upload_file", upload_file_handle),

]


colorama.init(autoreset=True)



#for s in Section.objects.filter(user_id=1):
#    pass

# C++
# SECTION_ID = 14
# ICON_ID = 53
# LANG = "cpp"

# C#
# SECTION_ID = 13
# ICON_ID = 54
# LANG = "csharp"

# Java
# SECTION_ID = 15
# ICON_ID = 68
# LANG = "java"

# # Java Android
# SECTION_ID = 24
# ICON_ID = 67
# LANG = "java_android"

# # 1C
# SECTION_ID = 25
# ICON_ID = 70
# LANG = "ones"

# # C++ Qt
# SECTION_ID = 26
# ICON_ID = 64
# LANG = "qt_cpp"

# # SQL
# SECTION_ID = 27
# ICON_ID = 64
# LANG = "sql"

# # UML
# SECTION_ID = 28
# ICON_ID = 61
# LANG = "uml"

# # Unity
# SECTION_ID = 29
# ICON_ID = 66
# LANG = "unity"

# Figma
SECTION_ID = 16
ICON_ID = 58
LANG = "web"


def get_catalog():
    return json.loads(requests.get(f"http://192.168.1.100:8000/get_list_by_lang?lang={LANG}").text).get("catalogData")


def get_code_list(node_id, item_id):
    code_list = json.loads(requests.get(f"http://192.168.1.100:8000/get_code_by_id?id={node_id}").text).get("codeData")

    order_id = 1
    for code in code_list:

        code_type = f"code-{code.get('type')}" if code.get("type") != "image" \
                                                  and code.get("type") != "text" \
                                                  and code.get("type") != "video" else code.get("type")
        content = code.get("content")

        if code_type == "image":
            file = requests.get(f"http://192.168.1.100:8000{code.get('content')}").content

            attach_number = AttachmentTable.get_attachment_number()

            ava_path = BASE_DIR / f"attachments/images/{attach_number}"

            with open(ava_path, "wb") as f:
                f.write(file)

            content = str(attach_number)

        if content:
            Data.objects.create(
                item_id=item_id,
                order_id=order_id,
                type=code_type,
                data_content=content
            )
            order_id += 1
        else:
            pass



result = []
def get_data(catalog_list, owner_id=None):

    for item in catalog_list:

        print(f"{Fore.LIGHTCYAN_EX}{item.get('title')}")

        new_item = Item.objects.create(
            section_id=SECTION_ID,
            owner_id=owner_id,
            title=item.get("title"),
            icon= f"avatars_items/{ICON_ID}"
        )

        get_code_list(item.get("nodeId"), new_item.pk)
        # result.append({"owner": owner, "title": item.get("title"), "code_list": code_list})

        if item.get("childs"):
            get_data(item.get("childs"), new_item.pk)



def process():
    sleep(5)
    catalog_list = get_catalog()
    get_data(catalog_list)

    pass


# Data.objects.filter(type="code-blender").update(type="text")


# threading.Thread(target=process).start()






# phones = ["A", "B", "A", "C", "A"]
#
# res = {}
#
# for i in phones:
#     if res.get(i):
#         res[i] += 1
#     else:
#         res[i] = 1
#
#
# print(res, key=res.get)
#
# pass

# user = UserTable.get_user("Anton")
#
# sections = SectionTable.get_sections(user.get("user").get("username"))
#
# items = ItemTable.get_items(sections[0].get("section").get("id"))
#
# dats = DataTable.get_data(items[0].get("id"))

# user = UserTable.add_user("anton", "Qwerty32")



