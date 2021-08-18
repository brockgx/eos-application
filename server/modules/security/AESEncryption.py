from Crypto.Cipher import AES
import secrets
global fileSecret


# This function creates a 16 character string consisting of only numbers that will be used as the IV Value. #
# The IV value is an input used to provide an initial state which will result in a random encrypted output. #

def RandomIV():
	secretsGenerator = secrets.SystemRandom()
	random_iv = 0

	while True:
		random_iv = str(secretsGenerator.randint(0000000000000000,9999999999999999))
		NumberOfCharacters = (random_iv.count("") - 1)
		if (NumberOfCharacters == 16):
			return random_iv

# This function creates a 16 character string consiting of alphanumeric characters that will be used as the key value. #
# The key value is what is actually used to encrypt and decrypt the data.			

def RandomKey():
	KeyRandom = secrets.token_hex(8)
	return KeyRandom

# This function will take an input, generate a random key and IV value and then encrypt the information that was provided, returning the result. #

def do_encrypt(msg):
    global fileSecret
    global Key

    fileSecret = str.encode(RandomIV())
    Key = RandomKey()
    obj = AES.new(Key, AES.MODE_CFB, fileSecret)
    ciphertext = obj.encrypt(msg)
    return ciphertext

# This function will take an input, use the encrypted data and decrypt it using the IV and the key. #

def do_decrypt(ciphertext):
    global fileSecret
    global Key

    obj2 = AES.new(Key, AES.MODE_CFB, fileSecret)
    message = obj2.decrypt(ciphertext)
    return message

# This function will retrieve the key that was used to encrypt the current message. #

def RetrieveKey():
	global Key

	IV = str(Key)
	return IV
	
#This function will retrive the IV that was used to encrypt the current message. #
def RetrieveIV():
	global fileSecret

	Key = str(fileSecret.decode())
	return Key
	
