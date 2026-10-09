package br.edu.ifsc.saber_gaspar.mapper;

import br.edu.ifsc.saber_gaspar.mapper.dto.EventoRequest;
import br.edu.ifsc.saber_gaspar.mapper.dto.EventoResposta;
import br.edu.ifsc.saber_gaspar.model.Evento;
import br.edu.ifsc.saber_gaspar.repository.EventoRepository;
import org.springframework.stereotype.Component;

@Component
public class MapperEvento {

    private final EventoRepository eventoRepository;

    public MapperEvento(EventoRepository eventoRepository) {
        this.eventoRepository = eventoRepository;
    }

    public Evento transformarEmEntidade(EventoRequest eventoRequest) {
        Evento evento = new Evento(
                eventoRequest.local(),
                eventoRequest.dataHoraEvento(),
                eventoRequest.descricao()
        );
        return eventoRepository.save(evento);
    }

    public EventoResposta transformarEmResposta(Evento evento) {
        return new EventoResposta(
                evento.getIdEvento(),
                evento.getLocal(),
                evento.getDataHoraEvento(),
                evento.getDescricao()
        );
    }

}
