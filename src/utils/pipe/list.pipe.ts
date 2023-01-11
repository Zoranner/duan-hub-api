import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException, Logger } from '@nestjs/common';
import 'src/utils/math.extension';

@Injectable()
export class ValidatePagePipe implements PipeTransform {
  transform(value: number, _metadata: ArgumentMetadata) {
    value = Number.isInteger(value) ? value : 1;
    return Math.max(1, value);
  }
}

@Injectable()
export class ValidateLimitPipe implements PipeTransform {
  transform(value: number, _metadata: ArgumentMetadata) {
    value = Number.isInteger(value) ? value : 5;
    return Math.clamp(value, 5, 30);
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
