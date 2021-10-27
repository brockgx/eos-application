from Crypto.Cipher import AES
import secrets, os
from platform import system


#The code below locates the file containing the encryption IV and Key, the values in the file may change as long as they remain 16 characters.
FILEDIR = os.path.abspath(os.path.dirname(__file__))
if system() == "Windows":
  KEY_PATH = FILEDIR + "\\PassIV"
else:
  KEY_PATH = FILEDIR + "/PassIV"

#The do_encrypt function takes a message of type string and encrypts it using the IV and Key found in the PassIV file.
#The key and IV must be exactly 16 characters long or the function will fail to encrypt.
#The returned value will be an encrypted message of type bytes in UTF-8 encoding, this is the result of the PyCrypto AES functions.
def do_encrypt(Message):
    try:
        KeyFile = open(KEY_PATH, "r")
    except IOError as err:
        print(err)
    KeyFileLines = KeyFile.read().splitlines()
    KeyForEncryptionOfKey = bytearray.fromhex(KeyFileLines[0])
    IVForEncryptionOfIV = bytearray.fromhex(KeyFileLines[1])
    KeyFile.close()
    EncryptionMethod = AES.new(KeyForEncryptionOfKey, AES.MODE_CFB, IVForEncryptionOfIV)
    EncryptedMessage = EncryptionMethod.encrypt(Message.encode('utf-8'))
    return EncryptedMessage


#The do_decrypt function takes an encrypted message and decrypts it. 
#The Key and IV used to encrypt the message must be exactly the same to decrypt it.
def do_decrypt(Message):
    try:
        KeyFile = open(KEY_PATH, "r")
    except IOError as err:
        print(err)
    KeyFileLines = KeyFile.read().splitlines()
    KeyForDecryptionOfKey = bytearray.fromhex(KeyFileLines[0])
    IVForDecryptionOfIV = bytearray.fromhex(KeyFileLines[1])
    DecryptionMethod = AES.new(KeyForDecryptionOfKey, AES.MODE_CFB, IVForDecryptionOfIV)
    DecryptedKey = DecryptionMethod.decrypt(Message)
    return DecryptedKey