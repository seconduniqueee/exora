import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app/app.module";

async function bootstrap() {
  let app = await NestFactory.create(AppModule);
  let globalPrefix = "api";
  let port = process.env.PORT || 4242;
  let connectionMessage = `Application is running on: http://localhost:${port}/${globalPrefix}`;

  app.enableCors({ origin: "http://localhost:4200" });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.setGlobalPrefix(globalPrefix);

  await app.listen(port);

  Logger.log(connectionMessage);
}

void bootstrap();
