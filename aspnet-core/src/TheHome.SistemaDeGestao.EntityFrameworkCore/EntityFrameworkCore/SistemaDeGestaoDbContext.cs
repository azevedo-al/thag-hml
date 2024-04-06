using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using TheHome.SistemaDeGestao.Authorization.Roles;
using TheHome.SistemaDeGestao.Authorization.Users;
using TheHome.SistemaDeGestao.MultiTenancy;
using TheHome.SistemaDeGestao.Business.Clientes;
using TheHome.SistemaDeGestao.Business.Enderecos;

namespace TheHome.SistemaDeGestao.EntityFrameworkCore
{
    public class SistemaDeGestaoDbContext : AbpZeroDbContext<Tenant, Role, User, SistemaDeGestaoDbContext>
    {
        /* Define a DbSet for each entity of the application */
        public virtual DbSet<Cliente> Clientes { get; set; }

        public virtual DbSet<Endereco> Enderecos { get; set; }

        public SistemaDeGestaoDbContext(DbContextOptions<SistemaDeGestaoDbContext> options)
            : base(options)
        {
        }
    }
}
