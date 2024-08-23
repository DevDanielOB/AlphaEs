import { PartialType } from '@nestjs/mapped-types';
import { CreateProduct } from './create-product';

export class updateProduct extends PartialType(CreateProduct) {}
