export class ProductDto {
  title: string;
  price: number;
  description: string;
  category: 'electronics' | 'jewelry' | "men's clothing" | "women's clothing";
  image: string;
}
