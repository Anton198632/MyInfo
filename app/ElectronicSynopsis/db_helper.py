import base64
import datetime

from django.contrib.auth.models import User
from django.db.models import Q

from ElectronicSynopsis.models import CustomUser, Section, Item, Data, Attachment, UserIcon, UserSetting, Keys


class UserTable:

    @staticmethod
    def get_user(username):

        users = CustomUser.objects.filter(username=username)
        for user in users:
            return user.json()

    @staticmethod
    def set_user_avatar(user_id, avatar):
        CustomUser.objects.filter(pk=user_id).update(avatar=avatar)

    @staticmethod
    def add_user(username, password):
        users = CustomUser.objects.filter(username=username)
        if len(users) == 0:
            user = CustomUser.objects.create_user(username=username, password=password)
            UserSettingTable.create_settings(username)
            return user.json()

        return users[0].json()

    @staticmethod
    def delete_user(username):
        CustomUser.objects.filter(username=username).delete()


class UserSettingTable:

    @staticmethod
    def check_user(setting_id, user_id):
        pass

    @staticmethod
    def create_settings(username):
        users = CustomUser.objects.filter(username=username)
        if len(users) > 0:
            user_settings = UserSetting.objects.filter(user=users[0])
            if len(user_settings) == 0:
                return UserSetting.objects.create(user=users[0]).json()
            return user_settings[0].json()

    @staticmethod
    def set_theme(username, theme):
        users = CustomUser.objects.filter(username=username)
        if len(users) > 0:
            UserSetting.objects.filter(user=users[0]).update(theme=theme)

    @staticmethod
    def get_settings(username):
        # users = CustomUser.objects.filter(username=username)
        # if len(users) > 0:
        #     user_settings = UserSetting.objects.filter(user=users[0])
        #     if len(user_settings) == 0:
        #         return UserSetting.objects.create(user=users[0]).json()
        #     return UserSettingTable.create_settings(username)
        return UserSettingTable.create_settings(username)


class SectionTable:

    @staticmethod
    def get_sections(username):
        users = CustomUser.objects.filter(username=username)
        if len(users) > 0:
            return [section.json().get("section") for section in Section.objects.filter(user=users[0])]

    @staticmethod
    def add_section(username, title):
        users = CustomUser.objects.filter(username=username)
        if len(users) > 0:
            section = Section.objects.create(user=users[0], title=title)
            return section.json()

    @staticmethod
    def set_section_icon(section_id, icon):
        Section.objects.filter(pk=section_id).update(icon=icon)

    @staticmethod
    def delete_section(section_id):
        Section.objects.filter(pk=section_id).delete()

    @staticmethod
    def get_section(section_id):
        sections = Section.objects.filter(pk=section_id)
        return sections[0].json() if len(sections) > 0 else None


class ItemTable:

    @staticmethod
    def __create_tree_structure(items):
        tree = []
        for item in items:
            # img = str(item.icon_id.image_logo)
            # img = img[img.find("/"):]
            node = {
                'id': item.pk,
                'title': item.title,
                'icon':  item.icon
            }
            children = item.item_set.all().order_by('title')
            if children:
                node['childs'] = ItemTable.__create_tree_structure(children)
            tree.append(node)
        return tree

    @staticmethod
    def get_items(section_id):

        sections = Section.objects.filter(pk=section_id)

        if len(sections) > 0:
            # Получите корневые элементы из модели Catalog
            root_items = Item.objects.filter(owner_id__isnull=True, section=sections[0]).order_by('title')

            # Создайте дерево структуры
            return ItemTable.__create_tree_structure(root_items)

    @staticmethod
    def get_items_by_words(section_id, words):

        sections = Section.objects.filter(pk=section_id)

        if len(sections) > 0:
            q = Q(section=sections[0]) \
                & (Q(data__data_content__icontains=words) |
                   Q(title__icontains=words) |
                   Q(tags__icontains=words))

            its = Item.objects.filter(q)

            items = [item.json().get("item") for item in Item.objects.filter(q)]

            return items


    @staticmethod
    def add_item(title, section_id, owner_id=None):

        sections = Section.objects.filter(pk=section_id)

        if len(sections) > 0:

            item = Item.objects.create(
                section=sections[0],
                title=title,
                owner=Item.objects.filter(pk=owner_id)[0] if owner_id is not None else None
            )

            return item.json()

    @staticmethod
    def update_item(item_id, title, tags):
        Item.objects.filter(pk=item_id).update(
            title=title, tags=tags
        )

    @staticmethod
    def set_item_icon(item_id, icon):
        Item.objects.filter(pk=item_id).update(icon=icon)

    @staticmethod
    def delete_item(item_id):
        Item.objects.filter(pk=item_id).delete()

    @staticmethod
    def get_item(item_id):
        items = Item.objects.filter(pk=item_id)
        return items[0].json() if len(items) > 0 else None


class DataTable:

    @staticmethod
    def get_data(item_id):
        items = Item.objects.filter(pk=item_id)
        if len(items) > 0:
            return [data.json().get("data") for data in Data.objects.filter(item=items[0])]
        return []

    @staticmethod
    def add_data(item_id, order_id, type_, data_content):
        items = Item.objects.filter(pk=item_id)
        if len(items) > 0:
            data = Data.objects.create(
                item=items[0],
                order_id=order_id,
                type=type_,
                data_content=data_content

            )

            return data.json()

    @staticmethod
    def delete_data(data_id):
        Data.objects.filter(pk=data_id).delete()

    @staticmethod
    def update_data(data_id, order_id, type_, data_content):
        Data.objects.filter(pk=data_id).update(
            order_id=order_id, type=type_, data_content=data_content
        )

    @staticmethod
    def update_all_data(item_id, data_list):
        for data in data_list:
            if data.get("id") > -1:
                DataTable.update_data(
                    data.get("id"),
                    data.get("order_id"),
                    data.get("type"),
                    data.get("data_content"))
            else:
                DataTable.add_data(
                    item_id,
                    data.get("order_id"),
                    data.get("type"),
                    data.get("data_content"))

        return True

    @staticmethod
    def get_data_by_id(data_id):
        data = Data.objects.filter(pk=data_id)
        return data[0].json() if len(data) > 0 else None




class AttachmentTable:

    @staticmethod
    def get_attachment_number():
        attach = Attachment.objects.all()

        if len(attach) > 0:
            counter = attach[0].counter
        else:
            counter = Attachment.objects.create(counter=0)

        Attachment.objects.all().update(counter=counter + 1)
        return counter


class UserIconTable:

    @staticmethod
    def add_icon(username, attach_id):
        user = CustomUser.objects.filter(username=username)
        if len(user) > 0:
            return UserIcon.objects.create(user=user[0], attach_id=attach_id).json().get("user_icon")

    @staticmethod
    def set_icon_name(id_, name):

        UserIcon.objects.filter(pk=id_).update(name=name)

    @staticmethod
    def get_icons(username):

        user = CustomUser.objects.filter(username=username)
        if len(user) > 0:
            icons = [icon.json().get("user_icon") for icon in UserIcon.objects.filter(user=user[0])]
            return icons

        return []

    @staticmethod
    def search_icons(username, word):

        user = CustomUser.objects.filter(username=username)
        if len(user) > 0:
            icons = [icon.json().get("user_icon") for icon in UserIcon.objects.filter(username, name__icontains=word)]
            return icons

        return []

    @staticmethod
    def delete_icon(id_):
        UserIcon.objects.filter(pk=id_).delete()

    @staticmethod
    def get_icon(icon_id):
        icons = UserIcon.objects.filter(pk=icon_id)
        return icons[0].json() if len(icons) > 0 else None


class KeysTable:

    EXPIRE = 86400

    @staticmethod
    def create_keys(public_key, private_key):

        key = Keys.objects.create(
            server_public_key=public_key,
            server_private_key=private_key,
            expire= int(datetime.datetime.now().timestamp() + KeysTable.EXPIRE) # 86400
        )

        return key.json()

    @staticmethod
    def set_hash(session_id, hash_):
        Keys.objects.filter(pk=session_id).update(hash=hash_)

    @staticmethod
    def get_hash(session_id):
        keys = Keys.objects.filter(pk=session_id)
        if len(keys) > 0:
            return keys[0].hash

    @staticmethod
    def check_hash(session_id, hash_):
        return KeysTable.get_hash(session_id) == hash_

    @staticmethod
    def get_private_key(session_id):

        keys = Keys.objects.filter(pk=session_id)
        if len(keys) > 0:
            return keys[0].server_private_key

    @staticmethod
    def set_client_public_key(session_id, client_public_key):

        Keys.objects.filter(pk=session_id).update(client_public_key=client_public_key)

    @staticmethod
    def get_client_public_key(session_id):

        keys = Keys.objects.filter(pk=session_id)
        if len(keys) > 0:
            return keys[0].client_public_key

    @staticmethod
    def check_expire(session_id):
        keys = Keys.objects.filter(pk=session_id)
        if len(keys) > 0:
            return keys[0].expire < datetime.datetime.now().timestamp()

    @staticmethod
    def remove_expire_keys():
        Keys.objects.filter(expire__lt=datetime.datetime.now().timestamp()).delete()



















