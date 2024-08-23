import { Module } from '@nestjs/common';
import { ProductService } from './products.service';
import { ProductController } from './products';
import { PrismaModule } from '../prisma.module';

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  imports: [PrismaModule],
})
export class ProductsModule {}
