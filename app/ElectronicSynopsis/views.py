import base64
import json

from colorama import Fore
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse, HttpResponse
from django.shortcuts import render
from django.views.generic import TemplateView
from django.views.decorators.csrf import csrf_exempt

from ElectronicSynopsis.db_helper import UserTable, SectionTable, ItemTable, DataTable, AttachmentTable, UserIconTable, \
    UserSettingTable, KeysTable
from ElectronicSynopsis.encryption import generate_key, decrypt, encrypt, create_random_hash
from ElectronicSynopsis.settings import BASE_DIR, DEBUG, IS_MY_DEBUG


class Main(TemplateView):

    template_name = 'index.html'

    def get(self, request, *args, **kwargs):
        return render(request, self.template_name, {})


def decrypt_request(request):
    data = json.loads(request.body.decode(encoding='utf-8')).get("data")
    session_id = request.GET.get("session_id")

    if data:
        print(f"Encrypt data: {Fore.LIGHTBLUE_EX}{data}")
        body = json.loads(decrypt(session_id, data))
        print(f"Decrypt data: {Fore.GREEN}{body}")

        return body


def decrypt_get_request(request):
    data = request.GET.get("data")
    session_id = request.GET.get("session_id")

    if data:
        print(f"Encrypt data: {Fore.LIGHTBLUE_EX}{data}")
        body = json.loads(decrypt(session_id, [data]))
        print(f"Decrypt data: {Fore.GREEN}{body}")

        return body


def encrypt_response(request, response_data):
    session_id = request.GET.get("session_id")

    expire_key = KeysTable.check_expire(session_id)
    print(f"{Fore.YELLOW}Is expire key - {expire_key}")

    if expire_key:
        res_data = {"encrypted_data": encrypt(session_id, json.dumps({**response_data, "expire_key": True}))}
        KeysTable.remove_expire_keys()
        return res_data

    return {"encrypted_data": encrypt(session_id, json.dumps(response_data))}


# проверка авторизации
@csrf_exempt
def get_authorization_data_handle(request):

    body = decrypt_request(request)

    if not request.user.is_authenticated:
        response = {"user": "anonymous_user"}

        return JsonResponse(encrypt_response(request, response))

    else:
        return JsonResponse(encrypt_response(request, UserTable.get_user(request.user.username)))


def check_authorizations(func):
    def wrapper(request):

        if not IS_MY_DEBUG and not request.user.is_authenticated:
            return JsonResponse({"registration": "logout"})

        return func(request)
    return wrapper


# Обработчик GET-запроса на получение ключа от клиента
def get_public_key_handle(request):
    # создаем пару публичный-приватный ключи
    session = generate_key()
    # возвращаем клиенту id сессии и серверный публичный ключ (которым он будет шифровать данные)
    return JsonResponse(session)


# Обработчк POST-запроса для отправки пуюблчног ключа клиенту
@csrf_exempt
def send_encrypt_data_handle(request):

    # получаем ответ (зашифрованный) от клиента (данные содержащие публичный ключ клиента)
    data = json.loads(request.body.decode(encoding='utf-8')).get("data")

    session_id = request.GET.get("session_id")

    # дешифруем данные
    decrypt_data = decrypt(session_id, data)

    # устанавливаем публичный ключ клиента (которым будем шифровать данные для него)
    KeysTable.set_client_public_key(session_id, json.loads(decrypt_data).get("clientPublicKeyPem"))

    # создаем hash комбинацию для исключения повтороно применения зашифрованных запросов
    hash_ = create_random_hash()
    KeysTable.set_hash(session_id, hash_)

    # отправляем клиенту зашифрованный ответ об удачном получении ключа шифрования
    response = encrypt(session_id, json.dumps({
        "result": "encryption set",
        "hash": hash_,
        "text": "Идейные соображения высшего порядка, а также постоянный количественный рост и сфера нашей активности однозначно определяет каждого участника как способного принимать собственные решения касаемо переосмысления внешнеэкономических политик. Но активно развивающиеся страны третьего мира рассмотрены исключительно в разрезе маркетинговых и финансовых предпосылок. Следует отметить, что высокое качество позиционных исследований требует анализа поэтапного и последовательного развития общества. В частности, граница обучения кадров прекрасно подходит для реализации форм воздействия. Не следует, однако, забывать, что семантический разбор внешних противодействий предоставляет широкие возможности для поставленных обществом задач. В целом, конечно, высокое качество позиционных исследований выявляет срочную потребность поставленных обществом задач."
    }))

    return JsonResponse({"encrypted_data": response})


# регистрация
@csrf_exempt
def registration_handle(request):

    body = decrypt_request(request)

    login_ = body.get("login")

    user = UserTable.get_user(login_)

    if user:
        encrypt_data = encrypt_response(request, {"registration": "Пользователь уже зарегистрирован"})
        return JsonResponse(encrypt_data)

    password = body.get("password")
    password_rep = body.get("passwordRep")

    if password != password_rep:
        return JsonResponse(encrypt_response(request, {"registration": "Пароли не совпадают"}))

    new_user = UserTable.add_user(login_, password)

    return JsonResponse(encrypt_response(request, new_user))


# авторизация
@csrf_exempt
def login_handle(request):
    body = decrypt_request(request)

    user = UserTable.get_user(body.get("login"))
    if user:

        user_auth = authenticate(username=body.get("login"), password=body.get("password"))
        if user_auth is not None:
            login(request, user=user_auth)
            return JsonResponse(encrypt_response(request, user))
        else:
            return JsonResponse(encrypt_response(request, {"registration": "Ошибка пароля"}))

    else:
        return JsonResponse(encrypt_response(request, {"registration": "Пользователь не найден"}))


# выход
def logout_handle(request):
    logout(request)

    return JsonResponse(encrypt_response(request, {"registration": "logout"}))


@csrf_exempt
def change_user_avatar_handle(request):

    data = decrypt_get_request(request)

    user_id = data.get("user_id")

    if not IS_MY_DEBUG \
            and (not request.user.is_authenticated or request.user.pk != int(user_id)):
        return JsonResponse({"registration": "logout"})

    file = request.FILES.get("file").file

    ava_path = BASE_DIR / f"attachments/avatars_users/{user_id}"

    UserTable.set_user_avatar(int(user_id), user_id)

    with open(ava_path, "wb") as f:
        f.write(file.read())

    return JsonResponse(encrypt_response(request, {"filePath": f"{user_id}"}))


@check_authorizations
def get_settings_handle(request):
    data = decrypt_get_request(request)

    username = data.get("username")
    settings = UserSettingTable.get_settings(username)

    if not IS_MY_DEBUG \
            and (not request.user.is_authenticated
                 or request.user.pk != int(settings.get("setting").get("user_id"))):
        return JsonResponse({"registration": "logout"})

    return JsonResponse(encrypt_response(request, settings))


@check_authorizations
def set_theme_handle(request):
    data = decrypt_get_request(request)
    username = data.get("username")
    theme = data.get("theme")

    if not IS_MY_DEBUG \
            and (not request.user.is_authenticated
                 or request.user.username != username):
        return JsonResponse({"registration": "logout"})

    UserSettingTable.set_theme(username, theme)

    return JsonResponse(encrypt_response(request, {"result": "update"}))


@check_authorizations
def get_sections_handle(request):

    data = decrypt_get_request(request)

    username = data.get("username")

    if not IS_MY_DEBUG \
            and (not request.user.is_authenticated
                 or request.user.username != username):
        return JsonResponse({"registration": "logout"})

    sections = SectionTable.get_sections(username)

    return JsonResponse(encrypt_response(request, {"sections": sections}))


@csrf_exempt
def upload_section_image_handle(request):

    data = decrypt_get_request(request)

    section_id = data.get("sectionId")

    section = SectionTable.get_section(section_id)

    if not IS_MY_DEBUG \
            and (not request.user.is_authenticated
                 or request.user.pk != section.get("section").get("user_id")):
        return JsonResponse({"registration": "logout"})


    file = request.FILES.get("file").file

    ava_path = BASE_DIR / f"attachments/avatars_sections/{section_id}"

    SectionTable.set_section_icon(int(section_id), f"avatars_sections/{section_id}")

    with open(ava_path, "wb") as f:
        f.write(file.read())

    return JsonResponse(encrypt_response(request, {"sectionIconPath": f"avatars_sections/{section_id}"}))


@check_authorizations
def add_new_section_handle(request):

    data = decrypt_get_request(request)

    username = data.get("username")

    if not IS_MY_DEBUG \
            and (not request.user.is_authenticated
                 or request.user.username != username):
        return JsonResponse({"registration": "logout"})

    title = data.get("title")

    section = SectionTable.add_section(username, title)

    return JsonResponse(encrypt_response(request, section))


@check_authorizations
def delete_section_handle(request):
    data = decrypt_get_request(request)

    section_id = data.get("sectionId")

    section = SectionTable.get_section(section_id)

    if not IS_MY_DEBUG \
            and (not request.user.is_authenticated
                 or request.user.pk != section.get("section").get("user_id")):
        return JsonResponse({"registration": "logout"})

    SectionTable.delete_section(int(section_id))

    return JsonResponse(encrypt_response(request, {"result": "deleted"}))


@check_authorizations
def get_items_handle(request):
    data = decrypt_get_request(request)

    section_id = data.get("sectionId")

    section = SectionTable.get_section(section_id)
    if not IS_MY_DEBUG \
            and (not request.user.is_authenticated
                 or request.user.pk != section.get("section").get("user_id")):
        return JsonResponse({"registration": "logout"})

    items = ItemTable.get_items(section_id)

    return JsonResponse({"items": items})


@check_authorizations
def get_items_by_words_handle(request):
    data = decrypt_get_request(request)

    section_id = data.get("sectionId")

    section = SectionTable.get_section(section_id)
    if not IS_MY_DEBUG \
            and (not request.user.is_authenticated
                 or request.user.pk != section.get("section").get("user_id")):
        return JsonResponse({"registration": "logout"})


    words = data.get("words")

    items = ItemTable.get_items_by_words(section_id, words)

    # Создаем словарь для отслеживания уникальных элементов по полю "title"
    unique_items = {}
    for item in items:
        id_ = item["id"]
        if id_ not in unique_items:
            unique_items[id_] = item

    # Преобразуем словарь обратно в список уникальных элементов
    return JsonResponse({"items": list(unique_items.values())})


@csrf_exempt
def upload_item_image_handle(request):
    data = decrypt_get_request(request)

    item_id = data.get("itemId")

    item = ItemTable.get_item(item_id)
    if not IS_MY_DEBUG \
            and (not request.user.is_authenticated
                 or request.user.pk != item.get("item").get("user_id")):
        return JsonResponse({"registration": "logout"})

    file = request.FILES.get("file").file

    attach_number = AttachmentTable.get_attachment_number()

    ava_path = BASE_DIR / f"attachments/avatars_items/{attach_number}"

    ItemTable.set_item_icon(int(item_id), f"avatars_items/{attach_number}")

    with open(ava_path, "wb") as f:
        f.write(file.read())

    return JsonResponse(encrypt_response(request, {"icon": f"avatars_items/{attach_number}"}))


@check_authorizations
def set_item_icon_handle(request):
    data = decrypt_get_request(request)

    item_id = data.get("itemId")

    item = ItemTable.get_item(item_id)
    if not IS_MY_DEBUG \
            and (not request.user.is_authenticated
                 or request.user.pk != item.get("item").get("user_id")):
        return JsonResponse({"registration": "logout"})

    attach_id = data.get("attachId")

    ItemTable.set_item_icon(int(item_id), f"avatars_items/{attach_id}")

    return JsonResponse(encrypt_response(request, {"icon": f"avatars_items/{attach_id}"}))


@check_authorizations
def add_new_item_handle(request):
    data = decrypt_get_request(request)

    section_id = data.get("sectionId")

    section = SectionTable.get_section(section_id)
    if not IS_MY_DEBUG \
            and (not request.user.is_authenticated
                 or request.user.pk != section.get("section").get("user_id")):
        return JsonResponse({"registration": "logout"})

    item_id = None if not data.get("itemId") else int(data.get("itemId"))
    title = data.get("title")

    ItemTable.add_item(title, section_id, owner_id=item_id)

    items = ItemTable.get_items(section_id)
    return JsonResponse(encrypt_response(request, {"items": items}))


@check_authorizations
def delete_item_handle(request):
    data = decrypt_get_request(request)

    item_id = data.get("itemId")

    item = ItemTable.get_item(item_id)
    if not IS_MY_DEBUG \
            and (not request.user.is_authenticated
                 or request.user.pk != item.get("item").get("user_id")):
        return JsonResponse({"registration": "logout"})

    ItemTable.delete_item(int(item_id))

    return JsonResponse(encrypt_response(request, {"result": "deleted"}))


@check_authorizations
def update_item_handle(request):
    data = decrypt_get_request(request)

    item_id = data.get("itemId")

    item = ItemTable.get_item(item_id)
    if not IS_MY_DEBUG \
            and (not request.user.is_authenticated
                 or request.user.pk != item.get("item").get("user_id")):
        return JsonResponse({"registration": "logout"})

    title = data.get("title")
    tags = data.get("tags")

    ItemTable.update_item(int(item_id), title, tags)

    return JsonResponse(encrypt_response(request, {"result": "update"}))


@csrf_exempt
def upload_icon_handle(request):
    data = decrypt_get_request(request)

    username = data.get("username")

    if not IS_MY_DEBUG \
            and (not request.user.is_authenticated
                 or request.user.username != username):
        return JsonResponse({"registration": "logout"})

    file = request.FILES.get("file").file

    attach_number = AttachmentTable.get_attachment_number()
    ava_path = BASE_DIR / f"attachments/avatars_items/{attach_number}"

    with open(ava_path, "wb") as f:
        f.write(file.read())

    icon = UserIconTable.add_icon(username, attach_number)

    return JsonResponse(encrypt_response(request, {"icon": icon}))


@check_authorizations
def get_icons_handle(request):

    data = decrypt_get_request(request)

    username = data.get("username")

    if not IS_MY_DEBUG \
            and (not request.user.is_authenticated
                 or request.user.username != username):
        return JsonResponse({"registration": "logout"})

    icons = UserIconTable.get_icons(username)

    return JsonResponse({"icons": icons})


@check_authorizations
def set_icon_name_handle(request):
    data = decrypt_get_request(request)

    icon_id = data.get("iconId")

    icon = UserIconTable.get_icon(icon_id)
    if not IS_MY_DEBUG \
            and (not request.user.is_authenticated
                 or request.user.pk != icon.get("user_icon").get("user_id")):
        return JsonResponse({"registration": "logout"})

    name = data.get("name")

    UserIconTable.set_icon_name(icon_id, name)

    return JsonResponse(encrypt_response(request, {"result": "iconRename"}))


@check_authorizations
def delete_icon_handle(request):
    data = decrypt_get_request(request)

    icon_id = data.get("iconId")
    icon = UserIconTable.get_icon(icon_id)
    if not IS_MY_DEBUG \
            and (not request.user.is_authenticated
                 or request.user.pk != icon.get("user_icon").get("user_id")):
        return JsonResponse({"registration": "logout"})

    UserIconTable.delete_icon(icon_id)

    return JsonResponse(encrypt_response(request, {"result": "iconDeleted"}))


@check_authorizations
def get_data_handle(request):
    data = decrypt_get_request(request)

    item_id = data.get("itemId")

    item = ItemTable.get_item(item_id)
    if not IS_MY_DEBUG \
            and (not request.user.is_authenticated
                 or request.user.pk != item.get("item").get("user_id")):
        return JsonResponse({"registration": "logout"})

    data = DataTable.get_data(int(item_id))

    return JsonResponse(encrypt_response(request, {"data": data}))


@csrf_exempt
def upload_data_image_handle(request):
    data = decrypt_get_request(request)

    file = request.FILES.get("file").file

    attach_number = AttachmentTable.get_attachment_number()

    ava_path = BASE_DIR / f"attachments/images/{attach_number}"

    with open(ava_path, "wb") as f:
        f.write(file.read())

    return JsonResponse(encrypt_response(request, {"imagePath": f"{attach_number}"}))


@csrf_exempt
def upload_file_handle(request):
    data = decrypt_get_request(request)

    file = request.FILES.get("file").file
    file_name = data.get("fileName")

    attach_number = AttachmentTable.get_attachment_number()

    file_path = BASE_DIR / f"attachments/files/{attach_number}_{file_name}"

    with open(file_path, "wb") as f:
        f.write(file.read())

    return JsonResponse(encrypt_response(request, {"filePath": f"{attach_number}_{file_name}"}))


@csrf_exempt
def save_data_handle(request):
    body = decrypt_request(request)

    item_id = body.get("itemId")

    item = ItemTable.get_item(item_id)
    if not IS_MY_DEBUG \
            and (not request.user.is_authenticated
                 or request.user.pk != item.get("item").get("user_id")):
        return JsonResponse({"registration": "logout"})

    data = body.get("data")

    DataTable.update_all_data(item_id, data)

    return JsonResponse(encrypt_response(request, {"result": "save"}))


@check_authorizations
def delete_data_handle(request):
    data = decrypt_get_request(request)

    data_id = data.get("dataId")

    d = DataTable.get_data_by_id(data_id)
    if not IS_MY_DEBUG \
            and (not request.user.is_authenticated
                 or request.user.pk != d.get("data").get("user_id")):
        return JsonResponse({"registration": "logout"})

    DataTable.delete_data(int(data_id))

    return JsonResponse(encrypt_response(request, {"result": "deleted"}))