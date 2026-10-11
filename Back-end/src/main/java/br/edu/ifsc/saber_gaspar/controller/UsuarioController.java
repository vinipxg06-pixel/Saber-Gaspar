package br.edu.ifsc.saber_gaspar.controller;

import br.edu.ifsc.saber_gaspar.mapper.dto.UsuarioRequest;
import br.edu.ifsc.saber_gaspar.mapper.dto.UsuarioResposta;
import br.edu.ifsc.saber_gaspar.service.UsuarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @PostMapping
    public ResponseEntity<UsuarioResposta> salvarUsuario(@RequestBody UsuarioRequest usuarioRequest) {
        return ResponseEntity.ok().body(usuarioService.salvarUsuario(usuarioRequest));
    }

    @PatchMapping("/{idUsuario}")
    public ResponseEntity<UsuarioResposta> atualizarUsuario(@RequestBody UsuarioRequest usuarioRequest, @PathVariable Long idUsuario) {
        return ResponseEntity.ok().body(usuarioService.atualizarUsuario(usuarioRequest, idUsuario));
    }

    @DeleteMapping("/{idUsuario}")
    public void deletarUsuario(@PathVariable Long idUsuario) {
        usuarioService.deletarUsuario(idUsuario);
    }

    @GetMapping
    public ResponseEntity<List<UsuarioResposta>> listaUsuarios() {
        return ResponseEntity.ok().body(usuarioService.listaUsuarios());
    }

    @GetMapping("/{idUsuario}")
    public ResponseEntity<UsuarioResposta> encontrarUsuarioId(@PathVariable Long idUsuario) {
        return ResponseEntity.ok().body(usuarioService.encontrarUsuarioId(idUsuario));
    }
}
