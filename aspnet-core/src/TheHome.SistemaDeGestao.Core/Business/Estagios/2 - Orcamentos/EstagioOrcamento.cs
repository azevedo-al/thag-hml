using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TheHome.SistemaDeGestao.Business.Arquivos;
using TheHome.SistemaDeGestao.Business.Estagios.Contratos;

namespace TheHome.SistemaDeGestao.Business.Estagios.Orcamentos
{
    public class EstagioOrcamento : EstagioNaoFinal<EstagioContrato>
    {
        public virtual PDF Projeto   { get; set; }
        public virtual PDF Orcamento { get; set; }
        
        public virtual float? ValorTotal { get; set; }
    }
}
