# importing libraries
import datetime
from discord.ext import commands
import random
from random import randint
import discord
import time

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
randomGamesList = readFiles("./Lists/randomgames.txt")
triggerList = readFiles("./Lists/trigger.txt")
bannedWordsList = readFiles("./Lists/bannedwords.txt")


@client.event
async def on_ready():
    print('client ready')
    # setting the bot's status
    await client.change_presence(status=discord.Status.online, activity=discord.Game(random.choice(randomGamesList)))


# HELP
@client.command(aliases=["commands"])
# leave args to None so that ppl can later on do something like !help ping to explain command more detailed
# also if you get error something about the function name help ignore it bc I disabled default help command  anyways
async def help(ctx, args=None):
    embed = discord.Embed(title="title ~~(did you know you can have markdown here too?)~~",
                          colour=discord.Colour(0xa3cf32), url="https://discordapp.com",
                          description="this supports [named links](https://discordapp.com) on top of the previously shown subset of markdown. ```\nyes, even code blocks```",
                          timestamp=datetime.datetime.now()) \
        .set_image(url="https://cdn.discordapp.com/embed/avatars/0.png") \
        .set_thumbnail(url="https://cdn.discordapp.com/embed/avatars/0.png") \
        .set_author(name="author name", url="https://discordapp.com",
                    icon_url="https://cdn.discordapp.com/embed/avatars/0.png") \
        .set_footer(text="footer text", icon_url="https://cdn.discordapp.com/embed/avatars/0.png") \
        .add_field(name="🤔", value="some of these properties have certain limits...") \
        .add_field(name="😱", value="try exceeding some of them!") \
        .add_field(name="🙄",
                   value="an informative error should show up, and this view will remain as-is until all issues are fixed") \
        .add_field(name="<:thonkang:219069250692841473>", value="these last two", inline=True) \
        .add_field(name="<:thonkang:219069250692841473>", value="are inline fields", inline=True)

    await ctx.send(embed=embed)


# PING
@client.command()
async def ping(ctx):
    await ctx.send(f'Pong, {round(client.latency * 1000)} ms')


# GEY
@client.command()
async def gey(ctx):
    await ctx.send('Everyone reading this is gay')


# 8BALL
@client.command(aliases=["8ball"])
async def _8ball(ctx, *, question=None):
    if question is None:
        await ctx.send("wher iz question??")
        return

    responses = ['100% true', 'Without a doubt', "That's a gay question to ask", 'Most likely', 'No', 'Obviously not']
    await ctx.send(f'{random.choice(responses)}')


# SPAM
@client.command()
async def spam(ctx, *, person=None):
    if person is None:
        await ctx.send("pilis specify waht to spam")

    for cat in range(1, 10):
        await ctx.send(person)


@client.command(aliases=['shut up men', 'men plz stop'])
async def schatap(ctx):
    await ctx.send('Ok men i stop big sory')


# REMIND
@client.command(aliases=['remind'])
async def remindme(ctx):
    await ctx.send('Martin is gey')


# THANKS
@client.command(aliases=['good', 'gut'])
async def gud(ctx):
    await ctx.send('thx')


# CHANGE GAME
@client.command(aliases=['changegame'])
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
            time.sleep(2)
            await message.channel.send('Btw i delete your text yes?')
            time.sleep(4)
            await message.delete()
            await message.channel.purge(limit=2)

    # client.process_commands(message) helps us to break out of the client.event from which we cant recall the client.commands from
    await client.process_commands(message)


client.run('NjcyNTMzMTk1OTAzNzI5Njg3.XjM3WA.M7bBJvE1n5DAyVVZssEIbJ69CMA')  # TOKEN
