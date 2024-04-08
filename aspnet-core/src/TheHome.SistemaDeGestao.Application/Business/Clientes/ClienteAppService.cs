using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TheHome.SistemaDeGestao.Authorization.Users;
using TheHome.SistemaDeGestao.Business.Clientes.Dto;
using TheHome.SistemaDeGestao.Business.Enderecos;
using TheHome.SistemaDeGestao.Users.Dto;

namespace TheHome.SistemaDeGestao.Business.Clientes
{
    public class ClienteAppService : AsyncCrudAppService<Cliente, ClienteDto, int, PagedClienteResultRequestDto, CreateClienteDto, ClienteDto>, IClienteAppService
    {
        private readonly IRepository<Endereco> _enderecoRepository;

        public ClienteAppService(IRepository<Cliente> clienteRepository, IRepository<Endereco> enderecoRepository): base(clienteRepository)
        {
            _enderecoRepository = enderecoRepository;
        }

        //public ClienteDto Create(CreateClienteDto input)
        //{
        //    var cliente = ObjectMapper.Map<Cliente>(input);
        //    var output  = _clienteRepository.Insert(cliente);
        //    return ObjectMapper.Map<ClienteDto>(output);
        //}

        //public ClienteDto Get(ClienteDto input)
        //{
        //    var cliente = _clienteRepository.Get(input.Id);
        //    return ObjectMapper.Map<ClienteDto>(cliente);
        //}

        //public List<ClienteDto> GetAll()
        //{
        //    var clientes = _clienteRepository.GetAll();
        //    return clientes.Select((Cliente c) => ObjectMapper.Map<ClienteDto>(c)).ToList();
        //}

        //public ClienteDto Update(ClienteDto input)
        //{
        //    var cliente = _clienteRepository.Get(input.Id);
        //    ObjectMapper.Map(input, cliente);
        //    cliente = _clienteRepository.Update(cliente);
        //    return ObjectMapper.Map<ClienteDto>(cliente);
        //}

        //public void Delete(EntityDto input)
        //{
        //    var cliente = _clienteRepository.Get(input.Id);
        //    _clienteRepository.Delete(cliente);
        //}
    }
}
