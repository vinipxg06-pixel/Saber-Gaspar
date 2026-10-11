package br.edu.ifsc.saber_gaspar.mapper;

import br.edu.ifsc.saber_gaspar.mapper.dto.UsuarioRequest;
import br.edu.ifsc.saber_gaspar.mapper.dto.UsuarioResposta;
import br.edu.ifsc.saber_gaspar.model.Usuario;
import org.springframework.stereotype.Component;

@Component
public class UsuarioMapper {

    public UsuarioResposta tranformarEmResposta(Usuario usuario){
        return new UsuarioResposta(
                usuario.getIdUsuario(),
                usuario.getNomeUsuario(),
                usuario.getEmailUsuario(),
                usuario.getSenhaUsuario()
        );
    }

    public Usuario transformarEmTabela(UsuarioRequest usuarioRequest){
        Usuario usuario = new Usuario();
        usuario.setEmailUsuario(usuarioRequest.email());
        usuario.setNomeUsuario(usuarioRequest.nome());
        usuario.setSenhaUsuario(usuarioRequest.senha());
        return usuario;
    }

}
