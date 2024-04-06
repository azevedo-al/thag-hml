using System.Data.Common;
using Microsoft.EntityFrameworkCore;

namespace TheHome.SistemaDeGestao.EntityFrameworkCore
{
    public static class SistemaDeGestaoDbContextConfigurer
    {
        public static void Configure(DbContextOptionsBuilder<SistemaDeGestaoDbContext> builder, string connectionString)
        {
            builder.UseSqlServer(connectionString);
        }

        public static void Configure(DbContextOptionsBuilder<SistemaDeGestaoDbContext> builder, DbConnection connection)
        {
            builder.UseSqlServer(connection);
        }
    }
}
