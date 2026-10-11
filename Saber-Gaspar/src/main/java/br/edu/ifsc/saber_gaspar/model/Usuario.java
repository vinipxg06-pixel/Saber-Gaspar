package br.edu.ifsc.saber_gaspar.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "usuarios")
@Data
@NoArgsConstructor
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idusuario")
    private Long idUsuario;

    @NotBlank
    @Column(name = "nome",  nullable = false)
    private String nomeUsuario;

    @NotBlank
    @Email
    @Column(name = "email", nullable = false, unique = true, length = 150)
    private String emailUsuario;

    @NotBlank
    @Column(name = "senha", nullable = false)
    private String senhaUsuario;
}