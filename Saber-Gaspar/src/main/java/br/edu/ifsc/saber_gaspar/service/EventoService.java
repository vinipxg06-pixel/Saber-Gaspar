package br.edu.ifsc.saber_gaspar.service;

import br.edu.ifsc.saber_gaspar.mapper.MapperEvento;
import br.edu.ifsc.saber_gaspar.mapper.dto.EventoRequest;
import br.edu.ifsc.saber_gaspar.mapper.dto.EventoResposta;
import br.edu.ifsc.saber_gaspar.model.Evento;
import br.edu.ifsc.saber_gaspar.repository.EventoRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class EventoService {

    MapperEvento mapperEvento;
    EventoRepository eventoRepository;

    public EventoResposta salvarEvento(EventoRequest eventoRequest){
        Evento salvar = mapperEvento.transformarEmEntidade(eventoRequest);
        eventoRepository.save(salvar);
        return mapperEvento.transformarEmResposta(salvar);
    }

    public EventoResposta atualizarEvento(EventoRequest eventoRequest, Long idEvento){
        Evento atualizar = eventoRepository.findById(idEvento)
                .orElseThrow(() -> new RuntimeException("Evento não encontrado com id: " + idEvento));
        atualizar.setDataHoraEvento(eventoRequest.dataHoraEvento());
        atualizar.setDescricao(eventoRequest.descricao());
        atualizar.setLocal(eventoRequest.local());
        Evento eventoAtualizado = eventoRepository.save(atualizar);
        return mapperEvento.transformarEmResposta(eventoAtualizado);
    }

    public void deletarEvento(Long idEvento){
        Evento deletarEvento = eventoRepository.findById(idEvento)
                .orElseThrow(() -> new RuntimeException(
                        "Evento não encontrado com id: " + idEvento
                ));
        eventoRepository.delete(deletarEvento);
    }

    public List<EventoResposta> listaEventos(){
        List<Evento> eventos = eventoRepository.findAll();
        List<EventoResposta> eventoRespostas = new ArrayList<>();
        for (Evento evento1 : eventos) {
            EventoResposta listar = mapperEvento.transformarEmResposta(evento1);
            eventoRespostas.add(listar);
        }
        return eventoRespostas;
    }

}
