bannedwordsfile = open("bannedwords.txt", 'r')
bannedwords = bannedwordsfile.read()
bannedwordslist = bannedwords.split()
bannedwordsfile.close()
while True:
    print(bannedwordslist[0])
