from discord.ext.commands import Cog, command


class test(Cog):
    def __init__(self, bot):
        self.bot = bot

    @command()
    async def test(self, ctx):
        await ctx.send("noob")


def setup(bot):
    bot.add_cog(test(bot))
