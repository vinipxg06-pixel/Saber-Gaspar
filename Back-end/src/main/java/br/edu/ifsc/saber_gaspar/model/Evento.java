package br.edu.ifsc.saber_gaspar.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@Table(name = "eventos")
@Data
public class Evento {

    public Evento(String local, LocalDateTime dataHoraEvento, String descricao) {
        this.local = local;
        this.dataHoraEvento = dataHoraEvento;
        this.descricao = descricao;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ideventos")
    private Long idEvento;

    @Column(name = "local", nullable = false)
    private String local;

    @Column(name = "data_hora")
    private LocalDateTime dataHoraEvento;

    @Column(name = "descricao")
    private String descricao;
}
