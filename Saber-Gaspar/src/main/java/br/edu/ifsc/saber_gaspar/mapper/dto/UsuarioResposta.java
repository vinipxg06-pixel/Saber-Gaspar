package br.edu.ifsc.saber_gaspar.mapper.dto;

public record UsuarioResposta(
        Long idUsuario,
        String nome,
        String email,
        String senha
) {
}
