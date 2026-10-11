package br.edu.ifsc.saber_gaspar.repository;

import br.edu.ifsc.saber_gaspar.model.Evento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventoRepository extends JpaRepository<Evento, Long> {
}
