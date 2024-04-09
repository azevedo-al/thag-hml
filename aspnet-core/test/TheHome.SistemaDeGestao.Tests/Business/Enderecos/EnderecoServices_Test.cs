using Microsoft.EntityFrameworkCore;
using Shouldly;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TheHome.SistemaDeGestao.Business.Enderecos;
using TheHome.SistemaDeGestao.Business.Enderecos.Dto;
using TheHome.SistemaDeGestao.Users.Dto;
using Xunit;

namespace TheHome.SistemaDeGestao.Tests.Business.Enderecos
{
    public class EnderecoServices_Test : SistemaDeGestaoTestBase
    {
        private readonly IEnderecoAppService _enderecoAppService;
        public EnderecoServices_Test()
        {
            _enderecoAppService = Resolve<IEnderecoAppService>();
        }

        [Fact]
        public async Task CreateEndereco_Test()
        {
            // Act
            await _enderecoAppService.CreateAsync(
                new CreateEnderecoDto
                {
                    Numero="3",
                    Logradouro="ab",
                    Bairro="ab",
                    Cidade="ab",
                    UF="AB"
                });

            await UsingDbContextAsync(async context =>
            {
                var abEndereco = await context.Enderecos.FirstOrDefaultAsync(e => e.Numero == "3" && e.Logradouro == "ab");
                abEndereco.ShouldNotBeNull();
            });
        }

        [Fact]
        public async Task EditEndereco_Test()
        {
            // Act
            await CreateEndereco_Test();

            Endereco abEndereco = await UsingDbContextAsync(async context =>
            {
                abEndereco = await context.Enderecos.FirstOrDefaultAsync(e => e.Numero == "3" && e.Logradouro == "ab");
                abEndereco.ShouldNotBeNull();
                return abEndereco;
            });

            abEndereco.Numero = "5";
            abEndereco.Logradouro = "abc";

            await _enderecoAppService.UpdateAsync(
                new EnderecoDto
                {
                    Id = abEndereco.Id,
                    Numero = abEndereco.Numero,
                    Logradouro = abEndereco.Logradouro,
                    Bairro = abEndereco.Bairro,
                    Cidade = abEndereco.Cidade,
                    UF = abEndereco.UF
                });

            await UsingDbContextAsync(async context =>
            {
                abEndereco = await context.Enderecos.FirstOrDefaultAsync(e => e.Numero == "5" && e.Logradouro == "abc");
                abEndereco.ShouldNotBeNull();
                return abEndereco;
            });
        }
    }
}
