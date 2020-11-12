import discord
from discord.ext import commands
class meme(commands.Cog):
    def __init__(self, client):
        self.client = client

    @commands.command(help = 'it help meme yse?')
    async def meme(self, ctx):
        await ctx.send("Guten tag, hier ist eine meme")

def setup(client):
    client.add_cog(meme(client))
