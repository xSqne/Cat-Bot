from discord.ext import commands
import random
from random import randint
client = commands.Bot(command_prefix='!')
import discord
import time
#picking a random game for the bot to play#
randomgames = ['Hearts of Iron IV', 'Counter Strike Global Offensive', 'League of Legends', 'Europa Universallis']
randomgameint = randint(0,3)
x = randomgames[randomgameint]



@client.event
async def on_ready():
    print('client ready')
    #setting the bot's status#
    await client.change_presence(status = discord.Status.online, activity = discord.Game(x))

@client.command()
async def ping(ctx):
    await ctx.send(f'Pong, {round(client.latency * 1000)} ms')
@client.command()
async def gey(ctx):
    await ctx.send('Everyone reading this is gay')
@client.command(aliases = ["8ball"])
async def _8ball(ctx, *, question):
    responses = ['100% true', 'Without a doubt', "That's a gay question to ask", 'Most likely', 'No', 'Obviously not']
    await ctx.send(f'{random.choice(responses)}')
@client.command()
async def spam(ctx, *, person):
    for cat in range (1, 10):
        await ctx.send(person)
        cat = cat + 1
@client.command(aliases = ['shut up men', 'men plz stop'])
async def schatap(ctx):
    await ctx.send('Ok men i stop big sory')



@client.command(aliases = ['remind'])
async def remindme(ctx):
    await ctx.send('Martin is gey')



@client.command(aliases = ['changegame'])
async def change_game_mega_gey(ctx):
    randomgames = ['Hearts of Iron IV', 'Counter Strike Global Offensive', 'League of Legends', 'Europa Universallis']
    randomgameint = randint(0,3)
    x = randomgames[randomgameint]
    print(x)
    luck = randint(0, 5)
    if luck == 1 :
        await ctx.send('How about no')
    else :
        await client.change_presence(status = discord.Status.online, activity = discord.Game(x))




client.run('NjYzMTIzOTQxNDYzNjg3MTg4.XhD8Sw.UG7FcRUG2MRhUrhEhY6dbx7VPM8')
