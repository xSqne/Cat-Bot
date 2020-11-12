# importing libraries
import asyncio
import datetime

from discord import User
from discord.ext import commands
import random
from random import randint
import discord
import os

# set prefix
client = commands.Bot(command_prefix='!')
# apparently there's an implemented help command so disable it bc it look ugly
client.remove_command('help')


# function to read files
def readFiles(filePath):
    f = open(filePath, "r")
    i = f.read()
    l = i.split('\n')
    f.close()
    return l


# load files into lists
randomGamesList = readFiles("lists/randomgames.txt")
triggerList = readFiles("lists/trigger.txt")
bannedWordsList = readFiles("lists/bannedwords.txt")

# load cogs
for filename in os.listdir("./cogs"):
    if filename.endswith(".py"):
        client.load_extension(f'cogs.{filename[:-3]}')


@client.event
async def on_ready():
    print('client ready')
    # setting the bot's status
    await client.change_presence(status=discord.Status.online, activity=discord.Game(random.choice(randomGamesList)))


# LOAD COG
@client.command(aliases=["load"], help="admin command no touch or ban")
async def loadCog(ctx, cogName=None):
    if cogName is None:
        await ctx.send("men wahts the cog nam?")
        return

    client.load_extension(f'cogs.{cogName}')


# UNLOAD COG
@client.command(aliases=["unload"], help="admin command no touch or ban")
async def unloadCog(ctx, cogName=None):
    if cogName is None:
        await ctx.send("men wahts the cog nam?")
        return

    client.unload_extension(f'cogs.{cogName}')


# HELP
@client.command(help="test for help help")
# leave args to None so that ppl can later on do something like !help ping to explain command more detailed
# also if you get error something about the function name help ignore it bc I disabled default help command anyways
async def help(ctx, args=None):
    embed = discord.Embed(title="List of commands",
                          colour=discord.Colour(0xa3cf32),
                          timestamp=datetime.datetime.now()) \
        .set_thumbnail(url="https://f4.bcbits.com/img/a1976873474_10.jpg") \
        .set_author(name="BIG CHUNGUS", url="https://discordapp.com",
                    icon_url="https://f4.bcbits.com/img/a1976873474_10.jpg") \
        .set_footer(text="footer text", icon_url="https://f4.bcbits.com/img/a1976873474_10.jpg") \

    for x in client.commands:
        if len(x.aliases) == 0:
            embed.add_field(name=x.name, value=x.help, inline=False)
        else:
            embed.add_field(name=x.aliases[0], value=x.help, inline=False)

    await ctx.send(embed=embed)


# PING
@client.command(help="pinger")
async def ping(ctx):
    await ctx.send(f'Pong, {round(client.latency * 1000)} ms')


# GEY
@client.command(help="everyone iz gae")
async def gey(ctx):
    await ctx.send('Everyone reading this is gay')


# 8BALL
@client.command(aliases=["8ball"], help="8ball askr questiyon")
async def _8ball(ctx, *, question=None):
    if question is None:
        await ctx.send("wher iz question??")
        return

    responses = ['100% true', 'Without a doubt', "That's a gay question to ask", 'Most likely', 'No', 'Obviously not']
    await ctx.send(f'{random.choice(responses)}')


# SPAM
@client.command(help="spam people veri nayz")
async def spam(ctx, *, person=None):
    if person is None:
        await ctx.send("pilis specify waht to spam")

    for cat in range(1, 10):
        await ctx.send(person)


@client.command(aliases=['shut up men', 'men plz stop'], help="schattr apr")
async def schatap(ctx):
    await ctx.send('Ok men i stop big sory')


# REMIND
@client.command(aliases=['remind'], help="remindme martin gae")
async def remindme(ctx):
    await ctx.send('Martin is gey')


# THANKS
@client.command(aliases=['good', 'gut'], help="veri gud")
async def gud(ctx):
    await ctx.send('thx')


# CHANGE GAME
@client.command(aliases=['changegame'], help="changer geym")
async def changeGame(ctx):
    luck = randint(0, 5)
    if luck == 1:
        await ctx.send('How about no')
    else:
        await client.change_presence(status=discord.Status.online,
                                     activity=discord.Game(random.choice(randomGamesList)))


# READING_MESSAGES
@client.event
async def on_message(message):
    if message.author.bot:
        return

    for word in triggerList:
        # CHECKING_IF_THE_WORD_IS_IN_TRIGGERLIST
        if message.content.count(word) > 0:
            trigAnswerList = ['Men schatr ap plz i try harding geym rn', 'Mne i am kiling nubermen wait a sec',
                              'Männer scahat ap bitte', 'HALT DEINE VERKACKTE FRESSE!?!?!?!?']
            await message.channel.send(random.choice(trigAnswerList))

    for word in bannedWordsList:
        # CHECKING_IF_THE_WORD_IS_IN_BANNEDWORDSLIST
        if message.content.count(word) > 0:
            await message.channel.send('Men schat ap plz or i kil family')
            await asyncio.sleep(2)
            await message.channel.send('Btw i delete your text yes?')
            await asyncio.sleep(2)
            await message.delete()
            await message.channel.purge(limit=2)

    # client.process_commands(message) helps us to break out of the client.event from which we cant recall the client.commands from
    await client.process_commands(message)


client.run('NjcyNTMzMTk1OTAzNzI5Njg3.XjM3WA.XbqiiBENQf7wBykljZi_MO-_NtQ')  # TOKEN
