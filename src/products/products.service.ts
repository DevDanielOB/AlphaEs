import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import Utils from './utils';
import { updateProduct } from './dto/update-product';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async getAllProduct() {
    return this.prisma.product.findMany();
  }

  async getProductByName(name: string) {
    return this.prisma.product.findMany({
      where: {
        name: {
          contains: name,
        },
      },
    });
  }

  async createProductDetails(data: any) {
    return this.prisma.productDetails.create({ data });
  }

  async createProduct(data: any) {
    try {
      const existingProduct = await this.prisma.product.findUnique({
        where: { name: data.name },
      });
  
      if (existingProduct) {
        throw new HttpException('Produto já existe', HttpStatus.CONFLICT);
      }
  
      await this.prisma.$transaction(async (prisma) => {
        const productDetails = await prisma.productDetails.create({
          data: {
            details: data.details,
            archive_link: data.archive_link,
          },
        });
  
        const product = await prisma.product.create({
          data: {
            name: data.name,
            quantity: data.quantity,
            price: data.price,
            application: data.application,
            balance: data.balance,
            dateOfPurchase: await Utils.toDate(data.dateOfPurchase),
            purshaseRequest: data.purshaseRequest,
            whintorCode: data.whintorCode,
            product_id: productDetails.product_id,
          },
        });
        return product;
      });

      await this.prisma.$disconnect();
      console.warn('Produto criado com sucesso');
    } catch (error) {
      this.handleError(error);
    }
  }
  

  async update(id: number, data: any) {
    try {
      const existingProduct = await this.prisma.product.findUnique({
        where: { name: data.name },
      });

      if (existingProduct && existingProduct.id !== id) {
        throw new HttpException(
          `Produto ${data.name} já existe`,
          HttpStatus.CONFLICT,
        );
      }

      if (data.details || data.archive_link) {
        await this.prisma.productDetails.update({
          where: { product_id: id },
          data: {
            details: data.details,
            archive_link: data.archive_link,
          },
        });
      }

      const { details, archive_link, ...productData } = data;

      return this.prisma.product.update({
        where: { id },
        data: productData,
      });
    } catch (error) {
      this.handleError(error);
    }
  }

  async remove(id: number) {
    try {
      const product = await this.prisma.product.findUnique({ where: { id } });

      if (!product) {
        throw new HttpException('Produto não encontrado', HttpStatus.NOT_FOUND);
      }

      await this.prisma.$transaction(async (prisma) => {
        await prisma.productDetails.deleteMany({ where: { product_id: id } });
        await prisma.product.delete({ where: { id } });
      });

      await this.prisma.$disconnect();

      return { message: 'Produto removido com sucesso' };
    } catch (error) {
      this.handleError(error);
    }
  }

  private handleError(error: any) {
    const errorMessage =
      error instanceof HttpException
        ? error.getResponse()
        : 'Ocorreu um erro inesperado';
    throw new HttpException(errorMessage, error.status || HttpStatus.BAD_REQUEST);
  }
}

// implementar método que faz a retirada da quantidade do produto
// implementar método que faz a retirada da quantidade do estoque
// implementar método que faz a verificação se o que é retirado é maior do que existe em estoque
// implementar método que faz a validação da quantidade mínima em estoque,
// via fila e avise pelo terminal

