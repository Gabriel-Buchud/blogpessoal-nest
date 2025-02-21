import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Blog Pessoal')
    .setDescription('Projeto Blog Pessoal')
    .setContact(
      'Gabriel Buchud Rodrigues',
      'https://github.com/Gabriel-Buchud',
      'gabrielbuchudestudos@gmail.com'
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document); 

  process.env.TZ = 'America/Sao_Paulo'; // Fuso horário configurado corretamente

  app.useGlobalPipes(new ValidationPipe()); // Habilitamos o Validation Globalmente

  app.enableCors(); // Habilitamos requisições de outras origens (Servidores)

  await app.listen(process.env.PORT || 4000); 
}
bootstrap();