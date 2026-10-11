package br.edu.ifsc.saber_gaspar.mapper.dto;

public record UsuarioRequest(
        String nome,
        String email,
        String senha
) {
}
