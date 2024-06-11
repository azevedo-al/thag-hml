using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TheHome.SistemaDeGestao.Migrations
{
    /// <inheritdoc />
    public partial class fullbusinessremodel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Contatos",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Email = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: false),
                    Telefone1_DDD = table.Column<string>(type: "nvarchar(5)", maxLength: 5, nullable: false),
                    Telefone1_Numero = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    Telefone2_DDD = table.Column<string>(type: "nvarchar(5)", maxLength: 5, nullable: true),
                    Telefone2_Numero = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Contatos", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Enderecos",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Numero = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    Logradouro = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Bairro = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Cidade = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    UF = table.Column<string>(type: "nvarchar(2)", maxLength: 2, nullable: false),
                    CEP = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: true),
                    Complemento1 = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    Complemento2 = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Enderecos", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "EstagiosFinalizado",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DataInicio = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EstagiosFinalizado", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "FormasPagamentoProjeto",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Descricao = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: true),
                    Desconto = table.Column<float>(type: "real", nullable: false),
                    Juros = table.Column<float>(type: "real", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FormasPagamentoProjeto", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ItensEstoque",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nome = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Desc = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    Unidade = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Total = table.Column<float>(type: "real", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ItensEstoque", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PDFs",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Path = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PDFs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Pessoas",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nome = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    IsPJ = table.Column<bool>(type: "bit", nullable: false),
                    CPF_CNPJ = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    DataNascimento = table.Column<DateTime>(type: "datetime2", nullable: false),
                    InfoContatoId = table.Column<long>(type: "bigint", nullable: false),
                    EnderecoResidenciaId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pessoas", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Pessoas_Contatos_InfoContatoId",
                        column: x => x.InfoContatoId,
                        principalTable: "Contatos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Pessoas_Enderecos_EnderecoResidenciaId",
                        column: x => x.EnderecoResidenciaId,
                        principalTable: "Enderecos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "EstagiosEntrega",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DataInicio = table.Column<DateTime>(type: "datetime2", nullable: false),
                    PrevisaoConclusao = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ProximoEstagioId = table.Column<long>(type: "bigint", nullable: true),
                    DataCancelamento = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EstagiosEntrega", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EstagiosEntrega_EstagiosFinalizado_ProximoEstagioId",
                        column: x => x.ProximoEstagioId,
                        principalTable: "EstagiosFinalizado",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "FormasPagamentoGerais",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nome = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    FormaPagamentoProjetoId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FormasPagamentoGerais", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FormasPagamentoGerais_FormasPagamentoProjeto_FormaPagamentoProjetoId",
                        column: x => x.FormaPagamentoProjetoId,
                        principalTable: "FormasPagamentoProjeto",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "ParcelaProjeto",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ParteValor = table.Column<float>(type: "real", nullable: false),
                    ValorFixo = table.Column<float>(type: "real", nullable: false),
                    FormaPagamentoProjetoId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ParcelaProjeto", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ParcelaProjeto_FormasPagamentoProjeto_FormaPagamentoProjetoId",
                        column: x => x.FormaPagamentoProjetoId,
                        principalTable: "FormasPagamentoProjeto",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Clientes",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PessoaId = table.Column<long>(type: "bigint", nullable: false),
                    ProjetosId = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Clientes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Clientes_Pessoas_PessoaId",
                        column: x => x.PessoaId,
                        principalTable: "Pessoas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Fornecedores",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PessoaId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Fornecedores", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Fornecedores_Pessoas_PessoaId",
                        column: x => x.PessoaId,
                        principalTable: "Pessoas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "EstagiosProducao",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DataInicio = table.Column<DateTime>(type: "datetime2", nullable: false),
                    PrevisaoConclusao = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ProximoEstagioId = table.Column<long>(type: "bigint", nullable: true),
                    DataCancelamento = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EstagiosProducao", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EstagiosProducao_EstagiosEntrega_ProximoEstagioId",
                        column: x => x.ProximoEstagioId,
                        principalTable: "EstagiosEntrega",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "FluxoCaixa",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Montante = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    DataRegistro = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DataVencimento = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Desc = table.Column<string>(type: "nvarchar(300)", maxLength: 300, nullable: true),
                    FormaPagamentoId = table.Column<int>(type: "int", nullable: true),
                    DataPagamento = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ComprovanteId = table.Column<long>(type: "bigint", nullable: true),
                    Discriminator = table.Column<string>(type: "nvarchar(13)", maxLength: 13, nullable: false),
                    FornecedorId = table.Column<long>(type: "bigint", nullable: true),
                    ClienteId = table.Column<long>(type: "bigint", nullable: true),
                    EstagioEntregaId = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FluxoCaixa", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FluxoCaixa_Clientes_ClienteId",
                        column: x => x.ClienteId,
                        principalTable: "Clientes",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_FluxoCaixa_EstagiosEntrega_EstagioEntregaId",
                        column: x => x.EstagioEntregaId,
                        principalTable: "EstagiosEntrega",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_FluxoCaixa_FormasPagamentoGerais_FormaPagamentoId",
                        column: x => x.FormaPagamentoId,
                        principalTable: "FormasPagamentoGerais",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_FluxoCaixa_Fornecedores_FornecedorId",
                        column: x => x.FornecedorId,
                        principalTable: "Fornecedores",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_FluxoCaixa_PDFs_ComprovanteId",
                        column: x => x.ComprovanteId,
                        principalTable: "PDFs",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "ChecklistItem",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Desc = table.Column<string>(type: "nvarchar(300)", maxLength: 300, nullable: false),
                    IsChecked = table.Column<bool>(type: "bit", nullable: false),
                    EstagioProducaoId = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChecklistItem", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ChecklistItem_EstagiosProducao_EstagioProducaoId",
                        column: x => x.EstagioProducaoId,
                        principalTable: "EstagiosProducao",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "EstagiosContrato",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PreContratoId = table.Column<long>(type: "bigint", nullable: true),
                    ContratoAssinadoId = table.Column<long>(type: "bigint", nullable: true),
                    MedidasExecucaoId = table.Column<long>(type: "bigint", nullable: true),
                    FormaPagamentoId = table.Column<int>(type: "int", nullable: true),
                    DataInicio = table.Column<DateTime>(type: "datetime2", nullable: false),
                    PrevisaoConclusao = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ProximoEstagioId = table.Column<long>(type: "bigint", nullable: true),
                    DataCancelamento = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EstagiosContrato", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EstagiosContrato_EstagiosProducao_ProximoEstagioId",
                        column: x => x.ProximoEstagioId,
                        principalTable: "EstagiosProducao",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_EstagiosContrato_FormasPagamentoProjeto_FormaPagamentoId",
                        column: x => x.FormaPagamentoId,
                        principalTable: "FormasPagamentoProjeto",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_EstagiosContrato_PDFs_ContratoAssinadoId",
                        column: x => x.ContratoAssinadoId,
                        principalTable: "PDFs",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_EstagiosContrato_PDFs_MedidasExecucaoId",
                        column: x => x.MedidasExecucaoId,
                        principalTable: "PDFs",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_EstagiosContrato_PDFs_PreContratoId",
                        column: x => x.PreContratoId,
                        principalTable: "PDFs",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Compras",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DespesaId = table.Column<long>(type: "bigint", nullable: false),
                    Descricao = table.Column<string>(type: "nvarchar(300)", maxLength: 300, nullable: true),
                    EstagioProducaoId = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Compras", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Compras_EstagiosProducao_EstagioProducaoId",
                        column: x => x.EstagioProducaoId,
                        principalTable: "EstagiosProducao",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Compras_FluxoCaixa_DespesaId",
                        column: x => x.DespesaId,
                        principalTable: "FluxoCaixa",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "EstagiosOrcamento",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProjetoId = table.Column<long>(type: "bigint", nullable: true),
                    OrcamentoId = table.Column<long>(type: "bigint", nullable: true),
                    ValorTotal = table.Column<float>(type: "real", nullable: true),
                    DataInicio = table.Column<DateTime>(type: "datetime2", nullable: false),
                    PrevisaoConclusao = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ProximoEstagioId = table.Column<long>(type: "bigint", nullable: true),
                    DataCancelamento = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EstagiosOrcamento", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EstagiosOrcamento_EstagiosContrato_ProximoEstagioId",
                        column: x => x.ProximoEstagioId,
                        principalTable: "EstagiosContrato",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_EstagiosOrcamento_PDFs_OrcamentoId",
                        column: x => x.OrcamentoId,
                        principalTable: "PDFs",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_EstagiosOrcamento_PDFs_ProjetoId",
                        column: x => x.ProjetoId,
                        principalTable: "PDFs",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "FluxoEstoque",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ItemId = table.Column<int>(type: "int", nullable: false),
                    DataCadastroFluxo = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Qtd = table.Column<float>(type: "real", nullable: false),
                    Desc = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    DataRetirado = table.Column<DateTime>(type: "datetime2", nullable: true),
                    SubstitutoId = table.Column<long>(type: "bigint", nullable: true),
                    Discriminator = table.Column<string>(type: "nvarchar(21)", maxLength: 21, nullable: false),
                    CompraId = table.Column<long>(type: "bigint", nullable: true),
                    EstagioProducaoId = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FluxoEstoque", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FluxoEstoque_Compras_CompraId",
                        column: x => x.CompraId,
                        principalTable: "Compras",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_FluxoEstoque_EstagiosProducao_EstagioProducaoId",
                        column: x => x.EstagioProducaoId,
                        principalTable: "EstagiosProducao",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_FluxoEstoque_FluxoEstoque_SubstitutoId",
                        column: x => x.SubstitutoId,
                        principalTable: "FluxoEstoque",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_FluxoEstoque_ItensEstoque_ItemId",
                        column: x => x.ItemId,
                        principalTable: "ItensEstoque",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "EstagiosVisita",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MedidasProjeto = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    Observacoes = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: false),
                    DataInicio = table.Column<DateTime>(type: "datetime2", nullable: false),
                    PrevisaoConclusao = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ProximoEstagioId = table.Column<long>(type: "bigint", nullable: true),
                    DataCancelamento = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EstagiosVisita", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EstagiosVisita_EstagiosOrcamento_ProximoEstagioId",
                        column: x => x.ProximoEstagioId,
                        principalTable: "EstagiosOrcamento",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Fotos",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EstagioVisitaId = table.Column<long>(type: "bigint", nullable: true),
                    Path = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Fotos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Fotos_EstagiosVisita_EstagioVisitaId",
                        column: x => x.EstagioVisitaId,
                        principalTable: "EstagiosVisita",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Projetos",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProjetosId = table.Column<long>(type: "bigint", nullable: false),
                    Tipo = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    LocalId = table.Column<long>(type: "bigint", nullable: false),
                    VisitaId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Projetos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Projetos_Clientes_ProjetosId",
                        column: x => x.ProjetosId,
                        principalTable: "Clientes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Projetos_EstagiosVisita_VisitaId",
                        column: x => x.VisitaId,
                        principalTable: "EstagiosVisita",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "NotasProjeto",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProjetoId = table.Column<long>(type: "bigint", nullable: false),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Corpo = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NotasProjeto", x => x.Id);
                    table.ForeignKey(
                        name: "FK_NotasProjeto_Projetos_ProjetoId",
                        column: x => x.ProjetoId,
                        principalTable: "Projetos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ChecklistItem_EstagioProducaoId",
                table: "ChecklistItem",
                column: "EstagioProducaoId");

            migrationBuilder.CreateIndex(
                name: "IX_Clientes_PessoaId",
                table: "Clientes",
                column: "PessoaId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Compras_DespesaId",
                table: "Compras",
                column: "DespesaId");

            migrationBuilder.CreateIndex(
                name: "IX_Compras_EstagioProducaoId",
                table: "Compras",
                column: "EstagioProducaoId");

            migrationBuilder.CreateIndex(
                name: "IX_EstagiosContrato_ContratoAssinadoId",
                table: "EstagiosContrato",
                column: "ContratoAssinadoId");

            migrationBuilder.CreateIndex(
                name: "IX_EstagiosContrato_FormaPagamentoId",
                table: "EstagiosContrato",
                column: "FormaPagamentoId");

            migrationBuilder.CreateIndex(
                name: "IX_EstagiosContrato_MedidasExecucaoId",
                table: "EstagiosContrato",
                column: "MedidasExecucaoId");

            migrationBuilder.CreateIndex(
                name: "IX_EstagiosContrato_PreContratoId",
                table: "EstagiosContrato",
                column: "PreContratoId");

            migrationBuilder.CreateIndex(
                name: "IX_EstagiosContrato_ProximoEstagioId",
                table: "EstagiosContrato",
                column: "ProximoEstagioId");

            migrationBuilder.CreateIndex(
                name: "IX_EstagiosEntrega_ProximoEstagioId",
                table: "EstagiosEntrega",
                column: "ProximoEstagioId");

            migrationBuilder.CreateIndex(
                name: "IX_EstagiosOrcamento_OrcamentoId",
                table: "EstagiosOrcamento",
                column: "OrcamentoId");

            migrationBuilder.CreateIndex(
                name: "IX_EstagiosOrcamento_ProjetoId",
                table: "EstagiosOrcamento",
                column: "ProjetoId");

            migrationBuilder.CreateIndex(
                name: "IX_EstagiosOrcamento_ProximoEstagioId",
                table: "EstagiosOrcamento",
                column: "ProximoEstagioId");

            migrationBuilder.CreateIndex(
                name: "IX_EstagiosProducao_ProximoEstagioId",
                table: "EstagiosProducao",
                column: "ProximoEstagioId");

            migrationBuilder.CreateIndex(
                name: "IX_EstagiosVisita_ProximoEstagioId",
                table: "EstagiosVisita",
                column: "ProximoEstagioId");

            migrationBuilder.CreateIndex(
                name: "IX_FluxoCaixa_ClienteId",
                table: "FluxoCaixa",
                column: "ClienteId");

            migrationBuilder.CreateIndex(
                name: "IX_FluxoCaixa_ComprovanteId",
                table: "FluxoCaixa",
                column: "ComprovanteId");

            migrationBuilder.CreateIndex(
                name: "IX_FluxoCaixa_EstagioEntregaId",
                table: "FluxoCaixa",
                column: "EstagioEntregaId");

            migrationBuilder.CreateIndex(
                name: "IX_FluxoCaixa_FormaPagamentoId",
                table: "FluxoCaixa",
                column: "FormaPagamentoId");

            migrationBuilder.CreateIndex(
                name: "IX_FluxoCaixa_FornecedorId",
                table: "FluxoCaixa",
                column: "FornecedorId");

            migrationBuilder.CreateIndex(
                name: "IX_FluxoEstoque_CompraId",
                table: "FluxoEstoque",
                column: "CompraId");

            migrationBuilder.CreateIndex(
                name: "IX_FluxoEstoque_EstagioProducaoId",
                table: "FluxoEstoque",
                column: "EstagioProducaoId");

            migrationBuilder.CreateIndex(
                name: "IX_FluxoEstoque_ItemId",
                table: "FluxoEstoque",
                column: "ItemId");

            migrationBuilder.CreateIndex(
                name: "IX_FluxoEstoque_SubstitutoId",
                table: "FluxoEstoque",
                column: "SubstitutoId");

            migrationBuilder.CreateIndex(
                name: "IX_FormasPagamentoGerais_FormaPagamentoProjetoId",
                table: "FormasPagamentoGerais",
                column: "FormaPagamentoProjetoId");

            migrationBuilder.CreateIndex(
                name: "IX_Fornecedores_PessoaId",
                table: "Fornecedores",
                column: "PessoaId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Fotos_EstagioVisitaId",
                table: "Fotos",
                column: "EstagioVisitaId");

            migrationBuilder.CreateIndex(
                name: "IX_NotasProjeto_ProjetoId",
                table: "NotasProjeto",
                column: "ProjetoId");

            migrationBuilder.CreateIndex(
                name: "IX_ParcelaProjeto_FormaPagamentoProjetoId",
                table: "ParcelaProjeto",
                column: "FormaPagamentoProjetoId");

            migrationBuilder.CreateIndex(
                name: "IX_Pessoas_EnderecoResidenciaId",
                table: "Pessoas",
                column: "EnderecoResidenciaId");

            migrationBuilder.CreateIndex(
                name: "IX_Pessoas_InfoContatoId",
                table: "Pessoas",
                column: "InfoContatoId");

            migrationBuilder.CreateIndex(
                name: "IX_Projetos_ProjetosId",
                table: "Projetos",
                column: "ProjetosId");

            migrationBuilder.CreateIndex(
                name: "IX_Projetos_VisitaId",
                table: "Projetos",
                column: "VisitaId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ChecklistItem");

            migrationBuilder.DropTable(
                name: "FluxoEstoque");

            migrationBuilder.DropTable(
                name: "Fotos");

            migrationBuilder.DropTable(
                name: "NotasProjeto");

            migrationBuilder.DropTable(
                name: "ParcelaProjeto");

            migrationBuilder.DropTable(
                name: "Compras");

            migrationBuilder.DropTable(
                name: "ItensEstoque");

            migrationBuilder.DropTable(
                name: "Projetos");

            migrationBuilder.DropTable(
                name: "FluxoCaixa");

            migrationBuilder.DropTable(
                name: "EstagiosVisita");

            migrationBuilder.DropTable(
                name: "Clientes");

            migrationBuilder.DropTable(
                name: "FormasPagamentoGerais");

            migrationBuilder.DropTable(
                name: "Fornecedores");

            migrationBuilder.DropTable(
                name: "EstagiosOrcamento");

            migrationBuilder.DropTable(
                name: "Pessoas");

            migrationBuilder.DropTable(
                name: "EstagiosContrato");

            migrationBuilder.DropTable(
                name: "Contatos");

            migrationBuilder.DropTable(
                name: "Enderecos");

            migrationBuilder.DropTable(
                name: "EstagiosProducao");

            migrationBuilder.DropTable(
                name: "FormasPagamentoProjeto");

            migrationBuilder.DropTable(
                name: "PDFs");

            migrationBuilder.DropTable(
                name: "EstagiosEntrega");

            migrationBuilder.DropTable(
                name: "EstagiosFinalizado");
        }
    }
}
