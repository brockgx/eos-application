from Crypto.Cipher import AES
import secrets
global fileSecret

def RandomIV():
	secretsGenerator = secrets.SystemRandom()
	random_number = secretsGenerator.randint(0000000000000000,9999999999999999)
	return str(random_number)

def do_encrypt(msg):
    fileSecret = str.encode(RandomIV())
    obj = AES.new('xaPiWZNUmOMo5r64', AES.MODE_CFB, fileSecret)
    ciphertext = obj.encrypt(msg)
    return ciphertext


def do_decrypt(ciphertext):
    obj2 = AES.new('xaPiWZNUmOMo5r64', AES.MODE_CFB, fileSecret)
    message = obj2.decrypt(ciphertext)
    return message



test1 = do_encrypt("This is a test to see if there is any problems doing a larger sentence because we will have mass data")
print(test1)

test2 = do_decrypt(test1)
print(test2.decode())

