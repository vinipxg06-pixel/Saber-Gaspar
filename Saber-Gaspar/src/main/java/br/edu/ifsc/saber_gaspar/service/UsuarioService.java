package br.edu.ifsc.saber_gaspar.service;

import br.edu.ifsc.saber_gaspar.mapper.UsuarioMapper;
import br.edu.ifsc.saber_gaspar.mapper.dto.UsuarioRequest;
import br.edu.ifsc.saber_gaspar.mapper.dto.UsuarioResposta;
import br.edu.ifsc.saber_gaspar.model.Usuario;
import br.edu.ifsc.saber_gaspar.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UsuarioService {

    UsuarioMapper usuarioMapper;
    UsuarioRepository usuarioRepository;

    public UsuarioResposta salvarUsuario(UsuarioRequest usuarioRequest){
        Usuario criar = new Usuario();
        criar.setSenhaUsuario(usuarioRequest.senha());
        criar.setNomeUsuario(usuarioRequest.nome());
        criar.setEmailUsuario(usuarioRequest.email());
        usuarioRepository.save(criar);
        return usuarioMapper.tranformarEmResposta(criar);
    }

    public UsuarioResposta atualizarUsuario(UsuarioRequest usuarioRequest, Long idUsuario){
        Usuario atualizar = usuarioRepository.findById(idUsuario)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        atualizar.setEmailUsuario(usuarioRequest.email());
        atualizar.setNomeUsuario(usuarioRequest.nome());
        atualizar.setSenhaUsuario(usuarioRequest.senha());
        usuarioRepository.save(atualizar);
        return usuarioMapper.tranformarEmResposta(atualizar);
    }

    public List<UsuarioResposta> listaUsuarios(){
        List<Usuario> usuarios = usuarioRepository.findAll();
        List<UsuarioResposta> usuarioRespostas = new ArrayList<>();
        for (Usuario usuario : usuarios){
            UsuarioResposta resposta = usuarioMapper.tranformarEmResposta(usuario);
            usuarioRespostas.add(resposta);
        }
        return usuarioRespostas;
    }

    public UsuarioResposta encontrarUsuarioId(Long id){
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        return usuarioMapper.tranformarEmResposta(usuario);
    }

    public void deletarUsuario(Long idUsuario){
        Usuario deletar = usuarioRepository.findById(idUsuario)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        usuarioRepository.delete(deletar);
    }

}
