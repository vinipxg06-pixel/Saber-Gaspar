package br.edu.ifsc.saber_gaspar.mapper.dto;

import java.time.LocalDateTime;

public record EventoResposta(
        Long idevento,
        String titulo,
        String local,
        LocalDateTime dataHoraEvento,
        String descricao
) {
}
