import discord
from discord.ext import commands
import praw
import random

reddit = praw.Reddit(client_id='qPR9uMix_hqY4g',
                     client_secret='c8HLAXkqiXrDEWy-vR6ooxE-RzArKQ',
                     username='Cat-Bot-DC',
                     password='qwertqwert123',
                     user_agent='Catbot')


class Reddit(commands.Cog):
    def __init__(self, client):
        self.client = client

    @commands.command(help='it help meme yse?')
    async def meme(self, ctx):
        subreddit = reddit.subreddit('memes')
        all_subs = []
        new = subreddit.new(limit=50)

        for submission in new:
            all_subs.append(submission)

        random_sub = random.choice(all_subs)

        name = random_sub.title
        url = random_sub.url

        em = discord.Embed(title=name)
        em.set_image(url=url)
        await ctx.send(embed=em)

    @commands.command(help='veri gud kedi yse???')
    async def kedi(self, ctx):
        subreddit = reddit.subreddit('cat')
        all_subs = []
        hot = subreddit.hot(limit=50)

        for submission in hot:
            all_subs.append(submission)

        random_sub = random.choice(all_subs)

        name = random_sub.title
        url = random_sub.url

        em = discord.Embed(title=name)
        em.set_image(url=url)
        await ctx.send(embed=em)

    @commands.command(help='veri gud hentai men')
    async def hentai(self, ctx):
        subreddit = reddit.subreddit('rule34')

        all_subs = []
        hot = subreddit.hot(limit=50)

        for submission in hot:
            all_subs.append(submission)

        random_sub = random.choice(all_subs)

        name = random_sub.title
        url = random_sub.url

        em = discord.Embed(title=name)
        em.set_image(url=url)
        await ctx.send(embed=em)


def setup(client):
    client.add_cog(Reddit(client))
