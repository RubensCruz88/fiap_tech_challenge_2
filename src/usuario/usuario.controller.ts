import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { CriaUsuarioDTO } from "./dto/CriaUsuario.dto";
import { UsuarioEntity } from "./usuario.entity";
import { UsuarioService } from "./usuario.service";

@Controller('/usuarios')
export class UsuarioController {

	constructor(
		private usuarioService: UsuarioService,
	) {}

	@Get()
	async listaUsuarios() {
		return await this.usuarioService.listaUsuarios();
	}

	@Get(':usuarioId')
	async buscaUsuarioPorId(@Param('usuarioId') usuarioId: string) {
		return await this.usuarioService.buscaUsuarioPorId(usuarioId)
	}

	@Post()
	async criaUsuario(@Body() dadosDoUsuario: CriaUsuarioDTO) {
		const usuarioEntity = new UsuarioEntity();
		usuarioEntity.email = dadosDoUsuario.email;
		usuarioEntity.nome = dadosDoUsuario.nome;
		usuarioEntity.senha = dadosDoUsuario.senha;

		return this.usuarioService.criaUsuario(usuarioEntity)
	}

	@Delete(':usuarioId')
	async deletaUsuario(@Param('usuarioId') usuarioId: string) {
		return await this.usuarioService.deletaUsuario(usuarioId) 
	}
}