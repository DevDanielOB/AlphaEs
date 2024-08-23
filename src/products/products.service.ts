import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import Utils from './utils';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class ProductService {

  constructor(private prisma: PrismaService) {}

  async getAllProduct() {
    return this.prisma.product.findMany();
  }

  async getProductByName(name: string) {
    return this.prisma.product.findUnique({ where: { name } });
  }

  async createProductDetails(data: any) {
    return this.prisma.productDetails.create({ data });
  }


  async createProduct(data: any,) {

    await this.prisma.$transaction(async (prisma) => {

      try {	

      if (data.name) {
        const existingProduct = await prisma.product.findUnique({
          where: { name: data.name },
        });

        if (existingProduct) {
          throw new HttpException('Produto ja existe', HttpStatus.CONFLICT);
        }
      }


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
          product_id: productDetails.product_id,
          application: data.application,
          balance: data.balance,
          purshaseRequest: data.purshaseRequest,
          whintorCode: data.whintorCode,
          dateOfPurchase: await Utils.toDate(data.dateOfPurchase),
        },
      });

      console.warn('Produto criado com sucesso');

    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
    }) 
  }
}