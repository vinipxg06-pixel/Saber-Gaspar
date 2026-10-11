package br.edu.ifsc.saber_gaspar.repository;

import br.edu.ifsc.saber_gaspar.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
}
