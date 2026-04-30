import base64
import random
import string

from cryptography.hazmat.primitives import serialization, hashes
from cryptography.hazmat.primitives.asymmetric import rsa
from cryptography.hazmat.primitives.asymmetric import padding

from ElectronicSynopsis.db_helper import KeysTable


def create_random_hash():
    # Задаем символы, из которых будет генерироваться комбинация
    characters = string.ascii_letters + string.digits  # буквы и цифры
    # Генерируем случайную комбинацию из 8 символов
    random_combination = ''.join(random.choice(characters) for _ in range(8))
    return random_combination

# Генерация пары ключей
def generate_key():

    private_key = rsa.generate_private_key(
        public_exponent=65537,
        key_size=2048,
    )

    public_key = private_key.public_key()

    # Преобразование ключей в формат PEM
    private_pem = private_key.private_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PrivateFormat.PKCS8,
        encryption_algorithm=serialization.NoEncryption()
    )

    public_pem = public_key.public_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PublicFormat.SubjectPublicKeyInfo
    )

    # Вносим данные в БД
    key = KeysTable.create_keys(public_pem.decode(encoding="utf-8"), private_pem.decode(encoding="utf-8"))

    return {
        "session_id": key.get("session_id"),
        "server_public_key": key.get("server_public_key"),
        "expire": key.get("expire")
    }


def decrypt_part(private_key, part):

    # Дешифрование данных, полученных от клиента
    decrypted_data = private_key.decrypt(
        base64.b64decode(part),
        padding.OAEP(
            mgf=padding.MGF1(algorithm=hashes.SHA256()),
            algorithm=hashes.SHA256(),
            label=None
        )
    )

    return decrypted_data


def decrypt(session_id, data: list):

    private_key_pem = KeysTable.get_private_key(session_id)

    # Преобразование приватного ключа в объект
    private_key = serialization.load_pem_private_key(
        private_key_pem.encode("utf-8"),
        password=None,  # Если приватный ключ защищен паролем, укажите его здесь
    )

    result = []
    for d in data:
        result += decrypt_part(private_key, d)

    result_string = ''.join(chr(num) for num in result)

    result_string = result_string.encode("latin-1").decode("utf-8")
    return result_string


def encrypt_part(public_key, part: str):

    # Шифруем данные
    ciphertext = public_key.encrypt(
        part.encode(encoding="utf8"),
        padding.OAEP(
            mgf=padding.MGF1(algorithm=hashes.SHA256()),
            algorithm=hashes.SHA256(),
            label=None
        )
    )

    # Кодируем в base64
    return base64.b64encode(ciphertext).decode(encoding="utf-8")


def encrypt(session_id, data):

    # Разбить строку на список строк по 190 символов
    chunk_size = 190
    chunks = [data[i:i + chunk_size] for i in range(0, len(data), chunk_size)]

    # Получаем публичный ключ (клиентский) из БД
    response_key_pem = KeysTable.get_client_public_key(session_id)

    public_key = serialization.load_pem_public_key(
        response_key_pem.encode("utf-8")
    )

    result = []
    for d in chunks:
        result.append(encrypt_part(public_key, d))

    return result

