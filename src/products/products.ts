import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductService} from './products.service';
import { CreateProduct } from './dto/create-product';
import { updateProduct } from './dto/update-product';

@Controller('product')
export class ProductController {
  constructor(private readonly productsService: ProductService) {}

  @Post()
  create(@Body() CreateProduct: CreateProduct) {
    const result = this.productsService.createProduct(CreateProduct);

    return result;
  }

  @Get()
  findAll() {
    return this.productsService.getAllProduct();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.productsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateDeveloperDto: updateProduct) {
  //   return this.productsService.update(+id, updateDeveloperDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.productsService.remove(+id);
  // }
}
