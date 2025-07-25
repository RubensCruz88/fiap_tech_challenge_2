import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
	new ValidationPipe({
		transform: true,
		whitelist: true,
		forbidNonWhitelisted: true
	})
  )

  const config = new DocumentBuilder()
  	.setTitle('blog_api')
	.setDescription('Documentação da api do Blog')
	.setVersion('1.0')
	.addBearerAuth()
	.build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api',app, document)

  await app.listen(process.env.PORT ?? 3000);

  console.log(`Serviço iniciado na porta ${process.env.PORT ?? 3000} 🚀`)
}
bootstrap();
