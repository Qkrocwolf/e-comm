import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './product.model';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product) private readonly productModel: typeof Product,
  ) {}

  // async getFromFetch() {
  //   const products = await fetch('https://fakestoreapi.com/products').then(
  //     (res) => res.json(),
  //   );
  //   if (Array.isArray(products)) {
  //     for (let i = 0; i < products.length; i++) {
  //       const product = products[i];
  //       if (product.category === 'jewelery') {
  //         product.category = 'jewelry';
  //       }
  //       await this.productModel.create({
  //         title: product.title,
  //         price: product.price,
  //         description: product.description,
  //         category: product.category,
  //         image: product.image,
  //       });
  //     }
  //   }
  // }
}
