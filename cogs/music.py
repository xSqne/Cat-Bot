from discord.ext import commands
from youtube_dl import YoutubeDL


class Music(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    @commands.command()
    async def join(self, ctx):
        global vc

        channel = ctx.message.author.voice
        vc = await channel.channel.connect()

    @commands.command()
    # even though you dont use ctx if you dont have it, it gives error :/
    async def disconnect(self, ctx):
        await vc.disconnect()

    # honestly im not doign this
    @commands.command()
    async def play(self, ctx, url):
        ydl = YoutubeDL()
        ydl.add_default_info_extractors()


def setup(bot):
    bot.add_cog(Music(bot))
