from Crypto.Cipher import AES
import secrets, os
from platform import system
global fileSecret

FILEDIR = os.path.abspath(os.path.dirname(__file__))
if system() == "Windows":
  KEY_PATH = FILEDIR + "\\PassIV"
else:
  KEY_PATH = FILEDIR + "/PassIV"

def do_encrypt(Message):
    try:
        KeyFile = open(KEY_PATH, "r")
    except IOError as err:
        print(err)
    KeyFileLines = KeyFile.read().splitlines()
    KeyForEncryptionOfKey = (KeyFileLines[0])
    IVForEncryptionOfIV = (KeyFileLines[1])
    KeyFile.close()
    EncryptionMethod = AES.new(KeyForEncryptionOfKey, AES.MODE_CFB, IVForEncryptionOfIV)
    EncryptedMessage = EncryptionMethod.encrypt(Message)
    return EncryptedMessage

def do_decrypt(Message):
    try:
        KeyFile = open(KEY_PATH, "r")
    except IOError as err:
        print(err)
    KeyFileLines = KeyFile.read().splitlines()
    KeyForDecryptionOfKey = (KeyFileLines[0])
    IVForDecryptionOfIV = (KeyFileLines[1])
    DecryptionMethod = AES.new(KeyForDecryptionOfKey, AES.MODE_CFB, IVForDecryptionOfIV)
    DecryptedKey = DecryptionMethod.decrypt(Message)
    return DecryptedKey

# # This function creates a 16 character string consisting of only numbers that will be used as the IV Value. #
# # The IV value is an input used to provide an initial state which will result in a random encrypted output. #

# def RandomIV():
# 	secretsGenerator = secrets.SystemRandom()
# 	random_iv = 0

# 	while True:
# 		random_iv = str(secretsGenerator.randint(0000000000000000,9999999999999999))
# 		NumberOfCharacters = (random_iv.count("") - 1)
# 		if (NumberOfCharacters == 16):
# 			return random_iv

# # This function creates a 16 character string consiting of alphanumeric characters that will be used as the key value. #
# # The key value is what is actually used to encrypt and decrypt the data.			

# def RandomKey():
# 	KeyRandom = secrets.token_hex(8)
# 	return KeyRandom

# # This function will take an input, generate a random key and IV value and then encrypt the information that was provided, returning the result. #

# def do_encrypt(msg):
#     global fileSecret
#     global Key
#     fileSecret = str(RandomIV())
#     Key = str(RandomKey())

#     try:
#         KeyFile = open("/home/devmain/uni-work/app-resources/eos-app/server/modules/security/PassIV","r")
#     except IOError as err:
#         print(err)
#     KeyFileLines = KeyFile.read().splitlines()
#     KeyForEncryptionOfKey = (KeyFileLines[0])
#     IVForEncryptionOfIV = (KeyFileLines[1])
#     KeyFile.close()

#     KeyObj = AES.new(KeyForEncryptionOfKey, AES.MODE_CFB, IVForEncryptionOfIV)
#     Keyphrase = bytes(Key + "," + fileSecret,"UTF-8")
#     cipherkeys = KeyObj.encrypt(Keyphrase)


#     testKeyObj = AES.new(KeyForEncryptionOfKey, AES.MODE_CFB, IVForEncryptionOfIV)
#     decryptedcipher = testKeyObj.decrypt(cipherkeys)

#     msg = bytes(msg,'UTF-8')
#     MessageObj = AES.new(Key, AES.MODE_CFB, fileSecret)
#     ciphertext = MessageObj.encrypt(msg)
#     return cipherkeys, ciphertext
    

# # This function will take an input, use the encrypted data and decrypt it using the IV and the key. #

# def do_decrypt_key(Message):
#     KeyFiles = open("PassIV","r")
#     KeyFileLines = KeyFiles.read().splitlines()
#     KeyForDecryptionOfKey = (KeyFileLines[0])
#     IVForDecryptionOfIV = (KeyFileLines[1])
#     testKeyObj = AES.new(KeyForDecryptionOfKey, AES.MODE_CFB, IVForDecryptionOfIV)
#     decryptedKey = testKeyObj.decrypt(Message)
#     return decryptedKey


# def do_decrypt(Message,Key,IV):
#     testKeyObj = AES.new(Key, AES.MODE_CFB,IV)
#     decryptedMessage = testKeyObj.decrypt(Message)
#     return decryptedMessage

# def serialize(Message):
# 	Message = do_encrypt(Message)
# 	SerializedMessage = bytes(pickle.dumps(Message))
# 	return SerializedMessage

	
