using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TheHome.SistemaDeGestao.Business.Arquivos;
using TheHome.SistemaDeGestao.Business.Estagios.Producoes;
using TheHome.SistemaDeGestao.Business.FormasPagamento;

namespace TheHome.SistemaDeGestao.Business.Estagios.Contratos
{
    public class EstagioContrato : EstagioNaoFinal<EstagioProducao>
    {
        public virtual PDF PreContrato      { get; set; }
        public virtual PDF ContratoAssinado { get; set; }
        public virtual PDF MedidasExecucao  { get; set; }
        public virtual FormaPagamentoProjeto FormaPagamento { get; set; }

    }
}
