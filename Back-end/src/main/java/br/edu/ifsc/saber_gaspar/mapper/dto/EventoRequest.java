package br.edu.ifsc.saber_gaspar.mapper.dto;

import java.time.LocalDateTime;

public record EventoRequest(
        String local,
        String titulo,
        LocalDateTime dataHoraEvento,
        String descricao
) {
}
