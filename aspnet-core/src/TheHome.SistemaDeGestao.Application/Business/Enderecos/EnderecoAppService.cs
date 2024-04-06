using Abp.Application.Services;
using Abp.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TheHome.SistemaDeGestao.Business.Clientes;
using TheHome.SistemaDeGestao.Business.Clientes.Dto;
using TheHome.SistemaDeGestao.Business.Enderecos.Dto;

namespace TheHome.SistemaDeGestao.Business.Enderecos
{
    public class EnderecoAppService : ApplicationService, IEnderecoAppService
    {
        private readonly IRepository<Endereco> _enderecoRepository;

        public EnderecoAppService(IRepository<Endereco> enderecoRepository)
        {
            _enderecoRepository = enderecoRepository;
        }

        public EnderecoDto Create(CreateEnderecoDto input)
        {
            var endereco = ObjectMapper.Map<Endereco>(input);
            var output = _enderecoRepository.Insert(endereco);
            return ObjectMapper.Map<EnderecoDto>(output);
        }

        public EnderecoDto Get(EnderecoDto input)
        {
            var endereco = _enderecoRepository.Get(input.Id);
            return ObjectMapper.Map<EnderecoDto>(endereco);
        }

        public List<EnderecoDto> GetAll()
        {
            var enderecos = _enderecoRepository.GetAll();
            return enderecos.Select((Endereco e) => ObjectMapper.Map<EnderecoDto>(e)).ToList();
        }

        public EnderecoDto Update(EnderecoDto input)
        {
            var endereco = _enderecoRepository.Get(input.Id);
            ObjectMapper.Map(input, endereco);
            endereco = _enderecoRepository.Update(endereco);
            return ObjectMapper.Map<EnderecoDto>(endereco);
        }

        public void Delete(EnderecoDto input)
        {
            var endereco = _enderecoRepository.Get(input.Id);
            _enderecoRepository.Delete(endereco);
        }

    }
}
