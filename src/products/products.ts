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

  @Get(':name')
  findMany(@Param('name') name: string) {
    return this.productsService.getProductByName(name);
  }

  @Patch(':id')
  patch(@Param('id') id: string, @Body() updateDeveloperDto: updateProduct) {
    return this.productsService.update(+id, updateDeveloperDto);
  }
  
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
