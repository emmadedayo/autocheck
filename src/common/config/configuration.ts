import { Logger } from '@nestjs/common';
import { IsInt, IsString, validateSync } from 'class-validator';

import { config } from 'dotenv';
import * as process from 'node:process';
config();

class Configuration {
  private readonly logger = new Logger(Configuration.name);
  //CONSTANTS

  @IsInt()
  readonly PORT = Number(process.env.PORT);

  @IsString()
  readonly RAPID_API = process.env.RAPID_API;

  @IsString()
  readonly JWT_SECRET = process.env.JWT_SECRET as string;

  @IsInt()
  readonly JWT_EXPIRATION = Number(process.env.JWT_EXPIRATION);

  constructor() {
    const error = validateSync(this);

    if (!error.length) return;
    this.logger.error(`Config validation error: ${JSON.stringify(error[0])}`);
    process.exit(1);
  }
}

export const Config = new Configuration();
