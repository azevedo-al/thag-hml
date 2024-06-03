using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TheHome.SistemaDeGestao.Business.Arquivos;
using TheHome.SistemaDeGestao.Business.Estagios.Orcamentos;

namespace TheHome.SistemaDeGestao.Business.Estagios.Visitas
{
    public class EstagioVisita : EstagioNaoFinal<EstagioOrcamento>
    {
        [Required, MaxLength(500)]
        public virtual string MedidasProjeto { get; set; }
        [Required, MaxLength(1000)]
        public virtual string Observacoes    { get; set; }
        public virtual ICollection<Foto> Fotos { get; }
    }
}
