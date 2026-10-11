package br.edu.ifsc.saber_gaspar.controller;

import br.edu.ifsc.saber_gaspar.mapper.EventoMapper;
import br.edu.ifsc.saber_gaspar.mapper.dto.EventoRequest;
import br.edu.ifsc.saber_gaspar.mapper.dto.EventoResposta;
import br.edu.ifsc.saber_gaspar.service.EventoService;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/eventos")
public class EventoController {

    private final EventoService eventoService;

    public EventoController(EventoService eventoService) {
        this.eventoService = eventoService;
    }

    @PostMapping
    public ResponseEntity<EventoResposta> salvarEvento(EventoRequest eventoRequest){
        return ResponseEntity.ok().body(eventoService.salvarEvento(eventoRequest));
    }

    @PutMapping("/{idEvento}")
    public ResponseEntity<EventoResposta> atualizarEvento(EventoRequest eventoRequest, Long idEvento){
        return ResponseEntity.ok().body(eventoService.atualizarEvento(eventoRequest, idEvento));
    }

    @GetMapping
    public ResponseEntity<List<EventoResposta>> listaEventos() {
        return ResponseEntity.ok()
                .body(eventoService.listaEventos());
    }

    @DeleteMapping("/{idEvento}")
    public void deletarEvento(Long idEvento){
        eventoService.deletarEvento(idEvento);
    }

    @GetMapping("/{idEvento}")
    public ResponseEntity<EventoResposta> encontrarEventoId(Long idEvento){
        return ResponseEntity.ok().body(eventoService.encontrarEventoId(idEvento));
    }
}
