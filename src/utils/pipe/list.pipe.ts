import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException, Logger } from '@nestjs/common';
import 'src/utils/math.extension';

@Injectable()
export class ValidatePagePipe implements PipeTransform {
  transform(value: any, _metadata: ArgumentMetadata) {
    return Math.max(1, value ?? 1);
  }
}

@Injectable()
export class ValidateLimitPipe implements PipeTransform {
  transform(value: any, _metadata: ArgumentMetadata) {
    return Math.clamp(value ?? 10, 10, 50);
  }
}

@Injectable()
export class ValidateJsonPipe implements PipeTransform {
  private readonly logger = new Logger(ValidateJsonPipe.name);

  transform(value: any, _metadata: ArgumentMetadata) {
    if (!value) {
      return value;
    }
    try {
      return JSON.parse(decodeURI(value));
    } catch (expection) {
      throw new BadRequestException('Validation failed');
    }
  }
}
