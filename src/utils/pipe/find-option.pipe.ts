import { PipeTransform, Injectable, ArgumentMetadata, Logger } from '@nestjs/common';
import 'src/utils/math.extension';
import { FindOptionsWhere, FindOptionsOrder, LessThan, LessThanOrEqual, Like, MoreThan, MoreThanOrEqual } from 'typeorm';

enum ConditionType {
  Equal = 0, // 等于
  LessThan = 1, // 小于
  LessThanOrEqual = 2, // 小于等于
  MoreThan = 3, // 大于
  MoreThanOrEqual = 4, // 大于等于
  Like = 5, // 相似
}

@Injectable()
export class ValidateWherePipe<Entity> implements PipeTransform {
  transform(value: string, _metadata: ArgumentMetadata) {
    if (!value) {
      return null;
    }
    let result: FindOptionsWhere<Entity> = {};
    let whereObject = JSON.parse(value);
    if (whereObject) {
      Object.keys(whereObject).forEach(field => {
        let condition = whereObject[field];
        if (condition.value !== null || undefined) {
          switch (condition.type) {
            case ConditionType.Equal:
              result[field] = condition.value;
              break;
            case ConditionType.LessThan:
              result[field] = LessThan(condition.value);
              break;
            case ConditionType.LessThanOrEqual:
              result[field] = LessThanOrEqual(condition.value);
              break;
            case ConditionType.MoreThan:
              result[field] = MoreThan(condition.value);
              break;
            case ConditionType.MoreThanOrEqual:
              result[field] = MoreThanOrEqual(condition.value);
              break;
            case ConditionType.Like:
              result[field] = Like(`%${condition.value}%`);
              break;
            default:
              result[field] = condition.value;
              break;
          }
        }
      });
    }
    return result;
  }
}

enum OrderType {
  Asc = 0, // 正序
  Desc = 1, // 倒序
}

@Injectable()
export class ValidateOrderPipe<Entity> implements PipeTransform {
  transform(value: string, _metadata: ArgumentMetadata) {
    if (!value) {
      return null;
    }
    let result: FindOptionsOrder<Entity> = {};
    let orderObject = JSON.parse(value);
    if (orderObject) {
      Object.keys(orderObject).forEach(field => {
        let orderType = orderObject[field];
        switch (orderType) {
          case OrderType.Asc:
            result[field] = 'ASC';
            break;
          case OrderType.Desc:
            result[field] = 'DESC';
            break;
          default:
            result[field] = 'ASC';
            break;
        }
      });
    }
    return result;
  }
}
