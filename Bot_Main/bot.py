#importing libraries#
from discord.ext import commands
import random
from random import randint
client = commands.Bot(command_prefix='!')
import discord
import time
#picking a random game for the bot to play#
randomgamesfile = open("randomgames.txt", "r")
randomgames = randomgamesfile.read()
randomgameslist = randomgames.split(',')
randomgamesfile.close()

randomgames = ['Hearts of Iron IV', 'Counter Strike Global Offensive', 'League of Legends', 'Europa Universallis']
randomgameint = randint(0,3)
x = randomgames[randomgameint]



@client.event
async def on_ready():
    print('client ready')
    #setting the bot's status#
    await client.change_presence(status = discord.Status.online, activity = discord.Game(x))

#PING#
@client.command()
async def ping(ctx):
    await ctx.send(f'Pong, {round(client.latency * 1000)} ms')

#GEY#
@client.command()
async def gey(ctx):
    await ctx.send('Everyone reading this is gay')

#8BALL#
@client.command(aliases = ["8ball"])
async def _8ball(ctx, *, question):
    responses = ['100% true', 'Without a doubt', "That's a gay question to ask", 'Most likely', 'No', 'Obviously not']
    await ctx.send(f'{random.choice(responses)}')

#SPAM#
@client.command()
async def spam(ctx, *, person):
    for cat in range (1, 10):
        await ctx.send(person)
        cat = cat + 1
@client.command(aliases = ['shut up men', 'men plz stop'])
async def schatap(ctx):
    await ctx.send('Ok men i stop big sory')


#REMIND#
@client.command(aliases = ['remind'])
async def remindme(ctx):
    await ctx.send('Martin is gey')

#THANKS#
@client.command(aliases = ['good', 'gut'])
async def gud(ctx):
    await ctx.send('thx')

#CHANGEGAME#
@client.command(aliases = ['changegame'])
async def change_game_mega_gey(ctx):
    randomgames = ['Hearts of Iron IV', 'Counter Strike : Global Offensive', 'League of Legends', 'Europa Universallis IV']
    randomgameint = randint(0,3)
    x = randomgames[randomgameint]
    print(x)
    luck = randint(0, 5)
    if luck == 1 :
        await ctx.send('How about no')
    else :
        await client.change_presence(status = discord.Status.online, activity = discord.Game(x))



#READING_MESSAGES#
@client.event
async def on_message(message):
    #READING_THE_FILE#
    triggerfile = open('trigger.txt', 'r')
    triggerwords = triggerfile.read()
    triggerlist = triggerwords.split()
    triggerfile.close()
    for word in triggerlist:
        #CHECKING_IF_THE_WORD_IS_IN_TRIGGERLIST#
        if message.content.count(word) > 0:
            trigluck = randint(0, 3)
            triganswerlist = ['Men schatr ap plz i try harding geym rn', 'Mne i am kiling nubermen wait a sec', 'Männer scahat ap bitte', 'HALT DEINE VERKACKTE FRESSE!?!?!?!?']
            triganswer = triganswerlist[trigluck]
            await message.channel.send(triganswer)
    #READING_THE_FILE#
    bannedwordsfile = open("bannedwords.txt", 'r')
    bannedwords = bannedwordsfile.read()
    bannedwordslist = bannedwords.split()
    bannedwordsfile.close()
    for word in bannedwordslist:
        #CHECKING_IF_THE_WORD_IS_IN_BANNEDWORDSLIST#
        if message.content.count(word) > 0:
            await message.channel.send('Men schat ap plz or i kil family')
            time.sleep(2)
            await message.channel.send('Btw i delete your text yes?')
            time.sleep(4)
            await message.delete()
            await message.channel.purge(limit=2)
    #client.process_commands(message) helps us to break out of the client.event from which we cant recall the client.commands from#
    await client.process_commands(message)

client.run('NjYzMTIzOTQxNDYzNjg3MTg4.XhD8Sw.WUfPeIa-NeA9HESPjyZ7uazq_CM') #TOKEN#
