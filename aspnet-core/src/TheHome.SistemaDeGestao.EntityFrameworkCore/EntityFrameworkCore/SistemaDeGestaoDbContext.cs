using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using TheHome.SistemaDeGestao.Authorization.Roles;
using TheHome.SistemaDeGestao.Authorization.Users;
using TheHome.SistemaDeGestao.MultiTenancy;
using TheHome.SistemaDeGestao.Business.Clientes;
using TheHome.SistemaDeGestao.Business.Enderecos;
using TheHome.SistemaDeGestao.Business.Fornecedores;
using TheHome.SistemaDeGestao.Business.Pessoas;
using TheHome.SistemaDeGestao.Business.Contatos;
using TheHome.SistemaDeGestao.Business.Projetos;
using TheHome.SistemaDeGestao.Business.Estagios.Visitas;
using TheHome.SistemaDeGestao.Business.Estagios.Orcamentos;
using TheHome.SistemaDeGestao.Business.Estagios.Contratos;
using TheHome.SistemaDeGestao.Business.Estagios.Producoes;
using TheHome.SistemaDeGestao.Business.Estagios.Entregas;
using TheHome.SistemaDeGestao.Business.Estagios;
using TheHome.SistemaDeGestao.Business.Arquivos;

namespace TheHome.SistemaDeGestao.EntityFrameworkCore
{
    public class SistemaDeGestaoDbContext : AbpZeroDbContext<Tenant, Role, User, SistemaDeGestaoDbContext>
    {
        /* Define a DbSet for each entity of the application */
        public virtual DbSet<Pessoa>      Pessoas      { get; set; }
        public virtual DbSet<InfoContato> Contatos     { get; set; }
        public virtual DbSet<Endereco>    Enderecos    { get; set; }
        public virtual DbSet<Cliente>     Clientes     { get; set; }
        public virtual DbSet<Fornecedor>  Fornecedores { get; set; }

        public virtual DbSet<Projeto>          Projetos           { get; set; }
        public virtual DbSet<NotaProjeto>      NotasProjeto       { get; set; }
        public virtual DbSet<EstagioVisita>    EstagiosVisita     { get; set; }
        public virtual DbSet<EstagioOrcamento> EstagiosOrcamento  { get; set; }
        public virtual DbSet<EstagioContrato>  EstagiosContrato   { get; set; }
        public virtual DbSet<EstagioProducao>  EstagiosProducao   { get; set; }
        public virtual DbSet<EstagioEntrega>   EstagiosEntrega    { get; set; }
        public virtual DbSet<EstagioFinal>     EstagiosFinalizado { get; set; }

        public virtual DbSet<Foto> Fotos { get; set; }
        public virtual DbSet<PDF>  PDFs  { get; set; }

        public SistemaDeGestaoDbContext(DbContextOptions<SistemaDeGestaoDbContext> options)
            : base(options)
        {
        }
    }
}
