import { NestFactory } from "@nestjs/core";
import { Logger, ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  let app = await NestFactory.create(AppModule);
  let globalPrefix = "api";
  let port = process.env.PORT || 4242;
  let connectionMessage = `Application is running on: http://localhost:${port}/${globalPrefix}`;
  let config = new DocumentBuilder()
    .setTitle("EXORA PUBLIC API")
    .setDescription("")
    .setVersion("1.0")
    .addBearerAuth()
    .build();

  let documentFactory = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup("api", app, documentFactory, {
    swaggerOptions: { defaultModelsExpandDepth: 2 },
  });

  app.enableCors({ origin: "http://localhost:4200" });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.setGlobalPrefix(globalPrefix);

  await app.listen(port);

  Logger.log(connectionMessage);
}

void bootstrap();
